export type LwM2MCoiote = Record<string, Instance>
export type Instance = Record<string, Resource>
export type Resource = { [key: string]: Value | List }
export type List = Record<string, { dim: string } | Value>
export type Value = { value: string | number | boolean }
