const {formatJsonData, fetchWordInfos, extractRootWords} = require('./utils') 
const data = require('./data.json')
// const  = require('./utils') 
// const fetchWordInfos from './utils'


// fetchWordInfos(extractRootWords(data))
const words = extractRootWords(data)

const hundredWords = words.slice(0, 49)
fetchWordInfos(hundredWords)