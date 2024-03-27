<script setup>
import AppHeader from './AppHeader.vue';
</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <div class="app__wrapper">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style>
.app__wrapper {
  width: 1000px;
  margin: 0 auto;
}
</style>