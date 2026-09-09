<script setup lang="ts">
import {
  ArrowUpRight,
  Bot,
  FileText,
  Lightbulb,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useChat } from "@/composables/useChat";

const router = useRouter();
const { messages, input, generating, sendChat, clearChat } = useChat();

function handleExit() {
  router.push({ name: "Home" });
}
</script>

<template>
  <div class="full-chat">
    <header>
      <RouterLink to="/" class="brand">
        <span class="brand-mark">bn<span>.</span></span>
        <b>Blue Note</b>
      </RouterLink>
      <button class="back-link" @click="handleExit">
        退出对话 <X :size="16" />
      </button>
    </header>
    <div class="full-chat-body">
      <div v-if="!messages.length" class="chat-welcome">
        <span class="welcome-spark"><Sparkles :size="24" /></span>
        <span class="eyebrow centered">BLUE ASSISTANT</span>
        <h1>关于这个博客，<br /><em>你可以问我。</em></h1>
        <p>我会阅读 Blue Note 里已经发布的文章，帮你找到感兴趣的内容。</p>
        <div class="prompts">
          <button @click="sendChat('有哪些前端相关文章？')">
            <FileText :size="17" />有哪些前端相关文章？
            <ArrowUpRight :size="14" />
          </button>
          <button @click="sendChat('介绍一下博主')">
            <User :size="17" />介绍一下博主 <ArrowUpRight :size="14" />
          </button>
          <button @click="sendChat('推荐一篇文章')">
            <Lightbulb :size="17" />推荐一篇适合今晚阅读的文章
            <ArrowUpRight :size="14" />
          </button>
        </div>
      </div>
      <div v-else class="full-messages">
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="message"
          :class="m.role"
        >
          <span class="message-avatar">{{ m.role === "ai" ? "✦" : "我" }}</span>
          <div>{{ m.text }}</div>
        </div>
      </div>
      <div class="full-input">
        <textarea
          v-model="input"
          placeholder="输入你的问题…"
          @keydown.enter.prevent="sendChat()"
        />
        <button class="primary" @click="sendChat()">
          <Send :size="16" /> 发送
        </button>
      </div>
      <small class="chat-foot">
        <span><Bot :size="13" /> Blue 助手 · 仅基于已发布内容</span>
        <button @click="clearChat">新建对话</button>
      </small>
    </div>
  </div>
</template>
