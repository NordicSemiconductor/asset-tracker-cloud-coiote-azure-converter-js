import type { list, value } from '../converter'

/**
 * Remove the key 'value' from input and set expected data type
 */
export const setDataType = (
	input: value | list,
	dataType?: string,
): undefined | number | boolean | string | unknown[] => {
	// if input is a list
	if ((input as list).attributes !== undefined) {
		return Object.values(input)
			.filter((element) => {
				if (element.dim === undefined) {
					return element
				}
			})
			.map((element) => element.value)
	}

	const value = input.value

	if (value === undefined) return undefined

	switch (dataType) {
		case 'number':
		case 'integer':
			return Number(value)
		case 'boolean':
			return Boolean(value)
		default:
			return String(value)
	}
}
