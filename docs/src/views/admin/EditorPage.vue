<script setup lang="ts">
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Link2,
  Quote,
  WandSparkles,
  X,
} from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { notify } = useToast();
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">CONTENT / EDITOR</span>
        <h1>编辑文章</h1>
      </div>
      <div class="editor-actions">
        <button class="secondary">
          <BookOpen :size="15" /> 预览
        </button>
        <button class="ghost" @click="notify('草稿已保存')">
          <Check :size="15" /> 保存草稿
        </button>
        <button class="primary" @click="notify('文章已发布')">
          发布文章 <ArrowUpRight :size="15" />
        </button>
      </div>
    </div>
    <div class="editor-layout">
      <section class="glass-card editor">
        <input
          class="editor-title"
          value="让界面安静下来：关于留白、节奏与注意力"
        />
        <textarea class="editor-summary"
          >好的界面不会抢着说话。它把空间留给内容，也把选择权还给使用它的人。</textarea
        >
        <div class="editor-tools">
          <b>B</b><i>I</i><Quote :size="15" /><Link2 :size="15" /><span
            >Markdown</span
          >
        </div>
        <textarea class="markdown"
          >## 留白不是空，而是呼吸

我越来越觉得，设计不是把东西做得更满，而是把注意力放在真正值得的地方。

当一个界面有太多声音，用户就很难听见自己的声音。

> 真正好的留白，不会让人觉得"这里少了什么"，而是让人觉得"我可以在这里停一会儿"。</textarea
        >
      </section>
      <aside class="side-stack">
        <section class="glass-card settings">
          <b>发布设置</b>
          <label
            >状态<select>
              <option>已发布</option>
              <option>草稿</option>
            </select></label
          >
          <label
            >分类<select>
              <option>设计思考</option>
              <option>前端工程</option>
            </select></label
          >
          <label
            >标签
            <div class="chips">
              <span>留白 <X :size="11" /></span>
              <span>体验设计 <X :size="11" /></span>
            </div>
          </label>
        </section>
        <section class="glass-card cover">
          <b>封面图</b>
          <div>
            <WandSparkles :size="20" />拖拽图片到这里<br />或点击上传
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>
