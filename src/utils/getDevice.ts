import { Device_3_urn, type Device_3 } from '@nordicsemiconductor/lwm2m-types'
import { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { checkLwM2MFormat, type LwM2MFormatError } from './checkLwM2MFormat.js'
import type { Instance } from 'src/converter.js'
import { setLwM2MFormat } from './setLwM2MFormat.js'

type getDeviceResult =
	| { result: Device_3 }
	| { warning: UndefinedCoioteObjectWarning }
	| { error: LwM2MFormatError }

/**
 * Build the Device object from LwM2M using the object 3 reported by Coiote
 */
export const getDevice = (device_coiote?: Instance): getDeviceResult => {
	if (device_coiote === undefined)
		return { warning: new UndefinedCoioteObjectWarning(Device_3_urn) }

	const device = setLwM2MFormat({
		[`${Device_3_urn}`]: device_coiote,
	})

	const validatedLwM2MDevice = checkLwM2MFormat(device)

	if ('error' in validatedLwM2MDevice)
		return { error: validatedLwM2MDevice.error }

	return { result: device[Device_3_urn] as unknown as Device_3 }
}
