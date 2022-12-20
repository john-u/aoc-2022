import { readFile } from 'node:fs/promises'

const motions = await readFile('input.txt', 'utf8')

const set = new Set()

const h = { x: 0, y: 0 }
let t = { x: 0, y: 0 }

const normalize = (h, t) => {
    return { x: Math.abs(h.x - t.x), y: Math.abs(h.y - t.y) }
}

const simulateMove = (direction) => {
    const before = { ...h }
    switch (direction) {
        case 'U':
            h.y++
            const uDiff = normalize(h, t)
            if (uDiff.y > 1 && h.y > t.y) {
                t = { ...before }
            }

            break

        case 'D':
            h.y--
            const dDiff = normalize(h, t)
            if (dDiff.y > 1 && h.y < t.y) {
                t = { ...before }
            }

            break

        case 'L':
            h.x--
            const lDiff = normalize(h, t)
            if (lDiff.x > 1 && h.x < t.x) {
                t = { ...before }
            }

            break

        case 'R':
            h.x++
            const rDiff = normalize(h, t)
            if (rDiff.x > 1 && h.x > t.x) {
                t = { ...before }
            }

            break

        default:
            throw Error('ope')
    }

    set.add(JSON.stringify(t))
}

motions.split('\n')
    .forEach(move => {
        const [direction, steps] = move.split(' ')
        for (let _ = 0; _ < parseInt(steps); _++) {
            simulateMove(direction)
        }
    })

console.log(set.size)
