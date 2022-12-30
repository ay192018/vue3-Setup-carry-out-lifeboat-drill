import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/recommend",
      children: [
        {
          path: "/Theme",
          name: "Theme",
          component: () => import("@/pages/Theme/index.vue"),
        },
      ],
    },
    {
      path: "/recommend",
      name: "recommend",
      component: () => import("@/pages/recommended/index.vue"),
      children: [
        {
          name: "recommendDetail",
          path: ":id",
          component: () => import("@/pages/recommDetail/index.vue"),
        },
      ],
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
      children: [
        {
          name: "rankDetail",
          path: ":id",
          component: () => import("@/pages/rankDetail/index.vue"),
        },
      ],
    },
    {
      path: "/my",
      name: "my",
      component: () => import("@/pages/my/index.vue"),
    },
  ],
})

export default router
