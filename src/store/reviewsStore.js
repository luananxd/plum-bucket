import { defineStore } from 'pinia';
import reviewsJSON from '../common/data/reviews.json';

export const useReviewsStore = defineStore('reviewsStore', () => {
  const getReviews = (goodId) => {
    return reviewsJSON.filter((review) => review.goodId === goodId);
  }

  const getGoodReviewsGrades = (goodId) => {
    const currentReviews = getReviews(goodId);
    let grades = new Map();
    currentReviews.forEach((review) => {
      for(const [key, value] of Object.entries(review.grades)) {
        grades.set(key, (grades.get(key) || 0) + value);
      }
    });
    for(let key of grades.keys()) {
      grades.set(key, (grades.get(key) / currentReviews.length).toFixed(2))
    }
    return grades;
  }

  const getTotalGrade = (goodId) => {
    const reviewGrades = getGoodReviewsGrades(goodId);
    let total = 0;
    for(let value of reviewGrades.values()) {
      total += +value;
    }
    return (total / reviewGrades.size || 0).toFixed(2);
  }

  return {
    getReviews,
    getGoodReviewsGrades,
    getTotalGrade,
  }
})