const {formatJsonData, fetchWordInfos, extractRootWords, fetchWordInfosRecursive} = require('./utils') 
const data = require('./data.json')
// const  = require('./utils') 
// const fetchWordInfos from './utils'


// fetchWordInfos(extractRootWords(data))
const words = extractRootWords(data)

fetchWordInfosRecursive(words)