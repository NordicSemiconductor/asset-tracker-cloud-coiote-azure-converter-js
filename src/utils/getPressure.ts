import { type Pressure_3323, Pressure_3323_urn } from '../schemas/index.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { warning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'
import { convertToLwM2MArrayInstance } from './convertToLwM2MArrayInstance.js'

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const getPressure = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): ConversionResult<Pressure_3323> => {
	if (objectWithCoioteFormat === undefined) return warning(Pressure_3323_urn)

	const schema = getLwM2MSchemaDefinition(Pressure_3323_urn)
	const pressure = convertToLwM2MArrayInstance(
		objectWithCoioteFormat,
		schema,
	) as unknown as Pressure_3323 // TODO: return the type in the function

	if (pressure[0] !== undefined && isTimestampUndefinedIn(pressure) === true) {
		pressure[0][5518] = getTimestampFromMetadata(Pressure_3323_urn, metadata)
	}

	return validateLwM2MFormat(Pressure_3323_urn, pressure)
}
