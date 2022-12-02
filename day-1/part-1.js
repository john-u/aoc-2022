import { readFile } from 'node:fs/promises'

const contents = await readFile('input.txt', 'utf8')

const answer = contents.split('\n\n').reduce((maxCount, currentElf) => {
    const calories = currentElf.split('\n').reduce((acc, cur) => acc + parseInt(cur), 0)
    return Math.max(maxCount, calories)
}, 0)

console.log(answer)
