import type {
	Humidity_3304,
	Pressure_3323,
	Temperature_3303,
} from 'src/schemas'
import type { Instance } from '../converter'
import { removeKeyFromResource } from './removeCoioteFormatFromSingleInstanceObj.js'

/**
 * Multiple Instances objects in Assset Tracker v2
 */
type MultipleInstancesObjs = Temperature_3303 | Humidity_3304 | Pressure_3323

/**
 * Remove coiote format from instances of Temperature, Humidity or Pressure objects
 */
export const removeCoioteFormatFromArrayInstance = (
	input: Instance,
): MultipleInstancesObjs => {
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
	}) as unknown as MultipleInstancesObjs
}
