import { Location_6_urn, type Location_6 } from '../schemas/index.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { removeCoioteFormatFromSingleInstanceObj } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Location object (id 6) from the object 6 reported by Coiote
 */
export const getLocation = (
	objectWithCoioteFormat?: Instance,
): ConversionResult<Location_6> => {
	if (objectWithCoioteFormat === undefined)
		return { error: new UndefinedCoioteObjectWarning(Location_6_urn) }

	const location = removeCoioteFormatFromSingleInstanceObj(
		objectWithCoioteFormat,
	) as Location_6 // TODO: return the type in the function

	return validateLwM2MFormat(Location_6_urn, location)
}
