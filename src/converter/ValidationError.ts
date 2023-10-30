import { type ErrorObject } from 'ajv'

/**
 * This error is returned when the converted object is not valid.
 */
export class ValidationError extends Error {
	description: ErrorObject[]

	constructor(description: ErrorObject[]) {
		super(`error validating type: ${JSON.stringify(description, null, 2)}`)
		this.description = description
	}
}
