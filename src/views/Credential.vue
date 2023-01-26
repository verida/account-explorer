<template>
  <div class="credential mt-5">
    <h3>Credential Verification</h3>
    <pulse-loader v-if="loading" />
    <status-panel v-else-if="error" :type="type" />
    <div v-else>
      <error-panel :type="type" />
      <div class="mr-2">
        <credentials-details />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { StatusPanel, CredentialsDetails, PulseLoader } from "@/components";
import { mapMutations, mapState } from "vuex";
import { VeridaHelper } from "@/helpers";

export default defineComponent({
  name: "Home",
  components: { StatusPanel, CredentialsDetails, PulseLoader },
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
