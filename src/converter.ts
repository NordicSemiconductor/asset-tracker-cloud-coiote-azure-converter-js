import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
	type Device_3,
	Device_3_urn,
	type Humidity_3304,
	Humidity_3304_urn,
	type Location_6,
	Location_6_urn,
	type Pressure_3323,
	Pressure_3323_urn,
	type Temperature_3303,
	Temperature_3303_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { type Config_50009, Config_50009_urn } from '../schemas/Config_50009.js'
import { getAssetTrackerV2Objects } from './getAssetTrackerV2Objects.js'
import { removeCoioteFormat } from './removeCoioteFormat.js'
import { checkAssetTrackerV2Objects } from './utils/checkAssetTrackerV2Objects.js'
import { checkLwM2MFormat } from './utils/checkLwM2MFormat.js'

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

export type LwM2MAssetTrackerV2 = {
	[ConnectivityMonitoring_4_urn]: ConnectivityMonitoring_4
	[Device_3_urn]: Device_3
	[Humidity_3304_urn]: Humidity_3304
	[Location_6_urn]: Location_6
	[Pressure_3323_urn]: Pressure_3323
	[Temperature_3303_urn]: Temperature_3303
	[Config_50009_urn]: Config_50009
}

/**
 * Transform the device twin object coming from Azure to an object with LwM2M objects that are required by Asset Tracker v2
 */
export const converter = async (
	deviceTwin: deviceTwin,
): Promise<LwM2MAssetTrackerV2> => {
	const input = deviceTwin.properties.reported.lwm2m
	const objects = await getAssetTrackerV2Objects(input)

	const expectedObjects = checkAssetTrackerV2Objects(Object.keys(objects))
	if ('error' in expectedObjects) console.error(expectedObjects.error)

	const LwM2MAssetTrackerV2 = removeCoioteFormat(objects)

	const LwM2MFormat = checkLwM2MFormat(LwM2MAssetTrackerV2)
	if ('error' in LwM2MFormat) console.log(LwM2MFormat.error)

	return LwM2MAssetTrackerV2
}
