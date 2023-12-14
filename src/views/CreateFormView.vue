<template lang="pug">
.forms
  Sidebar.forms-side
    router-link.forms-side__back(to="/forms") Назад

    ul.forms-menu
      li.forms-menu__item(
        v-for="(item, index) in menuItems"
        :key="item.id"
        :class="item.isActive ? 'active' : ''"
        @click="!item.isActive && switchMenu(index)"
        )
        router-link(to="") {{ item.name }}
    .forms-side__footer
      Button.forms-side__btn(
        name="Скрипт"
        type="secondary"
        @action="saveForm"
        )
      Button.forms-side__btn(name="Сохранить" type="primary")
  .constructor
    .constructor-header
      pre {{ form }}
      h1.h1 Поля
    .constructor-hidden__fields
      h2.constructor-title.h2 Скрытые поля
      BigBtn(name="Добавить поле")
    .constructor-fields
      h2.constructor-title.h2 Поля
      .constructor-fields__item(
        v-for="(field, index) in form.fields"
        :key="field.id"
        )
        .constructor-fields-header
          span {{ 'Инпут' }}
          Button(
            name="Удалить поле"
            type="borderless"
            @action="removeField('fields', field.id)"
            )
        Input.constructor-fields__input(
          :input-value="field.value"
          placeholder="Название для поля"
          type="text"
          @updateInput="form.fields[index].value = $event"
        )
        .constructor-fields__required
          Checkbox(
            :isChecked="field.required"
            @checkbox-change="field.required = !field.required"
            )
          span Сделать поле обязательным
    BigBtn(
        @action="addField"
        name="Добавить поле"
        )
    .constructor-fields
      h2.constructor-title.h2 Чекбоксы
      .constructor-fields__item(
        v-for="(checkbox, index) in form.checkboxes"
        :key="checkbox.id"
        )
        .constructor-fields-header
          span {{ 'Секбокс' }}
          Button(
            name="Удалить чекбокс"
            type="borderless"
            @action="removeField('checkboxes', checkbox.id)"
            )
        Input.constructor-fields__input(
          :input-value="checkbox.text"
          placeholder="Текст для чекбокса"
          type="text"
          @updateInput="form.checkboxes[index].text = $event"
        )
        .constructor-fields__required
          Checkbox(
            :isChecked="checkbox.required"
            @checkbox-change="checkbox.required = !checkbox.required"
            )
          span Сделать чекболкс обязательным
    BigBtn(
      @action="addCheckbox"
      name="Добавить чекбокс"
      )
    .constructor-footer

      BigBtn(
        @action="addList"
        name="Добавить список"
        )


  .preview
    .preview-wrapper
      h2.h2.preview-title {{ form.name }}
      .preview-inputs
        Input.preview-inputs__item(
          v-for="(input, index) in form.fields"
          key="index"
          :input-value="input.value"
          :placeholder="input.placeholder"
          :type="input.type"
          :isRequired="input.required"
          @updateInput="form.fields[index].value = $event"
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
      Button.preview-btn(
        name="Отправить"
        )
</template>

// <script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Sidebar from "@/components/layouts/SidebarComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import BigBtn from "@/components/BigBtnComponent.vue";
import FormsList from "@/components/FormsListComponent.vue";
import Input from "@/components/InputComponent.vue";
import Checkbox from "@/components/CheckboxComponent.vue";
import generateUniqueId from '@/methods/generateUniqueId.js'
import { useStore } from "vuex";
//
const store = useStore();

const menuItems = ref([
  { name: "Тип формы", isActive: false },
  { name: "Сущности",  isActive: false },
  { name: "Поля",  isActive: true },
  { name: "Правила показа полей",  isActive: false },
  { name: "Другие настройки",  isActive: false },
]);

const form = ref({});

const addField = () => {
  const id = generateUniqueId('fd')
  const newField = {
    id,
    name: "",
    value: "",
    placeholder: 'Название для поля',
    type: 'text',
    required: false
  };
  form.value.fields.push(newField)
}

const addList = () => {

}

const addCheckbox = () => {
  const id = generateUniqueId('cb');
  const newCheckbox =
    {
    id,
    isChecked: false,
    required: false,
    text: ''
  };
  form.value.checkboxes.push(newCheckbox)
}

const removeField = (type, id) => {
  form.value[type] = form.value[type].filter(field => field.id !== id)
}

const saveForm = () => {
  if(!form.value.fields.length) return
  store.dispatch('setCurrentForm', form)
}

const switchMenu = (index) => {
  menuItems.value.forEach(item => {
    item.isActive = false ;
  })
  menuItems.value[index].isActive = true
}

onMounted(() => {
  form.value = {
  id: generateUniqueId('fm'),
  name: 'Форма регистрации участников',
  fields: [],
  checkboxes: []
}
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
.constructor {
    width: 100%;
    max-width: 825px;
    padding: 80px 30px;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  &-header {
    margin-bottom: 30px;
  }
  &-hidden {
    &__fields {
      margin-bottom: 50px;
      & .h2 {
        margin-bottom: 30px;
      }

    }
  }
  &-title {
    margin-bottom: 30px;
  }
  &-fields {
    &__item {
      margin-bottom: 30px;
    }
    &-header {
      display: flex;
      margin-bottom: 9px;
      & span {
        color: var(--text);

        &:first-child {
          margin-right: 16px;
        }
      }
      & button {
        margin-left: auto;
        min-width: fit-content;
      }
    }
    &__input.input {
      box-sizing: border-box;
      width: 100%;
      max-width: none;
      margin-bottom: 10px;
      color: var(--black);
      background-color: var(--white)
    }
    &__required {
      display: flex;
      align-items: center;
      & .checkbox {
        margin-right: 10px;
      }
    }
  }
  & .big-btn {
      margin-bottom: 30px;
      width: 100%;
  }
}



.preview {
  padding: 100px;
  background-color: var(--primary);
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 349px;
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
  &-checkboxes {
    &__item {
      display: flex;

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
