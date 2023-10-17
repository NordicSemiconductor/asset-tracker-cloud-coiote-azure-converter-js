import { type Humidity_3304, Humidity_3304_urn } from '../schemas/index.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'
import { convertToLwM2MArrayInstance } from './convertToLwM2MArrayInstance.js'

/**
 * Build the Humidity object from LwM2M using the object 3304 reported by Coiote
 */
export const getHumidity = (
	metadata: Metadata,
	objectWithCoioteFormat?: Instance,
): ConversionResult<Humidity_3304> => {
	if (objectWithCoioteFormat === undefined)
		return { error: new UndefinedCoioteObjectWarning(Humidity_3304_urn) }

	const schema = getLwM2MSchemaDefinition(Humidity_3304_urn)
	const humidity = convertToLwM2MArrayInstance(
		objectWithCoioteFormat,
		schema,
	) as unknown as Humidity_3304 // TODO: return the type in the function

	if (humidity[0] !== undefined && isTimestampUndefinedIn(humidity) === true) {
		humidity[0][5518] = getTimestampFromMetadata(Humidity_3304_urn, metadata)
	}

	return validateLwM2MFormat(Humidity_3304_urn, humidity)
}
