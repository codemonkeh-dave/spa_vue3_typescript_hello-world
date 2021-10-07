<template>
  <App />
</template>

<script lang="ts">
import { provideAuth0 } from "@/auth/auth0-plugin";
import App from "@/components/app.vue";

export default {
  name: "Shell",
  components: { App },
  setup(): void {
    provideAuth0();
  },
};
</script>
