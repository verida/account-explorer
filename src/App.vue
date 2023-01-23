<template>
  <div class="container">
    <div class="content-wrap">
      <app-header />
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppHeader, AppFooter } from "@/components";

export default defineComponent({
  name: "Header",
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
