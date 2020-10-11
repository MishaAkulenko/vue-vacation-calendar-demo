import api from '../../../api/api';

export default {
  'DO_AUTHORIZATION': async ({commit}) => {
    const response = await api.authApi.authorization();
    commit('UPDATE_USER_INFO', response);
    return response
  },
  'DO_LOGIN': async ({commit}, params) => {
    commit('UPDATE_USER_INFO', await api.authApi.login(params))
  },
  'DO_LOGOUT': async ({commit}) => {
    commit('CLEAR_USER_INFO', await api.authApi.logout())
  },
}
