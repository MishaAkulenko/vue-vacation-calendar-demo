import Vue from 'vue';

export default (() => {
  Vue.filter('capitalize', function(value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
  Vue.filter('uppercase', function(value) {
    if (!value) return '';
    return value.toUpperCase();
  });
  Vue.filter('lowercase', function(value) {
    if (!value) return '';
    return value.toLowerCase();
  });
  Vue.filter('smashThousands', function(value) {
    const number = value.toString();
    return number.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
  });
})();
