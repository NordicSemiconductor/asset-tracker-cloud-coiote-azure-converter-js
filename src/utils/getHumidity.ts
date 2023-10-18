import { type Humidity_3304, Humidity_3304_urn } from '../schemas/index.js'
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
 * Build the Humidity object from LwM2M using the object 3304 reported by Coiote
 */
export const getHumidity = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): ConversionResult<Humidity_3304> => {
	if (objectWithCoioteFormat === undefined) return warning(Humidity_3304_urn)

	const humidity = removeCoioteFormatFrom(
		objectWithCoioteFormat,
	) as unknown as Humidity_3304 // TODO: return the type in the function

	if (humidity[0] !== undefined && isTimestampUndefinedIn(humidity) === true) {
		humidity[0][5518] = getTimestampFromMetadata(Humidity_3304_urn, metadata)
	}

	return validateLwM2MFormat(Humidity_3304_urn, humidity)
}
