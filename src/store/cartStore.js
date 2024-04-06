import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  const cart = reactive([]);

  const total = computed(() => {
    return cart.reduce((sum, item) => {
      return sum += item.price * item.quantity;
    }, 0)
  })

  const isInCart = (goodId) => {
    return cart.some((good) => good.id === goodId);
  }

  const getGoodToCart = (good) => {
    const goodToCart = {
      ...good,
      quantity: 1,
    };

    if(isInCart(goodToCart.id)) {
      const index = cart.findIndex((good) => good.id === goodToCart.id);
      cart[index].quantity += 1;
    } else {
      cart.push(goodToCart);
    }
  }

  const setGoodQuantity = (goodId, quantity) => {
    const index = cart.findIndex((good) => good.id === goodId);

    if(quantity > 0) {
      cart[index].quantity = quantity;
    } else {
      cart.splice(index, 1);
    }
  }

  return {
    cart,
    total,
    isInCart,
    getGoodToCart,
    setGoodQuantity,
  }
});