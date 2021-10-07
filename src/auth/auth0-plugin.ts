import { Auth0Plugin } from "@/models/auth0-plugin";
import { RedirectLoginOptionsEnhanced } from "@/models/redirect-login-options-enhanced";
import createAuth0Client, { Auth0Client, User } from "@auth0/auth0-spa-js";
import { inject, provide, ref } from "vue";
import router from "../router";

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;

const auth0Client = ref<Auth0Client | null>(null);
export const isAuthenticated = ref(false);
export const isLoading = ref(true);
const user = ref<User | null>(null);
const error = ref<Error | null>(null);

const Auth0Symbol = Symbol();

const createClient = async (): Promise<void> => {
  auth0Client.value = await createAuth0Client({
    domain,
    client_id: clientId,
    audience: audience,
    redirect_uri: window.location.origin,
  });
};

const handleCallback = async (): Promise<void> => {
  if (!auth0Client.value) {
    return;
  }

  isAuthenticated.value = await auth0Client.value.isAuthenticated();

  if (isAuthenticated.value) {
    user.value = (await auth0Client.value.getUser()) || null;
    isLoading.value = false;

    window.history.replaceState({}, document.title, window.location.pathname);

    return;
  }

  const params = new URLSearchParams(window.location.search);
  const hasError = params.has("error");
  const hasCode = params.has("code");
  const hasState = params.has("state");

  if (hasError) {
    error.value = new Error(
      params.get("error_description") || "error completing login process"
    );

    isLoading.value = false;

    return;
  }

  if (hasCode && hasState) {
    try {
      const result = await auth0Client.value.handleRedirectCallback();

      let url = "/";

      if (result.appState && result.appState.targetUrl) {
        url = result.appState.targetUrl;
      }

      isAuthenticated.value = await auth0Client.value.isAuthenticated();

      if (isAuthenticated.value) {
        user.value = (await auth0Client.value.getUser()) || null;
        error.value = null;

        isLoading.value = false;

        await router.push(url);

        return;
      }
    } catch (err) {
      error.value = err;
    }
  }

  isLoading.value = false;
};

export const login = async (
  options?: RedirectLoginOptionsEnhanced
): Promise<void> => {
  if (!auth0Client.value) {
    return;
  }

  const loginOptions = options || {
    targetUrl: window.location.origin,
    redirect_uri: window.location.origin,
  };

  loginOptions.targetUrl = loginOptions.targetUrl || window.location.origin;

  try {
    if (!loginOptions.redirect_uri) {
      loginOptions.redirect_uri = window.location.origin;
    }

    if (loginOptions.targetUrl) {
      loginOptions.appState = { targetUrl: loginOptions.targetUrl };
    }

    await auth0Client.value.loginWithRedirect(loginOptions);
  } catch (err) {
    error.value = err;
  }
};

const logout = async (): Promise<void> => {
  if (!auth0Client.value) {
    return;
  }

  try {
    auth0Client.value.logout({
      returnTo: window.location.origin,
    });
  } catch (err) {
    error.value = err;
  }
};

const getAccessToken = async (): Promise<null | string> => {
  if (!auth0Client.value) {
    return null;
  }

  return (await auth0Client.value.getTokenSilently()) as string;
};

export const provideAuth0 = (): void => {
  const auth0 = {
    isAuthenticated,
    isLoading,
    user,

    createClient,
    handleCallback,
    login,
    logout,
    getAccessToken,
  };

  provide(Auth0Symbol, auth0);
};

export const useAuth0 = (): null | Auth0Plugin => {
  const auth0 = inject<Auth0Plugin>(Auth0Symbol);

  if (!auth0) {
    return null;
  }

  return auth0;
};
