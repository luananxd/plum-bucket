<script setup>
import { reactive } from 'vue';
import categoriesMap from '../common/maps/categories.json';

const goodsCategories = reactive([
  'smartphones',
  'tablets',
  'laptops',
]);
</script>

<template>
  <header class="app-header">
    <ul class="app-header__navigation main-navigation">
      <li
        v-for="category in goodsCategories"
        class="main-navigation__item"
        :class="{ 'main-navigation__item--active': route.fullPath.includes(category)}"
      >
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.app-header {
  margin: 0;
  background-color: $plum-main;
  color: $white-text;
  font-size: 18px;
  font-weight: 700;
}

.main-navigation {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;

  &__item {
    position: relative;

    &:hover {
      background-color: $plum-hover;
    }

    &--active::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 5px;
      background-color: $white-text;
    }
  }

  &__link {
    display: block;
    padding: 25px 25px;
    color: inherit;
    text-decoration: none;
  }
}
</style>