import type { List, Value, Instance as coioteInstance } from '../converter.js'

type LwM2Instance = Record<string, unknown> | undefined

/**
 *  Remove coiote format from single instance object following schema definition
 */
export const removeCoioteFormatFromSingleInstanceObj = (
	input: coioteInstance,
): LwM2Instance => {
	const resources = input['0'] ?? []
	const instance = Object.entries(resources)
		.map(([resourceId, value]) => {
			const newFormat = removeKeyFromResource(value)
			return {
				[`${resourceId}`]: newFormat,
			}
		})
		//.filter((result) => result !== undefined) // remove empty values
		.reduce((previous: any, current) => ({ ...current, ...previous }), {}) // TODO: remove any
	return instance as LwM2Instance
}

/**
 * Remove the key 'value' from input
 *
 * //TODO: check any return
 */
export const removeKeyFromResource = (resource: Value | List): any => {
	if ((resource as List).attributes !== undefined) {
		return Object.values(resource)
			.filter((element) => {
				if (element.dim === undefined) {
					return element
				}
			})
			.map((element) => element.value)
	}

	return resource.value
}
