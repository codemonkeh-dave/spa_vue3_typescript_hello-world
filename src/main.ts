import { createApp } from "vue";
import "./assets/css/styles.css";
import router from "./router";
import Shell from "./shell.vue";
import store from "./store";

const app = createApp(Shell);

app.use(store).use(router).mount("#app");
