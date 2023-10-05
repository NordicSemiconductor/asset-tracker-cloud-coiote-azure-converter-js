import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getTemperature } from './getTemperature.js'

void describe('getTemperature', () => {
	void it(`should create the LwM2M object 'Temperature' (3303) from the object '3303' reported by Coiote`, () => {
		const temperature_coiote = {}
		const LwM2MDevice = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			'2': '351358815340515',
			'3': '22.8.1+0',
			'7': [80],
			'11': [0],
			'13': 1675874731,
			'16': 'UQ',
			'19': '3.2.1',
		}
		const expected = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
			},
		]

		assert.deepEqual(getTemperature(temperature_coiote, LwM2MDevice), expected)
	})

	void it(`should return a warning if the object '3303' reported by Coiote is not defined`, () => {
        const temperature_coiote = {}
		const LwM2MDevice = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			'2': '351358815340515',
			'3': '22.8.1+0',
			'7': [80],
			'11': [0],
			'13': 1675874731,
			'16': 'UQ',
			'19': '3.2.1',
		}
		const expected = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
			},
		]

		assert.deepEqual(getTemperature(temperature_coiote, LwM2MDevice), expected)
    })

	void it(`should return an error if the result of the conversion does not meet the LwM2M schema definition`, () => {
        const temperature_coiote = {}
		const LwM2MDevice = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			'2': '351358815340515',
			'3': '22.8.1+0',
			'7': [80],
			'11': [0],
			'13': 1675874731,
			'16': 'UQ',
			'19': '3.2.1',
		}
		const expected = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
			},
		]

		assert.deepEqual(getTemperature(temperature_coiote, LwM2MDevice), expected)
    })

	void it(`should use device timestamp as temperature timestamp`, () => {
        const temperature_coiote = {}
		const LwM2MDevice = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			'2': '351358815340515',
			'3': '22.8.1+0',
			'7': [80],
			'11': [0],
			'13': 1675874731,
			'16': 'UQ',
			'19': '3.2.1',
		}
		const expected = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
			},
		]

		assert.deepEqual(getTemperature(temperature_coiote, LwM2MDevice), expected)
    })
})
