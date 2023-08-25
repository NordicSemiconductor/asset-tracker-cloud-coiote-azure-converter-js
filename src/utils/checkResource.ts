import type { List, Value } from '../converter'
type Attribute = { attributes: { dim: string } }
/**
 * If the resource is required it should not be undefined
 */
export const checkResource = (
	input: Value | List,
	isRequired: boolean,
): boolean => {
	// if input is a list
	if ((input as Attribute).attributes !== undefined) {
		if (Number((input as Attribute).attributes.dim) <= 0 && isRequired === true)
			return false

		return true
	}

	// if input is not a list
	if ((input as Value).value === undefined && isRequired === true) return false

	return true
}
