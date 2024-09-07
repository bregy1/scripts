const fs = require('fs')

const users = [
    'Captain Crunch',
    'Aitana'
]

const file = './stats.txt'

const SUMMARY = {
  //  days: 0,
    words: 0,
    lines: 0,
    messages: 0
}

let last_written = ''
const statistics = (line, overview) => {

    let text = line
    let summary

    if(line.includes(users[0]+':')) {
        last_written = users[0]
        text = line.split(':')[1]
        summary = overview[users[0]]
        summary.messages++
    }

    if(line.includes(users[1]+':')) {
        last_written = users[1]
        text = line.split(':')[1]
        summary = overview[users[1]]
        summary.messages++
    }

    summary = overview[last_written]

    if(!last_written || !summary) {
        console.log('SKIP SINCE NO NAME>. OR summary', last_written, summary)
        return
    }

    summary.lines++


    const words = text.split(' ').length 

    summary.words += words


}


const lines = fs.readFileSync(file).toString().split('\n')

const OVERVIEW = {
    [users[0]]: { ...SUMMARY },
    [users[1]]: { ...SUMMARY },
    'start date (whatsapp)': '24.08.24',
    'end date (whatsapp)': '04.09.24'
}

for(let line of lines) {
    if(!line || line.trim().length === 0) {
        continue
    }
    statistics(line, OVERVIEW)
}


console.log(OVERVIEW)


