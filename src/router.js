import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    // Not used in this case
    return savedPosition;
  },
  routes: [{
    path: '/',
    name: 'dashboard',
    component: () =>
    // eslint-disable-next-line max-len
      import(/* webpackChunkName: "DashboardPage" */ './pages/DashboardPage.vue'),
  }, {
    path: '/login',
    name: 'login',
    meta: {
      publicPage: true, // This page available for not logged user
    },
    component: () =>
      import(/* webpackChunkName: "LoginPage" */ './pages/LoginPage.vue'),
  }, {
    path: '*',
    meta: {
      publicPage: true,
    },
    component: () =>
      import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage.vue'),
  }],
});

router.beforeEach((to, from, next) => {
  // Guard by not logged  user
  const isLogged = store.getters['auth/isLogged'];
  const {publicPage} = to.meta;

  if (isLogged && to.name === 'login') { // If user logged redirect to dashboard
    next('/');
    return;
  }
  if (!publicPage && !isLogged) {
    // If page is not public & user not logged - do redirect to login page
    next('/login');
  } else {
    next();
  }
});

export default router;
