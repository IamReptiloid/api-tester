import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import Notifications from '@kyvg/vue3-notification'

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const app = createApp(App);


app
    .use(PerfectScrollbar)
    .use(Notifications)
    .use(store)
    .use(router)
    .mount('#app')
