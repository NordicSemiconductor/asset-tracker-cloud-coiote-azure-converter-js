import { type Pressure_3323, Pressure_3323_urn } from '../schemas/index.js'
import type { ConversionResult } from '../utils/ConversionResult.js'
import type { Instance as CoioteFormat } from '../utils/LwM2MCoioteType.js'
import { warning } from '../utils/UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from '../utils/validateLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from '../utils/getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from '../utils/isTimestampUndefinedIn.js'
import { removeCoioteFormatFromMultipleInstanceObj as removeCoioteFormatFrom } from '../utils/removeCoioteFormatFromMultipleInstanceObj.js'

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const getPressure = (
	metadata: Metadata,
	object?: CoioteFormat,
): ConversionResult<Pressure_3323> => {
	if (object === undefined) return warning(Pressure_3323_urn)

	const maybePressure = removeCoioteFormatFrom(object)

	if (
		maybePressure[0] !== undefined &&
		isTimestampUndefinedIn(maybePressure) === true
	) {
		maybePressure[0][5518] = getTimestampFromMetadata(
			Pressure_3323_urn,
			metadata,
		)
	}

	return validateLwM2MFormat(Pressure_3323_urn, maybePressure)
}
