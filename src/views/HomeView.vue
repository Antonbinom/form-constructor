<template lang="pug">
.home
  SideLayout.home-side
    h1.home-title.h1 Авторизация
    .home-inputs
      Input.home-inputs__item(
        v-for="(input, index) in inputs"
        key="index"
        :input-value="input.value"
        :placeholder="input.placeholder"
        :type="input.type"
        @updateInput="updateInputValue($event, index)"
        )
    Button.home-btn(name="Войти")
    .home-footer
      p.home-footer__contact Если возникла проблема, то можете <br> написать&nbsp
        a.home-footer__link(href="mailto:someone@yoursite.com") Алёне из Сибтеха
      span С любовью, ваш&nbsp
      a.home-footer__link(href="mailto:someone@yoursite.com") Сибтех
</template>

<script setup>
import { ref } from "vue";
import SideLayout from "@/components/layouts/SideLayoutComponent.vue";
import Input from "@/components/InputComponent.vue";
import Button from "@/components/ButtonComponent.vue";

const inputs = ref([
  { value: "", placeholder: 'Логин', type: 'text' },
  { value: "", placeholder: 'Пароль', type: 'password' }
]);

const updateInputValue= (value, index)=> {
  inputs.value[index].value = value
}
</script>

<style lang="scss">
.home {
  height: fit-content;
  background-image: url("@/assets/img/auth.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &-side {
    width: 382px;
  }
  &-title {
    margin-bottom: 30px;
  }
  &-inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    &__item:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  &-footer {
    margin-top: 310px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: var(--text2);
    &__link {
      color: var(--primary);
      text-decoration-line: underline;
    }
    &__contact {
      margin-bottom: 8px;
    }
  }
}
</style>
