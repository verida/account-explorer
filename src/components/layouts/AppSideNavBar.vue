<template>
  <div class="side-nav">
    <img src="../../assets/images/icon_close.svg" alt="arrow_icon" />
    <div class="">
      <div class="" @click="toggle" role="button">
        <h5>{{ "item.title" }}</h5>
        <img
          src="../../assets/images/icon_down_arrow.svg"
          alt="arrow_icon"
          v-if="open"
        />
        <img
          v-else
          role="button"
          src="../../assets/images/icon_up_arrow.svg"
          alt="arrow_icon"
          @click="toggle"
        />
      </div>
      <div v-if="open" class="faqs-content">
        <p>
          {{ "item.description" }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppSideNavBar",
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
