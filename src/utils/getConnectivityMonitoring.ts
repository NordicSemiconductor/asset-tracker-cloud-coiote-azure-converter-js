import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { removeCoioteFormatFromSingleInstanceObj } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Connectivity Monitoring object (id 4) from the object 4 reported by Coiote
 */
export const getConnectivityMonitoring = (
	objectWithCoioteFormat?: Instance,
): ConversionResult<ConnectivityMonitoring_4> => {
	if (objectWithCoioteFormat === undefined)
		return {
			error: new UndefinedCoioteObjectWarning(ConnectivityMonitoring_4_urn),
		}

	const connectivityMonitoring = removeCoioteFormatFromSingleInstanceObj(
		objectWithCoioteFormat,
	) as ConnectivityMonitoring_4 // TODO: return the type in the function

	return validateLwM2MFormat(
		ConnectivityMonitoring_4_urn,
		connectivityMonitoring,
	)
}
