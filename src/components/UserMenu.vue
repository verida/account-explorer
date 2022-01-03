<template>
  <div class="user-menu-widget">
    <span class="mx-2">{{ name }}</span>
    <div v-show="did" class="m-dropdown">
      <div
        @click="toggleDropdown"
        :class="['m-dropdown-top', isOpened && 'show']"
      >
        <img height="40" v-if="avatar" alt="user-avatar" :src="avatar" />
        <img v-else height="40" src="../assets/images/avatar.svg" alt="i" />
      </div>
      <div v-show="isOpened" class="m-dropdown-logout">
        <button @click="onLogout">
          <img height="20" src="../assets/images/logout.svg" alt="icon" />
          <span> Log out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import veridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "UserMenu",
  props: {
    logout: {
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      isOpened: false,
      did: veridaHelper.did,
      avatar: "",
      name: "",
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },

    async onLogout() {
      await this.logout();
    },
    setProfile(profile) {
      this.avatar = profile?.avatar;
      this.name = profile?.name;
    },
  },
  created() {
    veridaHelper.on("profileChanged", (profile) => {
      this.setProfile(profile);
    });
  },
});
</script>
