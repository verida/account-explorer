<template>
  <div class="credential mt-5 mx-1">
    <h3>Credential Verification</h3>
    <pulse-loader
      class="loading my-5"
      v-if="loading"
      color="#5761D7"
      :loading="loading"
    />
    <div v-else>
      <error-panel type="success" />
      <credential-details />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ErrorPanel from "../components/cards/StatusPanel.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import CredentialDetails from "../components/cards/CredentialsDetails.vue";
import { mapMutations, mapState } from "vuex";
import VeridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "Home",
  components: { ErrorPanel, CredentialDetails, PulseLoader },
  data: () => ({
    path: "",
    loading: false,
    errorType: "",
  }),
  computed: {
    ...mapState(["credentialInfo"]),
  },
  beforeMount() {
    this.init();
  },
  methods: {
    ...mapMutations(["setCredential"]),
    async init() {
      this.loading = true;
      try {
        const uri = this.$route.query.uri as string;
        const res = await VeridaHelper.readVerifiedCredential(uri);
        this.setCredential(res);
      } catch (error) {
        this.handleError("error");
      } finally {
        this.loading = false;
      }
    },
    handleError(e: string) {
      setTimeout(() => {
        this.$toast.error(e);
        this.$router.push({ name: "Home" });
      }, 2500);
    },
  },
});
</script>
