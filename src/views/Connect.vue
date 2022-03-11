<template>
  <vda-login
    :onError="onError"
    :onSuccess="onSuccess"
    :contextName="contextName"
    :logo="logo"
    :loginText="loginText"
  />
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import VeridaHelper from "@/helpers/VeridaHelper";
import { defineComponent } from "vue";
const { VUE_APP_CONTEXT_NAME, VUE_APP_LOGO_URL, VUE_APP_LOGIN_TEXT } =
  process.env;
export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      error: null,
      contextName: VUE_APP_CONTEXT_NAME,
      logo: VUE_APP_LOGO_URL,
      loginText: VUE_APP_LOGIN_TEXT,
    };
  },
  methods: {
    async onSuccess(context: any) {
      await VeridaHelper.connect(context);
      this.handlePrevRoute();
    },
    onError(error: any) {
      this.error = error;
    },
    handlePrevRoute() {
      const URIState = JSON.parse(localStorage.getItem("uri_state") as any);
      let uri;
      if (URIState) {
        uri = URIState.uri;
        localStorage.removeItem("uri_state");
        this.$router.push({
          name: `Credential`,
          query: { uri },
        });
      } else {
        console.log("home");
        this.$router.push({ name: "Home" });
      }
    },
  },
});
</script>
