import type {
	Device_3,
	Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'

/**
 * Build the Temperature object from LwM2M using the object 3303 reported by Coiote
 *
 * Temperature timestamp value is set using Device timestmap value, TODO: improve this explanation
 */
export const getTemperature = (
	temperature_coiote?: Record<string, unknown>,
	device?: Device_3,
): Temperature_3303 => {
	return [
		{
			'5601': 27.18,
			'5602': 27.71,
			'5700': 27.18,
			'5701': 'Cel',
		},
	]
}
