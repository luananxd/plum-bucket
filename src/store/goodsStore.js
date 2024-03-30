import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useReviewsStore } from './reviewsStore';

import goodsJSON from '../common/data/goods.json';

export const useGoodsStore = defineStore('goodsStore', () => {
  const sortType = ref('По умолчанию');
  const normalizeGoods = computed(() => {
    const reviewsStore = useReviewsStore();
    const goods = goodsJSON;
    goods.forEach((good) => {
      good.rate = reviewsStore.getTotalGrade(good.id);
      good.reviewsCount = reviewsStore.getReviews(good.id).length
    })
    return goods;
  });


  
  const getGood = (goodId) => {
    return normalizeGoods.value.find((good) => good.id === goodId);
  }

  const getCurrentCategoryGoods = (categoryName) => {
    return normalizeGoods.value.filter((good) => good.category === categoryName);
  }

  const sortFunction = computed(() => {
    switch(sortType.value) {
      case 'По возрастанию цены': 
        return (a, b) => a.price - b.price;
      case 'По убыванию цены': 
        return (a, b) => b.price - a.price;
      case 'Высокий рейтинг': 
        return (a, b) => b.rate - a.rate;
      case 'Много отзывов': 
        return (a, b) => b.reviewsCount - a.reviewsCount;
      default: 
        return (a, b) => a.id - b.id;
    }
  })

  return {
    normalizeGoods,
    sortType,
    sortFunction,
    getGood,
    getCurrentCategoryGoods,
  }
});
