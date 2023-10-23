import { Location_6_urn, type Location_6 } from '../schemas/index.js'
import { warning } from '../utils/UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from '../utils/validateLwM2MFormat.js'
import type {
	ConversionResult,
	Instance as CoioteFormat,
} from 'src/converter.js'
import { removeCoioteFormatFromSingleInstanceObj as removeCoioteFormatFrom } from '../utils/removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Location object (id 6) from the object 6 reported by Coiote
 */
export const getLocation = (
	object?: CoioteFormat,
): ConversionResult<Location_6> => {
	if (object === undefined) return warning(Location_6_urn)

	const maybeLocation = removeCoioteFormatFrom(object)

	return validateLwM2MFormat(Location_6_urn, maybeLocation as Location_6)
}
