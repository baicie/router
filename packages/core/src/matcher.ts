import { RouteRecordRaw } from "./router";
import { RouteLocationOptions } from "./types";

export function createRouterMatch(
  routes: Readonly<RouteRecordRaw[]>
) {
  const matcher: ReturnType<typeof normalizeRouteRecord>[] = []

  function addRoute(route: RouteRecordRaw) {
    const record = normalizeRouteRecord(route)

    if (record.children.length) {
      for (const child of record.children) {
        addRoute(child)
      }
    }

    insterMatcher(record)
  }

  function getAllMatchers() {
    return matcher
  }

  function resolve(to: Readonly<RouteLocationOptions>) {
    return matcher.find(match => match.path === to.path)
  }

  function insterMatcher(record: ReturnType<typeof normalizeRouteRecord>) {
    matcher.push(record)
  }

  routes.forEach(route => addRoute(route))

  return {
    addRoute,
    getAllMatchers,
    resolve
  }
}

function normalizeRouteRecord(
  record: RouteRecordRaw
) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    component: record.component,
    children: record.children || [],
  }
}