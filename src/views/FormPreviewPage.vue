<template lang="pug">
.form-preview
  Sidebar.forms-side
      router-link.forms-side__back(to="/forms") Назад к списку форм

  .preview
    .preview-wrapper(v-if="form")
      h2.h2.preview-title {{ form.name }}
      .preview-inputs
        Input.preview-inputs__item(
          v-for="(input, index) in form.fields"
          key="index"
          :input-value="input.value"
          :placeholder="input.value || input.placeholder"
          :type="input.type"
          :isRequired="input.required"
          )
      .preview-checkboxes(v-if="form.checkboxes?.length")
        .preview-checkboxes__item(
          v-for="checkbox in form.checkboxes"
          :key="checkbox.id"
          )
          Checkbox(
            :isChecked="checkbox.isChecked"
            @checkbox-change="checkbox.isChecked = !checkbox.isChecked"
            )
          p {{ checkbox.text }}
      .preview-selects(v-if="form.selects?.length")
        Select(
          v-for="(select, index) in form.selects"
          :data="select"

          )
      Button.preview-btn(
        name="Отправить"
        )
</template>

// <script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Sidebar from "@/components/layouts/SidebarComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import Input from "@/components/InputComponent.vue";
import Checkbox from "@/components/CheckboxComponent.vue";
import Select from "@/components/SelectComponent.vue";


import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();

const form = computed(()=> {
  return store.getters.getCurrentForm
})

onMounted(() => {
  if(!localStorage.getItem('user')) {
    router.push('/')
  }
  store.dispatch('setCurrentFormId', route.params.id)
})

</script>

<style lang="scss">
.forms {
  &-side {
    &__back {
      margin-bottom: 56px;
      &::before {
      content: url('@/assets/img/arrow-left.svg');
      display: inline-block;
      margin-right: 8px;
    }
    }
    &__btn:first-child {
      margin-bottom: 10px;
    }
  }
}
.form-preview {
  display: flex;
  height: 100vh;
}
.preview {
  width: 100%;
  padding: 100px;
  background-color: var(--primary);
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 349px;
    padding: 40px;
    margin-inline: auto;
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
  &-selects {
    & .select {
      margin-bottom: 6px;
    }
  }
  &-checkboxes {
    &__item {
      display: flex;
      margin-bottom: 6px;

      & .checkbox {
        margin-right: 16px;
      }
      & p {
        word-break: break-all;
        font-size: 14px;
        font-weight: 400;
        color: var(--text)
      }
    }

  }
  &-btn {
    margin-top: 50px;
  }
}
</style>
