<template>
  <div class="localisation-selector">
    <BaseSelector :list="localisationList" @input="changeLocale"></BaseSelector>
  </div>
</template>

<script>
import {LOCALISATIONS} from '@/const';
import {mapActions} from 'vuex';

export default {
  name: 'LocalisationSelectorComponent',
  computed: {
    localisationList() {
      return LOCALISATIONS.map((locale, key) => {
        return {
          value: key,
          selected: locale === this.currentLocale,
          name: locale.toUpperCase(),
        };
      });
    },
    currentLocale() {
      return this.$i18n.locale();
    },
  },
  methods: {
    ...mapActions({
      dispatchGetLocale: 'GET_LOCALE',
    }),
    changeLocale(langPos) {
      this.dispatchGetLocale(LOCALISATIONS[langPos]);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
