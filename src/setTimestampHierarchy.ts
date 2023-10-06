import type {
	Device_3,
	Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'

/**
 * Set the timestamp hierarchy
 *
 * 1- Device timestamp
 * 2- Timestamp from object in Device Twin
 * 3- Timestamp from LwM2M in Device Twin
 */
export const setTimestampHierarchy = (
	temperature: Temperature_3303,
	device: Device_3,
): Temperature_3303 => {
	const newTemp = temperature

	if (newTemp[0] !== undefined && device[13] !== undefined) {
		newTemp[0][5518] = device[13]
	}
	return newTemp
}
