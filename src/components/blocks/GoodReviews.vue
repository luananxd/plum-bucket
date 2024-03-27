<script setup>
import { computed, inject } from 'vue';
import { useGoodsStore } from '../../store/goodsStore';

import reviewComponents from '../../common/maps/reviewComponents.json';

const goodsStore = useGoodsStore();
const props = defineProps({
  goodId: String,
});

const currentGoodReviews = goodsStore.getReviews(props.goodId);

const reviewsGrades = computed(() => {
  const grades = new Map();
  currentGoodReviews.forEach((review) => {
    for(const [key, value] of Object.entries(review.grades)) {
      grades.set(key, (grades.get(key) || 0) + value);
      grades.set('total', (grades.get('total') || 0) + value);
    }
  })
  return grades;
});

const getGradeAverageValue = (gradeName) => {
  return ((reviewsGrades.value.get(gradeName) / currentGoodReviews.length) || 0).toFixed(2);
}
</script>

<template>
  <div class="reviews">
    <div class="reviews__total">
      <div class="reviews__info">
        <span class="reviews__total-value">{{ (getGradeAverageValue('total') / 5) || '0,00' }}</span>
        <span class="reviews__count">На основе {{ currentGoodReviews.length || 0 }} отзывов</span>
      </div>
      <dl class="reviews__components">
        <div class="reviews__item" v-for="grade in Object.keys(reviewComponents)">
          <dt>{{ reviewComponents[grade] }}</dt>
          <span class="reviews__line">
            <span
              class="reviews__progress"
              :style="`width: ${(getGradeAverageValue(grade) / 5) * 100}%`"
            ></span>
          </span>
          <dd>{{ getGradeAverageValue(grade) }}</dd>
        </div>
      </dl>
    </div>
    <div class="reviews__cards reviews-cards">
      <h2 class="reviews-cards__title">Все отзывы</h2>
      <p v-if="!currentGoodReviews.length">Отзывов пока нет 😅</p>
      <ul v-else class="reviews-cards__list">
        <li class="reviews-cards__card card" v-for="review in currentGoodReviews" :key="review.id">
          <div class="card__info">
            <h3 class="card__title">{{ review.title }}</h3>
            <ul class="card__raiting-list">
              <li class="card__raiting-item">
                Сборка: {{ review.grades.buildQuality }}
              </li>
              <li class="card__raiting-item">Надежность: {{ review.grades.safety }}</li>
              <li class="card__raiting-item">Внешний вид: {{ review.grades.appearance }}</li>
              <li class="card__raiting-item">Производительность: {{ review.grades.performance }}</li>
              <li class="card__raiting-item">Цена/качество: {{ review.grades.profitability }}</li>
            </ul>
          </div>
          <p class="card__text">{{ review.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.reviews {
  padding: 10px 15px;
  padding-bottom: 25px;
  @include first-black-normal;

  &__total {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 40px;
  }

  &__total-value {
    display: block;
    text-align: center;
    font-size: 100px;
    font-weight: 700;
    line-height: 130%;
  }

  &__count {
    display: block;
    text-align: center;
  }

  &__item {
    display: grid;
    grid-template-columns: 200px 1fr 70px;
    column-gap: 10px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    & dd {
      margin: 0;
    }
  }

  &__line {
    display: block;
    border: 2px solid $lightGray-text-aside;
  }

  &__progress {
    display: block;
    height: 100%;
    background-color: $plum-all-main;
  }
}

.reviews-cards {
  &__title {
    margin: 0;
    margin-bottom: 30px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
}

.card {
  font-size: 16px;

  &__info {
    margin-bottom: 10px;
  }

  &__title {
    margin: 0;
    font-size: 18px;
  }

  &__raiting-list {
    display: flex;
    column-gap: 10px;
    margin: 0;
    padding: 0;
    color: $darkGray-text-aside;
    font-size: 14px;
    list-style-type: none;
  }

  &__text {
    margin: 0;
  }
}
</style>