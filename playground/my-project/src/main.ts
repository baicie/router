import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import UI from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(UI)
app.use(router)
app.mount('#app')
