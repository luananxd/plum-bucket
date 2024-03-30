<script setup>
import { useReviewsStore } from '../../store/reviewsStore';
import reviewComponentsMap from '../../common/maps/reviewComponents.json';
import GoodReview from '../parts/GoodReview.vue';

const reviewsStore = useReviewsStore();
const props = defineProps({
  goodId: String,
});

const currentGoodReviews = reviewsStore.getReviews(props.goodId);
const reviewsGrades = reviewsStore.getGoodReviewsGrades(props.goodId);

const gradeToPercent = (grade) => (reviewsGrades.get(grade) / reviewsGrades.size) * 100;
</script>

<template>
  <div class="reviews">
    <div class="reviews__total">
      <div class="reviews__info">
        <span class="reviews__total-value">{{ reviewsStore.getTotalGrade(props.goodId) }}</span>
        <span class="reviews__count">На основе {{ currentGoodReviews.length || 0 }} отзывов</span>
      </div>
      <dl class="reviews__components">
        <div class="reviews__item" v-for="grade in reviewsGrades.keys()">
          <dt>{{ reviewComponentsMap[grade] }}</dt>
          <span class="reviews__line">
            <span class="reviews__progress" :style="`width: ${gradeToPercent(grade) || 0}%`"></span>
          </span>
          <dd>{{ reviewsGrades.get(grade) || '0.00' }}</dd>
        </div>
      </dl>
    </div>
    <div class="reviews__cards reviews-cards">
      <h2 class="reviews-cards__title">Все отзывы</h2>
      <p v-if="!currentGoodReviews.length">Отзывов пока нет 😅</p>
      <ul v-else class="reviews-cards__list">
        <GoodReview
          v-for="review in currentGoodReviews"
          :key="review.id"
          :review="review"
        ></GoodReview>
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
    row-gap: 30px;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
}
</style>