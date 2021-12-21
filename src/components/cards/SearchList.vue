<template>
  <router-link :to="url[0]">
    <div class="search-card mt-2">
      <img alt="user-avatar" :src="profile?.avatar?.uri" />
      <div class="details">
        <h4>{{ profile.name }}</h4>
        <p>{{ profile.did }}</p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchList",
  props: ["profile", "url"],
});
</script>
