import type { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import type { Instance } from '../converter'
import { convertResourceUsingSchema } from './convertResourceUsingSchema.js'

type instances = Record<string, unknown> | undefined

/**
 *  Remove format from instance of object and convert using the given schema
 */
export const convertObjectUsingSchema = (
	input: Instance,
	schema: (typeof LwM2MDocumentSchema.properties)[keyof (typeof LwM2MDocumentSchema)['properties']],
): instances => {
	const resources = input['0'] ?? []
	const instance = Object.entries(resources)
		.map(([resourceId, value]) => {
			const isRequired = schema.required.includes(resourceId)
			const dataType = schema.properties[`${resourceId}`].type
			const resource = convertResourceUsingSchema(
				value,
				resourceId,
				isRequired,
				dataType,
			)
			if (resource === false) {
				console.log(
					`id ${resourceId} is required in object in order with schema definition but it is missing`,
					schema,
				)
			}
			return resource
		})
		.filter((result) => result !== undefined) // remove empty values
		.reduce(
			(previous, current) =>
				current === false ? undefined : { ...current, ...previous },
			// false means a required resource is not present in the given params, for that reason is changed to undefined
			{},
		)

	return instance as instances
}
