<script setup>
const props = defineProps({
  useStyles: Boolean,
  fontSize: {
    required: false,
    type: Number,
  }
})
</script>

<template>
  <button
    type="button"
    :class="{ 'button': props.useStyles }"
    :style="`font-size: ${props.fontSize}px`"
  >
    <span class="button__animate-back"></span>
    <span class="button__text">
      <slot/>
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.button {
  position: relative;
  display: block;
  padding: 0.36em 0.71em;
  background-color: $plum-all-main;
  color: $white-text-main;
  border: none;
  cursor: pointer;

  &__animate-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: $lightBlue-all-accent;
    transition-duration: 300ms;
    transition-timing-function: ease-out;
  }

  &:hover .button__animate-back {
    width: 100%;
  }

  &:active .button__animate-back {
    background-color: $blue-all-accent;
    transition-duration: 100ms;
  }

  &__text {
    position: relative;
    z-index: 1;
  }
}
</style>