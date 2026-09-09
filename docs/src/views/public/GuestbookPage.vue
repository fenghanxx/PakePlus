<script setup lang="ts">
import { Send } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { notify } = useToast();

function handleSubmit() {
  notify("留言已送达，感谢你的分享");
}
</script>

<template>
  <section class="container guestbook">
    <div class="page-intro">
      <span class="eyebrow">THE GUESTBOOK</span>
      <h1>路过的话，<br /><em>留一句吧。</em></h1>
      <p>
        这里没有订阅表单，只有一点点真诚的交换。分享你正在读的书、最近的发现，或者只是打个招呼。
      </p>
    </div>
    <div class="guest-form">
      <div>
        <input placeholder="你的昵称" />
        <input placeholder="邮箱（选填，不公开）" />
      </div>
      <textarea rows="5" placeholder="写点什么…" />
      <div>
        <small>不需要注册，留言会在审核后显示。</small>
        <button class="primary" @click="handleSubmit">
          <Send :size="15" /> 留下留言
        </button>
      </div>
    </div>
    <h2>最近的留言 <small>12 条</small></h2>
    <div v-for="n in 3" :key="n" class="guest-item">
      <span class="avatar">{{ ["阿", "Y", "行"][n - 1] }}</span>
      <div>
        <b>{{ ["阿树", "Yuki", "行舟"][n - 1] }}</b>
        <small>2026.09.0{{ 6 - n }}</small>
        <p>
          {{
            [
              "从朋友那里看到这个博客，喜欢这里的安静感。祝写作顺利！",
              "正在学习前端，已经把《小系统的力量》加入收藏了。",
              "你好，最近也在思考“如何写得更清楚”，很巧在这里遇见。",
            ][n - 1]
          }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guestbook .guest-form:hover {
  border-color: var(--blue);
  box-shadow: var(--shadow-md);
}

.guestbook .guest-form::before {
  background: linear-gradient(
    90deg,
    transparent,
    var(--glow-blue),
    transparent
  );
}

.guestbook .guest-form::after {
  background: radial-gradient(
    circle 125px at var(--mx, 50%) var(--my, 50%),
    var(--glow-blue),
    transparent 70%
  );
}

.guestbook .guest-form input,
.guestbook .guest-form textarea {
  border: 1px solid var(--blue-line);
  background: var(--input-bg);
  color: var(--ink);
  caret-color: var(--blue);
}

.guestbook .guest-form input::placeholder,
.guestbook .guest-form textarea::placeholder {
  color: var(--ink-faint);
  opacity: 1;
}

.guestbook .guest-form input:focus,
.guestbook .guest-form textarea:focus {
  border-color: var(--blue);
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}

.guestbook .primary {
  color: var(--on-accent);
}

.guestbook .primary:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 3px;
}

.guestbook .guest-item {
  border-bottom-color: var(--blue-line);
}

.guestbook .guest-item:hover {
  background: var(--glass);
  box-shadow: var(--shadow-sm);
}

.guestbook .guest-item .avatar {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 31px;
  height: 31px;
  border-radius: 10px;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
}
</style>
