<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft, Heart, Link2 } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { articles } from "@/data/mockArticles";
import { useToast } from "@/composables/useToast";

const route = useRoute();
const router = useRouter();
const { notify } = useToast();

const activeArticle = computed(
  () =>
    articles.find((a) => a.id === route.params.id) ?? articles[0]
);

function goBack() {
  router.push({ name: "Home" });
}

function copyLink() {
  navigator.clipboard?.writeText(window.location.href);
  notify("链接已复制");
}
</script>

<template>
  <section class="container article-page">
    <button class="back-link" @click="goBack">
      <ArrowLeft :size="16" /> 返回文章列表
    </button>
    <div class="article-header">
      <small
        >{{ activeArticle.category }} · {{ activeArticle.date }} ·
        {{ activeArticle.read }} 阅读</small
      >
      <h1>{{ activeArticle.title }}</h1>
      <p>{{ activeArticle.excerpt }}</p>
      <span class="author">林默 · 最后编辑于 2026.09.03</span>
    </div>
    <div class="article-body">
      <article>
        <p>
          我越来越觉得，设计不是把东西做得更满，而是把注意力放在真正值得的地方。
        </p>
        <p>
          当一个界面有太多声音，用户就很难听见自己的声音。我们用颜色强调，用卡片包裹，用动效提醒，最后却常常忘了，内容本身需要被认真对待。
        </p>
        <h2>留白不是空，而是呼吸</h2>
        <p>
          留白带来的第一个变化，是让信息有了呼吸的机会。标题与正文之间的距离、段落与段落之间的间隙，都是阅读节奏的一部分。
        </p>
        <blockquote>
          真正好的留白，不会让人觉得"这里少了什么"，而是让人觉得"我可以在这里停一会儿"。
        </blockquote>
        <p>
          我在做个人网站时，常常从一个很小的规则开始：一屏只安排一个最重要的动作。一篇文章只保留一条清晰的阅读路径。
        </p>
        <h2>给界面留一点克制</h2>
        <ul>
          <li>让内容决定布局，而不是让组件决定内容。</li>
          <li>每一个动效都应该解释一次状态变化。</li>
          <li>把"可以做"与"值得做"分开考虑。</li>
        </ul>
        <pre>.reading-column {
  max-width: 42rem;
  line-height: 1.9;
  color: var(--ink);
}</pre>
      </article>
      <aside class="toc">
        <b>目录</b>
        <a class="active">留白不是空，而是呼吸</a>
        <a>给界面留一点克制</a>
        <a>写在最后</a>
        <div>
          <span>分享文章</span>
          <button @click="copyLink"><Link2 :size="15" /></button>
          <button @click="notify('已收藏')"><Heart :size="15" /></button>
        </div>
      </aside>
    </div>
  </section>
</template>
