<template>
  <div class="home">
    <section class="home__welcome">
      <h2 class="home__title">Добро пожаловать в <strong>Plum Bucket</strong> — самый дружелюбный магазин современной электроники!</h2>
    </section>
    <section class="home__advantages advantages">
      <dl class="advantages__list">
        <div class="advantages__item advantages__item--guarantee">
          <dt>Гарантия</dt>
          <dd>Минимум годовая гарантия на каждый товар, который продается в нашем магазине</dd>
        </div>
        <div class="advantages__item advantages__item--delivery">
          <dt>Быстрая доставка</dt>
          <dd>Минимум годовая гарантия на каждый товар, который продается в нашем магазине</dd>
        </div>
        <div class="advantages__item advantages__item--refund">
          <dt>Легкий возврат</dt>
          <dd>Минимум годовая гарантия на каждый товар, который продается в нашем магазине</dd>
        </div>
        <div class="advantages__item advantages__item--super">
          <dt>Мы просто супер!</dt>
          <dd>Минимум годовая гарантия на каждый товар, который продается в нашем магазине</dd>
        </div>
      </dl>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.home {
  padding-top: 60px;
  padding-bottom: 60px;

  &__welcome {
    margin-bottom: 50px;
  }

  &__title {
    margin: 0;
    font-weight: 400;
    font-size: 36px;
    text-align: center;

    & strong {
      color: $plum-all-main;
    }
  }
}

.advantages {
  padding: 30px;
  padding-top: 80px;
  color: $white-text-main;
  background-color: $plum-all-main;

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  &__item {
    position: relative;

    & dt {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 700;
    }

    & dd {
      margin: 0;
      padding: 0;
    }

    &::before {
      content: '';
      position: absolute;
      top: -60px;
      left: 0;
      width: 50px;
      height: 50px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--guarantee::before {
      background-image: url('../assets/img/icons/guarantee.png');
    }

    &--delivery::before {
      background-image: url('../assets/img/icons/delivery.png');
    }

    &--refund::before {
      background-image: url('../assets/img/icons/refund.png');
    }

    &--super::before {
      background-image: url('../assets/img/icons/smile.png');
    }
  }
}
</style>