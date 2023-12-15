<template lang="pug">
.forms
  Sidebar.forms-side
    ul.forms-menu
      li.forms-menu__item(
        v-for="(item, index) in menuItems"
        :key="item.id"
        :class="item.isActive ? 'active' : ''"
        @click="!item.isActive && switchMenu(index)"
        )
        router-link(to="") {{ item.name }}
    .forms-side__footer
      Button.forms-btn(
        name="Выход"
        type="secondary"
        @action="logout()"
        )
  .forms-wrapper
    .forms-header
      h1.h1 Формы
      Button(
        name="Создать форму"
        @action="$router.push('form-constructor')"
        )
    FormsList
</template>

// <script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import useAuth from '@/methods/authMethods.js'
import Sidebar from "@/components/layouts/SidebarComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import FormsList from "@/components/FormsListComponent.vue";

const router = useRouter();
const {logout} = useAuth();

const menuItems = ref([
  { name: "Формы", route: "", isActive: true },
  { name: "Пользователи", route: "", isActive: false },
]);

const forms = ref([
  {
    id: 1,
    title: 'Форма регистрации участников',
    author: 'user1',
    created: '01.01.23'
  },
  {
    id: 2,
    title: 'Форма регистрации участников1',
    author: 'user2',
    created: '02.01.23'
  },
  {
    id: 3,
    title: 'Форма регистрации участников2',
    author: 'user3',
    created: '03.01.23'
  },
  {
    id: 4,
    title: 'Форма регистрации участников3',
    author: 'user4',
    created: '04.01.23'
  },
])

const formsListHeight = ref('')

const switchMenu = (index) => {
  menuItems.value.forEach(item => {
    item.isActive = false ;
  })
  menuItems.value[index].isActive = true
}

const removeForm = (index) => {
  forms.value.splice(index, 1)
}

const handleResize = () => {
  const windowHeight = window.innerHeight;
  formsListHeight.value = windowHeight - 270;
}

onMounted(() => {
  if(!localStorage.getItem('user')) {
    router.push('/')
  }

window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
window.removeEventListener('resize', handleResize);
})
handleResize()
</script>

<style lang="scss">
.forms {
  display: flex;
  height: 100vh;
  background-color: var(--gray);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &-side {
    width:420px;
    padding: 80px 95px;
    &__footer {
      margin-top: auto;
    }
  }
  &-menu {
    &__item {
      margin-bottom: 16px;
      &.active {
        color: var(--primary)
      }
    }
  }
  &-btn {
    width: max-content;
  }
  &-wrapper {
    width: 100%;
    max-width: 825px;
    padding: 80px 30px;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }
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
