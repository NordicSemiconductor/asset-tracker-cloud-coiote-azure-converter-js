import { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import type { LwM2MAssetTrackerV2 } from 'src/converter.js'

/**
 * Get the LwM2M schema definition of urn given by params
 */
export const getLwM2MSchemaDefinition = (
	urn: keyof LwM2MAssetTrackerV2,
): Partial<typeof LwM2MDocumentSchema> =>
	LwM2MDocumentSchema.properties[
		urn as unknown as keyof (typeof LwM2MDocumentSchema)['properties']
	]
