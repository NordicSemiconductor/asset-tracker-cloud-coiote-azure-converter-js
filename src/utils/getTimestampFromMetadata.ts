import { parseURN } from '@nordicsemiconductor/lwm2m-types'
import {
	type Humidity_3304_urn,
	type Pressure_3323_urn,
	type Temperature_3303_urn,
} from '../schemas/index.js'

export type Metadata = {
	$lastUpdated: string
	lwm2m: LwM2M_Metadata
}

export type LwM2M_Metadata = {
	[key: `${number}`]: Obj // object ID : object
	$lastUpdated: string
}

export type Obj = {
	[key: `${number}`]: Instance // Instance id : instance
	$lastUpdated: string
}

export type Instance = {
	[key: `${number}`]: Resource // Resource id : resource
	$lastUpdated: string
}

type Resource = {
	$lastUpdated: string
	value: {
		$lastUpdated: string
	}
}

/**
 * TODO: ADD description. Explain why /1000
 */
export const parseTime = (time: string): number =>
	Math.trunc(new Date(time).getTime() / 1000)

/**
 * metadata example
 * @see https://github.com/MLopezJ/asset-tracker-lwm2m-js/issues/2
 */

/**
 * objectUrn only could be temperature, humidity or pressure because timestamp hierarchy only applies to them
 * @see {@link ../../adr/004-timestamp-hierarchy.md}
 */
export const getTimestampFromMetadata = (
	objectUrn:
		| typeof Temperature_3303_urn
		| typeof Humidity_3304_urn
		| typeof Pressure_3323_urn,
	metadata: Metadata,
): number => {
	const { ObjectID } = parseURN(objectUrn)
	const object = metadata.lwm2m[`${ObjectID as unknown as number}`]

	if (object !== undefined) {
		if (object['0'] !== undefined) {
			// value from the resource 5700 of the given object
			// default instance is the first one
			const level2 = object['0']['5700']?.value.$lastUpdated
			if (level2 !== undefined) return parseTime(level2)

			// value from the instance of the given object
			// default instance is the first one
			const level3 = object['0']?.$lastUpdated
			if (level3 !== undefined) return parseTime(level3)
		}

		// value of the given object
		const level4 = object?.$lastUpdated
		if (level4 !== undefined) return parseTime(level4)
	}

	// value of the lwm2m property in the device twin
	const level5 = metadata.lwm2m.$lastUpdated
	if (level5 !== undefined) return parseTime(level5)

	// TODO: check this
	return 0
}
