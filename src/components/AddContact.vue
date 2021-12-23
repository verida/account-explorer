<template>
  <button class="button button-outlined mb-1" @click="addContact">
    Add as Contact
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import veridaHelper from "@/helpers/VeridaHelper";
import { BASIC_PROFILE_SCHEMA } from "@/constant";

export default defineComponent({
  name: "AddContact",
  data: () => ({
    error: null,
    isSubmitting: false,
  }),
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
