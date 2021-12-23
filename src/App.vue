<template>
  <div class="container">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: "Header",
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
