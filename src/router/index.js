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
    path: '/create-form',
    name: 'create form',
    component: () => import("../views/CreateFormView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
