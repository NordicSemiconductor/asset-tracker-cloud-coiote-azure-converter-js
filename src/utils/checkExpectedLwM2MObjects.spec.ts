import {
	ConnectivityMonitoring_4_urn,
	Device_3_urn,
	Humidity_3304_urn,
	Location_6_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { Config_50009_urn } from '../../schemas/Config_50009.js'
import { checkExpectedLwM2MObjects } from './checkExpectedLwM2MObjects.js'

describe('checkExpectedLwM2MObjects', () => {
	it('Should return an error if list has not the expected LwM2M elements', () => {
		const input = [
			ConnectivityMonitoring_4_urn,
			Device_3_urn,
			Humidity_3304_urn,
			// Location_6_urn, Location is missing in input
			//Pressure_3323_urn, // Pressure object is missing in input
			Temperature_3303_urn,
			Config_50009_urn,
		]
		const result = checkExpectedLwM2MObjects(input) as { error: Error }
		expect(result.error).not.toBe(undefined)
	})

	it('Should return result if list has the expected LwM2M elements', () => {
		const input = [
			ConnectivityMonitoring_4_urn,
			Device_3_urn,
			Humidity_3304_urn,
			Location_6_urn,
			Pressure_3323_urn,
			Temperature_3303_urn,
			Config_50009_urn,
		]
		const result = checkExpectedLwM2MObjects(input) as { result: true }
		expect(result.result).toBe(true)
	})
})
