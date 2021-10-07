import { RedirectLoginOptions } from "@auth0/auth0-spa-js";

export interface RedirectLoginOptionsEnhanced extends RedirectLoginOptions {
  targetUrl?: string;
}
