import { App, shallowReactive } from 'vue';
import { routeKey, routerKey } from './injection-symbol';
import { RouterView } from './router-view';
import type { DefineComponent } from 'vue';
import { createRouterMatch } from './matcher';
export interface RouterHistory extends History {

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

export function createRouter(options: RouterOptions) {
  const matcher = createRouterMatch(options.routes)
  const routerHistory = options.history
  console.log(options, matcher.getAllMatchers())

  const go = (delta: number) => routerHistory.go(delta)

  const push = () =>{
    
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