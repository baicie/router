import { stripBase } from "../location";
import { assign } from "../utils";
import { RouterHistory } from './../router';
import { HistoryState, NavigationCallback, ValueContainer } from "./common";

export type HistoryLocation = string
interface StateEntry extends HistoryState {
  back: HistoryLocation | null,
  current: HistoryLocation,
  replaced: boolean
}



function createCurrentLocation(
  base: string,
  location: Location
): HistoryLocation {
  const { pathname, search, hash } = location
  // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
  const hashPos = base.indexOf('#')
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos))
      ? base.slice(hashPos).length
      : 1
    let pathFromHash = hash.slice(slicePos)
    // prepend the starting slash to hash so the url starts with /#
    if (pathFromHash[0] !== '/') pathFromHash = '/' + pathFromHash
    return stripBase(pathFromHash, '')
  }
  const path = stripBase(pathname, base)
  return path + search + hash
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

export function useHistoryStateNavigation(base: string) {
  const { history, location } = window
  const historyState: ValueContainer<StateEntry> = {
    value: history.state
  }
  const currentLocation: ValueContainer<HistoryLocation> = {
    value: createCurrentLocation(base, location)
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
    // const currentState = assign(
    //   {},
    //   historyState.value,
    //   history.state as Partial<StateEntry> | null,
    // )
    // changeLocation(currentState.current ?? '/', currentState, true)
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

export function useHistoryListeners() {
  let listeners: NavigationCallback[] = []


  function popStateHandler() {
    console.log('popStateHandler')
  }

  function listen(callback: NavigationCallback) {
    listeners.push(callback)
  }

  function destroy() {
    window.removeEventListener('popstate', popStateHandler)
  }

  window.addEventListener('popstate', () => {
    console.log('popstate')
  })

  window.addEventListener('beforeunload', () => {
    console.log('beforeunload')
  }, {
    passive: true,
  })

  window.onpopstate = () => {
    console.log('onpopstate11');
  }

  return {
    listen,
    destroy
  }
}

export function createWebHistory(base: string) {
  const historyNavigation = useHistoryStateNavigation(base)
  const historyListener = useHistoryListeners()

  function go(delta: number) {
    history.go(delta)
  }

  const routerHistory: RouterHistory = assign(
    {
      location: '',
      go,
    },
    historyNavigation,
    historyListener
  )

  return routerHistory
}
