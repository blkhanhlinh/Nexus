import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

const authStore = useAuthStore();
if (sessionStorage.getItem('user')) {
  authStore.user = JSON.parse(sessionStorage.getItem('user') as string);
  authStore.isAuthenticated = true;
}

app.mount('#app')