import {
	Temperature_3303_urn,
	type Temperature_3303,
} from '../schemas/index.js'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from 'src/setTimestampHierarchy.js'

type convertToLwM2MTemperatureResult =
	| { result: Temperature_3303 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Temperature object from LwM2M using the object 3303 reported by Coiote
 */
export const convertToLwM2MTemperature = (
	metadata: Metadata,
	temperature_coiote?: Instance,
): convertToLwM2MTemperatureResult => {
	if (temperature_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Temperature_3303_urn) }

	// TODO: update return type
	const temperature = setLwM2MFormat({
		[`${Temperature_3303_urn}`]: temperature_coiote,
	})
	// TODO: improve this
	const temperature_LwM2M = temperature[
		Temperature_3303_urn
	] as Temperature_3303

	if (isTimestampUndefinedIn(temperature_LwM2M) === true) {
		if (temperature_LwM2M[0] !== undefined)
			temperature_LwM2M[0][5518] = getTimestampFromMetadata(
				Temperature_3303_urn,
				metadata,
			)
	}

	const validatedLwM2MTemperature = checkLwM2MFormat({
		[Temperature_3303_urn]: temperature_LwM2M,
	})

	if ('error' in validatedLwM2MTemperature) {
		return { error: validatedLwM2MTemperature.error }
	}

	return {
		result: temperature_LwM2M,
	}
}
