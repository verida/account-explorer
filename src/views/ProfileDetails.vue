<template>
  <div class="profile-account mt-5 mx-1">
    <div class="content-search"><search-input :didSearch="true" /></div>
    <h5 class="my-1">RESULTS:</h5>
    <pulse-loader v-if="loader" color="#5761D7" :loading="loader" />
    <profile-card v-else-if="profile.name" :profile="profile" />
    <not-found v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ProfileCard from "@/components/cards/Profile.vue";
import SearchInput from "@/components/SearchInput.vue";
import NotFound from "@/components/cards/NotFound.vue";

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
    console.log("log.");

    if (!this.$route.params.did) {
      console.log("dsdd");

      this.$router.push({ path: "/" });
    }

    if (!this.profile.name) {
      await this.loadProfile();
    }
  },
});
</script>
