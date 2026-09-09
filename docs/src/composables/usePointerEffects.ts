import { onMounted, onBeforeUnmount } from "vue";

const cardSelector =
  ".glass-card, .glass-note, .guest-form, .profile-card, .quote, .portrait, .source, .usage, .editor, .settings, .cover";

export function usePointerEffects() {
  function onPointerMove(event: PointerEvent) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;

    const root = document.documentElement;
    root.style.setProperty(
      "--page-px",
      `${(event.clientX / window.innerWidth - 0.5) * 2}`
    );
    root.style.setProperty(
      "--page-py",
      `${(event.clientY / window.innerHeight - 0.5) * 2}`
    );

    const card = (event.target as HTMLElement | null)?.closest(
      cardSelector
    ) as HTMLElement | null;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--mx",
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );
    card.style.setProperty(
      "--my",
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
    card.style.setProperty(
      "--rx",
      `${((event.clientY - rect.top) / rect.height - 0.5) * -3}deg`
    );
    card.style.setProperty(
      "--ry",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 3}deg`
    );
    card.classList.add("is-pointer-active");
  }

  function onPointerOut(event: PointerEvent) {
    const card = (event.target as HTMLElement | null)?.closest(
      cardSelector
    ) as HTMLElement | null;
    const next = event.relatedTarget as Node | null;
    if (card && (!next || !card.contains(next)))
      card.classList.remove("is-pointer-active");
  }

  function setupPointerEffects() {
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
  }

  function cleanupPointerEffects() {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerout", onPointerOut);
  }

  onMounted(() => {
    setupPointerEffects();
  });

  onBeforeUnmount(() => {
    cleanupPointerEffects();
  });

  return {
    setupPointerEffects,
    cleanupPointerEffects,
  };
}
