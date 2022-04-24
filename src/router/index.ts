import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeUI from "../views/Home.vue";
import ProfileUI from "../views/ProfileDetails.vue";
import RewardsUI from "../views/Rewards.vue";
import CredentialUI from "../views/Credential.vue";
import ConnectUI from "../views/Connect.vue";

import { CONNECT, CREDENTIAL, REWARDS, USER_PROFILE } from "../constant/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeUI,
  },
  {
    path: "/did",
    name: "Redirect",
    redirect: "/",
  },
  {
    path: "/did/:did",
    name: USER_PROFILE,
    component: ProfileUI,
  },
  {
    path: "/rewards",
    name: REWARDS,
    component: RewardsUI,
  },
  {
    path: "/credential",
    name: CREDENTIAL,
    meta: { field: "info" },
    component: CredentialUI,
  },
  {
    path: "/connect",
    name: CONNECT,
    component: ConnectUI,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
