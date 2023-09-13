import {ShallowRef, defineComponent, h, inject, computed, ComponentPublicInstance, ref} from 'vue';
import {routerViewLocationKey} from './injection-symbol';
import { RouteLocationOptions } from './types';
import { assign } from './utils';

export const RouterView = defineComponent({
  name:'RouterView',
  inheritAttrs: false,
  setup(){
    const injectedRoute = inject<ShallowRef<RouteLocationOptions>>(routerViewLocationKey)!
    const viewRef = ref<ComponentPublicInstance>()
    const matchRoute = computed(()=> injectedRoute.value.component)

    return ()=>{ 
      const ViewComponent = matchRoute.value!
      const component = h(
        ViewComponent,
        assign({}, {
          // onVnodeUnmounted,
          ref: viewRef,
        })
      )
      // return (
      //   <div></div>
      // )
      return (
        component
      )
    }
  }
})