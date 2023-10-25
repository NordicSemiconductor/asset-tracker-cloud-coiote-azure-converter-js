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

import { getDevice } from './assetTrackerV2Objects/getDevice.js'
import { getConnectivityMonitoring } from './assetTrackerV2Objects/getConnectivityMonitoring.js'
import { getLocation } from './assetTrackerV2Objects/getLocation.js'
import { getTemperature } from './assetTrackerV2Objects/getTemperature.js'
import { getHumidity } from './assetTrackerV2Objects/getHumidity.js'
import { getPressure } from './assetTrackerV2Objects/getPressure.js'
import { getConfig } from './assetTrackerV2Objects/getConfig.js'

import type { UndefinedCoioteObjectWarning } from './utils/UndefinedCoioteObjectWarning.js'
import type { Metadata } from './utils/getTimestampFromMetadata.js'
import type { ValidationError } from './utils/ValidationError.js'
import type { LwM2MCoiote } from './utils/LwM2MCoioteType.js'
import { unwrapResult } from './utils/unwrapResult.js'

/**
 * Expected input format
 */
export type DeviceTwin = {
	properties: {
		desired: unknown
		reported: {
			lwm2m: LwM2MCoiote
			$metadata: Metadata
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
export const converter = (
	deviceTwin: DeviceTwin,
	onError?: (element: ValidationError | UndefinedCoioteObjectWarning) => void,
): LwM2MAssetTrackerV2 => {
	const coiote = deviceTwin.properties.reported.lwm2m
	const metadata = deviceTwin.properties.reported.$metadata

	const id3 = parseURN(Device_3_urn).ObjectID
	const id4 = parseURN(ConnectivityMonitoring_4_urn).ObjectID
	const id6 = parseURN(Location_6_urn).ObjectID
	const id3303 = parseURN(Temperature_3303_urn).ObjectID
	const id3304 = parseURN(Humidity_3304_urn).ObjectID
	const id3323 = parseURN(Pressure_3323_urn).ObjectID
	const id50009 = parseURN(Config_50009_urn).ObjectID

	const unwrap = unwrapResult(onError)

	const convertedDevice = unwrap(getDevice(coiote[id3]))
	const convertedConnectivityMonitoring = unwrap(
		getConnectivityMonitoring(coiote[id4]),
	)
	const convertedLocation = unwrap(getLocation(coiote[id6]))
	const convertedTemperature = unwrap(getTemperature(metadata, coiote[id3303]))
	const convertedHumidity = unwrap(getHumidity(metadata, coiote[id3304]))
	const convertedPressure = unwrap(getPressure(metadata, coiote[id3323]))
	const convertedConfig = unwrap(getConfig(coiote[id50009]))

	const output: LwM2MAssetTrackerV2 = {}

	if (convertedDevice !== undefined) output[Device_3_urn] = convertedDevice
	if (convertedConnectivityMonitoring !== undefined)
		output[ConnectivityMonitoring_4_urn] = convertedConnectivityMonitoring
	if (convertedLocation !== undefined)
		output[Location_6_urn] = convertedLocation
	if (convertedTemperature !== undefined)
		output[Temperature_3303_urn] = convertedTemperature
	if (convertedHumidity !== undefined)
		output[Humidity_3304_urn] = convertedHumidity
	if (convertedPressure !== undefined)
		output[Pressure_3323_urn] = convertedPressure
	if (convertedConfig !== undefined) output[Config_50009_urn] = convertedConfig

	return output
}
