<template lang="pug">
.select
  label(:for="data.id") {{ data.name }}
  select.select(
    :id="data.id"
    :required="data.isRequired"
    @change="handleInput"
      )
    option(
      v-for="option in data.options"
      :key="option"
      :value="option.value"
      :selected="option.selected"
      :disabled="option.disabled"
      :hidden="option.hidden"
    ) {{ option.name }}
</template>

<script setup>

const props = defineProps({
  data: Object,
});

const emit = defineEmits(['change-select']);

const handleInput = (event) => {
  emit("change-select");
}
</script>

<style lang="scss">
.select {
  display: flex;
  flex-direction: column;
  & label {
    margin-bottom: 4px;
  }
}
</style>
