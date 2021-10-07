import {
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
  User,
} from "@auth0/auth0-spa-js";
import { Ref } from "vue";

interface Auth0Config {
  onRedirectCallback?: (appState: { targetUrl: string }) => void;
}

export interface Auth0Provider {
  isAuthenticated: Ref<boolean>;
  isLoading: Ref<boolean>;
  user: Ref<User | null>;
  initializeAuth0: (auth0Config?: Auth0Config) => Promise<void>;
  login: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  getAccessToken: (options?: GetTokenSilentlyOptions) => Promise<null | string>;
}
