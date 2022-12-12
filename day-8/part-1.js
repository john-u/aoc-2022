import { readFile } from 'node:fs/promises'

/**
 * @param {number} tree 
 * @param {number[]} section
 * @returns {boolean}
 */
const isVisible = (tree, section) => {
    return section.every(otherTree => otherTree < tree)
}

const getColumn = (trees, idx) => {
    const column = []
    for (let m = 0; m < trees.length; m++) {
        column.push(trees[m][idx])
    }

    return column
}

const map = await readFile('input.txt', 'utf8')

const trees = map.split('\n')
    .map(row => Array.from(row, v => parseInt(v)))

let visible = 0
for (let m = 0; m < trees.length; m++) {
    if (m === 0 | m === trees.length - 1) {
        visible += trees.length
        continue
    }

    for (let n = 0; n < trees[m].length; n++) {
        if (n === 0 || n === trees[m].length - 1) {
            visible++
            continue
        }

        const column = getColumn(trees, n)
        const up = column.slice(0, m)
        const down = column.slice(m + 1, column.length)
        const left = trees[m].slice(0, n)
        const right = trees[m].slice(n + 1, trees[m].length)

        const tree = trees[m][n]
        if (isVisible(tree, up) || isVisible(tree, down) 
            || isVisible(tree, left) || isVisible(tree, right)) {
                visible++
            }
    }
}

console.log(visible)
