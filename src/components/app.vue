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
import { useAuth0 } from "@/auth/auth0-plugin";
import Footer from "@/components/footer.vue";
import Loader from "@/components/loader.vue";
import NavBar from "@/components/nav-bar.vue";
import { Auth0Plugin } from "@/models/auth0-plugin";
import { onMounted } from "vue";

export default {
  name: "App",
  components: { Footer, NavBar, Loader },
  setup(): { auth0: Auth0Plugin | null } {
    const auth0 = useAuth0();

    onMounted(async () => {
      if (!auth0) {
        return;
      }

      await auth0.createClient();
      await auth0.handleCallback();
    });

    return {
      auth0,
    };
  },
};
</script>
