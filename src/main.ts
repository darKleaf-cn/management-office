import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { getStore } from '@/util/storage';
process.env.VUE_APP_MOCK === 'true' && require('./mock/index');

router.beforeEach(function (to, _, next) {
  if (to.path === '/login') {
    next();
  } else {
    const user = getStore('user') ? getStore('user') : '';
    if (user) {
      next();
    } else {
      next('/login');
    }
  }
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(store).use(router).mount('#app');