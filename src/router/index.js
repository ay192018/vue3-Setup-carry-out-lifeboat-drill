import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/recommend",
    },
    {
      path: "/recommend",
      name: "recommend",
      component: () => import("@/pages/recommended/index.vue"),
    },
    {
      path: "/singer",
      name: "singer",
      component: () => import("@/pages/singer/index.vue"),
      children: [
        {
          name: "Detail",
          path: ":id",
          component: () => import("@/pages/singerDetail/index.vue"),
        },
      ],
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/pages/search/index.vue"),
    },
    {
      path: "/rank",
      name: "rank",
      component: () => import("@/pages/rank/index.vue"),
    },
  ],
})

export default router
