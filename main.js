const {formatJsonData, fetchWordInfos, extractRootWords, getLength} = require('./utils') 
const data = require('./data.json')
// const  = require('./utils') 
// const fetchWordInfos from './utils'



const words = extractRootWords(data)

// fetchWordInfos(['Betray', 'Bewildered'])
fetchWordInfos(['Beautiful','Because','Beck','Believe', 'Belligerent', 'Bemused', 'Benefit', 'Besieged', 'Betray', 'Bewildered','Bicycle', 'Brief', 'Broad', 'Bruise', 'Brusque', 'Burden', 'Business', 'Calamity', 'Candidate', 'Chaos'])

// getLength(data)

// 'Beautiful','Because','Beck','Believe', 'Belligerent', 'Bemused', 'Benefit', 'Besieged', 'Betray', 'Bewildered, 'Bicycle', 'Brief', 'Broad', 'Bruise', 'Brusque', 'Burden', 'Business', 'Calamity', 'Candidate', 'Chaos'