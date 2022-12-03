import { readFile } from 'node:fs/promises'

const shapeMap = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

const outcomeMap = {
    'A X': 3,
    'B Y': 3,
    'C Z': 3,
    'C X': 6,
    'B Z': 6,
    'A Y': 6
}

const contents = await readFile('input.txt', 'utf8')

const answer = contents.split('\n')
    .reduce((score, round) => {
        const outcomeScore = outcomeMap[round] ?? 0
        const shapeScore = shapeMap[round.at(-1)]

        return score + outcomeScore + shapeScore
    }, 0)

console.log(answer)
