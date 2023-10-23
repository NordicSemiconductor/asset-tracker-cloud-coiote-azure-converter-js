import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { type ErrorObject } from 'ajv'
import { ValidationError } from './ValidationError.js'
import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'

/**
 * Check if object follow the schema definition
 */
export const validateAgainstSchema = <T extends TSchema>(
	object: Record<string, unknown>,
	schema: T,
):
	| { result: Static<typeof schema> }
	| { error: ValidationError | UndefinedCoioteObjectWarning } => {
	const validatedObject = validateWithTypebox(object, schema)
	if ('errors' in validatedObject) {
		return {
			error: new ValidationError(validatedObject.errors),
		}
	}

	return { result: validatedObject.valid }
}

const ajv = new Ajv()

/**
 * Use typebox to check if object follow the schema definition
 *
 * TODO: add logic in validateAgainstSchema
 */
const validateWithTypebox = <T extends TSchema>(
	object: unknown,
	schema: T,
):
	| {
			errors: ErrorObject[]
	  }
	| {
			valid: unknown
	  } => {
	const v = ajv.compile(schema)
	const valid = v(object)
	if (valid !== true) {
		return {
			errors: v.errors as ErrorObject[],
		}
	}
	return { valid: object }
}
