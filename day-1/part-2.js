import { readFile } from 'node:fs/promises'

const contents = await readFile('input.txt', 'utf8')

const answer = contents.split('\n\n')
    .map(currentElf =>
        currentElf.split('\n').reduce((acc, cur) => acc + parseInt(cur), 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc + cur, 0)

console.log(answer)
