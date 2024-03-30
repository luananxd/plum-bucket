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
      <GoodCard
        v-for="good in currentCategoryGoods"
        :key="good.id"
        :good="good"
        :good-link="`/${route.params.category}/${good.id}`"
      >
      </GoodCard>
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