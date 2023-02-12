<template>
  <div v-if="connected">
    <button
      :disabled="isSubmitting"
      class="button button-outlined mb-1"
      @click="addContact"
    >
      <pulse-loader v-if="isSubmitting" />
      <span v-else> Add as Contact</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { PulseLoader } from "@/components";
import { VeridaHelper } from "@/helpers";
import { BASIC_PROFILE_SCHEMA } from "@/constant";

export default defineComponent({
  name: "AddContact",
  data: () => ({
    error: null,
    isSubmitting: false,
  }),
  components: {
    PulseLoader,
  },
  computed: {
    ...mapState(["connected", "profile"]),
  },
  methods: {
    async addContact() {
      const issueDate = new Date();
      const data = {
        firstName: this.profile?.name,
        lastName: this.profile?.name,
        did: this.profile?.did,
        name: "Contact Details",
        schema: BASIC_PROFILE_SCHEMA,
        testTimestamp: issueDate.toISOString(),
        summary: "Contact issued at " + issueDate.toDateString(),
      };
      this.isSubmitting = true;
      try {
        await VeridaHelper.sendMessage(data);
        this.$toast.success(
          "Contact details sent. Please accept this contact in the Verida Vault"
        );
      } catch (error) {
        this.$toast.error("Something went wrong ");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>
