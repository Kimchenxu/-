import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/router'
import store from './store';
import { createI18n } from 'vue-i18n';

import cn from "./i18n/cn.json";
import kr from "./i18n/kr.json";

const messages = {cn,kr};

const i18n = createI18n({
  locale: 'kr',
  fallbackLocale: 'kr',
  messages,
})

const app = createApp(App); // 使用已导入的 App 组件创建 Vue 应用
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}

store.dispatch('checkLoggedIn');
app.use(router);
app.use(i18n);
app.use(store);
app.use(ElementPlus);
app.mount('#app');

