<template>
  <section class="calendar-body">
    <div
        v-for="day in daysNamesList"
        :key="day" class="grid-cell flex-center">
      {{ day | uppercase }}
    </div>
    <VacationCalendarDayItemComponent
        v-for="date in datesGrid"
        :key="date.getTime()"
        :date="date">
    </VacationCalendarDayItemComponent>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  getDaysInMonth,
} from 'date-fns';

import VacationCalendarDayItemComponent
  from './VacationCalendarDayItemComponent.vue';

export default {
  name: 'VacationCalendarBodyComponent',
  components: {
    VacationCalendarDayItemComponent,
  },

  computed: {
    ...mapState({
      selectedDateInterval: (state) => {
        return state.dashboard.currentDateIntervalToRender;
      },
    }),
    daysNamesList() {
      return new Array(7).fill(1).map((item, key) => {
        return new Date(0, 0, key)
            .toLocaleString(
                this.$i18n.locale(), {weekday: 'short'},
            );
      });
    },
    datesGrid() {
      const {year, month, currentIntervalFullDate} = this.selectedDateInterval;
      const MIN_CELLS_IN_GRID = 35;
      const MAX_CELLS_IN_GRID = 42;

      function generatePrevMonth() {
        const numberOfCurrentMonthFirstDay = new Date(year, month).getDay() - 1;
        const prevMonthDaysQuantity = getDaysInMonth(new Date(year, month - 1));

        if (numberOfCurrentMonthFirstDay < 0) return [];

        return eachDayOfInterval({
          start: new Date(
              year,
              month - 1,
              prevMonthDaysQuantity - numberOfCurrentMonthFirstDay,
          ),
          end: new Date(year, month - 1, prevMonthDaysQuantity),
        });
      }

      function generateCurrentMonth() {
        return eachDayOfInterval({
          start: startOfMonth(currentIntervalFullDate),
          end: endOfMonth(currentIntervalFullDate),
        });
      }

      function generateNextMonth() {
        return eachDayOfInterval({
          start: new Date(year, month + 1, 1),
          end: new Date(year, month + 1, daysInNextMonth),
        });
      }

      const calendar = [].concat(generatePrevMonth(), generateCurrentMonth());

      const daysInNextMonth = MIN_CELLS_IN_GRID - calendar.length >= 0 ?
          MIN_CELLS_IN_GRID - calendar.length :
          MAX_CELLS_IN_GRID - calendar.length;

      daysInNextMonth > 0 && calendar.push(...generateNextMonth());

      return calendar;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-body {
  display: grid;
  grid-template-rows: 30px repeat(5, 1fr);
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
  margin-right: -1px;
  margin-bottom: -1px;

  .grid-cell {
    border-right: 1px solid #afc7da;
    border-bottom: 1px solid #afc7da;
  }
}
</style>
