<template lang="pug">
button.button(
  @click='click'
  :class="type"
  ) {{ name }}
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'primary'
  }
})
const emit = defineEmits(['action']);

const click = () => {
    emit("action");
}
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
  &.borderless {
    padding: 0;
    background-color: transparent;
    color: var(--primary);
    border: none
  }
}
</style>