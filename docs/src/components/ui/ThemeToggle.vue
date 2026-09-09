<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { useTheme } from "@/composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'"
  >
    <Transition name="theme-icon" mode="out-in">
      <Sun v-if="theme === 'light'" :size="18" key="sun" />
      <Moon v-else :size="18" key="moon" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--ink-soft);
  transition: background 0.18s ease, color 0.18s ease, transform 0.16s ease;
  cursor: pointer;
}

.theme-toggle:hover {
  background: var(--paper-blue);
  color: var(--ink);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.theme-icon-enter-from {
  transform: rotate(-90deg) scale(0.8);
  opacity: 0;
}

.theme-icon-leave-to {
  transform: rotate(90deg) scale(0.8);
  opacity: 0;
}
</style>
