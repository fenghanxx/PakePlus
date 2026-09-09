<script setup lang="ts">
import { Bot, BookOpen, Check, ShieldCheck, User, Zap } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { notify } = useToast();
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">SYSTEM / AI ASSISTANT</span>
        <h1>AI 助手</h1>
      </div>
      <button class="primary" @click="notify('AI 配置已保存')">
        <Check :size="15" /> 保存配置
      </button>
    </div>
    <div class="settings-layout">
      <section class="glass-card big-settings">
        <div class="setting-head">
          <Bot :size="19" />
          <div>
            <b>访客 AI 对话</b>
            <small>让读者通过对话了解博客内容与博主。</small>
          </div>
          <span class="switch on"><i /></span>
        </div>
        <hr />
        <label>助手名称<input value="Blue 助手" /></label>
        <label
          >欢迎语<textarea rows="3"
            >有什么想了解的？我会基于博客里已经发布的内容回答。</textarea
          ></label
        >
        <label
          >助手说明<textarea rows="5"
            >你是 Blue Note 的博客助手。只根据已发布的文章回答问题；不知道时要诚实说明，不要编造博主经历。</textarea
          ></label
        >
        <div class="setting-head model">
          <Zap :size="19" />
          <div>
            <b>模型配置</b>
            <small>API 密钥仅保存并调用于服务端。</small>
          </div>
        </div>
        <hr />
        <label
          >模型<select>
            <option>GPT-4o mini · 推荐</option>
            <option>Claude 3.5 Sonnet</option>
          </select></label
        >
        <label
          >API Key<input type="password" value="sk-proj-••••••••••"
        /></label>
      </section>
      <aside class="side-stack">
        <section class="glass-card source">
          <span class="eyebrow">KNOWLEDGE SOURCE</span>
          <h3>回答范围</h3>
          <p>控制 AI 可以访问哪些内容。</p>
          <div class="source-line">
            <BookOpen :size="16" />
            <span><b>已发布文章</b><small>24 篇文章可用</small></span>
            <span class="switch on"><i /></span>
          </div>
          <div class="source-line muted">
            <User :size="16" />
            <span><b>私人信息</b><small>永远不会作为知识来源</small></span>
            <ShieldCheck :size="16" />
          </div>
          <small class="sync"
            ><Check :size="14" /> 最近同步：今天 09:42</small
          >
        </section>
        <section class="glass-card usage">
          <span class="eyebrow">THIS MONTH</span>
          <strong>186 <small>/ 500 次</small></strong>
          <div class="usage-bar"><i /></div>
          <p>本月已使用 37.2% 的对话额度。</p>
        </section>
      </aside>
    </div>
  </div>
</template>
