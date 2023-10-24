import {
	Temperature_3303_urn,
	type Temperature_3303,
} from '../schemas/index.js'
import type { ConversionResult } from '../utils/ConversionResult.js'
import type { Instance as CoioteFormat } from '../utils/LwM2MCoioteType.js'
import { warning } from '../utils/UndefinedCoioteObjectWarning.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from '../utils/getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from '../utils/isTimestampUndefinedIn.js'
import { removeCoioteFormatFromMultipleInstanceObj as removeCoioteFormatFrom } from '../utils/removeCoioteFormatFromMultipleInstanceObj.js'
import { validateLwM2MFormat } from '../utils/validateLwM2MFormat.js'

/**
 * Build the Temperature object from LwM2M using the object 3303 reported by Coiote
 */
export const getTemperature = (
	metadata: Metadata,
	object?: CoioteFormat,
): ConversionResult<Temperature_3303> => {
	if (object === undefined) return warning(Temperature_3303_urn)

	const maybeTemperature = removeCoioteFormatFrom(object)

	if (
		maybeTemperature[0] !== undefined &&
		isTimestampUndefinedIn(maybeTemperature) === true
	)
		maybeTemperature[0][5518] = getTimestampFromMetadata(
			Temperature_3303_urn,
			metadata,
		)

	return validateLwM2MFormat(Temperature_3303_urn, maybeTemperature)
}
