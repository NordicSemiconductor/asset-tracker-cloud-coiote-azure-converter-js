import { type Humidity_3304, Humidity_3304_urn } from '../schemas/index.js'
import type { ConversionResult } from 'src/converter.js'
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
 * Build the Humidity object from LwM2M using the object 3304 reported by Coiote
 */
export const getHumidity = (
	metadata: Metadata,
	object?: CoioteFormat,
): ConversionResult<Humidity_3304> => {
	if (object === undefined) return warning(Humidity_3304_urn)

	const maybeHumidity = removeCoioteFormatFrom(object)

	if (
		maybeHumidity[0] !== undefined &&
		isTimestampUndefinedIn(maybeHumidity) === true
	) {
		maybeHumidity[0][5518] = getTimestampFromMetadata(
			Humidity_3304_urn,
			metadata,
		)
	}

	return validateLwM2MFormat(Humidity_3304_urn, maybeHumidity)
}
