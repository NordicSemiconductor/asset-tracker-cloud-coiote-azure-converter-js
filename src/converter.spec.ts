import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import {
	ConnectivityMonitoring_4_urn,
	Device_3_urn,
	Humidity_3304_urn,
	Location_6_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
	Config_50009_urn,
} from './schemas/index.js'
import { converter, type DeviceTwin } from './converter.js'

void describe('converter', () => {
	void it(`should convert 'Coiote Asset Tracker v2' format into 'LwM2M Asset Tracker v2' format`, async () => {
		const coioteAzureLwM2M: DeviceTwin = {
			properties: {
				desired: {
					$metadata: {
						$lastUpdated: '2023-02-08T14:59:36.5459563Z',
					},
					$version: 1,
				},
				reported: {
					lwm2m: {
						'1': {
							'0': {
								'0': {
									value: 1,
								},
								'1': {
									value: 50,
								},
								'6': {
									value: false,
								},
								'7': {
									value: 'U',
								},
								'16': {
									value: true,
								},
								'23': {
									value: false,
								},
							},
						},
						'3': {
							'0': {
								'0': {
									value: 'Nordic Semiconductor ASA',
								},
								'1': {
									value: 'Thingy:91',
								},
								'2': {
									value: '351358815340515',
								},
								'3': {
									value: '22.8.1+0',
								},
								'7': {
									'0': {
										value: 80,
									},
									attributes: {
										dim: '1',
									},
								},
								'11': {
									'0': {
										value: 0,
									},
									attributes: {
										dim: '1',
									},
								},
								'13': {
									value: 1675874731,
								},
								'16': {
									value: 'UQ',
								},
								'19': {
									value: '3.2.1',
								},
							},
						},
						'4': {
							'0': {
								'0': {
									value: 6,
								},
								'1': {
									'0': {
										value: 6,
									},
									'1': {
										value: 7,
									},
									attributes: {
										dim: '2',
									},
								},
								'2': {
									value: -85,
								},
								'3': {
									value: 23,
								},
								'4': {
									'0': {
										value: '10.160.120.155',
									},
									attributes: {
										dim: '1',
									},
								},
								'8': {
									value: 34237196,
								},
								'9': {
									value: 2,
								},
								'10': {
									value: 242,
								},
								'12': {
									value: 12,
								},
							},
							attributes: {},
						},
						'6': {
							'0': {
								'0': { value: -43.5723 },
								'1': { value: 153.2176 },
								'2': { value: 2 },
								'3': { value: 24.798573 },
								'5': { value: 1665149633 },
								'6': { value: 5 },
							},
						},
						'3303': {
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
						},
						'3304': {
							'0': {
								'5601': {
									value: 23.535,
								},
								'5602': {
									value: 24.161,
								},
								'5700': {
									value: 24.057,
								},
								'5701': {
									value: '%RH',
								},
							},
						},
						'3323': {
							'0': {
								'5601': {
									value: 101697,
								},
								'5602': {
									value: 101705,
								},
								'5700': {
									value: 10,
								},
								'5701': {
									value: 'Pa',
								},
							},
						},
						'3347': {
							'0': {
								'5500': {
									value: false,
								},
								'5501': {
									value: 0,
								},
								'5750': {
									value: 'Button 0',
								},
							},
						},
						'3420': {
							'0': {
								'1': {
									value: '#000000',
								},
							},
						},
						'10256': {
							'0': {
								'0': {
									value: 428,
								},
								'2': {
									value: 6300,
								},
								'3': {
									value: 52,
								},
								'4': {
									value: 14,
								},
								'5': {
									value: 0,
								},
							},
						},
						'50001': {
							'0': {
								'0': {
									value: 5,
								},
								'1': {
									value: 128,
								},
								'6': {},
								'7': {
									value: 403,
								},
								'8': {},
								'9': {},
								'10': {},
								'11': {},
							},
						},
						[Config_50009_urn]: {
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
									value: 60,
								},
								'5': {
									value: 8.5,
								},
								'6': {
									value: true,
								},
								'7': {
									value: true,
								},
								'8': {
									value: 2.5,
								},
								'9': {
									value: 0.5,
								},
							},
						},
					},
					$metadata: {
						$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						lwm2m: {
							'3303': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									$lastUpdated: '2023-08-18T14:39:11.9414162Z',
								},
								$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							},
							'3304': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									$lastUpdated: '2023-08-13T18:52:20.8691663Z',
								},
								$lastUpdated: '2023-08-13T18:52:20.8691663Z',
							},
							'3323': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									$lastUpdated: '2023-08-13T18:52:20.8691663Z',
								},
								$lastUpdated: '2023-08-13T18:52:20.8691663Z',
							},
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						},
					},
					$version: 31,
				},
			},
		}

		const expected = {
			[Device_3_urn]: {
				'0': 'Nordic Semiconductor ASA',
				'1': 'Thingy:91',
				'2': '351358815340515',
				'3': '22.8.1+0',
				'7': [80],
				'11': [0],
				'13': 1675874731,
				'16': 'UQ',
				'19': '3.2.1',
			},
			[ConnectivityMonitoring_4_urn]: {
				'0': 6,
				'1': [6, 7],
				'2': -85,
				'3': 23,
				'4': ['10.160.120.155'],
				'8': 34237196,
				'9': 2,
				'10': 242,
				'12': 12,
			},

			[Location_6_urn]: {
				'0': -43.5723,
				'1': 153.2176,
				'2': 2,
				'3': 24.798573,
				'5': 1665149633,
				'6': 5,
			},

			[Temperature_3303_urn]: [
				{
					'5601': 27.18,
					'5602': 27.71,
					'5700': 27.18,
					'5701': 'Cel',
					'5518': 1692369551,
				},
			],

			[Humidity_3304_urn]: [
				{
					'5601': 23.535,
					'5602': 24.161,
					'5700': 24.057,
					'5701': '%RH',
					'5518': 1691952740,
				},
			],

			[Pressure_3323_urn]: [
				{
					'5601': 101697,
					'5602': 101705,
					'5700': 10,
					'5701': 'Pa',
					'5518': 1691952740,
				},
			],

			[Config_50009_urn]: {
				'0': true,
				'2': 120,
				'3': 600,
				'4': 7200,
				'1': 60,
				'5': 8.5,
				'6': true,
				'7': true,
				'8': 2.5,
				'9': 0.5,
			},
		}

		const result = await converter(coioteAzureLwM2M)

		assert.deepEqual(result[Device_3_urn], expected[Device_3_urn])
		assert.deepEqual(
			result[ConnectivityMonitoring_4_urn],
			expected[ConnectivityMonitoring_4_urn],
		)
		assert.deepEqual(result[Location_6_urn], expected[Location_6_urn])
		assert.deepEqual(
			result[Temperature_3303_urn],
			expected[Temperature_3303_urn],
		)
		assert.deepEqual(result[Humidity_3304_urn], expected[Humidity_3304_urn])
		assert.deepEqual(result[Pressure_3323_urn], expected[Pressure_3323_urn])
		assert.deepEqual(result[Config_50009_urn], expected[Config_50009_urn])
	})

	void it(`should convert to 'LwM2M Asset Tracker v2' format when 'Coiote Asset Tracker v2' has some values as undefined`, async () => {
		const coioteAzureLwM2M: DeviceTwin = {
			properties: {
				desired: {
					$metadata: {
						$lastUpdated: '2023-02-08T14:59:36.5459563Z',
					},
					$version: 1,
				},
				reported: {
					lwm2m: {
						'1': {
							'0': {
								'0': {
									value: 1,
								},
								'1': {
									value: 50,
								},
								'6': {
									value: false,
								},
								'7': {
									value: 'U',
								},
								'16': {
									value: true,
								},
								'23': {
									value: false,
								},
							},
						},
						'3': {
							'0': {
								'0': {
									value: 'Nordic Semiconductor ASA',
								},
								'1': {
									value: 'Thingy:91',
								},
								'2': {
									value: '351358815340515',
								},
								'3': {
									value: '22.8.1+0',
								},
								'7': {
									'0': {
										value: 80,
									},
									attributes: {
										dim: '1',
									},
								},
								'11': {
									'0': {
										value: 0,
									},
									attributes: {
										dim: '1',
									},
								},
								'13': {
									value: 1675874731,
								},
								'16': {
									value: 'UQ',
								},
								'19': {
									value: '3.2.1',
								},
							},
						},
					},
					$metadata: {
						$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						lwm2m: {
							'3303': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									$lastUpdated: '2023-08-18T14:39:11.9414162Z',
								},
								$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							},
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						},
					},
					$version: 31,
				},
			},
		}

		const expected = {
			[Device_3_urn]: {
				'0': 'Nordic Semiconductor ASA',
				'1': 'Thingy:91',
				'2': '351358815340515',
				'3': '22.8.1+0',
				'7': [80],
				'11': [0],
				'13': 1675874731,
				'16': 'UQ',
				'19': '3.2.1',
			},
		}

		const result = await converter(coioteAzureLwM2M)
		assert.deepEqual(result, expected)
	})

	void it(`should trigger a warning if an 'Asset Tracker v2 LwM2M' object can not be created because equivalent Coiote object is undefined`, async (context) => {
		const coioteAzureLwM2M: DeviceTwin = {
			properties: {
				desired: {
					$metadata: {
						$lastUpdated: '2023-02-08T14:59:36.5459563Z',
					},
					$version: 1,
				},
				reported: {
					lwm2m: {
						'1': {
							'0': {
								'0': {
									value: 1,
								},
								'1': {
									value: 50,
								},
								'6': {
									value: false,
								},
								'7': {
									value: 'U',
								},
								'16': {
									value: true,
								},
								'23': {
									value: false,
								},
							},
						},
						'3': {
							'0': {
								'0': {
									value: 'Nordic Semiconductor ASA',
								},
								'1': {
									value: 'Thingy:91',
								},
								'2': {
									value: '351358815340515',
								},
								'3': {
									value: '22.8.1+0',
								},
								'7': {
									'0': {
										value: 80,
									},
									attributes: {
										dim: '1',
									},
								},
								'11': {
									'0': {
										value: 0,
									},
									attributes: {
										dim: '1',
									},
								},
								'13': {
									value: 1675874731,
								},
								'16': {
									value: 'UQ',
								},
								'19': {
									value: '3.2.1',
								},
							},
						},
					},
					$metadata: {
						$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						lwm2m: {
							'3303': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									$lastUpdated: '2023-08-18T14:39:11.9414162Z',
								},
								$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							},
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						},
					},
					$version: 31,
				},
			},
		}

		const onError = context.mock.fn()
		await converter(coioteAzureLwM2M, onError)
		/**
		 * Only the device object will be generated and Asset Tracker v2 has 7 objects in total,
		 * for that reason is expected 6 warning call backs
		 */
		assert.strictEqual(onError.mock.callCount(), 6)
	})

	void it(`should trigger an error if an 'Asset Tracker v2 LwM2M' object can not be created because conversion went wrong`, async (context) => {
		const coioteAzureLwM2M: DeviceTwin = {
			properties: {
				desired: {
					$metadata: {
						$lastUpdated: '2023-02-08T14:59:36.5459563Z',
					},
					$version: 1,
				},
				reported: {
					lwm2m: {
						'1': {
							'0': {
								'0': {
									value: 1,
								},
								'1': {
									value: 50,
								},
								'6': {
									value: false,
								},
								'7': {
									value: 'U',
								},
								'16': {
									value: true,
								},
								'23': {
									value: false,
								},
							},
						},
						'3': {
							'0': {
								'0': {
									value: 'Nordic Semiconductor ASA',
								},
								'1': {
									value: 'Thingy:91',
								},
								'2': {
									value: '351358815340515',
								},
								'3': {
									value: '22.8.1+0',
								},
								'7': {
									'0': {
										value: 80,
									},
									attributes: {
										dim: '1',
									},
								},
								'11': {
									'0': {
										value: 0,
									},
									attributes: {
										dim: '1',
									},
								},
								/**
								 * This is an error. Resource 13 should be number, not an array
								 */
								'13': {
									'0': {
										value: 0,
									},
									attributes: {
										dim: '1',
									},
								},
								'16': {
									value: 'UQ',
								},
								'19': {
									value: '3.2.1',
								},
							},
						},
						'4': {
							'0': {
								'0': {
									value: 6,
								},
								'1': {
									'0': {
										value: 6,
									},
									'1': {
										value: 7,
									},
									attributes: {
										dim: '2',
									},
								},
								'2': {
									value: -85,
								},
								'3': {
									value: 23,
								},
								'4': {
									'0': {
										value: '10.160.120.155',
									},
									attributes: {
										dim: '1',
									},
								},
								'8': {
									value: 34237196,
								},
								'9': {
									value: 2,
								},
								'10': {
									value: 242,
								},
								'12': {
									value: 12,
								},
							},
							attributes: {},
						},
						'6': {
							'0': {
								'0': { value: -43.5723 },
								'1': { value: 153.2176 },
								'2': { value: 2 },
								'3': { value: 24.798573 },
								'5': { value: 1665149633 },
								'6': { value: 5 },
							},
						},
						'3303': {
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
						},
						'3304': {
							'0': {
								'5601': {
									value: 23.535,
								},
								'5602': {
									value: 24.161,
								},
								'5700': {
									value: 24.057,
								},
								'5701': {
									value: '%RH',
								},
							},
						},
						'3323': {
							'0': {
								'5601': {
									value: 101697,
								},
								'5602': {
									value: 101705,
								},
								'5700': {
									value: 10,
								},
								'5701': {
									value: 'Pa',
								},
							},
						},
						'3347': {
							'0': {
								'5500': {
									value: false,
								},
								'5501': {
									value: 0,
								},
								'5750': {
									value: 'Button 0',
								},
							},
						},
						'3420': {
							'0': {
								'1': {
									value: '#000000',
								},
							},
						},
						'10256': {
							'0': {
								'0': {
									value: 428,
								},
								'2': {
									value: 6300,
								},
								'3': {
									value: 52,
								},
								'4': {
									value: 14,
								},
								'5': {
									value: 0,
								},
							},
						},
						'50001': {
							'0': {
								'0': {
									value: 5,
								},
								'1': {
									value: 128,
								},
								'6': {},
								'7': {
									value: 403,
								},
								'8': {},
								'9': {},
								'10': {},
								'11': {},
							},
						},
						[Config_50009_urn]: {
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
									value: 60,
								},
								'5': {
									value: 8.5,
								},
								'6': {
									value: true,
								},
								'7': {
									value: true,
								},
								'8': {
									value: 2.5,
								},
								'9': {
									value: 0.5,
								},
							},
						},
					},
					$metadata: {
						$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						lwm2m: {
							'3303': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										value: {
											$lastUpdated: '2023-08-18T14:39:11.9414162Z',
										},
									},
									$lastUpdated: '2023-08-18T14:39:11.9414162Z',
								},
								$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							},
							'3304': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									$lastUpdated: '2023-08-13T18:52:20.8691663Z',
								},
								$lastUpdated: '2023-08-13T18:52:20.8691663Z',
							},
							'3323': {
								'0': {
									'5700': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									'5701': {
										$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										value: {
											$lastUpdated: '2023-08-13T18:52:20.8691663Z',
										},
									},
									$lastUpdated: '2023-08-13T18:52:20.8691663Z',
								},
								$lastUpdated: '2023-08-13T18:52:20.8691663Z',
							},
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
						},
					},
					$version: 31,
				},
			},
		}

		const onError = context.mock.fn()
		await converter(coioteAzureLwM2M, onError)
		/**
		 * There is an error in definition of object 3 in Coiote, that is why it is expected 1 error
		 */
		assert.strictEqual(onError.mock.callCount(), 1)
	})
})
