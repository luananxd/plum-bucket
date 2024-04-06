<script setup>
import { createGoodPrice, createGoodSmallDescription } from '../../common/helpers';

const props = defineProps({
  good: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['delete-good', 'update-good-quantity']);
</script>

<template>
  <li class="cart-item">
    <img class="cart-item__photo" :src="`src/assets/img/goods${props.good.imagePath}`" width="100" height="100"/>
    <div class="cart-item__content">
      <div class="cart-item__info">
        <h3 class="cart-item__title">{{ props.good.brand }} {{ props.good.model }}</h3>
        <p class="cart-item__description">{{ createGoodSmallDescription(props.good.specifications)  }}</p>
      </div>
      <AppCounter
        class="cart-item__counter"
        :counter-value="good.quantity"
        @change-counter="(value) => emit('update-good-quantity', value)"
      ></AppCounter>
      <div class="cart-item__wrapper">
        <Transition name="total">
          <strong :key="props.good.quantity" class="cart-item__price">{{ createGoodPrice(props.good.price * props.good.quantity) }} ₽</strong>
        </Transition>
        <AppButton
          class="cart-item__delete"
          useStyles
          :fontSize="16"
          @click="() => emit('delete-good', props.good.id)"
        >Удалить</AppButton>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.cart-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #ffffff;
  @include first-black-normal;

  &__image {
    width: 60px;

  }

  &__content {
    flex-grow: 1;
    display: flex;
    align-items: top;
    padding: 20px;
    background-color: $gray-background-main;
  }

  &__info {
    width: 500px;
    margin-right: 20px;
  }

  &__title {
    margin: 0;
    margin-bottom: 10px;
  }

  &__description {
    margin: 0;
    color: $darkGray-text-aside;
  }

  &__counter {
    margin-top: 20px;
    margin-right: 50px;
  }

  &__price {
    display: block;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 20px;
  }
}

.counter {
  display: flex;
  height: 30px;

  &__button {
    width: 30px;
    height: 30px;
    background-color: $plum-all-main;
    color: $white-text-main;
    border: none;
    border-radius: 50%;
  }

  &__field {
    width: 40px;
    font-size: 16px;
    text-align: center;
    background-color: transparent;
    border: none;
  }
}

.total-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.total-leave-active {
  position: absolute;
}

.total-enter-to {
  opacity: 1;
  transition-duration: 300ms;
}
</style>