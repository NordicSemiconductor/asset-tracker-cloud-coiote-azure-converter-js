import {
	Location_6_urn,
	type Location_6,
} from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'

export type convertToLwM2MLocationResult =
	| { result: Location_6 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Convert to LwM2M Location object (id 6) from the object 6 reported by Coiote
 */
export const convertToLwM2MLocation = (
	location_coiote?: Instance,
): convertToLwM2MLocationResult => {
	if (location_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Location_6_urn) }

	const device = setLwM2MFormat({
		[`${Location_6_urn}`]: location_coiote,
	})

	const validatedLwM2MLocation = checkLwM2MFormat(device)

	if ('error' in validatedLwM2MLocation)
		return { error: validatedLwM2MLocation.error }

	return { result: device[Location_6_urn] as unknown as Location_6 }
}
