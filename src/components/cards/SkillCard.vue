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
      <div class="chip chip-secondary">
        <img src="../../assets/images/icon_close_circle.svg" alt="icon_clock" />
        <span>{{ item.status }}</span>
      </div>
      <span class="chip chip-primary ml-2">{{ item.reward }} XP</span>
    </div>
  </div>
  <modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <div class="skill-setup-title-mobile">
        <img
          height="15"
          alt="Vue logo"
          src="../../assets/images/logoverida.svg"
        />
      </div>
      <h2 class="content-title skill-setup-title">
        Set up your Verida Vault account
      </h2>
    </template>
    <template v-slot:body>
      <skills-description :rewardType="item.type" />
    </template>
  </modal>
</template>
<script lang="ts">
1;
import { defineComponent } from "vue";
import Modal from "@/components/common/Modal.vue";
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
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.item.type,
        },
      });
      this.isModalVisible = true;
    },
  },
});
</script>
