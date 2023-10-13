import type { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import type { List, Value, Instance as coioteInstance } from '../converter.js'

type LwM2Instance = Record<string, unknown> | undefined

/**
 *  Remove coiote format from single instance object following schema definition
 *
 *	Return undefined as value if result of removing the format does not follow the schema definition
 */
export const removeCoioteFormatFromSingleInstanceObj = (
	input: coioteInstance,
	schema: (typeof LwM2MDocumentSchema.properties)[keyof (typeof LwM2MDocumentSchema)['properties']],
): LwM2Instance => {
	const resources = input['0'] ?? []
	const instance = Object.entries(resources)
		.map(([resourceId, value]) => {
			const expectedDataType = schema.properties[`${resourceId}`].type
			const newFormat = removeKeyFromResource(value)

			if (typeof newFormat !== expectedDataType) {
				if (
					(typeof newFormat === 'object' && expectedDataType === 'array') ||
					(typeof newFormat === 'number' && expectedDataType === 'integer')
				) {
					console.log('omit') // TODO: improve this
				} else {
					return { [`${resourceId}`]: undefined }
				}
			}

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
 */
const removeKeyFromResource = (resource: Value | List) => {
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
