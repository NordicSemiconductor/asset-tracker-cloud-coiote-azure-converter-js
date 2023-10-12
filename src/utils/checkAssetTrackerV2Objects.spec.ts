import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
	ConnectivityMonitoring_4_urn,
	Device_3_urn,
	Humidity_3304_urn,
	Location_6_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
	Config_50009_urn,
} from '../schemas/index.js'

import { getMissedAssetTrackerV2Objects } from './checkAssetTrackerV2Objects.js'

void describe('checkAssetTrackerV2Objects', () => {
	void it(`Should return a list with the urn of the defined 'Asset Tracker v2 LwM2M' objects that are not present in input`, () => {
		const input = [
			ConnectivityMonitoring_4_urn,
			Device_3_urn,
			Humidity_3304_urn,
			// Location_6_urn, // Location is missing in input
			// Pressure_3323_urn, // Pressure object is missing in input
			Temperature_3303_urn,
			Config_50009_urn,
		]
		const result = getMissedAssetTrackerV2Objects(input)
		assert.deepEqual(result, [Location_6_urn, Pressure_3323_urn])
	})

	void it(`Should return empty list if the all the defined 'Asset Tracker v2 LwM2M' objects are present in input`, () => {
		const input = [
			ConnectivityMonitoring_4_urn,
			Device_3_urn,
			Humidity_3304_urn,
			Location_6_urn,
			Pressure_3323_urn,
			Temperature_3303_urn,
			Config_50009_urn,
		]
		const result = getMissedAssetTrackerV2Objects(input)
		assert.equal(result.length, 0)
	})
})
