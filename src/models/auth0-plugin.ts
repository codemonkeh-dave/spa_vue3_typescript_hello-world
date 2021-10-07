import { RedirectLoginOptionsEnhanced } from "@/models/redirect-login-options-enhanced";
import { User } from "@auth0/auth0-spa-js";
import { Ref } from "vue";

export interface Auth0Plugin {
  isAuthenticated: Ref<boolean>;
  isLoading: Ref<boolean>;
  user: Ref<User | null>;
  createClient: () => Promise<void>;
  handleCallback: () => Promise<void>;
  login: (options?: RedirectLoginOptionsEnhanced) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<null | string>;
}
