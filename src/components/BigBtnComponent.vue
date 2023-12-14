<template lang="pug">
button.big-btn(
  @click='click'
  )
  span.big-btn__text {{ name }}
  img(src="@/assets/img/plus.svg")
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
})
const emit = defineEmits(['action']);

const click = () => {
    emit("action");
}
</script>

<style lang="scss">
.big-btn {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  // width: 355px;
  color: var(--primary);
  border: 1px dashed var(--primary);
  border-radius: var(--radius);
  background-color: var(--white);
}
</style>