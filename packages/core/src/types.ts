import { Component } from "vue"
import { HistoryState } from "./history/common"

export type RouteRecordName = string | symbol

export type LocationQueryValue = string | null

export type LocationQueryValueRaw = LocationQueryValue | number | undefined

export type RouteParamValue = string

export type RouteParamValueRaw = RouteParamValue | number | null | undefined

export type RouteParamsRaw = Record<
  string,
  RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]
>

export type LocationQueryRaw = Record<
  string | number,
  LocationQueryValueRaw | LocationQueryValueRaw[]
>

export interface RouteLocationOptions {
  replace?: boolean
  state?: HistoryState
  name?: RouteRecordName
  params?: RouteParamsRaw
  query?: LocationQueryRaw
  hash?: string
  path: string
  component?: () => Component
}