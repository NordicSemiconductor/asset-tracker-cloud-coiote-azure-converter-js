import {
	type ConnectivityMonitoring_4,
	ConnectivityMonitoring_4_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { warning } from '../utils/UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from '../utils/validateLwM2MFormat.js'
import type { ConversionResult } from '../utils/ConversionResult.js'
import type { Instance as CoioteFormat } from '../utils/LwM2MCoioteType.js'
import { removeCoioteFormatFromSingleInstanceObj as removeCoioteFormatFrom } from '../utils/removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Connectivity Monitoring object (id 4) from the object 4 reported by Coiote
 */
export const getConnectivityMonitoring = (
	object?: CoioteFormat,
): ConversionResult<ConnectivityMonitoring_4> => {
	if (object === undefined) return warning(ConnectivityMonitoring_4_urn)

	const maybeConnectivityMonitoring = removeCoioteFormatFrom(object)

	return validateLwM2MFormat(
		ConnectivityMonitoring_4_urn,
		maybeConnectivityMonitoring as ConnectivityMonitoring_4,
	)
}