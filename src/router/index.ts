import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ProfileDetails from "../views/ProfileDetails.vue";
import Credential from "../views/Credential.vue";

import { USER_PROFILE } from "../constant/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:did",
    name: USER_PROFILE,
    component: ProfileDetails,
  },
  {
    path: "/credential",
    name: "credential",
    component: Credential,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
