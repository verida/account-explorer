<template>
  <div class="container px-2">
    <app-header />
    <router-view />
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
