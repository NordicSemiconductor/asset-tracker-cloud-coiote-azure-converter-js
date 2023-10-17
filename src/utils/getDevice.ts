import { Device_3_urn, type Device_3 } from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { validateLwM2MFormat } from './validateLwM2MFormat.js'
import type { ConversionResult, Instance } from 'src/converter.js'
import { removeCoioteFormatFromSingleInstanceObj } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Convert to LwM2M Device object (id 3) from the object 3 reported by Coiote
 */
export const getDevice = (
	objectWithCoioteFormat?: Instance,
): ConversionResult<Device_3> => {
	if (objectWithCoioteFormat === undefined)
		return { error: new UndefinedCoioteObjectWarning(Device_3_urn) }

	const device = removeCoioteFormatFromSingleInstanceObj(
		objectWithCoioteFormat,
	) as Device_3 // TODO: return the type in the function

	return validateLwM2MFormat(Device_3_urn, device)
}
