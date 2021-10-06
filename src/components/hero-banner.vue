<template>
  <div class="hero-banner">
    <img class="hero-banner__logo" :src="logo" alt="Vue logo" />
    <h1 class="hero-banner__headline">Hello, Vue World!</h1>
    <p class="hero-banner__description">
      This is a sample application that demonstrates the authentication flow for
      a Vue app using <strong>Auth0</strong>.
    </p>

    <button @click="openQuickStart" class="button button--secondary">
      Check out the Vue Quickstart →
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "HeroBanner",
  setup(): { logo: string; openQuickStart: () => void } {
    const logo =
      "https://images.ctfassets.net/23aumh6u8s0i/4LBuF4xZBx612XX1snfDYZ/924745d96ad04f4b7fd9cc8e70c633aa/vue-2.svg";

    const openQuickStart = (): void => {
      window.open(
        "https://auth0.com/docs/quickstart/spa/vuejs",
        "_blank",
        "noopener noreferrer"
      );
    };

    return {
      logo,
      openQuickStart,
    };
  },
};
</script>
