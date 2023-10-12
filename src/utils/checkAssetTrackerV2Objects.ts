import {
	Config_50009_urn,
	ConnectivityMonitoring_4_urn,
	Device_3_urn,
	Humidity_3304_urn,
	Location_6_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
} from 'src/schemas/index.js'

export class Warning extends Error {
	missingObjects: string[]

	constructor({
		name,
		message,
		missingObjects,
	}: {
		name: string
		message: string
		missingObjects: string[]
	}) {
		super()

		this.name = name
		this.message = message
		this.missingObjects = missingObjects
	}
}

// list of objects needed to build LwM2M Asset Tracker v2
export const assetTrackerObjectsList = [
	ConnectivityMonitoring_4_urn,
	Device_3_urn,
	Humidity_3304_urn,
	Location_6_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
	Config_50009_urn,
]

/**
 * Check if the expected LwM2M objects in Asset Tracker v2 are into the input
 */
export const getMissedAssetTrackerV2Objects = (
	receivedObjects: string[],
): string[] => {
	const urns = new Set(receivedObjects)
	const missedObjectsList = assetTrackerObjectsList.filter(
		(objectUrn: string) => urns.has(objectUrn) === false,
	)
	return missedObjectsList
}
