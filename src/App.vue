<template>
  <div class="container">
    <app-header />
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <app-footer />
  </div>
  <router-view />
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

<style lang="scss">
</style>
