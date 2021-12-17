<template>
  <div class="container">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/header/Header.vue";
import AppFooter from "@/components/footer/Footer.vue";

export default defineComponent({
  name: "Header",
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
