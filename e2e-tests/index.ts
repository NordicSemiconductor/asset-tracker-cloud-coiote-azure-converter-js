import { input as deviceTwin } from './deviceTwin.js'
import { converter } from '../src/converter.js'
import { assertThat, is, not, defined } from 'hamjest'
import {
	Device_3_urn,
	Location_6_urn,
	Temperature_3303_urn,
} from '@nordicsemiconductor/lwm2m-types'
import { validate } from '@nordicsemiconductor/lwm2m-types'
import type { Metadata } from 'src/utils/getTimestampFromMetadata.js'

const coioteFormat = deviceTwin.properties.reported.lwm2m
const metadata: Metadata = {
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
}
const output = await converter(deviceTwin, metadata)

/**
 * check if Location object is in the device twin
 */
assertThat(coioteFormat['6'], is(defined()))

/**
 * Having known that the Location object was in the input, it is expected to be in the output
 */
assertThat(output[Location_6_urn], is(defined()))

/**
 * The Location object in the output must follow the LwM2M-types lib definition
 */
const maybeValidLocation = validate({ Location_6_urn: output[Location_6_urn] })
assertThat('errors' in maybeValidLocation, is(false))

/**
 * check if Device object is in the device twin
 */
assertThat(coioteFormat['3'], is(defined()))

/**
 * Having known that the Device object was in the input, it is expected to be in the output
 */
assertThat(output[Device_3_urn], is(defined()))

/**
 * The Location object in the output must follow the LwM2M-types lib definition
 */
const maybeValidDevice = validate({ Device_3_urn: output[Device_3_urn] })
assertThat('errors' in maybeValidDevice, is(false))

/**
 * Temperature object was not in the input
 */
assertThat(coioteFormat['3303'], is(not(defined())))

/**
 * Because it was not present in the input, it is expected to not be present in the output
 */
assertThat(output[Temperature_3303_urn], is(not(defined())))
