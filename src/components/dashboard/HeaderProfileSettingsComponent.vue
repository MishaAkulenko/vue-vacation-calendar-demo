<template>
  <div class='profile-settings-wrapper'>
    <div class='profile-settings-icon'>
      <span>{{ loginClippedInitials }}</span>
    </div>
    <ul class='settings-actions-list'>
      <li>
        <router-link
            :to='routes.profile'
            class='settings settings-actions-item'
        >
          {{ 'user_settings.settings' | translate }}
        </router-link>
      </li>
      <li
          class='logout settings-actions-item'
          @click="doLogout">
        {{ 'user_settings.logout' | translate }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {ROUTER_PATHS} from '@/const';

export default {
  name: `HeaderProfileSettingsComponent`,
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    loginClippedInitials() {
      console.log('123123');
      return this.user.login.slice(0, 2);
    },
    routes() {
      return ROUTER_PATHS;
    },
  },
  methods: {
    ...mapActions('auth', {
      dispatchLogOut: 'DO_LOGOUT',
    }),
    doLogout() {
      this.dispatchLogOut()
          .then(() => {
            this.$router.push(ROUTER_PATHS.login);
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-settings-wrapper {
  position: relative;
  padding: 5px;
  z-index: 10;

  .profile-settings-icon {
    background: #334;
    border-radius: 100%;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      color: #6DBCDB;
      font-size: 30px;
      font-weight: 800;
      text-transform: uppercase;
    }
  }

  .settings-actions-list {
    display: none;
    position: absolute;
    bottom: 0;
    transform: translate(-50%, 100%);
    text-align: center;
    background: #334;
    border-radius: 1px;
    box-sizing: border-box;
    left: 50%;

    .settings-actions-item {
      padding: 8px;
      color: #EFEFEF;
      cursor: pointer;
      display: block;

      &:hover {
        background: rgba(2, 33, 51, 0.6);
      }

      &.logout {
        color: rgb(255, 41, 5);
        font-weight: 800;
      }
    }
  }

  &:hover {
    .settings-actions-list {
      display: block;
    }
  }
}
</style>
