import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import CKEditor from '@ckeditor/ckeditor5-vue';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';

// import Cloudinary, { CldContext, CldImage } from 'cloudinary-vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

const app = createApp(App);
app.use(VueAxios, axios);
app.use(VueLoading);
app.use(router);
app.use(CKEditor);
// app.use(Cloudinary, {
//   configuration: { cloudName: 'echohui' },
//   components: [CldContext, CldImage],
// });
app.use(VueSweetalert2);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
