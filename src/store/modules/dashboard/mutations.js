import {initialState} from "@/store/modules/dashboard/dashboard";

export default {
  'SET_USERS_LIST'(state, data) {
    state.usersInfo = data;
  },
  'SET_ACTIVE_VOCATION_DAYS'(state, data) {
    state.availDaysToVacation = data;
  },
  'RESERVE_VACATION_DAY'(state, data) {
    state.reservedDays = state.reservedDays.concat(data);
  },
  'REMOVE_VACATION_DAY_FROM_RESERVE'(state, data) {
    const removedPosition = state.reservedDays.findIndex((date)=>{
        return date.toString() === data.toString()
      }),
      clonedArr = state.reservedDays.slice();
      clonedArr.splice(removedPosition,1);
    state.reservedDays = clonedArr;
  },
  'CLEAR_VACATION_RESERVE_LIST'(state) {
    state.reservedDays = [].concat(state.vacationPeriodToConfirmation);
  },
  'SET_CURRENT_DATE_INTERVAL_FOR_RENDER'(state, data) {
    state.currentDateIntervalToRender = {
      ...data,
      currentIntervalFullDate: new Date(data.year, data.month)
    };
  },
  'RESET_CURRENT_DATE_INTERVAL_FOR_RENDER'(state) {
    state.currentDateIntervalToRender = initialState.currentDateIntervalToRender;
  },
  'SET_VACATION_PERIOD_TO_CONFIRMATION'(state, data) {
    state.vacationPeriodToConfirmation = data;
  },
  'SET_CONFIRMATION_STATUS'(state, data) {
    state.confirmationStatus = data;
  },
}
