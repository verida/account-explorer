import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { USER_PROFILE } from "../constant/index";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/did",
    name: "Redirect",
    redirect: "/"
  },
  {
    path: "/did/:did",
    name: USER_PROFILE,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfileDetails.vue"),
  },
  {
    path: "/(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/ProfileDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
