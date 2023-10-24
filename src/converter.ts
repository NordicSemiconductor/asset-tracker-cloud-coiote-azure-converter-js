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

type LwM2MAssetTrackerV2Objects =
	| Device_3
	| ConnectivityMonitoring_4
	| Location_6
	| Temperature_3303
	| Humidity_3304
	| Pressure_3323
	| Config_50009

/**
 * Result type interface of './assetTrackerV2Objects' methods
 */
export type ConversionResult<Result extends LwM2MAssetTrackerV2Objects> =
	| { result: Result }
	| { error: ValidationError | UndefinedCoioteObjectWarning }

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
export const converter = async (
	deviceTwin: DeviceTwin,
	onError?: (element: ValidationError | UndefinedCoioteObjectWarning) => void,
): Promise<LwM2MAssetTrackerV2> => {
	const output = {} as LwM2MAssetTrackerV2
	const coiote = deviceTwin.properties.reported.lwm2m
	const metadata = deviceTwin.properties.reported.$metadata

	const _3 = parseURN(Device_3_urn).ObjectID
	const _4 = parseURN(ConnectivityMonitoring_4_urn).ObjectID
	const _6 = parseURN(Location_6_urn).ObjectID
	const _3303 = parseURN(Temperature_3303_urn).ObjectID
	const _3304 = parseURN(Humidity_3304_urn).ObjectID
	const _3323 = parseURN(Pressure_3323_urn).ObjectID
	const _50009 = parseURN(Config_50009_urn).ObjectID

	const conversionResult: Record<
		string,
		| {
				error: ValidationError | UndefinedCoioteObjectWarning
		  }
		| { result: LwM2MAssetTrackerV2Objects }
	> = {
		[Device_3_urn]: getDevice(coiote[_3]),
		[ConnectivityMonitoring_4_urn]: getConnectivityMonitoring(coiote[_4]),
		[Location_6_urn]: getLocation(coiote[_6]),
		[Temperature_3303_urn]: getTemperature(metadata, coiote[_3303]),
		[Humidity_3304_urn]: getHumidity(metadata, coiote[_3304]),
		[Pressure_3323_urn]: getPressure(metadata, coiote[_3323]),
		[Config_50009_urn]: getConfig(coiote[_50009]),
	}

	for (const [objectURN, LwM2MObject] of Object.entries(conversionResult)) {
		if ('result' in LwM2MObject)
			Object.assign(output, { [objectURN]: LwM2MObject.result })
		else {
			onError?.(LwM2MObject.error)
		}
	}

	return output
}
