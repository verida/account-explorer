<template>
  <footer class="footer mx-5">
    <hr class="my-1" />
    <div class="footer-section">
      <span>&copy; Verida {{ currentYear }}</span>
      <a href="##">Terms & Conditions</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  data: () => ({
    currentYear: new Date().getFullYear(),
  }),
});
</script>
