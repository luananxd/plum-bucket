<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGoodsStore } from '../store/goodsStore';

import categoriesMap from '../common/maps/categories.json';
import { createGoodSmallDescription, createGoodPrice } from '../common/helpers';

const route = useRoute();
const goodsStore = useGoodsStore();

const currentCategory = ref(null);
let currentCategoryGoods = [];

watch(() => route.params.category, (newValue) => {
  currentCategory.value = newValue;
  currentCategoryGoods = goodsStore.getCurrentCategoryGoods(currentCategory.value);
}, {immediate: true});
</script>

<template>
  <section class="catalog">
    <h2 class="catalog__title">Категория: {{ categoriesMap[currentCategory] }}</h2>
    <ul class="catalog__list goods">
      <li
        class="goods__card"
        v-for="good in currentCategoryGoods"
        :key="good.id"
      >
        <ul class="goods__promo promo">
          <li v-for="promo in good.promos" class="promo__chips">
            {{ promo }}
          </li>
        </ul>
        <img
          class="goods__image"
          :src="`src/assets/img/goods${good.imagePath}`"
          :alt="`${good.brand} ${good.model}`"
          width="235"
          height="235"
        >
        <div class="goods__info">
          <RouterLink class="goods__link" :to="`/${route.params.category}/${good.id}/description`">
            <h3 class="goods__title">{{ good.brand }} {{ good.model }}</h3>
          </RouterLink>
          <p class="goods__description">
            {{ createGoodSmallDescription(good.specifications) }}
          </p>
          <div class="goods__order">
            <button class="goods__button button" type="button">В корзину</button>
            <strong>{{ createGoodPrice(good.price) }} ₽</strong>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.catalog {
  padding-top: 60px;
  padding-bottom: 60px;

  &__title {
    margin: 0;
    margin-bottom: 40px;
  }
}

.goods {
  display: grid;
  grid-template-columns: repeat(4, 235px);
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $gray-background-main;
    @include first-black-normal;
  }

  &__image {
    height: 235px;
    object-fit: contain;
    background-color: $white-background-main;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    padding: 10px;
  }

  &__link {
    color: inherit;
    text-decoration: none;
  }

  &__title {
    margin: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }

  &__description {
    flex-grow: 2;
    margin: 0;
    margin-bottom: 15px;
    color: $gray-text;
    font-size: 14px;
  }

  &__order {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.promo {
  position: absolute;
  top: 3px;
  left: 3px;
  display: flex;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__chips {
    display: inline-block;
    padding: 3px 5px;
    background-color: $red-chips-main;
    color: $white-text-main;
    font-size: 12px;
    border-radius: 10px;
  }
}

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