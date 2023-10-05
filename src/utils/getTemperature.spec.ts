import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getTemperature } from './getTemperature.js'
import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import type { Instance } from 'src/converter.js'
import type { LwM2MFormatError } from './checkLwM2MFormat.js'
import { Temperature_3303_urn } from '@nordicsemiconductor/lwm2m-types'

void describe('getTemperature', () => {
	void it(`should create the LwM2M object 'Temperature' (3303) from the object '3303' reported by Coiote`, () => {
		const temperature_coiote = {
			'0': {
				'5601': {
					value: 27.18,
				},
				'5602': {
					value: 27.71,
				},
				'5700': {
					value: 27.18,
				},
				'5701': {
					value: 'Cel',
				},
			},
		}
		const expected = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
			},
		]

		const temperature = getTemperature(temperature_coiote) as {
			result: unknown
		}
		assert.deepEqual(temperature.result, expected)
	})

	void it(`should return a warning if the object '3303' reported by Coiote is not defined`, () => {
		const temperature_coiote = undefined

		const temperature = getTemperature(temperature_coiote) as {
			warning: UndefinedCoioteObjectWarning
		}
		assert.deepEqual(
			temperature.warning.message,
			`'${Temperature_3303_urn}' object can not be converter because object id '3303' is undefined in input received`,
		)
	})

	void it(`should return an error if the result of the conversion does not meet the LwM2M schema definition`, () => {
		const temperature_coiote = {
			'0': {
				'5601': {
					value: 27.18,
				},

				'5602': {
					value: 27.71,
				},
				/*
				'5700': {
					value: 27.18, // required value is missing
				},
				*/
				'5701': {
					value: 'Cel',
				},
			},
		}

		const temperature = getTemperature(
			temperature_coiote as unknown as Instance,
		) as {
			error: LwM2MFormatError
		}
		assert.equal(temperature.error.message, 'format error')
	})
})
