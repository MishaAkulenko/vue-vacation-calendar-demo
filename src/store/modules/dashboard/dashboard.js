import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const initialState = {
  currentDateIntervalToRender: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    currentIntervalFullDate: new Date(),
  },
  reservedDays: [],
  availDaysToVacation: 0,
  confirmationStatus: '',
  vacationPeriodToConfirmation: [],
  usersInfo: [],
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
