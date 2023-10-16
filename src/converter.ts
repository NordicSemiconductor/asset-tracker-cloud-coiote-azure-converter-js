import { parseURN } from '@nordicsemiconductor/lwm2m-types'
import {
	Device_3_urn,
	ConnectivityMonitoring_4_urn,
	Location_6_urn,
	Temperature_3303_urn,
	Humidity_3304_urn,
	Pressure_3323_urn,
	Config_50009_urn,
} from './schemas/index.js'
import type {
	Device_3,
	ConnectivityMonitoring_4,
	Location_6,
	Temperature_3303,
	Humidity_3304,
	Pressure_3323,
	Config_50009,
} from './schemas/index.js'
import { LwM2MFormatError } from './utils/checkLwM2MFormat.js'
import type { UndefinedCoioteObjectWarning } from './utils/UndefinedCoioteObjectWarning.js'
import type { Metadata } from './utils/getTimestampFromMetadata.js'
import { getDevice } from './utils/getDevice.js'
import { getTemperature } from './utils/getTemperature.js'
import { convertToLwM2MHumidity } from './utils/convertToLwM2MHumidity.js'
import { convertToLwM2MPressure } from './utils/convertToLwM2MPressure.js'
import { convertToLwM2MConfig } from './utils/convertToLwM2MConfig.js'
import { getLocation } from './utils/getLocation.js'
import { getConnectivityMonitoring } from './utils/getConnectivityMonitoring.js'

export type Value = { value: string | number | boolean }
export type List = Record<string, { dim: string } | Value>
export type Resource = { [key: string]: Value | List }
type instanceId = string
export type Instance = Record<instanceId, Resource>
type objectId = string
export type LwM2MCoiote = Record<objectId, Instance>

export type DeviceTwin = {
	properties: {
		desired: unknown
		reported: {
			lwm2m: LwM2MCoiote
			$metadata: unknown
			$version: number
		}
	}
}

/**
 * Expected output format
 */
export type LwM2MAssetTrackerV2 = {
	[Device_3_urn]?: Device_3
	[ConnectivityMonitoring_4_urn]?: ConnectivityMonitoring_4
	[Location_6_urn]?: Location_6
	[Temperature_3303_urn]?: Temperature_3303
	[Humidity_3304_urn]?: Humidity_3304
	[Pressure_3323_urn]?: Pressure_3323
	[Config_50009_urn]?: Config_50009
}

/**
 * Convert 'Coiote Asset Tracker v2' format into 'LwM2M Asset Tracker v2' format
 */
export const converter = async (
	deviceTwin: DeviceTwin,
	metadata: Metadata,
	onWarning?: (element: UndefinedCoioteObjectWarning) => void,
	onError?: (element: LwM2MFormatError) => void,
): Promise<LwM2MAssetTrackerV2> => {
	const output = {} as LwM2MAssetTrackerV2
	const coioteObjects = deviceTwin.properties.reported.lwm2m

	const _3 = parseURN(Device_3_urn).ObjectID
	const _4 = parseURN(ConnectivityMonitoring_4_urn).ObjectID
	const _6 = parseURN(Location_6_urn).ObjectID
	const _3303 = parseURN(Temperature_3303_urn).ObjectID
	const _3304 = parseURN(Humidity_3304_urn).ObjectID
	const _3323 = parseURN(Pressure_3323_urn).ObjectID
	const _50009 = parseURN(Config_50009_urn).ObjectID

	/**
	 * TODO:
	 * We are in a converter function. It is clear with the name of the function.
	 *
	 * I think names as 'getDevice', 'convertToLwM2MHumidity', ... just make it
	 * redudant. Also the name of the function is super long.
	 *
	 * getLwM2MDevice would be nice.
	 * other options:
	 * getDevice_LwM2M
	 * getDevice
	 */
	const conversionResult = {
		[Device_3_urn]: getDevice(coioteObjects[_3]),
		[ConnectivityMonitoring_4_urn]: getConnectivityMonitoring(
			coioteObjects[_4],
		),
		[Location_6_urn]: getLocation(coioteObjects[_6]),
		[Temperature_3303_urn]: getTemperature(metadata, coioteObjects[_3303]),
		[Humidity_3304_urn]: convertToLwM2MHumidity(metadata, coioteObjects[_3304]),
		[Pressure_3323_urn]: convertToLwM2MPressure(metadata, coioteObjects[_3323]),
		[Config_50009_urn]: convertToLwM2MConfig(coioteObjects[_50009]),
	}

	Object.entries(conversionResult).forEach(([objectURN, LwM2MObject]) => {
		if ('result' in LwM2MObject)
			(output as any)[objectURN] = LwM2MObject.result // TODO: solve this any
		else {
			'warning' in LwM2MObject
				? onWarning?.(LwM2MObject.warning)
				: onError?.(LwM2MObject.error as any)
		}
	})

	return output
}
