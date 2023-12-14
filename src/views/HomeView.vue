<template lang="pug">
.home
  Sidebar.home-side
    h1.home-title.h1 Авторизация
    .home-inputs
      Input.home-inputs__item(
        v-for="(input, index) in inputs"
        key="index"
        :input-value="input.value"
        :placeholder="input.placeholder"
        :type="input.type"
        :isRequired="input.required"
        @updateInput="updateInputValue($event, index)"
        )
    Button.home-btn(
      @action="login(inputs[0].value, inputs[1].value) || validateFields()"
      name="Войти"
      )
    .home-footer
      p.home-footer__contact Если возникла проблема, то можете <br> написать&nbsp
        a.home-footer__link(href="mailto:someone@yoursite.com") Алёне из Сибтеха
      span С любовью, ваш&nbsp
      a.home-footer__link(href="mailto:someone@yoursite.com") Сибтех
</template>

<script setup>
import { ref } from "vue";
import useAuth from '@/methods/authMethods.js'
import Sidebar from "@/components/layouts/SidebarComponent.vue";
import Input from "@/components/InputComponent.vue";
import Button from "@/components/ButtonComponent.vue";

const {login} = useAuth()
const inputs = ref([
  { value: "", placeholder: 'Логин', type: 'text', required: true, isValid: true },
  { value: "", placeholder: 'Пароль', type: 'password', required: true, isValid: true }
]);

const updateInputValue= (value, index)=> {
  inputs.value[index].value = value
}

const validateFields = () => {
  inputs.value.forEach(input => {
    if(!input.value) {
      input.placeholder = 'Введите ' + input.placeholder.toLowerCase().replace('введите ', '')
    }
  })
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
    padding: 80px 95px 62px 164px;
    width: 610px;
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
