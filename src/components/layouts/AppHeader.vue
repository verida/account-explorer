<template>
  <div class="header-wrapper">
    <header class="header" :key="connected">
      <router-link to="/">
        <img alt="Vue logo" src="../../assets/images/logoverida.svg"
      /></router-link>
      <nav class="header-nav">
        <ul>
          <li>
            <img
              alt="Account Explorer"
              src="../../assets/images/icon_accountExplorer.svg"
            /><a href="/">Account Explorer</a>
          </li>
          <li>
            <img
              alt="Manage Tokens"
              src="../../assets/images/icon_coin.svg"
            /><a href="/">Manage Tokens</a>
          </li>
          <li>
            <img
              alt="Verida Rewards"
              src="../../assets/images/icon_star.svg"
            /><a href="/rewards">Verida Rewards</a>
          </li>
        </ul>
        <vda-account
          :logo="logo"
          :contextName="contextName"
          :onLogout="onLogout"
          :onSuccess="onSuccess"
        />
        <app-side-nav-bar />
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import AppSideNavBar from "@/components/layouts/AppSideNavBar.vue";
import VeridaHelper from "@/helpers/VeridaHelper";
import { Context } from "@verida/client-ts";

const { VUE_APP_CONTEXT_NAME, VUE_APP_LOGO_URL } = process.env;

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    contextName: VUE_APP_CONTEXT_NAME,
    logo: VUE_APP_LOGO_URL,
  }),
  components: { AppSideNavBar },
  computed: {
    ...mapState(["connected"]),
  },
  methods: {
    ...mapMutations(["setStatus", "setCredential", "setError"]),
    async onSuccess(response: Context) {
      this.setStatus(true);
      await VeridaHelper.connect(response);
    },
    onError(error: Error) {
      this.setError(error);
    },
    onLogout() {
      this.setStatus(false);
      VeridaHelper.logout();
    },
  },
});
</script>
