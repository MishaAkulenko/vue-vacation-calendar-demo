import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import store from '../store/store';

Vue.use(vuexI18n.plugin, store, {});

