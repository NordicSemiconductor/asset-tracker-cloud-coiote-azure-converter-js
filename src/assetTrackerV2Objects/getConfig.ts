import { warning } from '../utils/UndefinedCoioteObjectWarning.js'
import type { ConversionResult } from 'src/converter.js'
import type { Instance as CoioteFormat } from '../utils/LwM2MCoioteType.js'
import {
	Config_50009_urn,
	type Config_50009,
	Config_50009_Typebox,
} from 'src/schemas/Config_50009.js'
import { removeCoioteFormatFromSingleInstanceObj as removeCoioteFormatFrom } from '../utils/removeCoioteFormatFromSingleInstanceObj.js'
import { validateAgainstSchema } from '../utils/validateAgainstSchema.js'

/**
 * Convert to LwM2M Config object (id 50009) from the object 50009 reported by Coiote
 */
export const getConfig = (
	object?: CoioteFormat,
): ConversionResult<Config_50009> => {
	if (object === undefined) return warning(Config_50009_urn)

	const maybeConfig = removeCoioteFormatFrom(object)

	return validateAgainstSchema(
		maybeConfig as Config_50009,
		Config_50009_Typebox,
	)
}
