import type { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import type { List, Value, Instance as coioteInstance } from '../converter.js'

type LwM2Instance = Record<string, unknown> | undefined

/**
 *  Remove coiote format from single instance object following schema definition
 */
export const removeCoioteFormatFromSingleInstanceObj = (
	input: coioteInstance,
	schema: (typeof LwM2MDocumentSchema.properties)[keyof (typeof LwM2MDocumentSchema)['properties']],
): LwM2Instance => {
	const resources = input['0'] ?? []
	const instance = Object.entries(resources)
		.map(([resourceId, value]) => {
			const dataType = schema.properties[`${resourceId}`].type
			const newValueFormat = setDataType(value, dataType)
			if (newValueFormat === undefined) return undefined
			return {
				[`${resourceId}`]: newValueFormat,
			}
		})
		.filter((result) => result !== undefined) // remove empty values
		.reduce((previous, current) => ({ ...current, ...previous }), {})
	return instance as LwM2Instance
}

/**
 * Remove the key 'value' from input and set expected data type
 */
export const setDataType = (
	input: Value | List,
	dataType?: string,
): undefined | number | boolean | string | unknown[] => {
	// if input is a list
	if ((input as List).attributes !== undefined) {
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

	if (typeof value !== dataType) return undefined

	switch (dataType) {
		case 'number':
			//case 'integer':
			return Number(value)
		case 'boolean':
			return Boolean(value)
		default:
			return String(value)
	}
}
