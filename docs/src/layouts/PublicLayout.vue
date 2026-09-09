<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { Bot, Github, LogIn, Menu } from "lucide-vue-next";
import ChatPanel from "@/components/chat/ChatPanel.vue";
import Toast from "@/components/ui/Toast.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";
import { usePointerEffects } from "@/composables/usePointerEffects";

const route = useRoute();
const router = useRouter();
const mobileOpen = ref(false);
const chatOpen = ref(false);

// Setup pointer effects
usePointerEffects();

onMounted(() => {
  requestAnimationFrame(() =>
    document.querySelector(".app")?.classList.add("page-ready")
  );
});

function goToLogin() {
  router.push({ name: "Login" });
}
</script>

<template>
  <div class="app public-shell">
    <header class="public-nav">
      <div class="nav-inner">
        <RouterLink to="/" class="brand">
          <span class="brand-mark">bn<span>.</span></span>
          <b>Blue Note</b>
        </RouterLink>
        <nav class="desktop-nav">
          <RouterLink
            to="/"
            :class="{ active: route.name === 'Home' }"
            @click="mobileOpen = false"
          >
            博客
          </RouterLink>
          <RouterLink
            to="/about"
            :class="{ active: route.name === 'About' }"
            @click="mobileOpen = false"
          >
            关于我
          </RouterLink>
          <RouterLink
            to="/guestbook"
            :class="{ active: route.name === 'Guestbook' }"
            @click="mobileOpen = false"
          >
            留言板
          </RouterLink>
          <button class="nav-ai" @click="chatOpen = true">
            <Bot :size="15" /> AI 对话
          </button>
        </nav>
        <div class="nav-actions">
          <ThemeToggle />
          <button class="mobile-menu" @click="mobileOpen = !mobileOpen">
            <Menu :size="20" />
          </button>
          <span class="avatar">林</span>
        </div>
      </div>
      <div v-if="mobileOpen" class="mobile-nav">
        <RouterLink to="/" @click="mobileOpen = false">博客</RouterLink>
        <RouterLink to="/about" @click="mobileOpen = false">关于我</RouterLink>
        <RouterLink to="/guestbook" @click="mobileOpen = false"
          >留言板</RouterLink
        >
        <button
          @click="
            chatOpen = true;
            mobileOpen = false;
          "
        >
          <Bot :size="15" /> AI 对话
        </button>
        <div class="mobile-theme-toggle">
          <span>主题</span>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-brand-group">
        <RouterLink to="/" class="brand">
          <span class="brand-mark">bn<span>.</span></span>
          <b>Blue Note</b>
        </RouterLink>
        <span class="footer-tagline">写给正在路上的人。</span>
      </div>
      <div class="footer-links">
        <a href="https://github.com"><Github :size="14" /> GitHub</a>
        <button @click="goToLogin"><LogIn :size="14" /> 博主登录</button>
        <span class="footer-copyright">© 2026 Lin</span>
      </div>
    </footer>

    <button
      v-if="!chatOpen"
      class="ai-fab"
      aria-label="问问 Blue"
      @click="chatOpen = true"
    >
      <Bot :size="18" /><span class="ai-fab-label">问问 Blue</span>
    </button>

    <ChatPanel :open="chatOpen" @close="chatOpen = false" />
    <Toast />
  </div>
</template>

<style scoped>
.public-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.public-shell > main {
  flex: 1;
  min-width: 0;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px 32px;
  width: min(1240px, calc(100% - 64px));
  margin: 0 auto;
  /* Leave a clear strip below the links for the fixed chat launcher. */
  padding: 28px 0 calc(30px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--blue-line);
  background: transparent;
  color: var(--ink-soft);
  font-size: 12px;
  line-height: 1.6;
}

.footer-brand-group,
.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
}

.footer-tagline {
  color: var(--ink-faint);
}

.footer-links a,
.footer-links button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0;
  white-space: nowrap;
  cursor: pointer;
}

.footer-links a:hover,
.footer-links button:hover {
  color: var(--blue);
}

.footer-copyright {
  color: var(--ink-faint);
  white-space: nowrap;
}

/* Override the shared button effects, which set position: relative. */
.public-shell .ai-fab {
  position: fixed;
  inset: auto calc(24px + env(safe-area-inset-right))
    calc(24px + env(safe-area-inset-bottom)) auto;
  z-index: 25;
  width: auto;
  min-height: 44px;
  flex-shrink: 0;
  background: var(--card-bg);
  border-color: var(--blue-line);
  color: var(--blue);
  box-shadow: var(--shadow-sm);
}

.public-shell .ai-fab:hover {
  box-shadow: var(--shadow-md);
}

.footer-links a:focus-visible,
.footer-links button:focus-visible,
.public-shell .ai-fab:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 4px;
}

@media (max-width: 700px) {
  .site-footer {
    width: calc(100% - 36px);
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .footer-brand-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .footer-links {
    gap: 8px 20px;
  }

  .public-shell .ai-fab {
    right: calc(18px + env(safe-area-inset-right));
    bottom: calc(18px + env(safe-area-inset-bottom));
    width: 44px;
    padding: 0;
    justify-content: center;
  }
}
</style>
