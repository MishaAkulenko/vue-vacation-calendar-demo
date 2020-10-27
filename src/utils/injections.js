import Vue from 'vue';

Vue.prototype.getDateLocale = (number) => {
  // Calculate day locale ending
  const locale = ['common.day', 'common.the_day', 'common.days'];

  const b = number % 10;
  const a = (number % 100 - b) / 10;

  if (a === 0 || a >= 2) {
    if (b === 0 || (b > 4 && b <= 9)) {
      return Vue.i18n.translate(locale[2]);
    }
    if (b !== 1) {
      return Vue.i18n.translate(locale[1]);
    }
    return Vue.i18n.translate(locale[0]);
  }
  return Vue.i18n.translate(locale[2]);
};

