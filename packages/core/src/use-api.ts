import { inject } from "vue";
import { routeKey, routerKey } from "./injection-symbol";

export function useRouter() {
  return inject(routerKey)
}

export function useRoute() {
  return inject(routeKey)
}