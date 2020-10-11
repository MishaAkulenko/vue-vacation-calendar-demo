import {initialState} from "@/store/modules/auth/auth";

export default {
  'UPDATE_USER_INFO'(state, data) {
    state.user = data;
  },
  'CLEAR_USER_INFO'(state) {
    state.user = initialState.user;
  },
}
