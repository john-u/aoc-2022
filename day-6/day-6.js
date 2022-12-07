import { readFile } from 'node:fs/promises'

/**
 * @param {string} signal series of seemingly-random characters 
 * @param {number} len character length of unique marker
 * @returns number of chars processed before the first unique marker is detected
 */
const detectSignalMarker = (signal, len) => {
    let chars = []
    let count = 0

    // TODO: can we do better than O(n^2)?
    for (const char of signal) {
        if (chars.includes(char)) {
            chars = chars.slice(chars.indexOf(char) + 1)
        }
    
        chars.push(char)
        count++
        if (chars.length === len) {
            break
        }
    }

    return count
}

const signal = await readFile('input.txt', 'utf8')

const part1 = detectSignalMarker(signal, 4)
const part2 = detectSignalMarker(signal, 14)

console.log(part1)
console.log(part2)
