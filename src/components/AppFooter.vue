<template>
  <footer class="footer">
    <hr class="my-1" />
    <div class="footer-section">
      <span>&copy; Verida {{ currentYear }}</span>
      <a href="https://www.verida.io/terms-and-conditions"
        >Terms & Conditions</a
      >
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
