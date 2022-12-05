import { readFile } from 'node:fs/promises'

const fullyContains = (r1, r2) => {
    return parseInt(r1.at(0)) <= parseInt(r2.at(0)) && parseInt(r1.at(-1)) >= parseInt(r2.at(-1))
}

const contains = (r1, r2) => {
    return r1.some(id => 
        parseInt(id) >= parseInt(r2.at(0)) && parseInt(id) <= parseInt(r2.at(-1))
    )
}

const contents = await readFile('input.txt', 'utf8')

const findOverlap = async (contents, filter) => {
    return contents.split('\n')
        .filter(pair => {
            const [range1, range2] = pair.split(',').map(r => r.split('-'))
            return filter(range1, range2) || filter(range2, range1)
        })
        .length
}

const part1 = await findOverlap(contents, fullyContains)
const part2 = await findOverlap(contents, contains)

console.log(part1)
console.log(part2)
