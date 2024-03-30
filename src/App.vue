<script setup>
// Components
import AppLayout from './layouts/AppLayout.vue';
</script>

<template>
  <h1 class="app__title">Plum Bucket - магазин топовой электроники</h1>
  <AppLayout></AppLayout>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

.app__title {
  display: none;
}
</style>