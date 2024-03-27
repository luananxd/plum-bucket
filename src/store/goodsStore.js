import { reactive } from 'vue';
import  { defineStore } from 'pinia';

import goodsJSON from '../common/data/goods.json';
import reviewsJSON from '../common/data/reviews.json';

export const useGoodsStore = defineStore('goodsStore', () => {
  const allGoods = reactive(goodsJSON);
  const allReviews = reactive(reviewsJSON);

  const getCurrentCategoryGoods = (categoryName) => {
    return allGoods.filter((good) => good.category === categoryName);
  }

  const getGood = (goodId) => {
    return allGoods.find((good) => good.id === goodId);
  }

  const getReviews = (goodId) => {
    return allReviews.filter((review) => review.goodId === goodId);
  }


  return {
    allGoods,
    getCurrentCategoryGoods,
    getGood,
    getReviews,
  }
});
