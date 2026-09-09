<script setup lang="ts">
import { ArrowUpRight, Bot, Send, Sparkles, X } from "lucide-vue-next";
import { useChat } from "@/composables/useChat";
import { useRouter } from "vue-router";

interface Props {
  open: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();
const { messages, input, generating, sendChat, clearChat } = useChat();

function handleFullscreen() {
  router.push({ name: "Chat" });
  emit("close");
}
</script>

<template>
  <div v-if="open" class="chat-overlay" @click.self="emit('close')">
    <aside class="chat-panel">
      <header>
        <div>
          <span class="ai-icon"><Bot :size="16" /></span>
          <b
            >Blue 助手<small><i /> 在线 · 基于已发布文章</small></b
          >
        </div>
        <div>
          <button aria-label="全屏对话" @click="handleFullscreen">
            <ArrowUpRight :size="17" />
          </button>
          <button aria-label="关闭对话" @click="emit('close')">
            <X :size="18" />
          </button>
        </div>
      </header>
      <div class="chat-body">
        <div v-if="!messages.length" class="chat-empty">
          <span class="welcome-spark"><Sparkles :size="22" /></span>
          <h3>有什么想了解的？</h3>
          <p>我会基于博客里已经发布的内容回答。</p>
          <button
            v-for="q in ['有哪些前端相关文章？', '介绍一下博主']"
            :key="q"
            @click="sendChat(q)"
          >
            {{ q }} <ArrowUpRight :size="14" />
          </button>
        </div>
        <div v-else class="chat-messages">
          <div
            v-for="(m, i) in messages"
            :key="i"
            class="message"
            :class="m.role"
          >
            <span class="message-avatar">{{
              m.role === "ai" ? "✦" : "我"
            }}</span>
            <div>{{ m.text }}</div>
          </div>
          <div v-if="generating" class="typing">•••</div>
        </div>
      </div>
      <div class="chat-input">
        <textarea
          v-model="input"
          placeholder="问问关于博客的任何事…"
          @keydown.enter.prevent="sendChat()"
        />
        <button :disabled="!input.trim()" @click="sendChat()">
          <Send :size="17" />
        </button>
        <small>✦ AI 可能会出错，请自行判断</small>
      </div>
    </aside>
  </div>
</template>
