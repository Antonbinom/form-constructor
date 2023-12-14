<template lang="pug">
.preview
  .preview-wrapper
    h2.h2.preview-title Форма регистрации участников
    .preview-inputs
      Input.preview-inputs__item(
        v-for="(input, index) in inputs"
        key="index"
        :input-value="input.value"
        :placeholder="input.placeholder"
        :type="input.type"
        :isRequired="input.required"
        @updateInput="updateInputValue($event, index)"
        )
    .preview-agreement
      Checkbox(:isChecked="isChecked" @checkbox-change="isChecked = !isChecked")
      p Нажимая кнопку «Отправить», я принимаю условия политики конфиденциальности
    Button.preview-btn(
      name="Отправить"
      )
</template>

<script setup>

const props = defineProps({
  inputs: {
    type: Array
  }
})
</script>

<style lang="scss">
.preview {
  padding: 100px;
  background-color: var(--primary);
  &-wrapper {
    display: flex;
    flex-direction: column;
    padding: 40px;
    border-radius: var(--radius);
    background-color: var(--white);

  }
  &-title {
    margin-bottom: 30px;
  }
  &-inputs {
    margin-bottom: 30px;
    &__item {
      margin-bottom: 10px;
    }
  }
  &-agreement {
    display: flex;

    & .checkbox {
      margin-right: 16px;
    }
    & p {
      font-size: 14px;
      font-weight: 400;
      color: var(--text)
    }
  }
  &-btn {
    margin-top: 50px;
  }
}
</style>