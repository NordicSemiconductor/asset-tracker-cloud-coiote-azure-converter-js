import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import type {
	Instance,
	List,
	LwM2MCoiote,
	Resource,
	Value,
} from './LwM2MCoioteType'

void describe('LwM2MCoioteType', () => {
	void it(`should describe Coiote format type`, () => {
		const value: Value = { value: 'Thingy:91' }
		const list: List = {
			'0': { value: 80 },
			attributes: { dim: '1' },
		}
		const resources: Resource = {
			'1': value,
			'7': list,
		}
		const instance: Instance = {
			'0': resources,
		}

		const object: LwM2MCoiote = {
			'3': instance,
		}

		/*
		{
			'3': {
				'0': {
					'1': { value: 'Thingy:91' },
					'7': {
						'0': { value: 80 },
						attributes: { dim: '1' },
					},
				},
			},
		}
        */

		// describe /3/0/1 in Coiote format
		assert.equal(object['3']!['0']!['1']?.value, 'Thingy:91')

		// describe /3/0/7/0 in Coiote format
		assert.equal(((object['3']!['0']!['7'] as List)['0'] as Value)?.value, 80)
	})
})
