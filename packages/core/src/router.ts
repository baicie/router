import type { DefineComponent } from 'vue';
import { App, shallowRef } from 'vue';
import { HistoryLocation, HistoryState, NavigationCallback, START_LOCATION_NORMALIZED } from './history/common';
import { routerViewLocationKey, routeKey, routerKey } from './injection-symbol';
import { createRouterMatch } from './matcher';
import { parseQuery } from './query';
import { RouterView } from './router-view';
import { RouteLocationOptions } from './types';
export interface RouterHistory {
  go: (delta: number) => void;
  push(to: HistoryLocation, data?: HistoryState): void
  replace(to: HistoryLocation, data?: HistoryState): void
  readonly location: HistoryLocation

  // 监听相关类型
  listen(callback: NavigationCallback): void
  destroy(): void
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

  // 最后跳转的逻辑
  function finalizeNavigation(
    toLocation: RouteLocationOptions,
    from: RouteLocationOptions,
    replace?: boolean,
    data?: HistoryState
  ) { 
    if (replace) {
      // routerHistory.replace()
    } else {
      routerHistory.push(toLocation.path)
    }

    currentRoute.value = toLocation
  }

  // 处理push参数
  function resolve(
    to: Readonly<RouteLocationOptions | string>
  ): RouteLocationOptions {
    if (typeof to === 'string') {
      const query = parseQuery(to)
      const match = matcher.resolve({
        path: to,
      }) 
      return {
        path: to,
        ...match,
        query,
      }
    } else {
      console.log('match',to)
      const match = matcher.resolve(to)
      return {
        ...to,
        ...match
      }
    }
  }

  // 
  function setupListeners() {
    routerHistory.listen(() => {
      console.log('router history listening')
    })
  }

  const go = (delta: number) => routerHistory.go(delta)

  const push = (
    to: RouteLocationOptions | string
  ) => { 
    const toLocation = resolve(to) 
    const data: HistoryState | undefined = toLocation.state
    finalizeNavigation(
      toLocation,
      currentRoute.value,
      false,
      data,
    )

    // TODO markAsReady
  }

  let started: boolean | undefined

  const router: Router = {
    push,
    go,
    install(app: App) {
      const router = this

      app.component('RouterView', RouterView)

      if (
        !started
        && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true
        
        push('/')
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
      app.provide(routeKey, activeProxy)
      // router-view
      app.provide(routerViewLocationKey, currentRoute)

      setupListeners()
      console.log(`Router`, app)
    }
  }

  return router
}

export interface Router {
  push: (to: RouteLocationOptions | string) => void
  go: (delta: number) => void
  install(app: App): void
}