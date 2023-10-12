import {
	type Humidity_3304,
	type Pressure_3323,
	type Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'

/**
 * Returns true if resource 5518 is defined, false if is undefined.
 *
 * First instance of object is the default option to be selected.
 *
 * 5518 is the resource selected to report timestamp value.
 */
export const isTimestampUndefinedIn = (
	object: Temperature_3303 | Humidity_3304 | Pressure_3323,
): boolean => object[0]?.[5518] === undefined
