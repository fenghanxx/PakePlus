<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const { toast } = useToast();
</script>

<template>
  <div v-if="toast" class="toast" role="status">
    <Check :size="15" /> {{ toast }}
  </div>
</template>

<style scoped>
.toast[role="status"] {
  max-width: calc(100vw - 32px);
  overflow-wrap: anywhere;
}

.toast svg {
  flex-shrink: 0;
}
</style>
