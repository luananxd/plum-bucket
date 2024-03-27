<script setup>
import { ref, reactive, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGoodsStore } from '../store/goodsStore';
import { createGoodPrice } from '../common/helpers';

const route = useRoute();
const router = useRouter();
const goodsStore = useGoodsStore();

const goodId = ref(route.params.goodId);
const goodTabs = reactive([
  {
    link: 'description',
    title: 'Описание'
  },
  {
    link: 'reviews',
    title: 'Отзывы'
  },
  // {
  //   link: 'questions',
  //   title: 'Вопросы по товару'
  // },
]);

const currentGood = goodsStore.getGood(goodId.value);
provide('currentGood', currentGood);
</script>

<template>
  <section class="good">
    <h2 class="good__title">{{ currentGood.brand }} {{ currentGood.model }}</h2>
    <div class="good__wrapper">
      <img class="good__image" :src="`/src/assets/img/goods${currentGood.imagePath}`" :alt="`${currentGood.brand} ${currentGood.model}`" width="500" height="500"/>
      <div class="good__info">
        <dl class="good__specification specification">
          <div class="specification__item" v-for="spec in currentGood.specifications">
            <dt>{{ spec.name }}:</dt>
            <dd>{{ spec.value }}</dd>
          </div>
        </dl>
        <div class="good__order">
          <button class="good__button button" type="button">В корзину</button>
          <strong class="good__price">{{ createGoodPrice(currentGood.price) }} ₽</strong>
        </div>
      </div>
    </div>
    <div class="good__details details">
      <ul class="details__tabs">
        <li class="details__item" v-for="tab in goodTabs">
          <div class="details__link"
          @click="router.replace({ path: `/${route.params.category}/${goodId}/${tab.link}` })"
          >
            {{ tab.title }}
          </div>
        </li>
      </ul>
      <p>
        <RouterView></RouterView>
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.good {
  padding-top: 60px;
  padding-bottom: 60px;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 20px;
    margin-bottom: 50px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: $gray-background-main;
  }

  &__title {
    margin: 0;
    margin-bottom: 40px;
  }

  &__image {
    @include first-black-normal;
  }

  &__order {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    font-size: 18px;
  }
}

.specification {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin: 0;
  
  &__item {
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 10px;

    & dt {
      padding: 5px 0;
      border-bottom: 2px solid $lightGray-text-aside;
    }

    & dd {
      margin: 0;
      padding: 5px 0;
      color: $plum-all-main;
      font-weight: 700;
    }
  }
}

.button {
  padding: 5px 10px;
  background-color: $plum-all-main;
  color: $white-text-main;
  font-size: 18px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: $plum-all-hover;
  }
}

.details {
  font-size: 18px;
  line-height: 140%;

  &__tabs {
    display: flex;
    gap: 10px;
    margin: 0;
    margin-bottom: 20px;
    padding: 0;
    list-style-type: none;
  }

  &__link {
    display: block;
    padding: 15px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    @include first-black-normal;

    &:hover {
      color: $plum-all-main;
      @include first-black-down;
    }
  }
}
</style>