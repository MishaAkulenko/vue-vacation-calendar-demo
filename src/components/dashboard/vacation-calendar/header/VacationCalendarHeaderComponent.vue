<template>
  <div class='calendar-header'>
    <LeftSideComponent
        :monthsList="monthsList"
        :yearsList="yearsList">
    </LeftSideComponent>
    <RightSideComponent
        :monthsList="monthsList"
        :yearsList="yearsList">
    </RightSideComponent>
  </div>
</template>

<script>
import LeftSideComponent from './LeftSideVacationCalendarHeaderComponent.vue';
import RightSideComponent from './RightSideVacationCalendarHeaderComponent.vue';
import {YEARS_LIST_LENGTH} from '@/const';
import {mapState} from 'vuex';

const todayDateMonth = new Date().getMonth();
const todayDateYear = new Date().getFullYear();

export default {
  name: 'VacationCalendarHeaderComponent.vue',
  components: {
    LeftSideComponent,
    RightSideComponent,
  },
  computed: {
    ...mapState({
      selectedDateInterval: (state) =>
        state.dashboard.currentDateIntervalToRender,
    }),
    monthsNames() {
      return new Array(12).fill(1).map((item, month) => {
        return new Date(0, month + 1, 0)
            .toLocaleString(
                this.$i18n.locale(),
                {month: 'short'},
            ).replace('.', '').toUpperCase();
      });
    },
    monthsList() {
      return this.monthsNames.map((month, key) => {
        return {
          value: key,
          disabled: this.selectedDateInterval.year === todayDateYear &&
              key < todayDateMonth,
          name: month,
        };
      });
    },
    yearsList() {
      return new Array(YEARS_LIST_LENGTH)
          .fill(0)
          .map((val, key) => {
            return {
              value: todayDateYear + key,
              disabled: key === 0 &&
              this.selectedDateInterval.month < todayDateMonth,
              name: todayDateYear + key,
            };
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-header {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #afc7da;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ::v-deep .material-icons {
    user-select: none;
    cursor: pointer;

    &:hover {
      color: #75807d;
    }

    &.unactive {
      color: #EFEFEF;

      &:hover {
        color: #EFEFEF;
      }
    }
  }
}
</style>
