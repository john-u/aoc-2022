import { readFile } from 'node:fs/promises'

const shapeValueMap = {
    'A': 1,
    'B': 2,
    'C': 3
}

const outcomeValueMap = {
    'X': 0,
    'Y': 3,
    'Z': 6
}

const playValueMap = {
    'A X': 'C',
    'B X': 'A',
    'C X': 'B',
    'A Y': 'A',
    'B Y': 'B',
    'C Y': 'C',
    'A Z': 'B',
    'B Z': 'C',
    'C Z': 'A',
}

const contents = await readFile('input.txt', 'utf8')

const answer = contents.split('\n')
    .reduce((score, round) => {
        const outcomeScore = outcomeValueMap[round.at(-1)]
        const shapeScore = shapeValueMap[playValueMap[round]]
        
        return score + outcomeScore + shapeScore
    }, 0)

console.log(answer)
