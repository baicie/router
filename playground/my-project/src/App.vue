<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import {useRouter,useRoute,RouterView } from '@baicie/router';
const router = useRouter()
const route = useRoute()
const instance = getCurrentInstance()
function handlePush() {
  console.log('getCurrentInstance',instance)
  console.log('handlePush',router,route)
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <RouterView/>
  <HelloWorld msg="Vite + Vue" />
  <el-button @click="handlePush">handlePush</el-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
