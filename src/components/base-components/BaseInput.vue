<template>
  <label class="input-wrapper" :class="{'has-error': error}">
    <slot></slot>
    <input :type="currentInputType"
           v-bind="$attrs"
           @input="e => $emit('input', e.target.value)"
           @keyup.enter="$emit('onEnter')">
    <span
        class="toggle-password-icon"
        :class="{'password-is-visible': passwordIsVisible}"
        v-if="isPasswordVisibilityNeedToggle"
        @click="togglePasswordVisibility">
        </span>
    <i class="error-text text-ellipsis" v-show="error">{{ error }}</i>
  </label>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  data() {
    return {
      currentInputType: this.type,
      passwordIsVisible: false,
    };
  },
  props: {
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordIsVisible ?
          this.hidePassword() :
          this.showPassword();
    },
    showPassword() {
      this.passwordIsVisible = true;
      this.currentInputType = 'text';
    },
    hidePassword() {
      this.passwordIsVisible = false;
      this.currentInputType = 'password';
    },
  },
  computed: {
    isPasswordVisibilityNeedToggle() {
      return this.type === 'password';
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  color: #424242;
  font-weight: 800;
  font-size: 14px;
  position: relative;
  display: block;
  margin-bottom: 20px;

  &.has-error {
    input {
      border: 1px solid #e53e11;
    }
  }
}

input {
  border: 1px solid #afc7da;
  box-shadow: none;
  border-radius: 2px;
  height: 52px;
  line-height: 1.428571429;
  width: 100%;
  margin: 10px 0 4px;
  padding: 0 22px;
  color: #89a7c1;
  font-weight: 500;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
}

.error-text {
  color: #e53e11;
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  left: 0;
}

.toggle-password-icon {
  position: absolute;
  right: 10px;
  bottom: 4px;
  height: 52px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &::after {
    content: '\1F441';
    font-size: 20px;
    color: #424242;
  }

  &.password-is-visible {
    &::after {
      opacity: 0.4;
    }
  }
}
</style>
