<template>
  <header class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/images/logoverida.svg"
    /></router-link>
    <vda-login
      :logo="logo"
      :style="styleObject"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
      :onLogout="onLogout"
    />
  </header>
</template>

<script lang="ts">
import VdaLogin from "@verida/verida-vue-components";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import VeridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "Header",
  data: () => ({
    error: null,
    loading: false,
    contextName: "Verida: Account Explorer",
    logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    styleObject: {
      fontFamily: "Sora,  sans-serif",
      fontWeight: 100,
      fontSize: "0.8rem",
      padding: "1rem",
    },
  }),
  components: {
    VdaLogin,
  },
  computed: {
    ...mapState(["connected"]),
  },
  methods: {
    ...mapMutations(["setStatus", "setError"]),
    async onSuccess(response: any) {
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
