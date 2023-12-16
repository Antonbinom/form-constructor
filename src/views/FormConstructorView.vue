<template lang="pug">
.forms
  Sidebar.forms-side
    span.forms-side__back(@click="$router.go(-1)") Назад

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
        )
      Button.forms-side__btn(
        name="Сохранить"
        type="primary"
        @action="saveForm"
        )
  .constructor
    .constructor-header
      h1.h1 Поля
    .constructor-fields
      h2.constructor-title.h2 Скрытые поля
      .constructor-fields__item(
        v-for="(field, index) in form.hiddenFields"
        :key="field.id"
        )
        .constructor-fields-header
          span {{ 'Инпут' }}
          Button(
            name="Удалить поле"
            type="borderless"
            @action="removeField('hiddenFields', field.id)"
            )
        Input.constructor-fields__input(
          :input-value="field.value"
          placeholder="Название для поля"
          type="text"
          @updateInput="form.hiddenFields[index].placeholder = $event"
        )
        .constructor-fields__required
          Checkbox(
            :isChecked="field.required"
            @checkbox-change="field.required = !field.required"
            )
          span Сделать поле обязательным
      BigBtn(
        @action="addField('hiddenFields')"
        name="Добавить поле"
        )
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
          @updateInput="form.fields[index].placeholder = $event"
        )
        .constructor-fields__required
          Checkbox(
            :isChecked="field.required"
            @checkbox-change="field.required = !field.required"
            )
          span Сделать поле обязательным
      BigBtn(
          @action="addField('fields')"
          name="Добавить поле"
          )
    .constructor-fields
      h2.constructor-title.h2 Чекбоксы
      .constructor-fields__item(
        v-for="(checkbox, index) in form.checkboxes"
        :key="checkbox.id"
        )
        .constructor-fields-header
          span {{ 'Чекбокс' }}
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
          span Сделать чекбокс обязательным
      BigBtn(
        @action="addCheckbox"
        name="Добавить чекбокс"
        )
    .constructor-fields.constructor-selects
      h2.constructor-title.h2 Списки
      .constructor-fields__item(
        v-for="(select, index) in form.selects"
        :key="select.id"
        )
        .constructor-fields-header
          span {{ 'Список' }}
          Button(
            name="Удалить список"
            type="borderless"
            @action="removeField('selects', select.id)"
            )
        Input.constructor-fields__input(
          :input-value="select.name"
          placeholder="Название списка"
          type="text"
          @updateInput="select.name = $event"
        )
        .constructor-select__option(v-for="option in select.options")
          Input.constructor-select__option-input(
            :input-value="option.name"
            placeholder="Введите название элемента списка"
            type="text"
            @updateInput="option.name = $event"
          )
          Button.constructor-select__option-delete(
            v-if="!option.hidden"
            name="Удалить пункт"
            type="borderless"
            @action="removeOption(index, option.id)"
          )
        BigBtn(
        @action="addOption(index)"
        name="Добавить пункт"
        )
        .constructor-fields__required
          Checkbox(
            :isChecked="select.required"
            @checkbox-change="select.required = !select.required"
            )
          span Сделать список обязательным
      BigBtn(
        @action="addSelect"
        name="Добавить список"
        )

    BigBtn(
          v-if="!form.page"
          name="Добавить страницу формы"
          type="secondary"
          @action="addFormPage()"
          )
    BigBtn(
          v-if="form.page"
          name="Перейти на страницу формы"
          type="secondary"
          :icon="false"
          @action="toFormPage()"
          )
  .preview
    .preview-wrapper
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
      .preview-selects(v-if="form.selects?.length")
        Select(
          v-for="(select, index) in form.selects"
          :data="select"

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
import { ref, onMounted, computed } from "vue";
import Sidebar from "@/components/layouts/SidebarComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import BigBtn from "@/components/BigBtnComponent.vue";
import Input from "@/components/InputComponent.vue";
import Checkbox from "@/components/CheckboxComponent.vue";
import Select from "@/components/SelectComponent.vue";
import { useRoute, useRouter } from "vue-router";

// Methods
import generateUniqueId from '@/methods/generateUniqueId.js'

// Store
import { useStore } from "vuex";
//
const store = useStore()
const route = useRoute()
const router= useRouter()

const menuItems = ref([
  { name: "Тип формы", isActive: false },
  { name: "Сущности",  isActive: false },
  { name: "Поля",  isActive: true },
  { name: "Правила показа полей",  isActive: false },
  { name: "Другие настройки",  isActive: false },
]);

const form = ref({})
const isFormSaved = ref(false)

const addField = (type) => {
  const newField = {
    id: generateUniqueId('fd'),
    value: "",
    placeholder: 'Название для поля',
    type: 'text',
    required: false
  };
  form.value[type].push(newField)
}

const addSelect = () => {
  const newSelect = {
    id: generateUniqueId('sct'),
    name: 'Новый список',
    options: [
      {
        value: '',
        name: 'Выберите значение',
        selected: true,
        disabled: true,
        hidden: true
      },
    ],
    required: false
  };
  form.value.selects.push(newSelect)
}

const addCheckbox = () => {
  const newCheckbox =
    {
    id: generateUniqueId('cb'),
    isChecked: false,
    required: false,
    text: ''
  };
  form.value.checkboxes.push(newCheckbox)
}

const addOption = (index) => {
  const newOption =
    {
    id: generateUniqueId('op'),
    value: "",
    name: "",
    selected: false,
  }
  form.value.selects[index].options.push(newOption)
}


const removeField = (type, id) => {
  form.value[type] = form.value[type].filter(field => field.id !== id)
}

const removeOption = (index, id) => {
  form.value.selects[index].options = form.value.selects[0].options.filter(option => option?.id !== id)
}

const saveForm = () => {
 if(checkFieldsExist()) {
  store.dispatch('addNewForm', form.value)
  isFormSaved.value = true
 }
}

const addFormPage = () => {
  form.value.page = `/forms/${form.value.id}`
}

const toFormPage = () => {
    isFormSaved.value && router.push(form.value.page)
}

const switchMenu = (index) => {
  menuItems.value.forEach(item => {
    item.isActive = false ;
  })
  menuItems.value[index].isActive = true
}

const checkFieldsExist = () => {
  const {fields, checkboxes, selects, hiddenFields} = form.value
  return (hiddenFields.length || fields.length || checkboxes.length || selects.length)
}

onMounted(() => {
  if(route.params.id) {
    store.dispatch('setCurrentFormId', route.params.id)
    form.value = store.getters.getCurrentForm
    isFormSaved.value = true
  } else {
    form.value = {
    id: generateUniqueId('fm'),
    name: 'Форма регистрации участников',
    author: localStorage.getItem('user'),
    created: new Date().toLocaleDateString('en-EN').replace(/\//g,'.'),
    fields: [],
    checkboxes: [],
    selects: [],
    hiddenFields: [],
    page: ''
  }
  }
})
</script>

<style lang="scss">
.forms {
  &-side {
    &__back {
      margin-bottom: 56px;
      cursor: pointer;
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
    &__input {
      &.input {
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        margin-bottom: 10px;
        color: var(--black);
        background-color: var(--white)
      }
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
  &-selects {
    & .constructor-fields__input {
      margin-bottom: 20px;
    }
    .constructor-fields__required {
      margin-top: 20px;
    }
  }
  &-select {
    &__option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      &-input {
        max-width: none;
        flex-grow: 1;
        padding: 10px 30px;
        background-color: var(--white);
        color: var(--black)
      }
      &-delete {
        margin-left: 15px;
        min-width: fit-content;
      }
    }
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
