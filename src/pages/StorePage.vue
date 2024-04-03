<script setup>
import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useGoodsStore } from '../store/goodsStore';
import GoodCard from '../components/parts/GoodCard.vue';
import categoriesMap from '../common/maps/categories.json';
import sortTypes from '../common/data/sort-types.json';

const route = useRoute();
const goodsStore = useGoodsStore();

const { sortType } = storeToRefs(goodsStore);

const currentCategory = ref(null);
let currentCategoryGoods = reactive([]);

watch(() => route.params.category, (newValue) => {
  currentCategory.value = newValue;
  currentCategoryGoods = goodsStore.getCurrentCategoryGoods(currentCategory.value);
  sortType.value = 'По умолчанию';
}, {immediate: true});

watch(() => sortType.value, () => {
  currentCategoryGoods.sort(goodsStore.sortFunction);
}, {immediate: true});
</script>

<template>
  <section class="catalog">
    <div class="catalog__header">
      <h2 class="catalog__title">Категория: {{ categoriesMap[currentCategory] }}</h2>
      <AppSelect
        class="catalog__select"
        :options="sortTypes"
        v-model="sortType"
      ></AppSelect>
    </div>
    <TransitionGroup
      :key="route.params.category"
      name="cards"
      class="catalog__list goods"
      tag="ul"
      appear
    >
      <GoodCard
        v-for="good in currentCategoryGoods"
        :key="good.id + sortType.value"
        :good="good"
        :good-link="`/${route.params.category}/${good.id}`"
      >
      </GoodCard>
    </TransitionGroup>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.catalog {
  padding-top: 60px;
  padding-bottom: 60px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  &__title {
    margin: 0;
  }

  &__select {
    width: 220px;
  }
}

.goods {
  display: grid;
  grid-template-columns: repeat(4, 235px);
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.cards-move {
  transition-duration: 300ms;
}
</style>