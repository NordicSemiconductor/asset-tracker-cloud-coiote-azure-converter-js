import type { Instance } from '../converter'
import { removeKeyFromResource } from './removeCoioteFormatFromSingleInstanceObj.js'

type LwM2MArrayInstance = (Record<string, unknown> | undefined)[]

/**
 * Remove coiote format from instances of a LwM2M object
 */
export const removeCoioteFormatFromArrayInstance = (
	input: Instance,
): LwM2MArrayInstance => {
	const instances = Object.entries(input)
	return instances.map(([, resources]) => {
		const instance = Object.entries(resources)
			.map(([resourceId, value]) => {
				const newFormat = removeKeyFromResource(value)
				return {
					[`${resourceId}`]: newFormat,
				}
			})
			.reduce((previous, current) => ({ ...current, ...previous }), {})
		return instance
	}) as LwM2MArrayInstance
}
