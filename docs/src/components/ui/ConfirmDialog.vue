<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "确认操作？",
  message: "此操作无法撤销。",
  confirmText: "确认删除",
  cancelText: "取消",
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
  close: [];
}>();

function handleConfirm() {
  emit("confirm");
  emit("close");
}

function handleCancel() {
  emit("cancel");
  emit("close");
}

function handleClickOutside() {
  emit("close");
}
</script>

<template>
  <div v-if="open" class="dialog" @click.self="handleClickOutside">
    <div>
      <Trash2 :size="19" />
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div>
        <button class="secondary" @click="handleCancel">{{ cancelText }}</button>
        <button class="danger" @click="handleConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>
