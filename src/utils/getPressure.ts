import { type Pressure_3323, Pressure_3323_urn } from '../schemas/index.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { warning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'
import { removeCoioteFormatFromArrayInstance as removeCoioteFormatFrom } from './removeCoioteFormatFromArrayInstance.js'

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const getPressure = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): ConversionResult<Pressure_3323> => {
	if (objectWithCoioteFormat === undefined) return warning(Pressure_3323_urn)

	const pressure = removeCoioteFormatFrom(
		objectWithCoioteFormat,
	) as unknown as Pressure_3323 // TODO: return the type in the function

	if (pressure[0] !== undefined && isTimestampUndefinedIn(pressure) === true) {
		pressure[0][5518] = getTimestampFromMetadata(Pressure_3323_urn, metadata)
	}

	return validateLwM2MFormat(Pressure_3323_urn, pressure)
}
