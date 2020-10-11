import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const initialState = {
  user: null,
};

export default {
  namespaced: true,
  state: {
   ...initialState
  },
  mutations,
  actions,
  getters
}
