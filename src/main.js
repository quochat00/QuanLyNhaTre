import './assets/css/style.css';
import './assets/css/util.css';

import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './assets/fonts/iconic/css/material-design-iconic-font.min.css';
import './assets/vendor/animate/animate.css';
import './assets/vendor/css-hamburgers/hamburgers.min.css';
import './assets/vendor/animsition/css/animsition.min.css';
import './assets/vendor/select2/select2.min.css';
import './assets/vendor/daterangepicker/daterangepicker.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp(App)
app.use(VueAxios, axios);

app.use(router)

app.mount('#app')
