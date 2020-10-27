<template>
    <span class="loader"
          :style="`height:${height}${typeof height === 'number' ? 'px' : ''};`"
    >
        <img src="../../assets/img/loader.svg" alt="loader">
    </span>
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    height: {
      type: [Number, String],
      default: 30,
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    margin: 0 auto;
    height: 100%;
    max-width: 150px;

    a {
      backdrop-filter: blur();
    }
  }
}
</style>
