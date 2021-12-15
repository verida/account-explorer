<template>
  <div class="home mt-5 mx-1">
    <div class="content">
      <h1>Account Explorer</h1>
      <p class="mt-1">
        Use this to search through your account. Search what account you have
        access to, and find the DIDs thst you need.
      </p>
      <div class="content-search my-3"><search-input /></div>
      <search-list />
    </div>
    <div class="landing-image">
      <img src="../assets/images/Illustration_desktop.svg" alt="desktop" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchList from "@/components/cards/SearchList.vue";
import SearchInput from "@/components/search-bar/SearchInput.vue";

export default defineComponent({
  name: "Home",
  components: { SearchList, SearchInput },
});
</script>
