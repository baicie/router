export interface RouterHistory {

}

export interface RouteRecordRaw {

}

export interface RouterOptions {
  history: RouterHistory
  routes:Readonly<RouteRecordRaw[]>
}

export function createRouter(options: RouterOptions){
  
}