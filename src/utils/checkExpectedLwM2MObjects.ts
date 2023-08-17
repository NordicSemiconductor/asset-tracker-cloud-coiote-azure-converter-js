import { requiredAssetTrackerObjects } from '../getAssetTrackerV2Objects.js'
/**
 * Check if the expected LwM2M objects in Asset Tracker web app are into the input
 */
export const checkExpectedLwM2MObjects = (
	list: string[],
): { result: true } | { error: Error } => {
	const errors = requiredAssetTrackerObjects.reduce(
		(previous: string[], current: string) => {
			if (list.includes(current) === false) return [...previous, current]
			return previous
		},
		[],
	)

	if (errors.length > 0)
		return {
			error: new Error(
				`the following LwM2M objects are expected in Asset Tracker web app but missing in input. \nMissing values: ${JSON.stringify(
					errors,
				)}. \nInput: ${JSON.stringify(
					list,
				)}. \nRequired values: ${JSON.stringify(requiredAssetTrackerObjects)}`,
			),
		}

	return { result: true }
}
