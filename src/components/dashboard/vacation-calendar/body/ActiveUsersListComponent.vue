<template>
  <div class="active-users" :class="currentConfirmationStatus">
    <div class="user-wrapper">
      <div class="avatar">
        <i class="material-icons wait-confirm-indicator"
            title='Ожидается подтверждение'>
          access_time
        </i>
        <i class="material-icons check-confirm-indicator"
           title='День подтвержден как отпускной'>
          check
        </i>
      </div>
      <div class="user-login">{{ loggedUser.login }}</div>
    </div>
    <div class="user-wrapper"
         v-for="user in usersVacationsOnThisDay"
         :key="user.id"
    >
      <div class="avatar">
        <i class="material-icons"
           :style="{color: user.color}">
          account_circle
        </i>
      </div>
      <div class="user-login">{{ user.login }}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'ActiveUsersListComponent',
  props: {
    currentConfirmationStatus: String,
    date: Date,
  },
  computed: {
    ...mapState({
      loggedUser: (state) => state.auth.user,
      usersInfo: (state) => state.dashboard.usersInfo,
    }),
    usersVacationsOnThisDay() {
      return this.usersInfo.filter((user) => {
        return user.reserved.find(
            (item) => item.toString() === this.date.toString(),
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active-users {
  width: 100%;
  padding-top: 10px;
  display: flex;

  .user-wrapper {
    display: flex;
    align-items: center;
    padding-top: 3px;
    position: relative;

    &:hover {
      .user-login {
        display: block;
      }
    }
  }

  .avatar {
    color: #89a7c1;
    display: flex;
    cursor: pointer;

    .material-icons {
      font-size: 24px;
      margin-right: 5px;

      &:hover {
        text-shadow: 1px 1px 2px #6a6a6a;
      }
    }
  }

  .user-login {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    font-size: 14px;
    background: #6DBCDB;
    padding: 2px 5px;
    border-radius: 3px;
    z-index: 5;
    color: #ffffff;
  }

  .check-confirm-indicator, .wait-confirm-indicator {
    display: none;
    color: #454545;
    font-size: 18px;
    margin-right: 5px;
  }

  &.wait {
    .wait-confirm-indicator {
      display: block;
    }
  }

  &.confirmed {
    .check-confirm-indicator {
      display: block;
      color: green;
    }
  }
}
</style>
