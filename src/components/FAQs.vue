<template>
  <div class="faqs">
    <div class="faqs-header">
      <h5>Mauris dictum nibh cursus id sed in dignissim elementum.</h5>
      <img
        role="button"
        src="../assets/images/icon_down_arrow.svg"
        alt="arrow_icon"
        @click="toggle"
        v-if="open"
      />
      <img
        v-else
        role="button"
        src="../assets/images/icon_up_arrow.svg"
        alt="arrow_icon"
        @click="toggle"
      />
    </div>
    <div v-if="open" class="faqs-content">
      <p>
        Ut imperdiet nisi, turpis scelerisque sed. Euismod diam mi aliquam non
        ac. Tincidunt et, in ac non scelerisque dictum pharetra id amet. Netus a
        vestibulum felis mi lorem egestas mi tristique elit. Tincidunt sed magna
        ut magnis sagittis pretium, quis. In amet amet, bibendum amet. Lectus
        netus mauris cursus mauris, in in felis. Euismod urna, hendrerit in eros
        massa donec. Aliquam tincidunt convallis at sed eget adipiscing. Sit
        facilisis nibh euismod tortor fames morbi.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FAQs",
  props: {
    profile: {},
  },
  data: () => ({
    open: false,
  }),
  components: {},
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
});
</script>
