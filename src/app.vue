<template>
  <div v-if="auth0.isLoading.value" class="page-layout">
    <Loader />
  </div>

  <div v-else class="page-layout">
    <NavBar />
    <div class="page-layout__content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Footer from "@/components/footer.vue";
import Loader from "@/components/loader.vue";
import NavBar from "@/components/nav-bar.vue";
import { Auth0Provider } from "@/models/auth0-provider";
import router from "@/router";
import { useAuth0 } from "@/services/auth0";
import { onMounted } from "vue";

const onRedirectCallback = (appState: { targetUrl: string }): void => {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

export default {
  name: "App",
  components: { Footer, NavBar, Loader },
  setup(): { auth0: Auth0Provider | null } {
    const auth0 = useAuth0();

    onMounted(async () => {
      if (!auth0) {
        return;
      }

      await auth0.initializeAuth0({ onRedirectCallback });
    });

    return {
      auth0,
    };
  },
};
</script>
