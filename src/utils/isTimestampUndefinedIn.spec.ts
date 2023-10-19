import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import type { Temperature_3303 } from 'src/schemas/index.js'
import { isTimestampUndefinedIn } from './isTimestampUndefinedIn.js'

void describe('getTimestampFromMetadata', () => {
	void it('should return true when resource 5518 is undefined in the object', () => {
		const temperature = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
				//'5518': 1692369551,
			},
		] as Temperature_3303
		assert.equal(isTimestampUndefinedIn(temperature), true)
	})

	void it('should return false when resource 5518 is defined in the object', () => {
		const temperature = [
			{
				'5601': 27.18,
				'5602': 27.71,
				'5700': 27.18,
				'5701': 'Cel',
				'5518': 1692369551,
			},
		] as Temperature_3303
		assert.equal(isTimestampUndefinedIn(temperature), false)
	})
})

/*


*/
/*


*/
