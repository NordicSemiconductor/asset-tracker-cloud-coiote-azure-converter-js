import { Device_3_urn, type Device_3 } from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { convertToLwM2MInstance } from './convertToLwM2MInstance.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'

export type convertToLwM2MDeviceResult =
	| { result: Device_3 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Convert to LwM2M Device object (id 3) from the object 3 reported by Coiote
 */
export const convertToLwM2MDevice = (
	objectWithCoioteFormat?: Instance,
): convertToLwM2MDeviceResult => {
	if (objectWithCoioteFormat === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Device_3_urn) }

	const schema = getLwM2MSchemaDefinition(Device_3_urn)
	const device = convertToLwM2MInstance(
		objectWithCoioteFormat,
		schema,
	) as Device_3 // TODO: return the type in the function

	const validatedLwM2MDevice = checkLwM2MFormat({ [Device_3_urn]: device })

	if ('error' in validatedLwM2MDevice)
		return { error: validatedLwM2MDevice.error }

	return { result: device }
}
