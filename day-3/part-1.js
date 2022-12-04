import { readFile } from 'node:fs/promises'

const contents = await readFile('input.txt', 'utf8')

const priority = (item) => {
    return item.charCodeAt(0) >= 'a'.charCodeAt(0) ? item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        : item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
}

const answer = contents.split('\n').reduce((sum, rucksack) => {
    const half = Math.floor(rucksack.length / 2)
    const [c1, c2] = [Array.from(rucksack.slice(0, half)), Array.from(rucksack.slice(half, rucksack.length))]

    // TODO: optimize this search
    const same = c1.find(s => c2.includes(s))
    return sum + priority(same)
}, 0)

console.log(answer)
