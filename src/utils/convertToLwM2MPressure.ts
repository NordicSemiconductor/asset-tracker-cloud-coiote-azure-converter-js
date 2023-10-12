import { type Pressure_3323, Pressure_3323_urn } from '../schemas/index.js'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'

type convertToLwM2MPressureResult =
	| { result: Pressure_3323 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const convertToLwM2MPressure = (
	metadata: Metadata,
	pressure_coiote?: Instance,
): convertToLwM2MPressureResult => {
	if (pressure_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Pressure_3323_urn) }

	// TODO: update return type
	const pressure = setLwM2MFormat({
		[`${Pressure_3323_urn}`]: pressure_coiote,
	})
	// TODO: improve this
	const pressure_LwM2M = pressure[Pressure_3323_urn] as Pressure_3323

	if (
		pressure_LwM2M[0] !== undefined &&
		isTimestampUndefinedIn(pressure_LwM2M) === true
	) {
		pressure_LwM2M[0][5518] = getTimestampFromMetadata(
			Pressure_3323_urn,
			metadata,
		)
	}

	const validatedLwM2MPressure = checkLwM2MFormat({
		[Pressure_3323_urn]: pressure_LwM2M,
	})

	if ('error' in validatedLwM2MPressure) {
		return { error: validatedLwM2MPressure.error }
	}

	return {
		result: pressure_LwM2M,
	}
}
