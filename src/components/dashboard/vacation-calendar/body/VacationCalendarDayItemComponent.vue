<template>
  <div
      class="grid-cell day-item"
      :class="classList"
  >
    <div class="do-select-wrapper">
      <span v-show="isCurrentDayAvailToSelect">
        <i
            class="material-icons remove"
            v-show="isThisDayInVacationList"
            @click="removeDayFromVacationList"
            title='Отменить резервацию'
        >
          clear
        </i>
        <i
            class="material-icons add"
            v-show="hasVacationDay && !isThisDayInVacationList"
            @click="addDayToVacationList"
            title='Зарезервировать'
        >
          add
        </i>
      </span>
      <div
          class='user-name'
          v-show="isThisDayInVacationList"
      >
        {{ user.login }}
      </div>
    </div>
    <ActiveUsersListComponent
        :date="date"
        :current-confirmation-status="currentConfirmationStatus"
    />
    <div
        class="date flex-between"
        :class="{holiday: isHoliday}"
    >
      <div class='flex-center'>
        <i
            class="material-icons today-indicator"
            title='сегодня'
        />
        <span class="month-name">
          {{ monthsNamesList[date.getMonth()] | uppercase }}
        </span>
      </div>
      <span>
        {{ date.getDate() }}
      </span>
    </div>
  </div>
</template>

<script>
import {MANDATORY_PERIOD} from '@/const';
import {mapState, mapMutations} from 'vuex';
import {isWeekend, isSameMonth, isSameDay, addDays} from 'date-fns';
import ActiveUsersListComponent from './ActiveUsersListComponent.vue';

export default {
  name: 'VacationCalendarDayItemComponent',
  components: {
    ActiveUsersListComponent,
  },
  props: {
    date: Date,
  },
  computed: {
    ...mapState({
      selectedDateInterval: (state) =>
        state.dashboard.currentDateIntervalToRender,
      vacationPeriodToConfirmation: (state) =>
        state.dashboard.vacationPeriodToConfirmation,
      availDays: (state) => state.dashboard.availDaysToVacation,
      reservedDays: (state) => state.dashboard.reservedDays,
      confirmationStatus: (state) => state.dashboard.confirmationStatus,
      user: (state) => state.auth.user,

    }),
    isDateInCurrentMonth() {
      return isSameMonth(
          this.date,
          this.selectedDateInterval.currentIntervalFullDate,
      );
    },
    classList() {
      return [
        {
          'not-current-month': !this.isDateInCurrentMonth,
          'unavailable': !this.isCurrentDayAvailToSelect,
          'active': this.isThisDayInVacationList,
        },
        this.currentConfirmationStatus,
      ];
    },
    isCurrentDayAvailToSelect() {
      // Если на первый отпуск в году не накопилось 14 дней, то его взять нельзя
      if (!this.user.first_vacation_interval &&
          this.user.vacation_days < MANDATORY_PERIOD) {
        return false;
      }
      return this.date.getTime() >=
          addDays(new Date(), MANDATORY_PERIOD).getTime();
    },
    isThisDayInVacationList() {
      return this.reservedDays.find(
          (day) => day.getTime() === this.date.getTime(),
      );
    },
    hasVacationDay() {
      return this.reservedDays.length < this.user.vacation_days;
    },
    isHoliday() {
      return isWeekend(this.date);
    },
    currentConfirmationStatus() {
      const isThisDayOnConfirmationPeriod = this.vacationPeriodToConfirmation
          .find(
              (dayDate) => isSameDay(this.date, dayDate),
          );
      return isThisDayOnConfirmationPeriod && this.confirmationStatus;
    },
    monthsNamesList() {
      return new Array(12)
          .fill(1)
          .map((item, month) => {
            return new Date(0, month + 1, 0)
                .toLocaleString(
                    this.$i18n.locale(),
                    {month: 'short'})
                .replace('.', '');
          });
    },
  },
  methods: {
    ...mapMutations('dashboard', {
      commitReserveVacationDay: 'RESERVE_VACATION_DAY',
      commitRemoveVacationDayFromReserve: 'REMOVE_VACATION_DAY_FROM_RESERVE',
    }),
    removeDayFromVacationList() {
      this.commitRemoveVacationDayFromReserve(this.date);
    },
    addDayToVacationList() {
      this.commitReserveVacationDay(this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.day-item {
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  padding-left: 5px;
  position: relative;

  &.not-current-month {
    background: rgba(220, 218, 192, 0.64);
  }

  &.active {
    background: rgba(0, 200, 0, 0.18);
  }

  &.unavailable {
    background: #fbfcf3;
  }

  &.wait {
    background: rgba(52, 189, 189, 0.36);
  }

  &.current-day {
    .date {
      .month-name, span {
        color: rgb(76, 193, 188);
      }
    }

    .today-indicator {
      font-size: 22px;

      &::after {
        color: rgb(76, 193, 188);
        content: 'today';
      }
    }

  }

  &.confirmed {
    background: rgba(0, 200, 0, 0.30);

    .do-select-wrapper {
      .user-name {
        margin-left: 20px;
      }

      .material-icons {
        display: none;
      }
    }
  }

  .date {
    width: 100%;
    padding: 0 12px 0 5px;
    text-align: right;
    font-size: 17px;
    align-items: center;

    &.holiday {
      color: rgba(255, 0, 0, 0.8);
    }

    .month-name {
      font-size: 12px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .do-select-wrapper {
    color: #334;
    font-weight: 500;
    width: 100%;
    align-items: center;
    vertical-align: middle;
    line-height: 30px;
    display: flex;

    .material-icons {
      cursor: pointer;
      vertical-align: middle;
      font-size: 22px;
      user-select: none;

      &.remove {
        color: rgba(255, 0, 0, 0.7);
      }
    }

    .user-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 150px;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>
