<script setup lang="ts">
import { Check, MessageCircle, Trash2 } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { notify } = useToast();
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">COMMUNITY / COMMENTS</span>
        <h1>评论管理</h1>
      </div>
    </div>
    <div class="tabs">
      <button class="active">待处理 <b>3</b></button>
      <button>已通过</button>
      <button>已删除</button>
    </div>
    <section class="glass-card moderation">
      <div v-for="n in 3" :key="n" class="moderation-row">
        <span class="avatar">{{ ["周", "M", "远"][n - 1] }}</span>
        <div>
          <div>
            <b>{{ ["周周", "Ming", "远山"][n - 1] }}</b>
            <small> · 昨天 · 来自：让界面安静下来</small>
          </div>
          <p>
            {{
              [
                "很喜欢你对留白的描述。最近也在重新整理自己的作品集。",
                "“一屏只安排一个最重要的动作”这条很有启发。",
                "请问文章里提到的工具会开源吗？",
              ][n - 1]
            }}
          </p>
          <small>example@example.com</small>
        </div>
        <div class="moderation-actions">
          <button class="approve" @click="notify('已通过审核')">
            <Check :size="15" /> 通过
          </button>
          <button><MessageCircle :size="16" /></button>
          <button><Trash2 :size="16" /></button>
        </div>
      </div>
    </section>
  </div>
</template>
