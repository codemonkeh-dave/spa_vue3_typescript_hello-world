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
import { useAuth0 } from "@/auth/auth0-plugin";
import { ApiConfig } from "@/models/api-config";
import { ApiResponse } from "@/models/api-response";
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
    const auth0 = useAuth0();
    const apiServerUrl: string = process.env.VUE_APP_API_SERVER_URL;

    const messages: Messages = {
      public: "Anyone can see this message.",
      protected: "Only authenticated users should see this message.",
      admin:
        "Only authenticated users with the read:admin-messages permission should see this message.",
    };
    let activeMessage = ref<string>("public");
    let message = ref<string>("");

    const callApi = async (
      url: string,
      config: ApiConfig = {}
    ): Promise<ApiResponse | null> => {
      let fetchOptions = {};

      if (config.secure) {
        if (!auth0) {
          return null;
        }

        const token = await auth0.getAccessToken();

        if (!token) {
          return null;
        }

        fetchOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          ...fetchOptions,
        };
      }

      const response = await fetch(url, fetchOptions);
      const responseBody = await response.json();

      if (response.ok) {
        return { error: null, data: responseBody };
      }

      return {
        error: {
          status: response.status,
          message: responseBody.message,
        },
        data: null,
      };
    };

    const getMessage = async (type: string): Promise<null | void> => {
      /**
       * To call the /api/messages/admin endpoint, you need to log in
       * as a user that has the messages-admin role, which in turn
       * has the read:admin-messages permission.
       * If you need help doing so, check out the following resources.
       * Create roles:
       * https://auth0.com/docs/authorization/rbac/roles/create-roles
       * Create permissions:
       * https://auth0.com/docs/get-started/dashboard/add-api-permissions
       * Add permissions to roles:
       * https://auth0.com/docs/authorization/rbac/roles/add-permissions-to-roles
       * Assign roles to users:
       * https://auth0.com/docs/users/assign-roles-to-users
       */

      const resourceUrl = `${apiServerUrl}/api/messages/${type}`;

      activeMessage.value = type;

      const config: ApiConfig = {};

      if (type !== "public") {
        config.secure = true;
      }

      try {
        const response = await callApi(resourceUrl, config);

        if (!response) {
          return null;
        }

        const { error, data } = response;

        if (data) {
          message.value = data.message;
          return;
        }

        if (error) {
          message.value = `Error ${error.status}: ${error.message}`;
          return;
        }

        message.value = "Unable to retrieve messages.";
      } catch (error) {
        message.value = error.message || error;
      }
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
