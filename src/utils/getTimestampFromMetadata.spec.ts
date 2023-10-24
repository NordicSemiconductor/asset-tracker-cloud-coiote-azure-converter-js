import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import {
	getTimestampFromMetadata,
	parseTime,
	type Metadata,
	type Instance,
	type Obj,
	type LwM2M_Metadata,
} from './getTimestampFromMetadata.js'
import { Temperature_3303_urn } from '../schemas/index.js'

void describe('getTimestampFromMetadata', () => {
	void it(`should get timestamp from the resource '5700' reported in device twin`, () => {
		/**
		 * This is the second level of Timestamp hierarchy.
		 * This applies when the resource 5518 is not defined in the object being evaluated
		 * @see {@link ../../adr/004-timestamp-hierarchy.md}
		 */
		const timeToReport = '2023-10-18T14:39:11.9414162Z'
		const timeToReportParsed = parseTime(timeToReport)
		const metadata: Metadata = {
			$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			lwm2m: {
				'3303': {
					'0': {
						// ...
						// others resources' metadata value
						// ..
						'5700': {
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							value: {
								$lastUpdated: timeToReport,
							},
						},
						$lastUpdated: '2023-08-18T14:39:11.9414162Z',
					},
					$lastUpdated: '2023-08-18T14:39:11.9414162Z',
				},
				$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			},
		}

		assert.equal(
			getTimestampFromMetadata(Temperature_3303_urn, metadata),
			timeToReportParsed,
		)
	})

	void it(`should get timestamp from the instance value reported in device twin`, () => {
		/**
		 * This is the third level of Timestamp hierarchy.
		 * This applies when the reported value for resource 5570 is not defined in device twin.
		 * @see {@link ../../adr/004-timestamp-hierarchy.md}
		 */
		const timeToReport = '2023-10-18T14:39:11.9414162Z'
		const timeToReportParsed = parseTime(timeToReport)
		const metadata: Metadata = {
			$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			lwm2m: {
				'3303': {
					'0': {
						'5601': {
							$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							value: {
								$lastUpdated: '2023-08-18T14:39:11.9414162Z',
							},
						},
						$lastUpdated: timeToReport,
					},
					$lastUpdated: '2023-08-18T14:39:11.9414162Z',
				},
				$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			},
		}
		assert.equal(
			getTimestampFromMetadata(Temperature_3303_urn, metadata),
			timeToReportParsed,
		)
	})

	void it(`should get timestamp from the object value reported in device twin`, () => {
		/**
		 * This is the fourth level of Timestamp hierarchy.
		 * This applies when the reported value for instance is not defined in device twin.
		 * @see {@link ../../adr/004-timestamp-hierarchy.md}
		 */
		const timeToReport = '2023-10-18T14:39:11.9414162Z'
		const timeToReportParsed = parseTime(timeToReport)
		const metadata: Metadata = {
			$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			lwm2m: {
				'3303': {
					'0': {} as Instance,
					$lastUpdated: timeToReport,
				},
				$lastUpdated: '2023-08-18T14:39:11.9414162Z',
			},
		}
		assert.equal(
			getTimestampFromMetadata(Temperature_3303_urn, metadata),
			timeToReportParsed,
		)
	})

	void it(`should get timestamp from the LwM2M value reported in device twin`, () => {
		/**
		 * This is the fifth level of Timestamp hierarchy.
		 * This applies when the reported value for object is not defined in device twin.
		 * @see {@link ../../adr/004-timestamp-hierarchy.md}
		 */
		const timeToReport = '2023-10-18T14:39:11.9414162Z'
		const timeToReportParsed = parseTime(timeToReport)
		const metadata: Metadata = {
			$lastUpdated: timeToReport,
			lwm2m: {
				'3303': {} as Obj,
				$lastUpdated: timeToReport,
			},
		}
		assert.equal(
			getTimestampFromMetadata(Temperature_3303_urn, metadata),
			timeToReportParsed,
		)
	})

	void it(`should return 0 when no timestamp was found in the metadata object`, () => {
		const metadata: Metadata = {
			$lastUpdated: '',
			lwm2m: {} as LwM2M_Metadata,
		}

		assert.equal(getTimestampFromMetadata(Temperature_3303_urn, metadata), 0)
	})
})
