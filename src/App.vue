<template>
  <div class="container">
    <app-header @toggleSideNav="toggle" :openSideNav="open" />
    <main>
      <app-side-nav-bar :openSideNav="open" />
      <router-view />
    </main>
  </div>
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
import AppSideNavBar from "@/components/layouts/AppSideNavBar.vue";

export default defineComponent({
  name: "Header",
  components: {
    AppHeader,
    AppFooter,
    AppSideNavBar,
  },
  data: () => ({
    open: false,
  }),
  methods: {
    toggle() {
      console.log("toglle");

      this.open = !this.open;
    },
  },
});
</script>
