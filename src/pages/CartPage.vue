<script setup>
import { useCartStore } from '../store/cartStore';
import { createGoodPrice } from '../common/helpers';
import CartItem from '../components/parts/CartItem.vue';

const cartStore = useCartStore();

const deleteGood = (goodId) => {
  cartStore.setGoodQuantity(goodId, 0);
}

</script>

<template>
  <section class="cart">
    <h2 class="cart__title">Корзина</h2>
    <p v-if="!cartStore.cart.length" class="cart__empty">Ваша корзина пуста 😔</p>
    <ul v-else class="cart__list">
      <CartItem class="cart__item"
        v-for="good in cartStore.cart"
        :key="good.id"
        :good="good"
        @delete-good="deleteGood"
        @update-good-quantity="(value) => cartStore.setGoodQuantity(good.id, value)"
      >
      </CartItem>
    </ul>
    <Transition v-if="cartStore.cart.length" name="total">
      <span class="cart__total" :key="cartStore.total">
        Общая сумма: {{ createGoodPrice(cartStore.total) }} ₽
      </span>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.cart {
  padding: 60px 0;

  &__title {
    margin: 0;
    margin-bottom: 40px;
  }

  &__empty {
    font-size: 20px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__total {
    display: block;
    margin-top: 30px;
    font-size: 24px;
    font-weight: 700;
  }
}

.total-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.total-enter-to {
  opacity: 1;
  transition-duration: 300ms;
}
</style>