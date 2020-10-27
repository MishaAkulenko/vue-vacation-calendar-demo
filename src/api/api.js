import Vue from 'vue';
import authApi from './authApi.js';
import usersApi from './usersApi.js';

export default {
  authApi,
  usersApi,
  getLocale(langCode) {
    return fetch(`/localisation/${langCode}.json`)
        .then(function(response) {
          return response.json();
        })
        .then(function(localeJson) {
          Vue.i18n.add(langCode, localeJson);
          return localeJson;
        });
  },
};
