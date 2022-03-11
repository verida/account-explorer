import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/main.scss";
import "vue-toast-notification/dist/theme-sugar.css";

import Account from "@verida/vue-account";

import "vue-toast-notification/dist/theme-sugar.css";
import "./assets/scss/main.scss";

const app = createApp(App);

app.use(store);

app.use(Account);

app.use(router);

app.use(VueToast, {
  position: "top",
});

app.mount("#app");

createApp(App);
