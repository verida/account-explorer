<template>
  <form @submit.prevent="search">
    <div class="search-input">
      <div class="search-input-section">
        <img src="@/assets/icons/icon_search.svg" alt="icon_search" />
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
        src="@/assets/icons/icon_close.svg"
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
      </button>
    </div>
    <button
      v-show="!didSearch"
      type="submit"
      :disabled="loader"
      class="search-btn button button-block button-fw my-1"
    >
      <span>Search</span>
    </button>
    <p class="text-danger mt-1">{{ didError }}</p>
    <p class="text-danger mt-1">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { useField, useForm } from "vee-validate";
import { config } from "@/config";
import * as yup from "yup";

export default defineComponent({
  name: "SearchInput",
  props: {
    didSearch: Boolean,
  },
  computed: {
    ...mapState(["profile", "error", "loader"]),
  },
  setup() {
    const environment = config.veridaEnv;
    console.log(environment);
    const schema = yup.object({
      did: yup
        .string()
        .matches(new RegExp(`^did:vda:${environment}:.+$`))
        .trim()
        .required()
        .min(58)
        .max(58),
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
