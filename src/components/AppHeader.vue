<template>
  <header class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/images/logoverida.svg"
    /></router-link>
    <button v-if="loading" class="login-section">connecting...</button>
    <div class="login-section" v-else-if="connected">
      <user-menu :logout="logout" />
    </div>
    <button v-else class="login-section" @click="login">
      <span>Login with Verida</span>
      <img alt="Vue logo" src="../assets/images/arrow.svg" />
    </button>
  </header>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import UserMenu from "@/components/UserMenu.vue";
import veridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    connected: false,
  }),
  components: {
    UserMenu,
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await veridaHelper.connect();
        this.connectApp();
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    connectApp() {
      if (veridaHelper.connected) {
        this.connected = veridaHelper.connected;
      }
    },
    async logout() {
      await veridaHelper.logout();
      this.connected = false;
    },
    async init() {
      this.loading = true;
      try {
        await veridaHelper.autoLogin();
        this.connectApp();
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
  async beforeMount() {
    await this.init();
  },
});
</script>
