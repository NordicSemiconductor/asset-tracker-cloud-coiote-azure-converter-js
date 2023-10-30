import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import type { ValidationError } from './ValidationError.js'

/**
 * Unwrap convertion process result.
 *
 * If the result of the convertion process is an error, return undefined and trigger the error.
 * Otherwise return the result value
 */
export const unwrapResult =
	(
		onError?: (element: ValidationError | UndefinedCoioteObjectWarning) => void,
	) =>
	<Result>(
		conversionResult:
			| { result: Result }
			| { error: ValidationError | UndefinedCoioteObjectWarning },
	): Result | undefined => {
		if ('error' in conversionResult) {
			onError?.(conversionResult.error)
			return undefined
		}
		return conversionResult.result
	}
