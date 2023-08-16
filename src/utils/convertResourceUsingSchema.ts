import type { list, value } from '../converter'
import { checkResource } from '../utils/checkResource.js'
import { setDataType } from '../utils/setDataType.js'

/**
 * Use the schema definition to set new data type to resource
 */
export const convertResourceUsingSchema = (
	input: value | list,
	id: string,
	isRequired: boolean,
	dataType?: string,
): false | undefined | Record<string, unknown> => {
	const isValid = checkResource(input, isRequired)

	if (isValid === false) return false

	// empty value
	if (Object.keys(input).length === 0) return undefined

	const newValueFormat = setDataType(input, dataType)
	return {
		[`${id}`]: newValueFormat,
	}
}
