<template>
  <div class="content-layout">
    <h1 class="content__title">External API</h1>
    <div class="content__body">
      <p>
        You can use the buttons below to retrieve the corresponding message from
        a local store.
        <br />
        <strong>Only authenticated users can access this page.</strong>
      </p>

      <div class="messages-grid">
        <div class="messages-grid__header">Messages</div>
        <div class="messages-grid__options">
          <div
            @click="() => getMessage('public')"
            class="messages-grid__option"
            v-bind:class="{
              'messages-grid__option--active': activeMessage === 'public',
            }"
          >
            Public
          </div>
          <div
            @click="() => getMessage('protected')"
            class="messages-grid__option"
            v-bind:class="{
              'messages-grid__option--active': activeMessage === 'protected',
            }"
          >
            Protected
          </div>
          <div
            @click="() => getMessage('admin')"
            class="messages-grid__option"
            v-bind:class="{
              'messages-grid__option--active': activeMessage === 'admin',
            }"
          >
            Admin
          </div>
        </div>
        <code class="messages-grid__message">
          {{ this.message }}
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Messages } from "@/models/messages";
import { ref, Ref } from "vue";

export default {
  name: "ExternalApi",
  setup(): {
    messages: Messages;
    activeMessage: Ref<string>;
    message: Ref<string>;
    getMessage: (type: string) => void;
  } {
    const messages: Messages = {
      public: "Anyone can see this message.",
      protected: "Only authenticated users should see this message.",
      admin:
        "Only authenticated users with the read:admin-messages permission should see this message.",
    };
    let activeMessage = ref<string>("public");
    let message = ref<string>("");

    const getMessage = async (type: string) => {
      activeMessage.value = type;
      message.value = messages[type];
    };

    getMessage("public");

    return {
      messages,
      activeMessage,
      message,

      getMessage,
    };
  },
};
</script>
