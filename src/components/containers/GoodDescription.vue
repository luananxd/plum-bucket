<script setup>
import { inject } from 'vue';
const currentGood = inject('currentGood');
</script>

<template>
  <p class="description">
    {{ currentGood.description }}
  </p>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.description {
  padding: 10px 15px;
  @include first-black-normal;
}
</style>