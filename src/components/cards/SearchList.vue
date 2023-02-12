<template>
  <span v-if="path !== '/'"></span>
  <router-link v-else :to="url[0]">
    <div class="search-card mt-2">
      <img
        alt="user-avatar"
        v-if="profile?.avatar?.uri"
        :src="profile?.avatar?.uri"
      />
      <img alt="user-avatar" v-else src="@/assets/icons/icon_avatar.svg" />
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
  props: ["profile", "url", "path"],
});
</script>
