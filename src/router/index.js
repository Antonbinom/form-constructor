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
    name: "preview",
    component: () => import("../views/FormPreviewView.vue")
  },
  {
    path: '/forms/constructor',
    name: 'constructor',
    component: () => import("../views/FormConstructorView.vue")
  },
  {
    path: '/forms/editor/:id',
    name: 'edit',
    component: () => import("../views/FormConstructorView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
