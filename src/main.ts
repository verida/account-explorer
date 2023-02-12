import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import Account from "@verida/vue-account";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-toast-notification/dist/theme-sugar.css";
import "./assets/scss/main.scss";

const app = createApp(App);

app.config.performance = true;

app.use(store);

app.use(Account);

app.use(router);

app.use(VueToast, {
  position: "top",
});

app.mount("#app");

createApp(App);
