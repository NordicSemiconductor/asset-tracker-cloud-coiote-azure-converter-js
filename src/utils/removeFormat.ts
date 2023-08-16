import type { instance, value } from '../converter'
import type { customObjectValue } from './setCustomFormat'

/**
 * Remove the Coiote format from custom object
 */
export const removeFormat = (
	input: instance,
): customObjectValue | customObjectValue[] | undefined => {
	const data = dataCleaning(input)
	const result = buildStruct(data)

	return result.length === 1 ? result[0] : result
}

/**
 * Remove the 'value' key from element
 * and remove empty elements
 */
const dataCleaning = (rawData: instance): customObjectValue[][] => {
	const cleanData = Object.values(rawData).map((object) => {
		const attributesList = Object.entries(object)
		return attributesList
			.map((element) => {
				const id = element[0]
				const value = element[1]

				// empty value
				if (Object.keys(value).length === 0) return undefined

				const newValue = value as value

				return {
					[id]: newValue.value,
				}
			})
			.filter((result) => result !== undefined)
	})
	return cleanData as customObjectValue[][]
}

/**
 * Build expected struct
 */
const buildStruct = (input: customObjectValue[][]) =>
	input.reduce((array, current) => {
		const obj = current.reduce((p, c) => {
			return { ...p, ...c }
		}, {})
		array.push(obj)
		return array
	}, [])
