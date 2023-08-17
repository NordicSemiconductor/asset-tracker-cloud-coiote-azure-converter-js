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
import { Config_50009 } from '../schemas/Config_50009.js'
import {
	Config_50009_urn,
	getAssetTrackerV2Objects,
} from './getAssetTrackerV2Objects.js'
import { removeCoioteFormat } from './removeCoioteFormat.js'
import { checkExpectedLwM2MObjects } from './utils/checkExpectedLwM2MObjects.js'

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
	const objects = await getAssetTrackerV2Objects(input) // getAssetTrackerV2Objects

	const expectedObjects = checkExpectedLwM2MObjects(Object.keys(objects)) // checkExpectedAssetTrackerv2Objects
	if ('error' in expectedObjects) console.error(expectedObjects.error)

	const LwM2MAssetTrackerV2 = removeCoioteFormat(objects) //
	return LwM2MAssetTrackerV2
}
