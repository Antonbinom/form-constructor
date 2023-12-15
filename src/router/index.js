import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/forms",
    name: "forms",
    component: () => import("../views/FormsView.vue")
  },
  {
    path: "/forms/:id",
    name: "form-preview",
    component: () => import("../views/FormPreviewPage.vue")
  },
  {
    path: '/form-constructor',
    name: 'form constructor',
    component: () => import("../views/FormConstructorView.vue")
  },
  {
    path: '/form-constructor/:id',
    name: 'edit form',
    component: () => import("../views/FormConstructorView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
