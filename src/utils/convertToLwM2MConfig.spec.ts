import { describe, it } from 'node:test'
import assert from 'node:assert'
import { convertToLwM2MConfig } from './convertToLwM2MConfig.js'
import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import { Config_50009_urn } from 'src/schemas/Config_50009.js'

void describe('convertToLwM2MConfig', () => {
	void it(`should create the LwM2M object 'Config' (50009) from the object '50009' reported by Coiote`, () => {
		const config_coiote = {
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
				'8': {
					value: 2.5,
				},
				'9': {
					value: 0.5,
				},
			},
		}

		const expected = {
			'0': true,
			'2': 120,
			'3': 600,
			'4': 7200,
			'1': 60,
			'5': 8.5,
			'8': 2.5,
			'9': 0.5,
		}

		const config = convertToLwM2MConfig(config_coiote) as { result: unknown }
		assert.deepEqual(config.result, expected)
	})

	void it(`should return a warning if the object '50009' reported by Coiote is not defined`, () => {
		const config = convertToLwM2MConfig(undefined) as {
			warning: UndefinedCoioteObjectWarning
		}
		assert.equal(
			config.warning.message,
			`'${Config_50009_urn}' object can not be converter because object id '50009' is undefined in input received`,
		)
	})

	/*
	void it(`should return an error if the result of the conversion does not meet the schema definition of LwM2M obejct 50009`, () => {
		const config_coiote = {
            '0': {
                '0': {
                    value: true,
                },
               
                // required value is missing
                // '2': {
                //    value: 120,
                // },
                
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
                '8': {
                    value: 2.5,
                },
                '9': {
                    value: 0.5,
                },
            },
        }

		const config = convertToLwM2MConfig(
			config_coiote as unknown as Instance,
		) as {
			error: LwM2MFormatError
		}

		assert.equal(config.error.message, 'format error')
	})
    */
})
