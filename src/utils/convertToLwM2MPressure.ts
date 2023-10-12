import {
	Temperature_3303_urn,
	type Temperature_3303,
    type Pressure_3323,
} from '@nordicsemiconductor/lwm2m-types'
import type { Instance } from 'src/converter.js'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'
import { LwM2MFormatError, checkLwM2MFormat } from './checkLwM2MFormat.js'
import {
	getTimestampFromMetadata,
	type Metadata,
} from './getTimestampFromMetadata.js'
import { isTimestampUndefinedIn } from 'src/setTimestampHierarchy.js'

type convertToLwM2MPressureResult =
	| { result: Pressure_3323 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Pressure object from LwM2M using the object 3323 reported by Coiote
 */
export const convertToLwM2MPressure = (
	metadata: Metadata,
	temperature_coiote?: Instance,
): convertToLwM2MPressureResult => {

	return {
		result: temperature_coiote,
	}
}
