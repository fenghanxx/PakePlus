<script setup lang="ts">
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  ChevronDown,
  FileText,
  MessageCircle,
  MoreHorizontal,
  Plus,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { articles } from "@/data/mockArticles";

const router = useRouter();
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">GOOD MORNING, LIN</span>
        <h1>今天，也写点什么。</h1>
      </div>
      <button class="primary" @click="router.push({ name: 'Editor' })">
        <Plus :size="16" /> 新建文章
      </button>
    </div>
    <div class="stat-grid">
      <div
        v-for="s in [
          { l: '已发布文章', v: '24', c: '较上月 +3', i: FileText },
          { l: '本月阅读', v: '3,842', c: '较上月 +18.6%', i: BookOpen },
          { l: '待处理评论', v: '3', c: '需要你的回应', i: MessageCircle },
          { l: 'AI 对话次数', v: '186', c: '本月已使用', i: Bot },
        ]"
        :key="s.l"
        class="stat"
      >
        <component :is="s.i" :size="17" />
        <span>{{ s.l }}</span>
        <strong>{{ s.v }}</strong>
        <small>{{ s.c }}</small>
      </div>
    </div>
    <div class="dashboard-grid">
      <section class="glass-card">
        <div class="card-head">
          <div>
            <span class="eyebrow">RECENT ACTIVITY</span>
            <h3>最近文章</h3>
          </div>
          <button
            class="link-button"
            @click="router.push({ name: 'Articles' })"
          >
            查看全部 <ArrowUpRight :size="14" />
          </button>
        </div>
        <div v-for="a in articles" :key="a.id" class="admin-row">
          <span class="doc-icon"><FileText :size="16" /></span>
          <div>
            <b>{{ a.title }}</b>
            <small>{{ a.category }} · {{ a.date }}</small>
          </div>
          <span class="published"><i /> 已发布</span>
          <MoreHorizontal :size="17" />
        </div>
      </section>
      <section class="glass-card">
        <div class="card-head">
          <div>
            <span class="eyebrow">QUICK NOTES</span>
            <h3>待办事项</h3>
          </div>
          <Plus :size="17" />
        </div>
        <label
          v-for="(t, i) in [
            '回复 3 条新评论',
            '整理八月文章标签',
            '更新个人简介',
            '检查 AI 知识库同步',
          ]"
          :key="t"
          class="todo"
        >
          <input type="checkbox" :checked="i === 1" /> <span>{{ t }}</span
          ><i v-if="i === 0" />
        </label>
        <button class="link-button add-todo">
          <Plus :size="15" /> 添加待办
        </button>
      </section>
    </div>
    <section class="glass-card chart">
      <div class="card-head">
        <div>
          <span class="eyebrow">OVERVIEW</span>
          <h3>最近 30 天</h3>
        </div>
        <button class="filter">
          阅读量 <ChevronDown :size="14" />
        </button>
      </div>
      <div class="fake-chart">
        <span
          v-for="n in 6"
          :key="n"
          :style="{
            left: `${n * 17}%`,
            bottom: `${20 + (n % 3) * 18}%`,
          }"
        />
      </div>
    </section>
  </div>
</template>
