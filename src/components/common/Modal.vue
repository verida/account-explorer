<template>
  <div
    class="modal"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
  >
    <header class="modal-header" id="modalTitle">
      <slot name="header"> </slot>
      <img
        @click="close"
        aria-label="Close modal"
        src="../../assets/images/icon_round_close.svg"
        alt="arrow_icon"
      />
    </header>

    <section class="modal-body" id="modalDescription">
      <slot name="body"> </slot>
    </section>

    <footer class="modal-footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "Modal",
  data: () => ({
    url: VUE_APP_BASE_URL,
  }),
  components: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
});
</script>
