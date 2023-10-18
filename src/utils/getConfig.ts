import { warning } from './UndefinedCoioteObjectWarning.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import {
	Config_50009_urn,
	type Config_50009,
} from 'src/schemas/Config_50009.js'
import { setCustomFormat } from './setCustomFormat.js'

/**
 * Convert to LwM2M Config object (id 50009) from the object 50009 reported by Coiote
 */
export const getConfig = (
	config_coiote?: Instance,
): ConversionResult<Config_50009> => {
	if (config_coiote === undefined) return warning(Config_50009_urn)

	const config = setCustomFormat({
		[`${Config_50009_urn}`]: config_coiote,
	})

	// FIXME: this check is not working.
	// TODO: validate the veracity of the new format
	/*
	const validatedLwM2MConfig = validateLwM2MFormat(config)

	if ('error' in validatedLwM2MConfig)
		return { error: validatedLwM2MConfig.error }
	*/

	return { result: config[Config_50009_urn] as unknown as Config_50009 }
}
