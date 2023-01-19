<template>
  <header class="header" :key="connected">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/images/logoverida.svg"
    /></router-link>
    <vda-account
      :logo="logo"
      :contextName="contextName"
      @onLogout="onLogout"
      @onConnected="onSuccess"
      @onError="onError"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import VeridaHelper from "@/helpers/VeridaHelper";
import { Context } from "@verida/client-ts";
import { config } from "@/config";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    contextName: config.veridaContextName,
    logo: config.veridaLogoUrl,
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
