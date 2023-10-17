import { describe, it } from 'node:test'
import assert from 'node:assert'
import { removeCoioteFormatFromSingleInstanceObj } from './removeCoioteFormatFromSingleInstanceObj.js'

void describe('removeCoioteFormatFromSingleInstanceObj', () => {
	void it('should remove coiote format from object using schema definition', () => {
		const object = {
			'0': {
				'0': {
					value: 'Nordic Semiconductor ASA',
				},
				'1': {
					value: 'Thingy:91',
				},
				'11': {
					'0': {
						value: 0,
					},
					'1': {
						value: 0,
					},
					attributes: {
						dim: '2',
					},
				},
				'16': {
					value: 'UQ',
				},
			},
		}
		const result = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			'11': [0, 0],
			'16': 'UQ',
		}

		assert.deepEqual(removeCoioteFormatFromSingleInstanceObj(object), result)
	})

	void it('should remove coiote format from object even when input does not follow required values in the schema definition', () => {
		const object = {
			'0': {
				'0': {
					value: 'Nordic Semiconductor ASA',
				},
				'1': {
					value: 'Thingy:91',
				},
				/*
				// this reource is required in order with the schema definition
				'11': {
					'0': {
						value: 0,
					},
					attributes: {
						dim: '1',
					},
				},
				*/

				'16': {
					value: 'UQ',
				},
			},
		}
		const result = {
			'0': 'Nordic Semiconductor ASA',
			'1': 'Thingy:91',
			// '11': [0],
			'16': 'UQ',
		}

		assert.deepEqual(removeCoioteFormatFromSingleInstanceObj(object), result)
	})

	void it('should remove coiote format even when result does not follow the schema definition', () => {
		const object = {
			'0': {
				'0': {
					value: 'Nordic Semiconductor ASA',
				},
				'1': {
					value: 123, // this should be an string in order with schema definition
				},
				'11': {
					value: 'Thingy:91', // this value should be a list in order with schema definition
				},
				'16': {
					value: 'UQ',
				},
			},
		}
		const expected = {
			'0': 'Nordic Semiconductor ASA',
			'1': 123,
			'11': 'Thingy:91',
			'16': 'UQ',
		}

		const result = removeCoioteFormatFromSingleInstanceObj(object)
		assert.deepEqual(result, expected)
	})
})
