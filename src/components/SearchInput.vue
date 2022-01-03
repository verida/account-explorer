<template>
  <form @submit.prevent="search">
    <div class="search-input">
      <div class="search-input-section">
        <img src="../assets/images/icon_search.svg" alt="icon_search" />
        <input
          required
          type="text"
          name="did"
          v-model="did"
          placeholder="search...."
        />
      </div>
      <img
        class="search-input-close"
        src="../assets/images/icon_close.svg"
        alt="arrow_icon"
        v-show="did"
        @click="clearInput"
      />
      <button
        type="submit"
        :disabled="loader"
        v-show="!didSearch"
        class="button search-input-button"
      >
        <span>Search</span>
        <img src="../assets/images/arrow.svg" alt="arrow_icon" />
      </button>
    </div>
    <button
      v-show="!didSearch"
      type="submit"
      :disabled="loader"
      class="search-btn button button-block button-fw my-1"
    >
      <span>Search</span>
      <img src="../assets/images/arrow.svg" alt="arrow_icon" />
    </button>
    <p class="text-danger mt-1">{{ didError }}</p>
    <p class="text-danger mt-1">{{ error }}</p>
  </form>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { validateDid } from "@/utils/utils";

export default defineComponent({
  name: "SearchInput",
  props: {
    didSearch: Boolean,
  },
  computed: {
    ...mapState(["profile", "error", "loader"]),
  },
  setup() {
    const schema = yup.object({
      did: yup.string().trim().required().min(50).max(50),
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
  watch: {
    async $route(to) {
      await this.fetchProfile(to.params.did);
    },
  },
  methods: {
    ...mapActions(["fetchProfile"]),
    ...mapMutations(["setLoader"]),
    async search() {
      if (this.didError) {
        return;
      }
      const isAddressValid = validateDid(this.did as string);
      if (!isAddressValid) {
        this.didError = "Verida vault address is invalid";
        return;
      }
      await this.fetchProfile(this.did);
      if (this.didSearch) {
        this.$router.push(`/${this.did}`);
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
