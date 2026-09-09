import { ref } from "vue";

const messages = ref<{ role: "user" | "ai"; text: string }[]>([]);
const input = ref("");
const generating = ref(false);

export function useChat() {
  async function sendChat(text?: string) {
    const value = (text ?? input.value).trim();
    if (!value || generating.value) return;

    messages.value.push({ role: "user", text: value });
    input.value = "";
    generating.value = true;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.value.map(message => ({
            role: message.role === "ai" ? "assistant" : "user",
            content: message.text,
          })),
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        content?: unknown;
        error?: unknown;
      };

      if (!response.ok || typeof payload.content !== "string") {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "AI 暂时无法回答，请稍后再试。"
        );
      }

      messages.value.push({
        role: "ai",
        text: payload.content,
      });
    } catch (error) {
      messages.value.push({
        role: "ai",
        text:
          error instanceof Error
            ? error.message
            : "AI 暂时无法回答，请稍后再试。",
      });
    } finally {
      generating.value = false;
    }
  }

  function clearChat() {
    messages.value = [];
  }

  return {
    messages,
    input,
    generating,
    sendChat,
    clearChat,
  };
}
