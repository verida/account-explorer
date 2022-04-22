<template>
  <div class="learn">
    <div class="learn-img">
      <img :src="item.img" :alt="item.title" />
    </div>
    <div class="learn-title">
      <h4>{{ item.title }}</h4>
      <div class="learn-title-icons">
        <div>
          <img src="../../assets/images/icon_stack.svg" alt="icon_stack" />
          <span>{{ item.noOfLesson }} Lesson</span>
        </div>
        <div>
          <img src="../../assets/images/icon_clock.svg" alt="icon_clock" />
          <span>- {{ item.duration }}min</span>
        </div>
      </div>
    </div>
    <p>
      {{ item.description }}
    </p>
    <div class="learn-chip">
      <span class="chip chip-secondary">{{ item.status }}</span>
      <span class="chip chip-primary ml-2">{{ item.points }} XP</span>
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
  props: ["item"],
  data: () => ({
    url: VUE_APP_BASE_URL,
  }),
  components: {},
  methods: {},
});
</script>
