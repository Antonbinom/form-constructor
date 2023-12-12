<template lang="pug">
router-link.link-btn(:to="href") {{ text }}
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss">
.button {
  padding: 16px 20px;
  min-width: 160px;
  border-radius: var(--radius);
  &.primary {
    background-color: var(--primary);
    color: var(--white);
  }
   &.secondary {
    padding-block: 15px;
    background-color: var(--white);
    color: var(--primary);
    border: 1px solid var(--primary);
  }
}
</style>