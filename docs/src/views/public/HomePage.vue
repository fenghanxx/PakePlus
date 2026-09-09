<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowUpRight, Quote, Search } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { articles, categories } from "@/data/mockArticles";

const router = useRouter();
const query = ref("");
const category = ref("全部文章");

const filteredArticles = computed(() =>
  articles.filter(
    a =>
      (category.value === "全部文章" || a.category === category.value) &&
      `${a.title}${a.excerpt}`.includes(query.value)
  )
);

function goToArticle(id: string) {
  router.push({ name: "Article", params: { id } });
}
</script>

<template>
  <section class="container home">
    <div class="hero">
      <div>
        <span class="eyebrow"><i /> BLUE NOTE / 2026</span>
        <h1>把复杂的世界，<br /><em>写成清晰的句子。</em></h1>
        <p>
          你好，我是林默。一名设计师与前端开发者，<br />在这里记录关于产品、代码和日常生活的思考。
        </p>
        <div class="hero-links">
          <button
            @click="document.getElementById('articles')?.scrollIntoView()"
          >
            阅读最新文章 <ArrowDown />
          </button>
          <RouterLink to="/about"
            >认识我 <ArrowUpRight :size="16"
          /></RouterLink>
        </div>
      </div>
      <div class="profile-orb">
        <div class="profile-card">
          <div class="profile-top">
            <span class="profile-avatar">林<span>默</span></span>
            <div>
              <b>林默 <i>✓</i></b>
              <small>Designer · Developer · Writer</small>
            </div>
          </div>
          <hr />
          <p>
            <span /> 最近在写 <strong>「小系统的力量」</strong
            ><ArrowUpRight :size="14" />
          </p>
          <div class="stats">
            <b>24<small>篇文章</small></b>
            <b>3.8k<small>位读者</small></b>
            <b>∞<small>个想法</small></b>
          </div>
        </div>
      </div>
    </div>

    <section id="articles" class="articles">
      <div class="section-head">
        <div>
          <span class="eyebrow">THE NOTEBOOK</span>
          <h2>最近写了什么</h2>
        </div>
        <small>共 24 篇</small>
      </div>
      <div class="article-toolbar">
        <div class="search-input">
          <Search :size="17" />
          <input v-model="query" placeholder="搜索文章…" />
        </div>
        <div class="category-tabs">
          <button
            v-for="c in categories"
            :key="c"
            :class="{ active: category === c }"
            @click="category = c"
          >
            {{ c }}
          </button>
        </div>
      </div>
      <div class="article-grid">
        <div class="article-list">
          <button
            v-for="a in filteredArticles"
            :key="a.id"
            class="article-row"
            @click="goToArticle(a.id)"
          >
            <span class="article-no">{{ a.no }}</span>
            <div>
              <small>{{ a.category }} · {{ a.date }} · {{ a.read }}</small>
              <h3>{{ a.title }}</h3>
              <p>{{ a.excerpt }}</p>
            </div>
            <ArrowUpRight :size="20" />
          </button>
        </div>
        <aside>
          <div class="glass-note">
            <b><span /> 本月阅读最多</b>
            <ol>
              <li v-for="(a, i) in articles.slice(0, 3)" :key="a.id">
                <span>0{{ i + 1 }}</span
                >{{ a.title }}
              </li>
            </ol>
            <button class="link-button">
              查看全部文章 <ArrowUpRight :size="14" />
            </button>
          </div>
          <div class="quote">
            <Quote :size="18" />
            <p>" 清晰不是把一切都说完，而是知道什么可以不说。 "</p>
            <small>— 林默，2026</small>
          </div>
        </aside>
      </div>
    </section>
  </section>
</template>

<style scoped>
/* Keep surface and shadow changes in step when hovering or switching themes. */
.articles .article-row {
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    padding 0.3s ease;
}

/* The shared glass effects use white overlays; dark surfaces need blue tones. */
[data-theme="dark"] .articles .article-row,
[data-theme="dark"] .articles .search-input,
[data-theme="dark"] .articles .glass-note {
  background: var(--paper-blue);
  box-shadow:
    inset 0 0 0 1px var(--line-soft),
    0 8px 24px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .articles .article-row:hover,
[data-theme="dark"] .articles .article-row:focus-visible {
  background: var(--paper-deep);
  box-shadow:
    inset 0 0 0 1px var(--blue-line),
    0 12px 28px rgba(0, 0, 0, 0.14);
}

[data-theme="dark"] .articles .search-input {
  color: var(--ink-faint);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    color 0.3s ease;
}

[data-theme="dark"] .articles .search-input input::placeholder {
  color: var(--ink-faint);
  opacity: 1;
}

[data-theme="dark"] .articles .search-input:focus-within {
  background: var(--paper-deep);
  box-shadow: inset 0 0 0 1px var(--blue);
}

[data-theme="dark"] .articles .category-tabs button:hover {
  background: var(--paper-deep);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line-soft);
}

[data-theme="dark"] .articles .category-tabs button.active {
  background: var(--blue-soft);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--blue-line);
}

[data-theme="dark"] .articles .glass-note {
  border-color: var(--line-soft);
}

[data-theme="dark"] .articles .glass-note:hover {
  border-color: var(--blue-line);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
}

[data-theme="dark"] .articles .glass-note li {
  border-color: var(--blue-line);
}

[data-theme="dark"] .articles .quote {
  background: linear-gradient(145deg, var(--paper-deep), var(--blue-soft));
  box-shadow:
    inset 0 0 0 1px var(--line-soft),
    0 12px 28px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .articles .glass-note::before,
[data-theme="dark"] .articles .quote::before,
[data-theme="dark"] .articles .category-tabs button::before {
  background: linear-gradient(
    90deg,
    transparent,
    var(--glow-blue),
    transparent
  );
}

[data-theme="dark"] .articles .glass-note::after,
[data-theme="dark"] .articles .quote::after {
  background: radial-gradient(
    circle 125px at var(--mx, 50%) var(--my, 50%),
    var(--glow-blue),
    transparent 70%
  );
}

@media (prefers-reduced-motion: reduce) {
  .articles .article-row,
  [data-theme="dark"] .articles .search-input {
    transition: none;
  }
}
</style>
