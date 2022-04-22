<template>
  <div class="faqs">
    <div :class="[`faqs-header ${open && 'faqs-header-open'}`]">
      <h5>{{ item.title }}</h5>
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
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FAQs",
  props: ["item"],
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
