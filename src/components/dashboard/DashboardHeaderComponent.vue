<template>
  <header>
    <div class="vacation-info">
      {{$t('dashboard.avail_days', {
          days: availVacationDays,
          dayLocale: getDateLocale(availVacationDays, 'days')
        })}}
    </div>
    <LocalisationSelector></LocalisationSelector>
    <HeaderProfileSettingsComponent></HeaderProfileSettingsComponent>
  </header>
</template>

<script>
import {mapState} from 'vuex';
import HeaderProfileSettingsComponent
  from './HeaderProfileSettingsComponent.vue';
import LocalisationSelector from '../LocalisationSelectorComponent.vue';

export default {
  name: 'DashboardHeaderComponent',
  components: {
    HeaderProfileSettingsComponent,
    LocalisationSelector,
  },
  computed: {
    ...mapState({
      reservedDays: (state) => state.dashboard.reservedDays,
      user: (state) => state.auth.user,
    }),
    availVacationDays() {
      return this.user.vacation_days - this.reservedDays.length;
    },

  },
};
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .vacation-info {
    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
  }

  ::v-deep .localisation-selector {
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
