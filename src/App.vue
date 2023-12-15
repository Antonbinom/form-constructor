<template lang="pug">
Container
  router-view
</template>

<script setup>
import Container from '@/components/layouts/ContainerComponent.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

onMounted(()=> {
  if(localStorage.getItem('forms')) {
    store.dispatch('setForms', JSON.parse(localStorage.getItem('forms')))
  }
})
</script>
