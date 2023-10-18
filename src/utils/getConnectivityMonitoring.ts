import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { warning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import type {
	ConversionResult,
	Instance as CoioteFormat,
} from 'src/converter.js'
import { removeCoioteFormatFromSingleInstanceObj as removeCoioteFormatFrom } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Connectivity Monitoring object (id 4) from the object 4 reported by Coiote
 */
export const getConnectivityMonitoring = (
	object?: CoioteFormat,
): ConversionResult<ConnectivityMonitoring_4> => {
	if (object === undefined) return warning(ConnectivityMonitoring_4_urn)

	const connectivityMonitoring = removeCoioteFormatFrom(object)

	return validateLwM2MFormat(
		ConnectivityMonitoring_4_urn,
		connectivityMonitoring as ConnectivityMonitoring_4,
	)
}
