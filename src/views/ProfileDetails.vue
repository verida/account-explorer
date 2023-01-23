<template>
  <div class="profile-account mt-5">
    <div class="content-search"><search-input :didSearch="true" /></div>
    <h5 class="my-1">RESULTS:</h5>
    <pulse-loader v-if="loader" />
    <profile-card v-else-if="profile.name" :profile="profile" />
    <not-found v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import {
  Profile as ProfileCard,
  SearchInput,
  NotFound,
  PulseLoader,
} from "@/components";

export default defineComponent({
  name: "ProfileDetails",
  components: { ProfileCard, SearchInput, NotFound, PulseLoader },
  computed: {
    ...mapState(["profile", "loader"]),
  },
  methods: {
    ...mapActions(["fetchProfile"]),
    async loadProfile() {
      const did = this.$route.params.did;
      await this.fetchProfile(did);
    },
  },
  async beforeMount() {
    if (!this.$route.params.did) {
      this.$router.push({ path: "/" });
    }
    if (!this.profile.name) {
      await this.loadProfile();
    }
  },
});
</script>
