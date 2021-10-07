import { Auth0Provider } from "@/models/auth0-provider";
import auth0, {
  Auth0Client,
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
  User,
} from "@auth0/auth0-spa-js";
import { App, inject, ref, watch } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;

const auth0Client = ref<Auth0Client | null>(null);
const isAuthenticated = ref(false);
const isLoading = ref(true);
const user = ref<User | null>(null);
const error = ref<Error | null>(null);

const Auth0Symbol = Symbol();

const createAuth0Client = async (): Promise<void> => {
  auth0Client.value = await auth0({
    domain,
    client_id: clientId,
    audience: audience,
    redirect_uri: window.location.origin,
  });
};

const handleAuth0RedirectCallback = async (
  onRedirectCallback: (appState: { targetUrl: string }) => void
): Promise<void> => {
  if (!auth0Client.value) {
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

    return;
  }

  if (hasCode && hasState) {
    const { appState } = await auth0Client.value.handleRedirectCallback();

    onRedirectCallback(appState);
  }
};

const initializeAuth0 = async ({
  onRedirectCallback = () =>
    window.history.replaceState({}, document.title, window.location.pathname),
}): Promise<void> => {
  await createAuth0Client();

  if (!auth0Client.value) {
    return;
  }

  try {
    await handleAuth0RedirectCallback(onRedirectCallback);
  } catch (error) {
    error.value = error;
  } finally {
    isAuthenticated.value = await auth0Client.value.isAuthenticated();
    user.value = (await auth0Client.value.getUser()) || null;
    isLoading.value = false;
  }
};

export const login = async (options?: RedirectLoginOptions): Promise<void> => {
  if (!auth0Client.value) {
    return;
  }

  await auth0Client.value.loginWithRedirect(options);
};

const logout = async (options?: LogoutOptions): Promise<void> => {
  if (!auth0Client.value) {
    return;
  }

  auth0Client.value.logout(options);
};

const getAccessToken = async (
  options?: GetTokenSilentlyOptions
): Promise<null | string> => {
  if (!auth0Client.value) {
    return null;
  }

  return (await auth0Client.value.getTokenSilently(options)) as string;
};

export const Auth0Plugin = {
  install: (app: App): void => {
    const auth0 = {
      isAuthenticated,
      isLoading,
      user,

      initializeAuth0,
      login,
      logout,
      getAccessToken,
    };
    app.provide(Auth0Symbol, auth0);
  },
};

export const useAuth0 = (): null | Auth0Provider => {
  const auth0 = inject<Auth0Provider>(Auth0Symbol);

  if (!auth0) {
    return null;
  }

  return auth0;
};

export const authenticationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const guardAction = async (): Promise<void> => {
    if (isAuthenticated.value) {
      next();
      return;
    }

    await login({ appState: { targetUrl: to.fullPath } });
  };

  if (!isLoading.value) {
    guardAction();
    return;
  }

  watch(isLoading, async (currentValue) => {
    if (!currentValue) {
      await guardAction();
    }
  });
};
