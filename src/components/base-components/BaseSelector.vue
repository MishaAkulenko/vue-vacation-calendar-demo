<template>
  <select
      class="selector-wrapper"
      v-bind="$attrs"
      @change="sendSelectStateToParent">
    <option v-for="item in list"
            :value="item.value"
            :disabled="item.disabled"
            :selected="item.selected"
            :key="item.value">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelector',
  props: {
    list: Array,
  },
  methods: {
    sendSelectStateToParent(e) {
      const value = !Number.isNaN(+e.target.value) ?
          Number(e.target.value) :
          e.target.value;
        /* Select generate only string values.
         Try convert to Number, if false emit default String value */
      this.$emit('input', value); // Because v-model subscribe to input event
    },
  },
};
</script>

<style lang="scss" scoped>
.selector-wrapper {
  position: relative;
  cursor: pointer;
  width: 70px;

  &:focus {
    outline: none;
  }

  &:hover {
    .list {
      display: block;
    }
  }
}
</style>
