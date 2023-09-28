import { assetTrackerObjectsList as definedAssetTrackerV2Objects } from '../getAssetTrackerV2Objects.js' // TODO: change assetTrackerObjectsList to definedAssetTrackerV2Objects

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

/**
 * Check if the expected LwM2M objects in Asset Tracker v2 are into the input
 */
export const getMissedAssetTrackerV2Objects = (
	receivedObjects: string[],
): string[] => {
	const urns = new Set(receivedObjects)
	const missedObjectsList = definedAssetTrackerV2Objects.filter(
		(objectUrn: string) => urns.has(objectUrn) === false,
	)
	return missedObjectsList
}
