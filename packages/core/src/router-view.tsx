import {ShallowRef, defineComponent, inject, watchEffect} from 'vue';
import {routerViewLocationKey} from './injection-symbol';
import { RouteLocationOptions } from './types';

export const RouterView = defineComponent({
  name:'RouterView',
  inheritAttrs: false,
  setup(){
    const injectedRoute = inject<ShallowRef<RouteLocationOptions>>(routerViewLocationKey)!

    watchEffect(()=>{
      console.log('injectedRoute',injectedRoute.value)
    })

    return ()=>{
      // return (
      //   <div></div>
      // )
    }
  }
})