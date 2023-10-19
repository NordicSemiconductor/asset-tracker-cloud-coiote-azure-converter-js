import { warning } from './UndefinedCoioteObjectWarning.js'
import type {
	ConversionResult,
	Instance as CoioteFormat,
} from 'src/converter.js'
import {
	Config_50009_urn,
	type Config_50009,
} from 'src/schemas/Config_50009.js'
import { removeCoioteFormatFromSingleInstanceObj as removeCoioteFormatFrom } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Config object (id 50009) from the object 50009 reported by Coiote
 */
export const getConfig = (
	object?: CoioteFormat,
): ConversionResult<Config_50009> => {
	if (object === undefined) return warning(Config_50009_urn)

	const maybeConfig = removeCoioteFormatFrom(object)

	// TODO: validate the veracity of the new format

	return { result: maybeConfig as unknown as Config_50009 }
}
