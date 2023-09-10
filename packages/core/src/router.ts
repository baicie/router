import { HistoryLocation, HistoryState, START_LOCATION_NORMALIZED } from './history/common'
import { App, shallowReactive, shallowRef } from 'vue';
import { RouterViewLocationKey, routeKey, routerKey } from './injection-symbol';
import { RouterView } from './router-view';
import type { DefineComponent } from 'vue';
import { createRouterMatch } from './matcher';
import { RouteLocationOptions } from './types';
export interface RouterHistory {
  go: (delta: number) => void;
  push(to: HistoryLocation, data?: HistoryState): void
  replace(to: HistoryLocation, data?: HistoryState): void
  readonly location: HistoryLocation
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
    to: RouteLocationOptions | string
  ) => {
    // TODO resolve
    const toLocation = to
    const data: HistoryState | undefined = to.state
    finalizeNavigation(
      toLocation,
      currentRoute.value,
      false,
      data,
    )

    // TODO markAsReady
  }

  let started: boolean | undefined

  const router = {
    push,
    go,
    install(app: App) {
      const router = this

      app.component('RouterView', RouterView)
      console.log(router, app)

      if (
        !started
        && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true
        push(routerHistory.location)
      }

      // app.config.globalProperties.
      // 当前路由
      const activeRoute = {}

      // 代理
      const activeProxy = new Proxy(activeRoute, {
        get: (target, key, receiver) => {
          return Reflect.get(currentRoute, key, receiver)
        }
      })

      // 为useRouter
      app.provide(routerKey, router)
      // 为useRoute
      app.provide(routeKey, shallowReactive(activeProxy))
      // router-view
      app.provide(RouterViewLocationKey, currentRoute)
    }
  }

  return router
}