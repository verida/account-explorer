import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home, ProfileDetails, Credential, Connect } from "@/views";

import { CONNECT, CREDENTIAL, HOME, USER_PROFILE_REDIRECT } from "@/constant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: HOME,
    component: Home,
  },
  {
    path: "/did/:did",
    name: USER_PROFILE_REDIRECT,
    component: ProfileDetails,
  },
  {
    path: "/credential",
    name: CREDENTIAL,
    meta: { field: "info" },
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
