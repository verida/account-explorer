import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ProfileDetails from "../views/ProfileDetails.vue";
import Credential from "../views/Credential.vue";
import Connect from "../views/Connect.vue";

import { CONNECT, CREDENTIAL, USER_PROFILE } from "../constant/index";
import { LocalRouteGuard } from "@/helpers/RouteGuard";
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
    redirect: "/",
  },
  {
    path: "/did/:did",
    name: USER_PROFILE,
    component: ProfileDetails,
  },
  {
    path: "/credential",
    name: CREDENTIAL,
    meta: { field: "info" },
    beforeEnter: LocalRouteGuard,
    component: Credential,
  },
  {
    path: "/connect",
    name: CONNECT,
    component: Connect,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
