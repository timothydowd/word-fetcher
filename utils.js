const axios = require("axios");
const fs = require("fs");
const config = require('./config')

const formatJsonData = json => {
  const formattedData = json.reduce((reducedData, object) => {
    const word = object["Word"];
    const synonyms = [
      object["Synonym 1"],
      object["Synonym 2"],
      object["Synonym 3"],
      object["Synonym 4"]
    ];
    const antonyms = [
      object["Antonym 1"],
      object["Antonym 2"],
      object["Antonym 3"],
      object["Antonym 4"]
    ];

    const removedBlankSynonyms = synonyms.reduce((reducedSynonyms, synonym) => {
      return synonym === ""
        ? [...reducedSynonyms]
        : [...reducedSynonyms, synonym];
    }, []);

    const removedBlankAntonyms = antonyms.reduce((reducedAntonyms, antonym) => {
      return antonym === ""
        ? [...reducedAntonyms]
        : [...reducedAntonyms, antonym];
    }, []);

    return [
      ...reducedData,
      { word, synonyms: removedBlankSynonyms, antonyms: removedBlankAntonyms }
    ];
  }, []);

  return formattedData;
};




const extractRootWords = data => {
  const rootWords = data.map(wordObject => {
    return wordObject.Word.trim()
  })
  
  return rootWords
}




async function fetchWordInfos(words) {
  const promises = words.map(async word => {
   
    const URL = `https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-gb/${word}?strictMatch=false`;

      return Promise.resolve(axios.get(URL, {
        headers: {
          app_id: "6a753563",
          app_key: "4ed66b63acb3c546838c88c7ab5d3c12"
        }
      })).then((response) => {
        console.log(response.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms)
        console.log(response.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms)

        const antonyms = response.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms
        const synonyms = response.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms

        return {[word]:{ antonyms, synonyms }}
        
      }).catch((err) => {
        console.log('caught error in map: ', err.response.data)
      })

    
  })
  

  Promise.all(promises).then((result) => {
    fs.writeFile("./newData.json", JSON.stringify(result), err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  }).catch((err) => {
    console.log('caught error in fs writefile: ', err.response.data)
  })

  
  
}



const getLength = (data) => {
  console.log('data length: ', data.length)
}


module.exports = { formatJsonData, fetchWordInfos, extractRootWords, getLength }

