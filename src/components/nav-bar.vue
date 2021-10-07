<template>
  <div class="nav-bar__container">
    <nav class="nav-bar">
      <div class="nav-bar__brand">
        <router-link to="/">
          <img
            class="nav-bar__logo"
            src="https://images.ctfassets.net/23aumh6u8s0i/1UiaijF2PoaHIfcaIMRWYZ/cba84a2df9ba67f48e80aa117d0c78a3/auth0-shield.svg"
            alt="Auth0 shield logo"
            width="35.98"
            height="40"
          />
        </router-link>
      </div>
      <div class="nav-bar__tabs">
        <router-link
          to="/profile"
          exact
          class="nav-bar__tab"
          active-class="nav-bar__tab--active"
        >
          Profile
        </router-link>
        <router-link
          to="/external-api"
          exact
          class="nav-bar__tab"
          active-class="nav-bar__tab--active"
        >
          External API
        </router-link>
      </div>
      <div class="nav-bar__actions">
        <AuthenticationButton />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import AuthenticationButton from "@/components/buttons/authentication-button.vue";

export default {
  name: "NavBar",
  components: { AuthenticationButton },
};
</script>
