import {
	type Humidity_3304,
	type Pressure_3323,
	type Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'
import type { convertToLwM2MDeviceResult } from './utils/convertToLwM2MDevice'

/**
 * Returns true if resource 5518 is defined, false if is undefined.
 *
 * First instance of object is the default option to be selected.
 *
 * 5518 is the resource selected to report timestamp value.
 */
const hasTimestampDefined = (
	object: Temperature_3303 | Humidity_3304 | Pressure_3323,
) => object[0]?.[5518] !== undefined

/**
 * Set the timestamp hierarchy
 *
 * 1- Device timestamp
 * 2- Timestamp from object in Device Twin // TODO
 * 3- Timestamp from LwM2M in Device Twin // TODO
 *
 * @see {@link ../../adr/004-timestamp-hierarchy.md}
 */
export const setTimestampHierarchy = (
	object: Temperature_3303 | Humidity_3304 | Pressure_3323,
	convertedDevice: convertToLwM2MDeviceResult,
): Temperature_3303 | Humidity_3304 | Pressure_3323 => {
	/**
	 * If timestamp resource is defined, nothing needs to be changed.
	 */
	if (hasTimestampDefined(object) === true) return object

	const device_LwM2M =
		'result' in convertedDevice ? convertedDevice.result : undefined
	if (device_LwM2M !== undefined)
		if (object[0] !== undefined && device_LwM2M[13] !== undefined)
			object[0][5518] = device_LwM2M[13]

	return object
}
