<template>
  <div class="profile">
    <div class="profile-card mt-2">
      <div class="mb-1 profile-card-img">
        <img alt="user-avatar" src="../../assets/images/user.png" />
      </div>

      <div class="profile-card-button mb-2">
        <button class="button button-outlined mb-1">Add as Contact</button>
        <img alt="user-avatar" src="../../assets/images/qr.svg" />
      </div>

      <div class="profile-card-details">
        <h4>Waden Warren</h4>
        <p><span> DID:</span> ethr:0xef7ef8c9a6d4ae6fc02b6fc1</p>
        <p><span>COUNTRY:</span> Nigeria</p>
        <p>
          <span>DESCRIPTION:</span> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          exercitationem enim ea commodi, cum culpa asperiores accusantium
          deserunt distinctio repellat consectetur earum, repellendus
          voluptates. Labore velit vero minus soluta molestiae, ipsam atque
          exercitationem sapiente aspernatur dolorem officiis assumenda at dicta
          quisquam quas, inventore harum! Recusandae distinctio esse enim maxime
          eligendi.
        </p>
      </div>
    </div>
    <hr />
    <message-text-field />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MessageTextField from "./MessageTextField.vue";

export default defineComponent({
  name: "Profile",
  components: { MessageTextField },
});
</script>
