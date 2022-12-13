import { readFile } from 'node:fs/promises'
import path from 'node:path'

// this solution will not work on Windows
const posixPath = path.posix

const stdout = await readFile('input.txt', 'utf8')

const filesystem = new Map()
let curDir = ''

stdout.split('\n')
	.forEach(line => {
		const parts = line.split(' ')
		switch (parts[0]) {
			case '$':
				if (parts[1] === 'cd') {
					curDir = parts[2] === '..' ? posixPath.resolve(curDir, '..') : posixPath.join(curDir, parts[2])
				} else {
					// we ls and following lines will be output
					filesystem.set(curDir, [])
				}

				break
			case 'dir':
				// "directories themselves do not count as having any intrinsic size"
				filesystem.get(curDir).push({ name: posixPath.join(curDir, parts[1]), size: null })
				break
			default:
				// line starts with number so must be file listing
				filesystem.get(curDir).push({ name: parts[1], size: parseInt(parts[0]) })
		}
	})

/**
 * @param {{ name: string, size: number | null }[]} dir 
 * @param {number} sum
 * @returns {number}
 */
const getSum = (dir, sum) => {
	for (const file of dir) {
		if (file.size) {
			sum += file.size
		} else {
			sum += getSum(filesystem.get(file.name), 0)
		}
	}

	return sum
}

const dirSizes = [...filesystem.values()].map((dir) => getSum(dir, 0))

const part1 = dirSizes.filter(size => size <= 100000).reduce((total, sum) => total + sum)
console.log(part1)

dirSizes.sort((a, b) => b - a)

const unused = 70000000 - dirSizes[0]

const part2 = dirSizes.findLast(size => unused + size >= 30000000)
console.log(part2)
