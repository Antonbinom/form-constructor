<template lang="pug">
input.input(
  :value="inputValue"
  @input="handleInput"
  :maxlength="maxInputLength"
  :type="getInputType"
  :placeholder="placeholder"
  :required="isRequired"
    )
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  placeholder: {
        type: String,
        default: "Введите значение",
      },
      inputValue: {
        type: String,
      },
      inputType: {
        type: String,
        default: "text",
      },
       isRequired: {
        type: Boolean,
        default: false,
      },
});

const emit = defineEmits(['updateInput']);

  const getInputLength = computed(() =>{
    return props.inputValue.length;
  });

const handleInput = (event) => {
  emit("updateInput", event.target.value);
}
</script>

<style lang="scss">
.input {
  max-width: 350px;
  padding: 30px;
  max-height: 70px;
  color: var(--text);

  background-color: var(--gray);
  border-radius: var(--radius);
  border: none;

  &:focus {
    outline: none;
  }
}
</style>
