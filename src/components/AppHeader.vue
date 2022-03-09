<template>
  <header class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/images/logoverida.svg"
    /></router-link>
    <vda-account
      :logo="logo"
      :contextName="contextName"
      :onLogout="onLogout"
      :onSuccess="onSuccess"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
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
  components: {},
  computed: {
    ...mapState(["connected"]),
  },
  methods: {
    ...mapMutations(["setStatus", "setCredential", "setError"]),
    async onSuccess(response: Context) {
      this.setStatus(true);
      await VeridaHelper.connect(response);
      const res = await VeridaHelper.readVerifiedCredential(
        "https://scan.verida.io/credential?uri=dmVyaWRhOi8vZGlkOnZkYToweEIzNzI5OTgyQTI1ODU1NDRGRDcyYzk5Q0YzNzczYTljNmJhQkQ1NWMvR3BORGVQdldVNFJRdWQ5amFaSmlOd0Z5QVMvY3JlZGVudGlhbF9wdWJsaWNfZW5jcnlwdGVkLzhmMTg4MzEwLTlmNmUtMTFlYy04Y2M1LWRiNjVkZWZhMGVmMT9rZXk9MGMxMDBkNGY3M2IyOGViYjNjMTJhMDkzMjFmOWI2OGFiM2FlMWI5MTMyZjc4YTRkZTYyNGI0MzFmNDA2MWMwYg=="
      );
      console.log(res);
      this.setCredential(res);
      this.$router.push({ name: "credential" });
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
