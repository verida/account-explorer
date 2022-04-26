<template>
  <div class="sideNavBar" v-if="openSideNav">
    <div class="sideNavBar-content">
      <drop-down-nav :data="accountExplorer" :hideToggleButton="true" />
      <drop-down-nav :data="manageTokens" />
      <drop-down-nav :data="veridaRewards" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DropDownNav from "@/components/common/DropDownNav.vue";

export default defineComponent({
  name: "AppSideNavBar",
  props: ["item", "openSideNav"],
  data: () => ({
    open: false,
    manageTokens: {
      title: "Manage Tokens",
      icon: require("../../assets/images/icon_coin.svg"),
      items: ["dashboard", "claim Token", "Stake Token"],
    },
    accountExplorer: {
      title: "Account Explorer",
      icon: require("../../assets/images/icon_accountExplorer.svg"),
      items: [],
    },
    veridaRewards: {
      title: "Verida Rewards",
      icon: require("../../assets/images/icon_star.svg"),
      items: [],
    },
  }),
  components: { DropDownNav },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
});
</script>
