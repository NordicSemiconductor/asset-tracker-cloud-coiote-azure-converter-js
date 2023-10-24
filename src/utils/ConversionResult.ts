import type {
	Device_3,
	ConnectivityMonitoring_4,
	Location_6,
	Temperature_3303,
	Humidity_3304,
	Pressure_3323,
	Config_50009,
} from '../schemas/index.js'
import type { UndefinedCoioteObjectWarning } from './UndefinedCoioteObjectWarning.js'
import type { ValidationError } from './ValidationError.js'

type LwM2MAssetTrackerV2Objects =
	| Device_3
	| ConnectivityMonitoring_4
	| Location_6
	| Temperature_3303
	| Humidity_3304
	| Pressure_3323
	| Config_50009

/**
 * Result type interface of 'src/assetTrackerV2Objects' methods
 */
export type ConversionResult<Result extends LwM2MAssetTrackerV2Objects> =
	| { result: Result }
	| { error: ValidationError | UndefinedCoioteObjectWarning }
