import { createApp } from 'vue'
import './style.css'
import './assets/css/index.css';
import './assets/css/styles.css'
import './assets/css/form.css'
import './assets/css/LogoSlider.module.css'
import './assets/css/map.css'
import './assets/css/navbar.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from "@primeuix/themes/aura";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastService from 'primevue/toastservice';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(pinia)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .use(ToastService)
    .mount('#app')
