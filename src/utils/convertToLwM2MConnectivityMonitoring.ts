import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'
import { convertToLwM2MInstance } from './convertToLwM2MInstance.js'

export type convertToLwM2MConnectivityMonitoringResult =
	| { result: ConnectivityMonitoring_4 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Convert to LwM2M Connectivity Monitoring object (id 4) from the object 4 reported by Coiote
 */
export const convertToLwM2MConnectivityMonitoring = (
	objectWithCoioteFormat?: Instance,
): convertToLwM2MConnectivityMonitoringResult => {
	if (objectWithCoioteFormat === undefined)
		return {
			warning: new UndefinedCoioteObjectWarning(ConnectivityMonitoring_4_urn),
		}

	const schema = getLwM2MSchemaDefinition(ConnectivityMonitoring_4_urn)
	const connectivityMonitoring = convertToLwM2MInstance(
		objectWithCoioteFormat,
		schema,
	) as ConnectivityMonitoring_4 // TODO: return the type in the function

	const validatedLwM2MDevice = checkLwM2MFormat({
		[ConnectivityMonitoring_4_urn]: connectivityMonitoring,
	})

	if ('error' in validatedLwM2MDevice)
		return { error: validatedLwM2MDevice.error }

	return {
		result: connectivityMonitoring,
	}
}
