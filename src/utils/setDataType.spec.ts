import { setDataType } from './setDataType.js'

describe('setDataType', () => {
	it('should return string if not data type is specified (default option)', () => {
		expect(setDataType({ value: 1 })).toBe('1')
	})

	it('should transform input in array', () => {
		const list = {
			'0': { value: 8 },
			'1': { value: 10 },
			attributes: { dim: '2' },
		}
		const result = setDataType(list)
		expect(result).toMatchObject([8, 10])
		if (Array.isArray(result)) {
			expect(result.length).toBe(Number(list.attributes.dim))
		}
	})

	it.each([
		[{ value: 'a' }, 'string', 'a'],
		[{ value: 1 }, 'integer', 1],
		[{ value: 0 }, 'boolean', false],
	])(`should transform '%j' in %s`, (input, dataType, expected) => {
		expect(setDataType(input, dataType)).toBe(expected)
	})
})
