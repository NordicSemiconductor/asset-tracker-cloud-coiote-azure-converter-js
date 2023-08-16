import type { attribute, list, value } from '../converter'

/**
 * If the resource is required it should not be undefined
 */
export const checkResource = (
	input: value | list,
	isRequired: boolean,
): boolean => {
	// if input is a list
	if ((input as attribute).attributes !== undefined) {
		if (Number((input as attribute).attributes.dim) <= 0 && isRequired === true)
			return false

		return true
	}

	// if input is not a list
	if ((input as value).value === undefined && isRequired === true) return false

	return true
}
