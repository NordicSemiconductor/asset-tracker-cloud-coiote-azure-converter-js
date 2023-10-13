import { type Pressure_3323, Pressure_3323_urn } from '../schemas/index.js'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'
import { convertToLwM2MArrayInstance } from './convertToLwM2MArrayInstance.js'

type convertToLwM2MPressureResult =
	| { result: Pressure_3323 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const convertToLwM2MPressure = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): convertToLwM2MPressureResult => {
	if (objectWithCoioteFormat === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Pressure_3323_urn) }

	const schema = getLwM2MSchemaDefinition(Pressure_3323_urn)
	const pressure = convertToLwM2MArrayInstance(
		objectWithCoioteFormat,
		schema,
	) as unknown as Pressure_3323 // TODO: return the type in the function

	if (pressure[0] !== undefined && isTimestampUndefinedIn(pressure) === true) {
		pressure[0][5518] = getTimestampFromMetadata(Pressure_3323_urn, metadata)
	}

	const validatedLwM2MPressure = checkLwM2MFormat({
		[Pressure_3323_urn]: pressure,
	})

	if ('error' in validatedLwM2MPressure) {
		return { error: validatedLwM2MPressure.error }
	}

	return {
		result: pressure,
	}
}
