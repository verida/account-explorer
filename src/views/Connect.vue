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
import { config } from "@/config";
import VeridaHelper from "@/helpers/VeridaHelper";
import { Context } from "@verida/client-ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      error: null,
      contextName: config.veridaContextName,
      logo: config.veridaLogoUrl,
      loginText: config.veridaLoginText,
    };
  },
  methods: {
    async onSuccess(context: Context) {
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
        this.$router.push({ name: "Home" });
      }
    },
  },
});
</script>
