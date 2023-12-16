<template lang="pug">
.forms-list(:style="{height: formsListHeight + 'px'}")
  h2.h2(v-if="!getForms.length") Создайте форму и она появится здесь
  .forms-list__item(
    v-for="(form, index) in getForms"
    :key="index"
    )
    .forms-list__item-info
      h2.h2.forms-list__item-title {{ form.name }}
      span.forms-list__item-author Автор: {{ form.author }}
      span.forms-list__item-date Дата создания: {{ form.created }}
    .forms-list__item-buttons
      Button(
        @action="$router.push(`forms/editor/${form.id}`)"
        name="Редактировать"
        type="secondary"
        )
      Button(
        name="Удалить"
        type="borderless"
        @action="removeForm(form.id)"
        )
</template>

// <script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Button from "@/components/ButtonComponent.vue";
import { useStore } from "vuex";

const store = useStore();

const formsListHeight = ref('')

const getForms = computed(()=> {
  return store.getters.getForms
})

const removeForm = (id) => {
  store.dispatch('deleteForm', id)
}
const handleResize = () => {
  const windowHeight = window.innerHeight;
  formsListHeight.value = windowHeight - 270;
}

onMounted(() => {
window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
window.removeEventListener('resize', handleResize);
})
handleResize()
</script>

<style lang="scss">
.forms {
  &-list {
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &__item {
      display: flex;
      justify-content: space-between;
      padding: 24px;
      margin-bottom: 30px;
      background-color: var(--white);
      border-radius: var(--radius);
      &-info {
        display: flex;
        flex-direction: column;
      }
      &-title {
        margin-bottom: 8px;
      }
      &-author {
        margin-bottom: 58px;
        font-size: 14px;
        color: var(--text)
      }
      &-date {
        font-size: 14px;
        color: var(--text)
      }
      &-buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}
</style>
