import { getAssetTrackerObjects } from './getAssetTrackerObjects.js'
import { removeCoioteFormat } from './removeCoioteFormat.js'
import { checkLwM2MAssetTrackerKeys } from './utils/checkLwM2MAssetTrackerKeys.js'

export type value = { value: string | number | boolean }
export type list = Record<string, { dim: string } | value>
export type attribute = { attributes: { dim: string } }
export type resource = { [key: string]: value | list }
type instanceId = string
export type instance = Record<instanceId, resource>
type objectId = string
export type lwm2mCoiote = Record<objectId, instance>

export type deviceTwin = {
	properties: {
		desired: unknown
		reported: {
			lwm2m: lwm2mCoiote
			$metadata: unknown
			$version: number
		}
	}
}

/**
 * Main object of the process.
 * Transform the device twin coming from Azure to the expected input in Asset Tracker web app
 */
export const converter = async (deviceTwin: deviceTwin): Promise<any> => {
	const input = deviceTwin.properties.reported.lwm2m
	const objects = await getAssetTrackerObjects(input)
	const checkObjects = checkLwM2MAssetTrackerKeys(Object.keys(objects))
	if ('error' in checkObjects) console.error(checkObjects.error)
	const assetTrackerLwM2M = removeCoioteFormat(objects)
	return assetTrackerLwM2M
}
