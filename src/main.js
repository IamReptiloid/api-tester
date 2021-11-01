import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import UiComponents from '@/shared/UIComponents';

const app = createApp(App);
UiComponents.forEach(UiComponents => {
    app.component(UiComponents.name, UiComponents);
});

app
    .use(store)
    .use(router)
    .mount('#app')
