<template>
  <div class="credential mt-5 mx-1">
    <h3>Credential Verification</h3>
    <pulse-loader
      class="credential-loader my-5"
      v-if="loading"
      color="#5761D7"
      :loading="loading"
    />
    <error-panel v-else-if="error" :type="type" />
    <div v-else>
      <error-panel :type="type" />
      <div class="mr-2">
        <credential-details />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ErrorPanel from "@/components/cards/StatusPanel.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import CredentialDetails from "@/components/cards/CredentialsDetails.vue";
import { mapMutations, mapState } from "vuex";
import VeridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "Home",
  components: { ErrorPanel, CredentialDetails, PulseLoader },
  data: () => ({
    path: "",
    loading: false,
    type: "",
    error: false,
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
        const isExpired = VeridaHelper.hasCredentialExpired(res);
        if (isExpired) {
          this.type = "warning";
        } else {
          this.type = "success";
        }
      } catch (error) {
        this.handleError();
        this.type = "invalid";
      } finally {
        this.loading = false;
      }
    },
    handleError() {
      this.error = true;
      this.type = "invalid";
    },
  },
});
</script>
