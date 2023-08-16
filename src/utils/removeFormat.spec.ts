import { removeFormat } from './removeFormat.js'

describe('removeFormat', () => {
	it.each([
		[
			{
				'0': {
					'0': {
						value: 5,
					},
					'1': {
						value: 128,
					},
					'6': {},
					'7': {
						value: '403',
					},
					'8': {},
					'9': {},
					'10': {},
					'11': {},
				},
			},
			{
				'0': 5,
				'1': 128,
				'7': '403',
			},
		],
		[
			{
				'0': {
					'0': {
						value: true,
					},
					'2': {
						value: 120,
					},
					'3': {
						value: 600,
					},
					'4': {
						value: 7200,
					},
					'1': {
						value: 120,
					},
					'5': {
						value: 8.5,
					},
					'8': {
						value: 2.5,
					},
					'9': {
						value: 0.5,
					},
				},
			},
			{
				'0': true,
				'2': 120,
				'3': 600,
				'4': 7200,
				'1': 120,
				'5': 8.5,
				'8': 2.5,
				'9': 0.5,
			},
		],
	])(
		'should remove Coiote format from single instance objects',
		(input, output) => {
			expect(removeFormat(input)).toMatchObject(output)
		},
	)

	it.each([
		[
			{
				'0': {
					'0': {
						value: 5,
					},
					'1': {
						value: 128,
					},
					'6': {},
					'7': {
						value: '403',
					},
					'8': {},
					'9': {},
					'10': {},
					'11': {},
				},
				'1': {
					'0': {
						value: 10,
					},
					'1': {
						value: 0,
					},
					'6': {},
					'7': {
						value: '403',
					},
				},
			},
			[
				{
					'0': 5,
					'1': 128,
					'7': '403',
				},
				{
					'0': 10,
					'1': 0,
					'7': '403',
				},
			],
		],
		[
			{
				'0': {
					'0': {
						value: true,
					},
					'2': {
						value: 120,
					},
					'3': {
						value: 600,
					},
				},
				'1': {
					'0': {
						value: true,
					},
					'2': {
						value: 120,
					},
					'3': {
						value: 600,
					},
				},
			},
			[
				{
					'0': true,
					'2': 120,
					'3': 600,
				},
				{
					'0': true,
					'2': 120,
					'3': 600,
				},
			],
		],
	])(
		'should remove Coiote format from multiple instance object',
		(input, output) => {
			expect(removeFormat(input)).toMatchObject(output)
		},
	)
})
