<template>
  <header class="header py-1" :key="connected">
    <router-link to="/">
      <img alt="Vue logo" src="@/assets/images/logoverida.svg" />
    </router-link>
    <span class="navmenu">
      <router-link to="/">
        <span class="menuitem">Home</span>
      </router-link>
      <a href="/#networkstats">
        <span class="menuitem">Network Statistics</span>
      </a>
      <a href="/#nodestats">
        <span class="menuitem">Node Statistics</span>
      </a>
      <a :href="changeNetworkLink">
        <span class="menuitem">Switch to {{ changeNetwork }}</span>
      </a>
    </span>

    <!-- <vda-account
      :logo="logo"
      :contextName="contextName"
      @onLogout="onLogout"
      @onConnected="onSuccess"
      @onError="onError"
    /> -->
  </header>
</template>

<script lang="ts">
import { config } from "@/config";
import { VeridaHelper } from "@/helpers";
import { Context } from "@verida/client-ts";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    contextName: config.veridaContextName,
    logo: config.veridaLogoUrl,
    changeNetwork: config.veridaEnv == "mainnet" ? "Testnet" : "Mainnet",
    changeNetworkLink:
      config.veridaExplorerUrls[
        config.veridaEnv == "mainnet" ? "testnet" : "mainnet"
      ],
  }),
  components: {},
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
