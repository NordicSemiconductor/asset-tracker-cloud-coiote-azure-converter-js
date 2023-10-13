import { Location_6_urn, type Location_6 } from '../schemas/index.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'
import { convertToLwM2MInstance } from './convertToLwM2MInstance.js'

export type convertToLwM2MLocationResult =
	| { result: Location_6 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Convert to LwM2M Location object (id 6) from the object 6 reported by Coiote
 */
export const convertToLwM2MLocation = (
	objectWithCoioteFormat?: Instance,
): convertToLwM2MLocationResult => {
	if (objectWithCoioteFormat === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Location_6_urn) }

	const schema = getLwM2MSchemaDefinition(Location_6_urn)
	const location = convertToLwM2MInstance(
		objectWithCoioteFormat,
		schema,
	) as Location_6 // TODO: return the type in the function

	const validatedLwM2MLocation = checkLwM2MFormat({
		[Location_6_urn]: location,
	})

	if ('error' in validatedLwM2MLocation)
		return { error: validatedLwM2MLocation.error }

	return { result: location }
}
