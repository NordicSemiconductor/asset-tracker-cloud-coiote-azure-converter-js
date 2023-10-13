import assert from 'node:assert'
import { describe, it } from 'node:test'
import type { LwM2MAssetTrackerV2 } from 'src/converter.js'
import {
	Device_3_urn,
	ConnectivityMonitoring_4_urn,
	Location_6_urn,
	Temperature_3303_urn,
	Humidity_3304_urn,
	Pressure_3323_urn,
	Config_50009_urn,
} from '../schemas/index.js'
import { getLwM2MSchemaDefinition } from './getLwM2MSchemaDefinition.js'

void describe('getLwM2MSchemaDefinition', () => {
	;[Temperature_3303_urn, Humidity_3304_urn, Pressure_3323_urn].forEach(
		(urn) =>
			void it(`should check schema definition is describing object ${urn} as multiple instance`, () => {
				const schema = getLwM2MSchemaDefinition(
					urn as keyof LwM2MAssetTrackerV2,
				)

				assert.equal(schema.type, 'array')
			}),
	)
	;[Device_3_urn, ConnectivityMonitoring_4_urn, Location_6_urn].forEach(
		(urn) =>
			void it(`should check schema definition is describing object ${urn} as single instance`, () => {
				const schema = getLwM2MSchemaDefinition(
					urn as keyof LwM2MAssetTrackerV2,
				)

				assert.equal(schema.type, 'object')
			}),
	)
	void it(`config objetc (${Config_50009_urn}) is not part of OMA LwM2M Registry`, () => {
		/**
		 * @see https://github.com/OpenMobileAlliance/lwm2m-registry
		 */
		const schema = getLwM2MSchemaDefinition(
			Config_50009_urn as keyof LwM2MAssetTrackerV2,
		)

		assert.equal(schema, undefined)
	})
})
