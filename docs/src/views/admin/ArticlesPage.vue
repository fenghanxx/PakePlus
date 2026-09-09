<script setup lang="ts">
import { ref, computed } from "vue";
import {
  ChevronDown,
  FileText,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { articles } from "@/data/mockArticles";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const { notify } = useToast();
const query = ref("");
const confirmOpen = ref(false);

const filteredArticles = computed(() =>
  articles.filter(a => `${a.title}${a.excerpt}`.includes(query.value))
);

function handleDelete() {
  notify("文章已移入回收站");
}
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">CONTENT / ARTICLES</span>
        <h1>文章管理</h1>
      </div>
      <button class="primary" @click="router.push({ name: 'Editor' })">
        <Plus :size="16" /> 新建文章
      </button>
    </div>
    <div class="toolbar">
      <div class="input">
        <Search :size="16" />
        <input v-model="query" placeholder="搜索标题…" />
      </div>
      <button class="filter">
        <Filter :size="15" /> 状态：全部 <ChevronDown :size="14" />
      </button>
    </div>
    <section class="glass-card table">
      <div class="table-head">
        <span>文章</span>
        <span>分类</span>
        <span>状态</span>
        <span>更新日期</span>
        <span />
      </div>
      <div v-for="a in filteredArticles" :key="a.id" class="table-row">
        <div>
          <FileText :size="16" class="doc-icon" />
          <span>
            <b
              @click="router.push({ name: 'Article', params: { id: a.id } })"
              >{{ a.title }}</b
            >
            <small>/article/{{ a.id }}</small>
          </span>
        </div>
        <span class="tag">{{ a.category }}</span>
        <span class="published"><i /> 已发布</span>
        <small>{{ a.date }}</small>
        <div>
          <button @click="router.push({ name: 'Editor' })">
            <Pencil :size="15" />
          </button>
          <button @click="confirmOpen = true"><Trash2 :size="15" /></button>
        </div>
      </div>
    </section>

    <ConfirmDialog
      :open="confirmOpen"
      title="删除这篇文章？"
      message="删除后文章及其评论将无法恢复。"
      @confirm="handleDelete"
      @close="confirmOpen = false"
    />
  </div>
</template>

<style scoped>
/* Keep the grid table inside the content column at every viewport width. */
.admin-page .table {
  display: block;
  width: 100%;
  overflow-x: auto;
}

.admin-page .table-head,
.admin-page .table-row {
  min-width: 786px;
}
</style>
