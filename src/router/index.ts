import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/playground",
    component: () => import("@/views/Playground.vue"),
  },
  { path: "/", redirect: "/playground" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
