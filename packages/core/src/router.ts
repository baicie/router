import { HistoryLocation, HistoryState, START_LOCATION_NORMALIZED } from './history/common'
import { App, shallowReactive, shallowRef } from 'vue';
import { routeKey, routerKey } from './injection-symbol';
import { RouterView } from './router-view';
import type { DefineComponent } from 'vue';
import { createRouterMatch } from './matcher';
import { RouteLocationOptions } from './types';
export interface RouterHistory {
  go: (delta: number) => void;
  push(to: HistoryLocation, data?: HistoryState): void
  replace(to: HistoryLocation, data?: HistoryState): void
}

declare type Lazy<T> = () => Promise<T>

export declare type RouteComponent = DefineComponent;

export interface RouteRecordRaw {
  name?: string;
  path: string;
  redirect?: string;
  component?: Lazy<RouteComponent>;
  children?: RouteRecordRaw[]
}

export interface RouterOptions {
  history: RouterHistory
  routes: Readonly<RouteRecordRaw[]>
}

export interface RouteLocationNormalizedLoaded { }

export function createRouter(options: RouterOptions) {
  const matcher = createRouterMatch(options.routes)
  const routerHistory = options.history

  const currentRoute = shallowRef<RouteLocationOptions>(
    START_LOCATION_NORMALIZED
  )
  console.log(options, matcher.getAllMatchers())

  function finalizeNavigation(
    toLocation: RouteLocationOptions,
    from: RouteLocationOptions,
    replace?: boolean,
    data?: HistoryState
  ) {
    if (replace) {
      // routerHistory.replace()
    } else {
      // 
    }

    currentRoute.value = toLocation
  }

  const go = (delta: number) => routerHistory.go(delta)

  const push = (
    to: RouteLocationOptions
  ) => {
    const toLocation = to
    const data: HistoryState | undefined = to.state
    finalizeNavigation(
      toLocation,
      currentRoute.value,
      false,
      data,
    )
  }

  const router = {
    push,
    go,
    install(app: App) {
      const router = this

      app.component('RouterView', RouterView)
      console.log(router, app)

      // app.config.globalProperties.
      const activeRoute = {}

      // 为useRouter
      app.provide(routerKey, router)
      // 为useRoute
      app.provide(routeKey, shallowReactive(activeRoute))

    }
  }

  return router
}