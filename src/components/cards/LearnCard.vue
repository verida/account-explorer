<template>
  <div class="learn">
    <div class="learn-img">
      <img src="../../assets/images/bg_ipfs.png" alt="bg_ipfs" />
    </div>
    <div class="learn-title">
      <h4>Lectus neque, facilisi sit. Etiam dolor sit amer morfius tema</h4>
      <div class="learn-title-icons">
        <div>
          <img src="../../assets/images/icon_stack.svg" alt="icon_stack" />
          <span>6 Lesson</span>
        </div>
        <div>
          <img src="../../assets/images/icon_clock.svg" alt="icon_clock" />
          <span>- 50min</span>
        </div>
      </div>
    </div>
    <p>
      Ut imperdiet nisi, turpis scelerisque sed. Euismod diam mi aliquam non ac.
      Tincidunt et, in ac non scelerisque dictum pharetra id amet. Netus a
      vestibulum felis mi lorem
    </p>
    <div class="learn-chip">
      <span class="chip chip-secondary">NOT STARTED</span>
      <span class="chip chip-primary ml-2">100 XP</span>
    </div>
    <div class="border-line" />
    <div class="learn-button">
      <button class="button button-outlined button-fw mr-2">Details</button>
      <button class="button button-primary button-fw ml-2">Start</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "LearnCard",
  props: {},
  data: () => ({
    url: VUE_APP_BASE_URL,
  }),
  components: {},
  methods: {},
});
</script>
