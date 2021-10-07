<template>
  <div class="content-layout">
    <h1 class="content__title">Profile</h1>
    <div class="content__body">
      <p>
        <strong>Only authenticated users can access this page.</strong>
      </p>
      <div class="profile-grid">
        <div class="profile__header">
          <img :src="picture" alt="Profile" class="profile__avatar" />
          <div class="profile__headline">
            <h2 class="profile__title">{{ name }}</h2>
            <span class="profile__description">{{ email }}</span>
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
import { useAuth0 } from "@/auth/auth0-plugin";
import CodeSnippet from "@/components/code-snippet.vue";
import { computed, ComputedRef } from "vue";

export default {
  name: "Profile",
  components: { CodeSnippet },
  setup(): {
    code: ComputedRef<string | null>;
    name: ComputedRef<string | null>;
    email: ComputedRef<string | null>;
    picture: ComputedRef<string | null>;
  } {
    const auth0 = useAuth0();

    const code = computed((): string =>
      JSON.stringify(auth0?.user.value, null, 2)
    );

    const name = computed((): string | null => {
      return auth0?.user?.value?.name ?? null;
    });

    const email = computed((): string | null => {
      return auth0?.user?.value?.email ?? null;
    });

    const picture = computed((): string | null => {
      return auth0?.user?.value?.picture ?? null;
    });

    return {
      name,
      email,
      picture,
      code,
    };
  },
};
</script>
