<script setup lang="ts">
import { Check, User } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { notify } = useToast();
</script>

<template>
  <div class="admin-page">
    <div class="admin-title">
      <div>
        <span class="eyebrow">SYSTEM / PROFILE</span>
        <h1>个人设置</h1>
      </div>
      <button class="primary" @click="notify('个人设置已保存')">
        <Check :size="15" /> 保存更改
      </button>
    </div>
    <section class="glass-card big-settings">
      <div class="setting-head">
        <User :size="19" />
        <div>
          <b>个人资料</b>
          <small>这些信息会展示在博客的关于我页面。</small>
        </div>
      </div>
      <hr />
      <div class="profile-edit">
        <span class="profile-avatar">林<span>默</span></span>
        <div>
          <b>更换头像</b>
          <small>建议使用 1:1 的 JPG 或 PNG 图片。</small>
        </div>
      </div>
      <label>昵称<input value="林默" /></label>
      <label
        >个人介绍<textarea rows="4"
          >一名设计师与前端开发者，在这里记录关于产品、代码和日常生活的思考。</textarea
        ></label
      >
      <label
        >社交链接<input value="https://github.com/linmo"
      /></label>
    </section>
  </div>
</template>
