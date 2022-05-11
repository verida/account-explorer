<template>
  <div>
    <skills-account-setup :rewardType="rewardType" @claimPoints="claimPoints" />
    <div class="skillsdescription">
      <div>
        <p>
          Elit, donec ornare nisl odio malesuada sit posuere erat. Id pharetra,
          porta lacus amet. Praesent aliquam sit phasellus sem egestas arcu id
          mattis aliquam. Curabitur id bibendum posuere diam tincidunt
          convallis.
        </p>
        <img src="../assets/images/skill_desc_image.png" alt="skills-desc" />
      </div>
      <div>
        <p>
          Elit, donec ornare nisl odio malesuada sit posuere erat. Id pharetra,
          porta lacus amet. Praesent aliquam sit phasellus sem egestas arcu id
          mattis aliquam. Curabitur id bibendum posuere diam tincidunt
          convallis. Duis nec, quis nunc, elit duis. Aliquet massa consequat in
          sollicitudin a. Maecenas luctus mattis sed proin cursus in lectus.
          Facilisi at posuere ipsum, arcu non tellus ipsum lorem. Massa libero
          tempus eu tincidunt magna. Turpis convallis mi, id elementum at donec
          massa duis. Odio molestie mi accumsan, morbi lacus interdum faucibus .
          In Elit, donec ornare nisl odio malesuada sit posuere erat. Id
          pharetra, porta lacus amet. Praesent aliquam sit phasellus sem egestas
          arcu id mattis aliquam. Curabitur id bibendum
        </p>
        <img src="../assets/images/skill_desc_image.png" alt="skills-desc" />
      </div>
      <div>
        <img src="../assets/images/skill_desc_image.png" alt="skills-desc" />
      </div>
      <button class="button button-primary skill-desc-desktop-button">
        <img src="../assets/images/icon_check.svg" alt="arrow_icon" />
        Complete
      </button>
      <app-button
        :isLoading="isLoading"
        :startIcon="btnIcon"
        variant="primary"
        @click="claimPoints"
        >Complete</app-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";
import SkillsAccountSetup from "./cards/SkillsAccountSetup.vue";
import { VdaRewards } from "@/helpers/";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "SkillCard",
  props: {
    rewardType: {
      type: String,
      required: true,
      default: "avatar_uploaded",
    },
  },
  data: () => ({
    url: VUE_APP_BASE_URL,
    isLoading: false,
    did: "did:vda:0x991546Ee69f83076c70aAdA37B04e5a10a004B4b",
    btnIcon: require("../assets/images/icon_check.svg"),
  }),
  components: { SkillsAccountSetup, AppButton },
  methods: {
    async claimPoints() {
      this.isLoading = true;
      try {
        const res = await VdaRewards.claimAccountPoints(
          this.did,
          this.rewardType
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
