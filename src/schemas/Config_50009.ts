import { Type } from '@sinclair/typebox'

/**
 * Asset Tracker Configuration
 *
 * Asset Tracker v2 configuration object
 *
 * @see https://github.com/nrfconnect/sdk-nrf/blob/v2.4.0/applications/asset_tracker_v2/src/cloud/lwm2m_integration/config_object_descript.xml
 *
 * ID: 50009
 * LWM2MVersion:
 * ObjectVersion:
 * MultipleInstances: false
 * Mandatory: false
 */
export type Config_50009 = Readonly<{
	'0': boolean
	'1': number
	'2': number
	'3': number
	'4': number
	'5': number
	'6': boolean
	'7': boolean
	'8': number
	'9': number
}>

export const Config_50009_urn = '50009'

/**
 * Typebox representation of object 50009
 *
 * @see https://github.com/nrfconnect/sdk-nrf/blob/v2.4.0/applications/asset_tracker_v2/src/cloud/lwm2m_integration/config_object_descript.xml
 */
export const Config_50009_Typebox = Type.Object(
	{
		'0': Type.Boolean({
			title: 'Passive mode',
			description: 'Sample and publish data upon movement.',
			examples: [false],
		}),
		'1': Type.Integer({
			title: 'Location timeout',
			description: 'Timeout for location request during data sampling.',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		}),
		'2': Type.Integer({
			title: 'Active wait time',
			description:
				'Number of seconds between each sampling/publication in active mode.',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		}),
		'3': Type.Integer({
			title: 'Movement resolution',
			description:
				'Number of seconds between each sampling/publication in passive mode, given that the device is moving.',
			minimum: 1,
			maximum: 2147483647,
			examples: [300],
		}),
		'4': Type.Integer({
			title: 'Movement timeout',
			description:
				'Number of seconds between each sampling/publication in passive mode, whether the device is moving or not.',
			minimum: 1,
			maximum: 2147483647,
			examples: [3600],
		}),
		'5': Type.Number({
			title: 'Accelerometer activity threshold',
			description:
				'Accelerometer activity threshold in m/s². Minimum absolute value in m/s² for accelerometer readings to be considered valid movement.',
			minimum: 0,
			maximum: 78.4532,
			examples: [10.5],
		}),
		'6': Type.Boolean({
			title: 'GNSS enable',
			description: 'Enable GNSS sampling',
			examples: [false],
		}),
		'7': Type.Boolean({
			title: 'Neighbor cell measurements enable',
			description: 'Enable neighbor cell measurements.',
			examples: [false],
		}),
		'8': Type.Number({
			title: 'Accelerometer inactivity threshold',
			description:
				'Accelerometer inactivity threshold in m/s². Maximum absolute value in m/s² for accelerometer readings to be considered stillness.',
			minimum: 0,
			maximum: 78.4532,
			examples: [5.2],
		}),
		'9': Type.Number({
			title: 'Accelerometer inactivity timeout',
			description:
				'Accelerometer inactivity timeout in seconds. Minimum time without movement for being considered inactivity.',
			minimum: 0.08,
			maximum: 5242.88,
			examples: [1.7],
		}),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: 'Configuration',
		description: 'Asset Tracker v2 configuration object.',
	},
)
