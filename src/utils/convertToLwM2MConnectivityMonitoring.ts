import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'

export type convertToLwM2MConnectivityMonitoringResult =
	| { result: ConnectivityMonitoring_4 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Convert to LwM2M Connectivity Monitoring object (id 4) from the object 4 reported by Coiote
 */
export const convertToLwM2MConnectivityMonitoring = (
	connectivityMonitoring_coiote?: Instance,
): convertToLwM2MConnectivityMonitoringResult => {
	if (connectivityMonitoring_coiote === undefined)
		return {
			warning: new UndefinedCoioteObjectWarning(ConnectivityMonitoring_4_urn),
		}

	const connectivityMonitoring = setLwM2MFormat({
		[`${ConnectivityMonitoring_4_urn}`]: connectivityMonitoring_coiote,
	})

	const validatedLwM2MDevice = checkLwM2MFormat(connectivityMonitoring)

	if ('error' in validatedLwM2MDevice)
		return { error: validatedLwM2MDevice.error }

	return {
		result: connectivityMonitoring[
			ConnectivityMonitoring_4_urn
		] as unknown as ConnectivityMonitoring_4,
	}
}
