import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { type ErrorObject } from 'ajv'
import { ValidationError } from './ValidationError.js'
import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'

const ajv = new Ajv()

/**
 * Check if object follow the schema definition
 */
export const validateAgainstSchema = <T extends TSchema>(
	object: Record<string, unknown>,
	schema: T,
):
	| { result: Static<typeof schema> }
	| { error: ValidationError | UndefinedCoioteObjectWarning } => {
	const v = ajv.compile(schema)
	const valid = v(object)

	if (valid !== true) {
		return {
			error: new ValidationError(v.errors as ErrorObject[]),
		}
	}
	return { result: object }
}
