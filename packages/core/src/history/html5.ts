import { assign } from "../utils";
import { RouterHistory } from './../router';
import { HistoryState, ValueContainer } from "./common";

export type HistoryLocation = string
interface StateEntry extends HistoryState {
  back: HistoryLocation | null,
  current: HistoryLocation,
  replaced: boolean
}
function buildState(
  back: HistoryLocation | null,
  current: HistoryLocation,
  replaced: boolean = false,
) {
  return {
    back,
    current,
    replaced,
  }
}

export function useHistoryStateNavigation() {
  const { history } = window
  const historyState: ValueContainer<StateEntry> = {
    value: history.state
  }
  const currentLocation: ValueContainer<HistoryLocation> = {
    value: ''
  }
  function changeLocation(
    to: HistoryLocation,
    state: StateEntry,
    replace: boolean = false
  ): void {
    const url = to
    history[replace ? 'replaceState' : 'pushState'](state, '', url)
    historyState.value = state
  }

  function push(
    to: HistoryLocation,
    state: StateEntry
  ) {
    const currentState = assign(
      {},
      historyState.value,
      history.state as Partial<StateEntry> | null,
    )
    changeLocation(currentState.current, currentState, true)
    // 
    // changeLocation()
    changeLocation(to, state, false)
    currentLocation.value = to
  }

  function replace(
    to: HistoryLocation,
  ) {
    const state = assign(
      {},
      history.state,
      buildState(
        historyState.value.back,
        to,
        true
      )
    )

    changeLocation(to, state, true)
    currentLocation.value = to
  }

  return {
    location: currentLocation,
    state: historyState,


    push,
    replace,
  }
}

export function createWebHistory() {
  const historyNavigation = useHistoryStateNavigation()

  function go(delta: number) {
    history.go(delta)
  }

  const routerHistory: RouterHistory = assign(
    {
      go
    },
    historyNavigation
  )

  return routerHistory
}
