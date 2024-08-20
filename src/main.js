import { createApp } from 'vue'
import './style.css'
import './assets/css/styles.css'
import './assets/css/form.css'
import './assets/css/LogoSlider.module.css'
import './assets/css/map.css'
import './assets/css/navbar.css'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
