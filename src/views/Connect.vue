<template>
  <vda-login
    :onError="onError"
    :onSuccess="onSuccess"
    :contextName="contextName"
    :logo="logo"
    :loginText="contextName"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { config } from "@/config";
import { VeridaHelper } from "@/helpers";
import { Context } from "@verida/client-ts";
import { CREDENTIAL, CREDENTIAL_URI, HOME } from "@/constant";

export default defineComponent({
  name: "Connect",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      error: null,
      logo: config.veridaLogoUrl,
      contextName: config.veridaContextName,
      loginText: config.veridaLoginText,
    };
  },
  methods: {
    async onSuccess(context: Context) {
      await VeridaHelper.connect(context);
      this.handlePrevRoute();
    },
    onError(error: null) {
      this.error = error;
    },
    handlePrevRoute() {
      const URIState = JSON.parse(
        localStorage.getItem(CREDENTIAL_URI) as string
      );
      let uri;
      if (URIState) {
        uri = URIState.uri;
        localStorage.removeItem(CREDENTIAL_URI);
        this.$router.push({
          name: CREDENTIAL,
          query: { uri },
        });
      } else {
        this.$router.push({ name: HOME });
      }
    },
  },
});
</script>
