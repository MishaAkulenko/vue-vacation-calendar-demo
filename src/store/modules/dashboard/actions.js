import api from '../../../api/api';

export default {
  'GET_USERS_LIST': async ({commit}, params) => {
    commit('SET_USERS_LIST', await api.usersApi.get_users_list(params))
  },
  SEND_SELECTED_VACATION: async({commit}, params) =>{
    const response = await api.usersApi.send_selected_vacation(params);
   commit('SET_VACATION_PERIOD_TO_CONFIRMATION', response.period);
   commit('SET_CONFIRMATION_STATUS', response.status);
   return response
  },
}
