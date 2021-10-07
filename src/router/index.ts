import ExternalApi from "@/pages/external-api.vue";
import Home from "@/pages/home.vue";
import Profile from "@/pages/profile.vue";
import { authenticationGuard } from "@/services/auth0";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authenticationGuard,
  },
  {
    path: "/external-api",
    name: "external-api",
    component: ExternalApi,
    beforeEnter: authenticationGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
