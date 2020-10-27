<template>
  <button
      class="btn"
          :class="{loading: processing}"
          @click.prevent="handleClick"
  >
          <span class="btn-content">
            <slot></slot>
          </span>
    <BaseLoader class="processing-indicator"
                :height="20"
                v-if="processing">
    </BaseLoader>
  </button>
</template>

<script>

// Button with process indicator

export default {
  name: 'BaseButton',
  props: {
    processing: { // If true - then loader showing
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 2px;
  position: relative;
  padding: 0 30px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  outline: 0;
  cursor: pointer;
  height: 58px;
  white-space: nowrap;
  box-shadow: none;
  text-transform: none;
  border: 1px solid #e53e11;
  background-color: #ffd801;
  color: #424242;
  width: 160px;
  margin-top: 30px;
  margin-left: auto;

  &.loading {
    .btn-content {
      opacity: 0;
    }
  }

  .processing-indicator {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>
