import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/router';
import App from './App.vue';
import { globalComponents } from './components/atomic/index';

const app = createApp(App);
const pinia = createPinia();

globalComponents.forEach((component) => {
  app.component(component.name, component.source);
});

app.use(pinia);
app.use(router);
app.mount('#app');
