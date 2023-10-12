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
import { convertToLwM2MDevice } from './utils/convertToLwM2MDevice.js'
import { convertToLwM2MTemperature } from './utils/convertToLwM2MTemperature.js'
import { convertToLwM2MHumidity } from './utils/convertToLwM2MHumidity.js'
import { convertToLwM2MPressure } from './utils/convertToLwM2MPressure.js'
import { convertToLwM2MConfig } from './utils/convertToLwM2MConfig.js'
import { convertToLwM2MLocation } from './utils/convertToLwM2MLocation.js'
import { convertToLwM2MConnectivityMonitoring } from './utils/convertToLwM2MConnectivityMonitoring.js'

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

	const conversionResult = {
		[Device_3_urn]: convertToLwM2MDevice(
			coioteObjects[parseURN(Device_3_urn).ObjectID],
		),
		[ConnectivityMonitoring_4_urn]: convertToLwM2MConnectivityMonitoring(
			coioteObjects[parseURN(ConnectivityMonitoring_4_urn).ObjectID],
		),
		[Location_6_urn]: convertToLwM2MLocation(
			coioteObjects[parseURN(Location_6_urn).ObjectID],
		),
		[Temperature_3303_urn]: convertToLwM2MTemperature(
			metadata,
			coioteObjects[parseURN(Temperature_3303_urn).ObjectID],
		),
		[Humidity_3304_urn]: convertToLwM2MHumidity(
			metadata,
			coioteObjects[parseURN(Humidity_3304_urn).ObjectID],
		),
		[Pressure_3323_urn]: convertToLwM2MPressure(
			metadata,
			coioteObjects[parseURN(Pressure_3323_urn).ObjectID],
		),
		[Config_50009_urn]: convertToLwM2MConfig(
			coioteObjects[parseURN(Config_50009_urn).ObjectID],
		),
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
