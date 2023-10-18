import { describe, it } from 'node:test'
import assert from 'node:assert'
import { removeCoioteFormatFromArrayInstance } from './removeCoioteFormatFromArrayInstance.js'

void describe('removeCoioteFormatFromArrayInstance', () => {
	void it(`should convert list using array type definition schema`, () => {
		const object = {
			'0': {
				'0': {
					value: 1,
				},
				'1': {
					value: 50,
				},
				'7': {
					value: 'U',
				},
				'23': {
					value: false,
				},
			},
			'1': {
				'0': {
					value: 1,
				},
				'1': {
					value: 50,
				},
				'7': {
					value: 'U',
				},
				'23': {
					value: false,
				},
			},
		}
		const result = [
			{
				'0': 1,
				'1': 50,
				'7': 'U',
				'23': 0,
			},
			{
				'0': 1,
				'1': 50,
				'7': 'U',
				'23': 0,
			},
		]
		assert.deepEqual(removeCoioteFormatFromArrayInstance(object), result)
	})

	void it(`should remove empty values when they are not required in schema definition`, () => {
		const object = {
			'0': {
				'0': {
					value: 1,
				},
				'1': {},
			},
		}
		const result = [
			{
				'0': 1,
				'1': undefined,
			},
		]

		assert.deepEqual(removeCoioteFormatFromArrayInstance(object), result)
	})

	void it(`should return undefined when a required value is not defined`, () => {
		const object = {
			'0': {
				'0': {
					value: 1,
				},
				'1': {},
			},
			'1': {
				'0': {
					value: 1,
				},
				'1': {
					value: 50,
				},
			},
		}
		const result = [
			{
				'0': 1,
				'1': undefined,
			},
			{
				'0': 1,
				'1': 50,
			},
		]

		assert.deepEqual(removeCoioteFormatFromArrayInstance(object), result)
	})
})
