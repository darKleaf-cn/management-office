import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
process.env.VUE_APP_MOCK === 'true' && require('./mock/index');

createApp(App).use(ElementPlus).use(store).use(router).mount('#app');