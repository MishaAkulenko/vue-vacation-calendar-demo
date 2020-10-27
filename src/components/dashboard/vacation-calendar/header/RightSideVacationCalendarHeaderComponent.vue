<template>
  <div class='flex-center current-date'>
    <BaseSelector :list="monthsList" :value="selectedDateInterval.month"
                  @input="val =>
                  changeDateInterval({month: val})"></BaseSelector>
    <BaseSelector :list="yearsList" :value="selectedDateInterval.year"
                  @input="val =>
                  changeDateInterval({year: val})"></BaseSelector>
    <i class="calendar-icon material-icons"
       title='К текущей дате'
       @click="resetDateInterval">today</i>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
  name: 'RightSideVacationCalendarHeaderComponent.vue',
  props: {
    monthsList: Array,
    yearsList: Array,
  },
  computed: {
    ...mapState({
      selectedDateInterval: (state) =>
        state.dashboard.currentDateIntervalToRender,
    }),
  },
  methods: {
    ...mapMutations('dashboard', {
      commitCurrentInterval: 'SET_CURRENT_DATE_INTERVAL_FOR_RENDER',
      commitResetCurrentDateInterval: 'RESET_CURRENT_DATE_INTERVAL_FOR_RENDER',
    }),

    resetDateInterval() {
      this.commitResetCurrentDateInterval();
    },
    changeDateInterval(val) {
      this.commitCurrentInterval({...this.selectedDateInterval, ...val});
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .selector-wrapper {
  margin-left: 10px;
}

.current-date {
  span {
    margin: 0 5px;
    font-weight: 500;
  }

  .calendar-icon {
    color: #afc7da;
    font-size: 35px;
    margin-left: 10px;

    &.unactive {
      color: #EFEFEF;
    }
  }
}
</style>
