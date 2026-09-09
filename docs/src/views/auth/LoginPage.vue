<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const { notify } = useToast();

function handleLogin() {
  notify("演示登录成功");
  router.push({ name: "Dashboard" });
}
</script>

<template>
  <div class="login-page">
    <div class="login-aside">
      <RouterLink to="/" class="brand light">
        <span class="brand-mark">bn<span>.</span></span>
        <b>Blue Note</b>
      </RouterLink>
      <div>
        <span class="eyebrow light">BLUE NOTE / ADMIN</span>
        <h1>安静地写，<br /><em>认真地管。</em></h1>
        <p>这是 Blue Note 的编辑后台。仅供博主本人使用。</p>
      </div>
      <small>© 2026 Blue Note Studio</small>
    </div>
    <div class="login-form-wrap">
      <RouterLink to="/" class="back-link">
        <ArrowLeft :size="16" /> 返回博客
      </RouterLink>
      <div class="login-form">
        <span class="eyebrow">WELCOME BACK</span>
        <h2>登录编辑后台</h2>
        <p>继续管理你的文章与留言。</p>
        <label>账号<input placeholder="输入账号" /></label>
        <label>密码<input type="password" placeholder="输入密码" /></label>
        <button class="primary wide" @click="handleLogin">
          登录 <ArrowUpRight :size="16" />
        </button>
        <small class="security"
          ><ShieldCheck :size="14" /> 使用安全连接 · 仅限博主账号</small
        >
      </div>
    </div>
  </div>
</template>
