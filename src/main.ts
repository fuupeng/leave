
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'http://at.alicdn.com/t/c/font_4110331_xjhzpb6f1jl.js'
const app:App<Element> = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app
    .use(store)
    .use(router)
    .mount('#app')
