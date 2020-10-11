import Vue from 'vue'
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

import './assets/css/common.scss';
import './utils/filters'; //Custom filters
import './utils/injections'; //Injections to Vue exemplar
import './utils/directives'; //Custom directives
import './utils/plugins'; //Vue plugins
import './utils/baseComponents'; //Base components/ Like BaseButton or BaseInput

import App from './App.vue';
import {DEFAULT_LANGUAGE} from "@/const";

const userLang = navigator.language || '', // Check browser language
    localePromise = store.dispatch('GET_LOCALE', userLang.substr(0,2) || DEFAULT_LANGUAGE), //Load localisation JSON
    authPromise = store.dispatch('auth/DO_AUTHORIZATION');

Promise.allSettled([localePromise,authPromise]) // App mount after loading localisation & authorisation
    .then(()=>{
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app');
});

