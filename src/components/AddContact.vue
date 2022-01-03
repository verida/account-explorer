<template>
  <div v-if="connected">
    <button
      :disabled="isSubmitting"
      class="button button-outlined mb-1"
      @click="addContact"
    >
      <pulse-loader
        v-if="isSubmitting"
        color="#5761D7"
        :loading="isSubmitting"
      />
      <span v-else> Add as Contact</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import veridaHelper from "@/helpers/VeridaHelper";
import { BASIC_PROFILE_SCHEMA } from "@/constant";

export default defineComponent({
  name: "AddContact",
  data: () => ({
    error: null,
    connected: veridaHelper.connected,
    isSubmitting: false,
  }),
  components: {
    PulseLoader,
  },
  methods: {
    async addContact() {
      const issueDate = new Date();
      const profile = veridaHelper.profile;
      const data = {
        firstName: profile?.name,
        lastName: profile?.name,
        did: profile?.did,
        name: "Contact Details",
        schema: BASIC_PROFILE_SCHEMA,
        testTimestamp: issueDate.toISOString(),
        summary: "Contact issued at " + issueDate.toDateString(),
      };
      this.isSubmitting = true;
      try {
        await veridaHelper.sendMessage(data);
        this.$toast.success("Contact details added  Successfully");
      } catch (error) {
        this.$toast.error("Something went wrong ");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>
