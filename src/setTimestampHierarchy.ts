import type {
	Device_3,
	Humidity_3304,
	Pressure_3323,
	Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'

/**
 * Set the timestamp hierarchy
 *
 * 1- Device timestamp
 * 2- Timestamp from object in Device Twin // TODO
 * 3- Timestamp from LwM2M in Device Twin // TODO
 */
export const setTimestampHierarchy = (
	object: Temperature_3303 | Humidity_3304 | Pressure_3323,
	device?: Device_3,
): Temperature_3303 | Humidity_3304 | Pressure_3323 => {
	const newObject = object

	if (device !== undefined) {
		if (newObject[0] !== undefined && device[13] !== undefined) {
			newObject[0][5518] = device[13]
		}
	}

	return newObject
}
