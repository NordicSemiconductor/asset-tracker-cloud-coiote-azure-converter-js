import { type Humidity_3304, Humidity_3304_urn } from '../schemas/index.js'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'

type convertToLwM2MHumidityResult =
	| { result: Humidity_3304 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Humidity object from LwM2M using the object 3304 reported by Coiote
 */
export const convertToLwM2MHumidity = (
	metadata: Metadata,
	humidity_coiote?: Instance,
): convertToLwM2MHumidityResult => {
	if (humidity_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Humidity_3304_urn) }

	// TODO: update return type
	const humidity = setLwM2MFormat({
		[`${Humidity_3304_urn}`]: humidity_coiote,
	})
	// TODO: improve this
	const humidity_LwM2M = humidity[Humidity_3304_urn] as Humidity_3304

	if (isTimestampUndefinedIn(humidity_LwM2M) === true) {
		if (humidity_LwM2M[0] !== undefined)
			humidity_LwM2M[0][5518] = getTimestampFromMetadata(
				Humidity_3304_urn,
				metadata,
			)
	}

	const validatedLwM2MHumidity = checkLwM2MFormat({
		[Humidity_3304_urn]: humidity_LwM2M,
	})

	if ('error' in validatedLwM2MHumidity) {
		return { error: validatedLwM2MHumidity.error }
	}

	return {
		result: humidity_LwM2M,
	}
}
