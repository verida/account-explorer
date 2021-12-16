<template>
  <form @submit.prevent="search">
    <div class="search-input">
      <div class="search-input-section">
        <img src="../../assets/images/icon_search.svg" alt="icon_search" />
        <input
          required
          v-model.trim="did"
          type="text"
          name="did"
          placeholder="search...."
        />
      </div>

      <img
        class="search-input-close"
        src="../../assets/images/icon_close.svg"
        alt="arrow_icon"
        v-show="did"
        @click="clearInput"
      />
      <button
        type="submit"
        v-show="!didSearch"
        class="button search-input-button"
      >
        <span>Search</span>
        <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
      </button>
    </div>
    <button
      v-show="!didSearch"
      type="submit"
      class="search-btn button button-block button-fw my-1"
    >
      <span>Search</span>
      <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
    </button>
    <span class="text-danger">{{ didError }}</span>
  </form>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { validateDid } from "@/utils/utils";

export default defineComponent({
  name: "SearchInput",
  props: {
    didSearch: Boolean,
  },
  data: () => ({
    error: {},
  }),
  setup() {
    const schema = yup.object({
      did: yup.string().required().min(50).max(50),
    });
    useForm({
      validationSchema: schema,
    });

    const { value: did, errorMessage: didError } = useField("did");
    return {
      did,
      didError,
    };
  },
  methods: {
    ...mapActions(["fetchProfile"]),
    async search() {
      if (this.didError) {
        return;
      }
      const isAddressValid = validateDid(this.did as string);
      if (!isAddressValid) {
        this.didError = "Verida vault address is invalid";
        return;
      }
      try {
        await this.fetchProfile(this.did);
        this.$router.push(`/${this.did}`);
      } catch (error: any) {
        this.error = error;
      }
    },
    clearInput() {
      this.did = "";
    },
  },
  mounted() {
    if (this.$route.params.did) {
      this.did = this.$route.params.did;
    }
  },
});
</script>
