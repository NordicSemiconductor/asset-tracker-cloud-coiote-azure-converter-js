import {
	Temperature_3303_urn,
	type Temperature_3303,
} from '../schemas/index.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { warning } from './UndefinedCoioteObjectWarning.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'
import { removeCoioteFormatFromArrayInstance as removeCoioteFormatFrom } from './removeCoioteFormatFromArrayInstance.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'

/**
 * Build the Temperature object from LwM2M using the object 3303 reported by Coiote
 */
export const getTemperature = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): ConversionResult<Temperature_3303> => {
	if (objectWithCoioteFormat === undefined) return warning(Temperature_3303_urn)

	const temperature = removeCoioteFormatFrom(
		objectWithCoioteFormat,
	) as unknown as Temperature_3303 // TODO: return the type in the function

	if (
		temperature[0] !== undefined &&
		isTimestampUndefinedIn(temperature) === true
	)
		temperature[0][5518] = getTimestampFromMetadata(
			Temperature_3303_urn,
			metadata,
		)

	return validateLwM2MFormat(Temperature_3303_urn, temperature)
}
