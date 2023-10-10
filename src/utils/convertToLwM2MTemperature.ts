import {
	Temperature_3303_urn,
	type Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'

type convertToLwM2MTemperatureResult =
	| { result: Temperature_3303 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Temperature object from LwM2M using the object 3303 reported by Coiote
 */
export const convertToLwM2MTemperature = (
	temperature_coiote?: Instance,
): convertToLwM2MTemperatureResult => {
	if (temperature_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Temperature_3303_urn) }

	const temperature = setLwM2MFormat({
		[`${Temperature_3303_urn}`]: temperature_coiote,
	})

	// here I can check if timestamp is undefined
	// TODO: evaluate this option

	const validatedLwM2MTemperature = checkLwM2MFormat(temperature)

	if ('error' in validatedLwM2MTemperature)
		return { error: validatedLwM2MTemperature.error }

	return {
		result: temperature[Temperature_3303_urn] as unknown as Temperature_3303,
	}
}
