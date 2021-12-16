<template>
  <div class="profile-account mt-5 mx-1">
    <div class="content-search"><search-input :didSearch="true" /></div>
    {{ profile.did }}
    <h5 class="my-1">RESULTS:</h5>
    <profile-card />
    <not-found />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProfileCard from "@/components/cards/Profile.vue";
import SearchInput from "@/components/search-bar/SearchInput.vue";
import NotFound from "@/components/cards/NotFound.vue";

export default defineComponent({
  name: "ProfileDetails",
  components: { ProfileCard, SearchInput, NotFound },
  computed: {
    ...mapState(["profile"]),
  },

  mounted() {
    console.log(this.profile);
  },
});
</script>
