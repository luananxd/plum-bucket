<script setup>
const props = defineProps({
  counterValue: {
    required: true,
    type: Number,
  }
});
const emit = defineEmits(['change-counter']);

const increaseCounterValue = () => {
  emit('change-counter', props.counterValue + 1)
}

const decreaseCounterValue = () => {
  emit('change-counter', props.counterValue - 1)
}
</script>

<template>
  <div class="counter">
    <button
      class="counter__button"
      type="button"
      @click="decreaseCounterValue"
      :disabled="props.counterValue < 1"
    >-</button>
    <input class="counter__field" type="text" :value="props.counterValue" readonly>
    <button
      class="counter__button"
      type="button"
      @click="increaseCounterValue"
    >+</button>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

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
    
    &:hover {
      background-color: $plum-all-hover;
    }

    &:active {
      opacity: 0.7;
    }
  }

  &__field {
    width: 40px;
    font-size: 16px;
    text-align: center;
    background-color: transparent;
    border: none;
  }
}
</style>