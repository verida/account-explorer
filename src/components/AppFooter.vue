<template>
  <footer class="footer">
    <hr class="mb-1" />
    <div class="footer-section">
      <span>&copy; Verida {{ currentYear }}</span>
      <a :href="termsAndConditionLink">Terms & Conditions</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VERIDA_TERMS_AND_CONDITIONS_URL } from "@/constant";

export default defineComponent({
  name: "Footer",
  data: () => ({
    copyRightYear: new Date().getFullYear(),
    termsAndConditionLink: VERIDA_TERMS_AND_CONDITIONS_URL,
  }),
});
</script>
