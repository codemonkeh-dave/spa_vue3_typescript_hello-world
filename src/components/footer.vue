<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-grid__info">
        <div class="footer-info__message">
          <p class="footer-message__headline">
            <span>This sample application is brought to you by&nbsp;</span>
            <hyperlink path="https://auth0.com/">Auth0</hyperlink>
          </p>
          <p class="footer-message__description">
            <hyperlink path="https://auth0.com/docs/quickstarts/">
              <span>
                Securely implement authentication using Auth0 on any stack and
                any device&nbsp;
              </span>
              <u>in less than 10 minutes</u>
            </hyperlink>
          </p>
        </div>
        <div class="footer-info__button">
          <button class="button button--secondary" @click="signUp">
            Create Free Auth0 Account
          </button>
        </div>
        <div class="footer-info__resource-list">
          <div
            v-bind:key="resource.path"
            v-for="resource in resourceList"
            class="footer-info__resource-list-item"
          >
            <hyperlink :path="resource.path">
              {{ resource.label }}
            </hyperlink>
          </div>
        </div>
      </div>
      <div class="footer-grid__brand">
        <div class="footer-brand">
          <img
            class="footer-brand__logo"
            src="https://images.ctfassets.net/23aumh6u8s0i/1UiaijF2PoaHIfcaIMRWYZ/cba84a2df9ba67f48e80aa117d0c78a3/auth0-shield.svg"
            alt="Auth0"
            width="20"
            height="22.22"
          />
          <Hyperlink path="https://auth0.com/"> Auth0 Inc </Hyperlink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Hyperlink from "@/components/hyperlink.vue";
import { Resource } from "@/models/resource";

export default {
  name: "Footer",
  components: { Hyperlink },
  setup(): {
    resourceList: Resource[];
    signUp: () => void;
  } {
    const resourceList: Resource[] = [
      {
        path: "https://auth0.com/why-auth0/",
        label: "Why Auth0",
      },
      {
        path: "https://auth0.com/docs/get-started",
        label: "How It Works",
      },
      {
        path: "https://auth0.com/blog/developers/",
        label: "Developer Blog",
      },
      {
        path: "https://auth0.com/contact-us",
        label: "Contact an Expert",
      },
    ];

    const signUp = (): void => {
      window.open("https://auth0.com/signup", "_blank", "noopener noreferrer");
    };

    return {
      resourceList,
      signUp,
    };
  },
};
</script>
