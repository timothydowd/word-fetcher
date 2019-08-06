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

      const response = await axios.get(URL, {
        headers: {
          app_id: "6a753563",
          app_key: "4ed66b63acb3c546838c88c7ab5d3c12"
        }
      });

    return response.data.results;
  })
  

  const results = await Promise.all(promises);
  console.log(results[0][0].lexicalEntries[0].entries[0].senses[0].synonyms);

  fs.writeFile("./newData.json", JSON.stringify(results), err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
  return results;
}






/////////////////////////////////////
async function fetchWordInfosRecursive(words) {

  const recursiveApiCall = (words, n, acc) => {
    if( n > words.length - 1 ){
      console.log(acc)
      return acc
    } else {
        const word = words[n]
        const URL = `https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-gb/${word}?strictMatch=false`;
    
        axios.get(URL, config).then(response => {
          acc.push(response.data.results)
          recursiveApiCall(words, n + 1, acc)
        })

        // console.log(n)
        // acc.push(n)
        // recursiveApiCall(words, n + 1, acc)
      
    }

  }

  recursiveApiCall(words, 0, [])
  
}


module.exports = { formatJsonData, fetchWordInfos, extractRootWords, fetchWordInfosRecursive }

