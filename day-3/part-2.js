import { readFile } from 'node:fs/promises'

const lines = (await readFile('input.txt', 'utf8')).split('\n')

const priority = (item) => {
    return item.charCodeAt(0) >= 'a'.charCodeAt(0) ? item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        : item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
}

let sum = 0
for (let i = 0; i < lines.length; i += 3) {
    const group1 = Array.from(lines[i])
    const [group2, group3] = [new Set(lines[i + 1]), new Set(lines[i + 2])]

    // "Set" intersection
    const badge = group1.filter(item => group2.has(item) && group3.has(item))[0]

    sum += priority(badge)
}

console.log(sum)
