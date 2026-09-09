import { ref } from "vue";

const toast = ref("");

export function useToast() {
  function notify(message: string) {
    toast.value = message;
    window.setTimeout(() => (toast.value = ""), 2400);
  }

  return {
    toast,
    notify,
  };
}
