<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import {
  ArrowLeft,
  Bot,
  ChevronDown,
  ChevronRight,
  FileText,
  Inbox,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  Settings,
  X,
} from "lucide-vue-next";
import Toast from "@/components/ui/Toast.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";
import { usePointerEffects } from "@/composables/usePointerEffects";

const route = useRoute();
const mobileOpen = ref(false);

watch(
  () => route.fullPath,
  () => (mobileOpen.value = false)
);

// Setup pointer effects
usePointerEffects();

const adminSection = computed(() => {
  if (route.name === "Dashboard") return "概览";
  if (route.name === "Articles" || route.name === "Editor") return "文章管理";
  if (route.name === "Comments") return "评论管理";
  if (route.name === "AdminGuestbook") return "留言管理";
  if (route.name === "AIConfig") return "AI 助手";
  if (route.name === "Settings") return "设置";
  return "管理后台";
});

onMounted(() => {
  requestAnimationFrame(() =>
    document.querySelector(".app")?.classList.add("page-ready")
  );
});
</script>

<template>
  <div class="app admin-shell" @keydown.esc="mobileOpen = false">
    <button
      v-if="mobileOpen"
      class="admin-backdrop"
      aria-label="关闭导航菜单"
      @click="mobileOpen = false"
    />
    <aside
      id="admin-sidebar"
      class="admin-sidebar"
      :class="{ open: mobileOpen }"
    >
      <div class="admin-logo">
        <RouterLink to="/" class="brand">
          <span class="brand-mark">bn<span>.</span></span>
          <b>Blue Note</b>
        </RouterLink>
        <span class="admin-badge">ADMIN</span>
        <button
          class="sidebar-close icon-button"
          aria-label="收起导航菜单"
          @click="mobileOpen = false"
        >
          <X :size="18" />
        </button>
      </div>
      <div class="admin-profile">
        <span class="avatar">林</span>
        <div>
          <b>林默</b>
          <small>编辑者</small>
        </div>
        <ChevronDown :size="15" />
      </div>
      <nav class="admin-nav">
        <RouterLink
          to="/admin"
          :class="{ active: route.name === 'Dashboard' }"
          @click="mobileOpen = false"
        >
          <LayoutDashboard :size="17" /> 概览
        </RouterLink>
        <RouterLink
          to="/admin/articles"
          :class="{
            active: route.name === 'Articles' || route.name === 'Editor',
          }"
          @click="mobileOpen = false"
        >
          <FileText :size="17" /> 文章管理 <b>24</b>
        </RouterLink>
        <RouterLink
          to="/admin/comments"
          :class="{ active: route.name === 'Comments' }"
          @click="mobileOpen = false"
        >
          <MessageCircle :size="17" /> 评论管理 <b>3</b>
        </RouterLink>
        <RouterLink
          to="/admin/guestbook"
          :class="{ active: route.name === 'AdminGuestbook' }"
          @click="mobileOpen = false"
        >
          <Inbox :size="17" /> 留言管理 <b>2</b>
        </RouterLink>
        <RouterLink
          to="/admin/ai"
          :class="{ active: route.name === 'AIConfig' }"
          @click="mobileOpen = false"
        >
          <Bot :size="17" /> AI 助手
        </RouterLink>
      </nav>
      <nav class="admin-bottom">
        <RouterLink
          to="/admin/settings"
          :class="{ active: route.name === 'Settings' }"
          @click="mobileOpen = false"
        >
          <Settings :size="17" /> 设置
        </RouterLink>
        <RouterLink to="/" @click="mobileOpen = false">
          <ArrowLeft :size="17" /> 返回博客
        </RouterLink>
      </nav>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <button
          class="mobile-admin-menu icon-button"
          aria-label="打开导航菜单"
          aria-controls="admin-sidebar"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <Menu :size="20" />
        </button>
        <div class="crumb">
          Blue Note <ChevronRight :size="14" /> <b>{{ adminSection }}</b>
        </div>
        <div class="top-actions">
          <ThemeToggle />
          <Search :size="18" />
          <span class="avatar">林</span>
        </div>
      </header>

      <main class="admin-content">
        <RouterView />
      </main>
    </div>

    <Toast />
  </div>
</template>

<style scoped>
.admin-shell {
  min-height: 100dvh;
}

.admin-shell .admin-sidebar {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow-y: auto;
  border-right: 1px solid var(--blue-line);
  background: var(--paper-blue);
}

.admin-shell .admin-profile,
.admin-shell .admin-bottom {
  border-color: var(--blue-line);
}

.admin-shell .admin-nav a,
.admin-shell .admin-bottom a {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 10px;
  border-radius: 9px;
  color: var(--ink-soft);
  font-size: 12px;
}

.admin-shell .admin-nav a:hover,
.admin-shell .admin-nav a.active,
.admin-shell .admin-bottom a:hover,
.admin-shell .admin-bottom a.active {
  background: var(--card-bg);
  color: var(--blue);
  box-shadow: var(--shadow-sm);
}

.admin-shell .admin-nav a:focus-visible,
.admin-shell .admin-bottom a:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}

.admin-shell .avatar {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 31px;
  height: 31px;
  margin: 0;
  border-radius: 10px;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
}

.admin-shell .admin-topbar {
  gap: 12px;
  border-bottom: 1px solid var(--blue-line);
  background: var(--nav-bg);
}

.admin-shell .crumb {
  flex: 1;
  min-width: 0;
}

.admin-shell .top-actions {
  flex-shrink: 0;
}

.admin-backdrop,
.sidebar-close {
  display: none;
}

@media (max-width: 700px) {
  .admin-shell .admin-sidebar {
    position: fixed;
  }

  .admin-shell .admin-sidebar.open {
    box-shadow: var(--shadow-md);
  }

  .admin-backdrop {
    position: fixed;
    z-index: 40;
    inset: 0;
    display: block;
    background: rgba(2, 8, 18, 0.45);
  }

  .admin-backdrop:active {
    transform: none;
  }

  .sidebar-close {
    display: inline-flex;
  }

  .admin-badge {
    display: none;
  }

  .admin-shell .top-actions {
    gap: 8px;
  }
}
</style>
