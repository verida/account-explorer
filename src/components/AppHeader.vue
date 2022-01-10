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
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
  }),
  components: {
    UserMenu,
  },
  computed: {
    ...mapState(["connected"]),
  },
  methods: {
    ...mapMutations(["setStatus"]),
    async login() {
      this.loading = true;
      try {
        await veridaHelper.connect();
        this.setStatus(true);
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
      const hasSession = veridaHelper.autoLogin();
      if (hasSession) {
        await this.login();
      }
    },
  },
  async beforeMount() {
    await this.login();
  },
});
</script>
