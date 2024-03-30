<script setup>
import { createGoodSmallDescription, createGoodPrice } from '../../common/helpers';

const props = defineProps({
  good: {
    required: true,
    type: Object,
  },
  goodLink: {
    required: true,
    type: String,
  }
})
</script>

<template>
<li class="good-card">
  <ul class="good-card__promo promo">
    <li v-for="promo in props.good.promos" class="promo__chips">
      {{ promo }}
    </li>
  </ul>
  <img
    class="good-card__image"
    :src="`src/assets/img/goods${props.good.imagePath}`"
    :alt="`${props.good.brand} ${props.good.model}`"
    width="235"
    height="235"
  >
  <div class="good-card__info">
    <div class="good-card__header">
      <RouterLink class="good-card__link" :to="`${props.goodLink}/description`">
        <h3 class="good-card__title">{{ props.good.brand }} {{ props.good.model }}</h3>
      </RouterLink>
      <RouterLink class="good-card__rate" :to="`${props.goodLink}/reviews`">
        {{ good.rate }}
      </RouterLink>
    </div>
    <p class="good-card__description">
      {{ createGoodSmallDescription(props.good.specifications) }}
    </p>
    <div class="good-card__order">
      <AppButton class="good-card__button" useStyles>В корзину</AppButton>
      <strong>{{ createGoodPrice(props.good.price) }} ₽</strong>
    </div>
  </div>
</li>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.good-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 235px;
  background-color: $gray-background-main;
  @include first-black-normal;

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

  &__header {
    margin-bottom: 10px;
  }

  &__title {
    margin: 0;
    font-size: 16px;
  }

  &__rate {
    position: relative;
    color: inherit;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -17px;
      transform: translateY(-60%);
      width: 15px;
      height: 15px;
      background-image: url('../../assets/img/icons/star.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  &__link {
    color: inherit;
    text-decoration: none;
  }

  &__description {
    flex-grow: 2;
    margin: 0;
    margin-bottom: 15px;
    color: $darkGray-text-aside;
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
</style>