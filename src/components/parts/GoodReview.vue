<script setup>
const props = defineProps({
  review: {
    required: true,
    type: Object,
  }
})
</script>

<template>
  <li class="review-card">
    <div class="review-card__info">
      <h3 class="review-card__title">
        <span class="review-card__recommendation">{{ props.review.isRecommended ? '✔️' : '❌' }}</span>
        {{ props.review.title }}
      </h3>
      <ul class="review-card__list">
        <li class="review-card__item">Сборка: {{ props.review.grades.buildQuality }}</li>
        <li class="review-card__item">Надежность: {{ props.review.grades.safety }}</li>
        <li class="review-card__item">Внешний вид: {{ props.review.grades.appearance }}</li>
        <li class="review-card__item">Производительность: {{ props.review.grades.performance }}</li>
        <li class="review-card__item">Цена/качество: {{ props.review.grades.profitability }}</li>
      </ul>
    </div>
    <p class="review-card__text">{{ props.review.text }}</p>
  </li>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.review-card {
  font-size: 16px;

  &__info {
    margin-bottom: 5px;
  }

  &__title {
    margin: 0;
    font-size: 18px;
  }

  &__list {
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