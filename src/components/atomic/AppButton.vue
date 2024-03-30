<script setup>
const props = defineProps({
  useStyles: Boolean,
})
</script>

<template>
  <button type="button" :class="{ 'button': props.useStyles }">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.button {
  padding: 5px 10px;
  background-color: $plum-all-main;
  color: $white-text-main;
  font-size: 14px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: $plum-all-hover;
  }
}
</style>