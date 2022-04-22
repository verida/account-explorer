<template>
  <div>
    <reward-nav-bar />
    <div v-if="isLoggedIn" class="reward-bg">
      <h2 class="content-title">Progress</h2>
      <div class="reward-wrapper">
        <div v-for="item in progressData" :key="item.title">
          <reward-dashbaord-card :item="item" />
        </div>
      </div>
    </div>
    <div class="layout" v-else>
      <div class="content">
        <h1>Verida XP Rewards Program</h1>
        <p class="mt-1">
          Gain XP learning about web3 and exploring the Verida ecosystem
        </p>
        <div class="content-button">
          <button class="button button-block my-2">Get Started</button>
          <button class="button button-outlined my-2">Explorer Skills</button>
        </div>
      </div>
      <div class="landing-image">
        <img src="../assets/images/rewards_ui.svg" alt="reward_ui" />
      </div>
    </div>
    <div id="learn" class="learn-bg">
      <h2 class="content-title">Learn</h2>
      <div class="learn-wrapper">
        <div class="learnContainer" v-for="item in learnData" :key="item.img">
          <learn-card :item="item" />
        </div>
      </div>
    </div>
    <div id="skills" class="skills-bg">
      <h2 class="content-title">skills</h2>
      <div class="skills-wrapper">
        <div v-for="item in skillsData" :key="item.img">
          <skill-card :item="item" />
        </div>
      </div>
    </div>
    <div id="faqs">
      <h2 class="content-title content-title-center">FAQS</h2>
      <div v-for="(item, index) in faqsData" :key="index">
        <faqs-card :item="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SkillCard from "@/components/cards/SkillCard.vue";
import RewardDashbaordCard from "@/components/cards/RewardDashbaordCard.vue";
import LearnCard from "@/components/cards/LearnCard.vue";
import FaqsCard from "@/components/FAQs.vue";
import RewardNavBar from "@/components/RewardNavBar.vue";
import { FAQS, LEARN, PROGRESS, SKILLS } from "../mock/";

export default defineComponent({
  name: "Home",
  components: {
    LearnCard,
    SkillCard,
    RewardDashbaordCard,
    RewardNavBar,
    FaqsCard,
  },
  data: () => ({
    randomKey: Math.random(),
    isLoggedIn: true,
    // isLoggedIn: veridaHelper.connected,
    isModalVisible: true,
    faqsData: FAQS,
    learnData: LEARN,
    skillsData: SKILLS,
    progressData: PROGRESS,
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
