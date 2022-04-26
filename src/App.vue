<template>
  <div class="container">
    <app-header />
    <main>
      <router-view />
    </main>
  </div>
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";

export default defineComponent({
  name: "Header",
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
