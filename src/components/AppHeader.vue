<template>
  <header class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/images/logoverida.svg"
    /></router-link>
    <button v-if="loading" class="login-section">connecting...</button>
    <button v-else-if="connected" class="login-section" @click="logout">
      <span>Logout</span>
      <img alt="Vue logo" src="../assets/images/arrow.svg" />
    </button>
    <button v-else class="login-section" @click="connect">
      <span>Login with Verida</span>
      <img alt="Vue logo" src="../assets/images/arrow.svg" />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import veridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    connected: false,
  }),
  methods: {
    async connect() {
      this.loading = true;
      try {
        await veridaHelper.connect();
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
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
  created() {
    veridaHelper.on("connected", (connection: boolean) => {
      this.connected = connection;
    });
  },
});
</script>
