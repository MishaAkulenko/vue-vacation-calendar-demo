import Vue from 'vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

import './assets/css/common.scss';
// Custom filters
import './utils/filters';
// Injections to Vue exemplar
import './utils/injections';
// Custom directives
import './utils/directives';
// Vue plugins
import './utils/plugins';
// Base components/ Like BaseButton or BaseInput
import './utils/baseComponents';

import App from './App.vue';
import {DEFAULT_LANGUAGE} from '@/const';

const userLang = navigator.language || ''; // Check browser language
const localePromise = store.dispatch(
    'GET_LOCALE',
    userLang.substr(0, 2) || DEFAULT_LANGUAGE,
); // Load localisation JSON
const authPromise = store.dispatch('auth/DO_AUTHORIZATION');

Promise.allSettled([localePromise, authPromise])
    // App mount after loading localisation & authorisation
    .then(() => {
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount('#app');
    });

