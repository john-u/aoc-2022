import { readFile } from 'node:fs/promises'

/**
 * @param {string[]} inputRows each row of input start stacks
 * @returns {string[][]}
 */
const buildStacks = (inputRows) => {
    const rows = Array.from(inputRows)
    const stackCount = parseInt(rows.pop().trimEnd().at(-1))
    const re = /\s??\[(?<crate>[A-Z])\]\s?|\s\s\s(\s?)/g

    const stacks = Array.from(new Array(stackCount), () => [])
    rows.forEach(row => {
        [...row.matchAll(re)].forEach((match, i) => {
            if (match.groups?.crate) {
                // insert at beginning so that push, pop work as expected later
                stacks[i].unshift(match.groups.crate)
            }
        })
    })

    return stacks
}

/**
 * pick up and move crates one at a time
 * modifies input cargo in place
 * 
 * @param {number} n
 * @param {string[][]} cargo 
 * @param {number} source 
 * @param {number} dest 
 */
const crateMover9000 = (n, cargo, source, dest) => {
    for (let _ = 0; _ < n; _++) {
        cargo[dest].push(cargo[source].pop())
    }
}

/**
 * pick up and move multiple crates at once
 * modifies input cargo in place
 * 
 * @param {number} n
 * @param {string[][]} cargo 
 * @param {number} source 
 * @param {number} dest 
 */
const crateMover9001 = (n, cargo, source, dest) => {
    const crates = []
    for (let _ = 0; _ < n; _++) {
        crates.push(cargo[source].pop())
    }

    for (let _ = 0; _ < n; _++) {
        cargo[dest].push(crates.pop())    
    }
}

/**
 * @param {string[][]} cargo 
 * @param {string[]} steps 
 * @param {Function} moveFunction 
 * @returns {string[][]} modified cargo
 */
const rearrange = (cargo, steps, moveFunction) => {
    const re = /move (?<moves>\d+) from (?<source>\d+) to (?<dest>\d+)/

    steps.forEach(step => {
        const groups = re.exec(step).groups
        const moves = parseInt(groups.moves)
        const sourceIdx = parseInt(groups.source) - 1
        const destIdx = parseInt(groups.dest) - 1

        moveFunction(moves, cargo, sourceIdx, destIdx)
    })

    return cargo
}

const drawing = await readFile('input.txt', 'utf8')
const [crates, procedure] = drawing.split('\n\n').map(s => s.split('\n'))

const result1 = rearrange(buildStacks(crates), procedure, crateMover9000)
const result2 = rearrange(buildStacks(crates), procedure, crateMover9001)

const part1 = result1.flatMap(stack => stack.pop()).join('')
const part2 = result2.flatMap(stack => stack.pop()).join('')

console.log(part1)
console.log(part2)
