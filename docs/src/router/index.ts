import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/PublicLayout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/public/HomePage.vue"),
        },
        {
          path: "article/:id",
          name: "Article",
          component: () => import("@/views/public/ArticlePage.vue"),
        },
        {
          path: "about",
          name: "About",
          component: () => import("@/views/public/AboutPage.vue"),
        },
        {
          path: "guestbook",
          name: "Guestbook",
          component: () => import("@/views/public/GuestbookPage.vue"),
        },
      ],
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("@/views/public/ChatPage.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/LoginPage.vue"),
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/admin/DashboardPage.vue"),
        },
        {
          path: "articles",
          name: "Articles",
          component: () => import("@/views/admin/ArticlesPage.vue"),
        },
        {
          path: "editor",
          name: "Editor",
          component: () => import("@/views/admin/EditorPage.vue"),
        },
        {
          path: "comments",
          name: "Comments",
          component: () => import("@/views/admin/CommentsPage.vue"),
        },
        {
          path: "guestbook",
          name: "AdminGuestbook",
          component: () => import("@/views/admin/GuestbookManagePage.vue"),
        },
        {
          path: "ai",
          name: "AIConfig",
          component: () => import("@/views/admin/AIConfigPage.vue"),
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/views/admin/SettingsPage.vue"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // TODO: Implement actual auth check
  const isAuthenticated = false; // Replace with actual auth logic

  if (requiresAuth && !isAuthenticated) {
    // For demo purposes, allow access
    // In production, redirect to login: next({ name: 'Login', query: { redirect: to.fullPath } })
    next();
  } else {
    next();
  }
});

export default router;
