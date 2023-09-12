import { RouteRecordRaw } from "../router"

export type ValueContainer<T> = { value: T }

export interface HistoryStateArray extends Array<HistoryStateValue> { }

export type HistoryStateValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | HistoryState
  | HistoryStateArray

export interface HistoryState {
  [x: number]: HistoryStateValue
  [x: string]: HistoryStateValue
}

export type HistoryLocation = string

export const START_LOCATION_NORMALIZED: RouteRecordRaw = {
  path: '/',
  name: undefined,
}

export interface NavigationCallback {
  (
    to: HistoryLocation,
    from: HistoryLocation
  ): void
}