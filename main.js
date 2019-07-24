// import data from './data.json'
const data = require('./data.json')
const axios = require('axios');

const formatJsonData = (json) => {
    const formattedData = json.reduce((reducedData, object) => {
        const word = object["Word"]
        const synonyms = [object["Synonym 1"], object["Synonym 2"], object["Synonym 3"], object["Synonym 4"]]
        const antonyms = [object["Antonym 1"], object["Antonym 2"], object["Antonym 3"], object["Antonym 4"]]

        const removedBlankSynonyms = synonyms.reduce((reducedSynonyms, synonym) => {
            return synonym === "" ? [...reducedSynonyms] : [ ...reducedSynonyms, synonym]    
        },[])

        const removedBlankAntonyms = antonyms.reduce((reducedAntonyms, antonym) => {
            return antonym === "" ? [...reducedAntonyms] : [ ...reducedAntonyms, antonym]    
        },[])

        return [ ...reducedData, { word, synonyms: removedBlankSynonyms, antonyms: removedBlankAntonyms}]
    },[])

   
    return formattedData
}

const formattedData = formatJsonData(data)


const addMissingData = (formattedData) => {

}

//// call api

const words = ['ace', 'place', 'set']


const savedData = words.map(word => {

//     // const http = require("https");

//     // const app_id = "6a753563"; // insert your APP Id
//     // const app_key = "4ed66b63acb3c546838c88c7ab5d3c12"; // insert your APP Key
//     // const wordId = word;
//     // const fields = "";
//     // const strictMatch = "false";

//     // const options = {
//     // host: 'od-api.oxforddictionaries.com',
//     // port: '443',
//     // path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
//     // method: "GET",
//     // headers: {
//     //     'app_id': app_id,
//     //     'app_key': app_key
//     // }
//     // };

const URL = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?strictMatch=false`

return axios.get(URL, { headers: { app_id: "6a753563", app_key: "4ed66b63acb3c546838c88c7ab5d3c12" }})
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log('ERROR!!!!!!!!!!!!!!', error);
  })


})

console.log('savedData: ', savedData)

// const word = 'ace'

// const URL = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`

// axios.get(URL, { headers: { app_id: "6a753563", app_key: "4ed66b63acb3c546838c88c7ab5d3c12" }})
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })


  