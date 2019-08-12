const {formatJsonData, fetchWordInfos, extractRootWords, fetchWordInfosRecursive, getLength} = require('./utils') 
const data = require('./data.json')
// const  = require('./utils') 
// const fetchWordInfos from './utils'



const words = extractRootWords(data)

fetchWordInfos(words)

// getLength(data)