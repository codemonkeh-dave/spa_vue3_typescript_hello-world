import { createApp } from "vue";
import App from "./app.vue";
import "./assets/css/styles.css";
import router from "./router";
import { Auth0Plugin } from "./services/auth0";
import store from "./store";

const app = createApp(App);

app.use(Auth0Plugin).use(store).use(router).mount("#app");
