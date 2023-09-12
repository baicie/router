import { inject } from "vue";
import { routeKey, routerKey } from "./injection-symbol";
import { Router } from "./router";

export function useRouter() {
  return inject<Router>(routerKey)!
}

export function useRoute() {
  return inject(routeKey)
}