import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/api';

Vue.use(Vuex);

import auth from './modules/auth/auth';
import dashboard from './modules/dashboard/dashboard';
import {DEFAULT_LANGUAGE} from '@/const';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    dashboard,
  },
  state: {},
  mutations: {
    'SET_LOCALE'(state, lang) {
      Vue.i18n.set(lang.toLowerCase());
    },
  },
  actions: {
    'GET_LOCALE': async ({commit}, params) => {
      const lang = !params ?
                DEFAULT_LANGUAGE :
                params.toLowerCase();

      if (Vue.i18n.localeExists(lang)) {
        commit('SET_LOCALE', lang);
        return Promise.resolve(lang);
      }

      await api.getLocale(lang);
      commit('SET_LOCALE', lang);
      return Promise.resolve(lang);
    },
  },
});
