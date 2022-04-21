<template>
  <div>
    <reward-nav-bar />
    <div class="layout">
      <div class="content">
        <h1>Verida XP Rewards Program</h1>
        <p class="mt-1">
          Gain XP learning about web3 and exploring the Verida ecosystem
        </p>
        <div class="content-button">
          <button class="button button-block my-2 mr-4">Get Started</button>
          <button class="button button-outlined my-2 ml-2">
            Explorer Skills
          </button>
        </div>
      </div>
      <div class="landing-image">
        <img src="../assets/images/rewards_ui.svg" alt="reward_ui" />
      </div>
    </div>
    <div>
      <h2 class="content-title">Progress</h2>
      <div class="reward-dashboard">
        <reward-dashbaord-card type="dark" />
        <reward-dashbaord-card type="default" />
        <reward-dashbaord-card type="light" />
      </div>
    </div>
    <div id="learn">
      <h2 class="content-title">Learn</h2>
      <learn-card />
    </div>
    <div id="Skills">
      <h2 class="content-title">skills</h2>
      <skill-card />
    </div>
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h2 class="content-title">Set up your Verida Vault account</h2>
      </template>
      <template v-slot:body>
        <skills-description />
      </template>
    </modal>
    <div id="FAQs">
      <h2 class="content-title content-title-center">FAQS</h2>
      <faqs-card />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SkillCard from "@/components/cards/SkillCard.vue";
import RewardDashbaordCard from "@/components/cards/RewardDashbaordCard.vue";
import SkillsDescription from "@/components/SkillsDescription.vue";
import LearnCard from "@/components/cards/LearnCard.vue";
import Modal from "@/components/modal/Modal.vue";
import FaqsCard from "@/components/FAQs.vue";
import RewardNavBar from "@/components/RewardNavBar.vue";

export default defineComponent({
  name: "Home",
  components: {
    LearnCard,
    SkillCard,
    RewardDashbaordCard,
    SkillsDescription,
    Modal,
    RewardNavBar,
    FaqsCard,
  },
  data: () => ({
    path: "",
    isModalVisible: true,
  }),
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>
