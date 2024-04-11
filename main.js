const fs = require('fs')
const readline = require('readline')

const filePath = 'prc.txt' 
let totalWords = 0

const readStream = fs.createReadStream(filePath, { encoding: 'latin1' })
const rl = readline.createInterface({
    input: readStream,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const cleanLine = stripAnsi(line)
    totalWords += countWords(cleanLine)
})

rl.on('close', () => {
    console.log(`Total words: ${totalWords}`)
})

function countWords(line) {
    const wordRegex = /\b\w+\b/g
    return (line.match(wordRegex) || []).length
}

function stripAnsi(text) {
    const ansiRegex = /\x1B\[[0-?]*[ -/]*[@-~]/g
    return text.replace(ansiRegex, '')
}

