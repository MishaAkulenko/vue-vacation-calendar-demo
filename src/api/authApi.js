import request from './request';

export default {
  authorization() {
    return request('/authorization');
  },
  login(params) {
    return request('/login', params);
  },
  logout() {
    return request('/logout');
  },
};
