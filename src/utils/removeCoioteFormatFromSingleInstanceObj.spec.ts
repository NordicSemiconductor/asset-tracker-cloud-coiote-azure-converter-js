import { describe, it } from 'node:test'
import assert from 'node:assert'
import { removeCoioteFormatFromSingleInstanceObj } from './removeCoioteFormatFromSingleInstanceObj.js'

void describe('removeCoioteFormatFromSingleInstanceObj', () => {
	void it('should remove coiote format from single instance object', () => {
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
})
