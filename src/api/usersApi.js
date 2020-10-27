import request from './request';

export default {
  getUsersList(params) {
    return request('/users', params);
  },
  sendSelectedVacation(params) {
    return request('/save_vacation', params);
  },
};
