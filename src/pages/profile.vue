<template>
  <div class="content-layout">
    <h1 class="content__title">Profile</h1>
    <div class="content__body">
      <p>
        <strong>Only authenticated users can access this page.</strong>
      </p>
      <div class="profile-grid">
        <div class="profile__header">
          <img :src="user.picture" alt="Profile" class="profile__avatar" />
          <div class="profile__headline">
            <h2 class="profile__title">{{ user.name }}</h2>
            <span class="profile__description">{{ user.email }}</span>
          </div>
        </div>
        <div class="profile__details">
          <CodeSnippet :code="code" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CodeSnippet from "@/components/code-snippet.vue";
import { User } from "@/models/user";
import { computed, ComputedRef, Ref, ref } from "vue";

export default {
  name: "Profile",
  components: { CodeSnippet },
  setup(): {
    user: Ref<User>;
    code: ComputedRef<string>;
  } {
    const user = ref<User>({
      nickname: "Alex",
      name: "Alex Cero",
      picture:
        "https://images.ctfassets.net/23aumh6u8s0i/XWKpjS2uxXPDPGMl99FoV/d82a062cd4514a985fb47f8d4b5d3660/auth0-user.png",
      updated_at: "2021-05-04T21:33:09.415Z",
      email: "alex@example.com",
      email_verified: false,
      sub: "auth0|12345678901234567890",
    });

    const code = computed((): string => JSON.stringify(user.value, null, 2));

    return {
      user,
      code,
    };
  },
};
</script>
