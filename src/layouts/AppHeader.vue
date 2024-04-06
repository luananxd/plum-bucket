<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../store/cartStore';
import categoriesMap from '../common/maps/categories.json';

const route = useRoute();
const cartStore = useCartStore();

const goodsCategories = reactive([
  'smartphones',
  'tablets',
  'laptops',
]);
</script>

<template>
  <header class="app-header">
    <div class="app-header__wrapper">
      <RouterLink class="app-header__home-link" to="/">
        <img class="app-header__logo" src="../assets/img/icons/logo.svg" alt="Логотип Plum Bucket: две сливы в стиле минимализм" width="166" height="51">
      </RouterLink>
      <ul class="app-header__navigation main-navigation">
        <li
          v-for="category in goodsCategories"
          class="main-navigation__item"
          :class="{ 'main-navigation__item--active': route.fullPath.includes(category)}"
        >
          <RouterLink class="main-navigation__link" :to="`/${category}`">
            {{ categoriesMap[category] }}
          </RouterLink>
        </li>
      </ul>
      <RouterLink class="app-header__cart cart" to="/cart">
        <img class="cart__icon" src="../assets/img/icons/cart.svg" width="40" height="40"/>
        <span class="cart__count">{{ cartStore.cart.length }}</span> 
      </RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.app-header {
  margin: 0;
  background-color: $plum-all-main;
  color: $white-text-main;
  font-size: 18px;
  font-weight: 700;

  &__wrapper {
    display: flex;
    align-items: center;
    width: 1000px;
    margin: 0 auto;
  }

  &__home-link {
    margin-right: 130px;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }

  &__cart {
    margin-left: auto;
  }
}

.main-navigation {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__item {
    position: relative;

    &:hover {
      background-color: $plum-all-hover;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 5px;
      background-color: $white-text-main;
      transform: scaleX(0);
      transform-origin: center;
      transition-duration: 300ms;
      transition-timing-function: ease-in;
    }

    &--active::before {
      width: 100%;
      transform: scaleX(1);
    }
  }

  &__link {
    display: block;
    padding: 25px 25px;
    color: inherit;
    text-decoration: none;
  }
}

.cart {
  position: relative;
  width: 40px;
  color: $white-text-main;
  text-decoration: none;

  &__count {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
}
</style>