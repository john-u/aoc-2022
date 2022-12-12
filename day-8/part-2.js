import { readFile } from 'node:fs/promises'


const getColumn = (trees, idx) => {
    const column = []
    for (let m = 0; m < trees.length; m++) {
        column.push(trees[m][idx])
    }

    return column
}

const viewingDistance = (section, tree) => {
    let sum = 0
    for (let i = 0; i < section.length; i++) {
        sum++

        if (section[i] >= tree) {
            break
        }
    }

    return sum
}

const map = await readFile('input.txt', 'utf8')

const trees = map.split('\n')
    .map(row => Array.from(row, v => parseInt(v)))

let highScore = 0
for (let m = 0; m < trees.length; m++) {
    for (let n = 0; n < trees[m].length; n++) {
        const column = getColumn(trees, n)
        const up = column.slice(0, m).reverse()
        const down = column.slice(m + 1, column.length)
        const left = trees[m].slice(0, n).reverse()
        const right = trees[m].slice(n + 1, trees[m].length)

        const tree = trees[m][n]
        const score = viewingDistance(up, tree) * viewingDistance(down, tree)
            * viewingDistance(left, tree) * viewingDistance(right, tree)

        highScore = score > highScore ? score : highScore
    }
}

console.log(highScore)
