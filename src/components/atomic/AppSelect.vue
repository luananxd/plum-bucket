<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  document.addEventListener('click', closeSelectOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeSelectOutside);
});

const model = defineModel();
const props = defineProps({
  options: {
    required: true,
    type: Array,
  },
})

const customSelect = ref(null);
const isOpen = ref(false);

const closeSelectOutside = (event) => {
  if(!customSelect.value.contains(event.target)) {
    isOpen.value = false;
  }
}
</script>

<template>
  <div
    class="select"
    :class="{ 'select--open': isOpen }"
    @click.self="isOpen = !isOpen"
    ref="customSelect"
  >
    {{ model }}
    <ul class="select__list" v-if="isOpen">
      <li v-for="option in props.options">
        <label
          class="select__option"
          :class="{ 'select__option--active': model === option }"
        >
          <input
            class="visually-hidden"
            type="radio"
            :value="option"
            v-model="model"
            @change="isOpen = false"
          >
          <span class="select__text">{{ option }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';

.select {
  position: relative;
  padding: 5px 10px;
  width: 200px;
  background-color: $white-background-main;
  @include first-black-normal;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 20px;
    height: 10px;
    background-image: url('../../assets/img/icons/select-arrow.svg');
    background-size: 100% 100%;
  }

  &--open::after {
    top: 10px;
    transform: rotate(90deg);
  }

  &__list {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    background-color: $gray-background-main;
    list-style-type: none;
    @include first-black-normal;
  }

  &__option {
    display: block;
    padding: 5px 10px;
    cursor: pointer;

    &--active {
      background-color: $plum-all-main;
      color: $white-text-main;
    }
  }
}
</style>