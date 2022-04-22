<template>
  <div class="skills" @click="openModal">
    <div class="skills-icon">
      <img :src="item.img" :alt="item.title" />
      <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
    </div>
    <div class="skills-title">
      <h4>{{ item.title }}</h4>
    </div>
    <div class="skills-bottom-bar">
      <span class="chip chip-secondary">{{ item.status }}</span>
      <span class="chip chip-primary ml-2">{{ item.reward }} XP</span>
    </div>
  </div>
  <modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <h2 class="content-title">Set up your Verida Vault account</h2>
    </template>
    <template v-slot:body>
      <skills-description />
    </template>
  </modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";
import SkillsDescription from "@/components/SkillsDescription.vue";

export default defineComponent({
  name: "SkillCard",
  props: ["item"],
  data: () => ({ isModalVisible: false }),
  components: { Modal, SkillsDescription },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
  },
  beforeMount() {
    console.log(this.item);
  },
});
</script>
