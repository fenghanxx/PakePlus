<script setup lang="ts">
import { computed } from "vue";
import { Github, Mail } from "lucide-vue-next";
import { useTheme } from "@/composables/useTheme";

const { theme } = useTheme();
const portraitImage = computed(() =>
  theme.value === "dark" ? "/assets/night.png" : "/assets/day.png"
);
</script>

<template>
  <section class="container about">
    <div class="about-hero">
      <div>
        <span class="eyebrow">A LITTLE ABOUT ME</span>
        <h1>你好，我是<br /><em>林默。</em></h1>
        <p>
          我在数字产品里工作，也在生活里观察。相信好设计应该让人更专注、更从容，而不是更忙。
        </p>
        <div class="hero-links">
          <a class="primary" href="mailto:hello@bluenote.example">
            <Mail :size="15" /> 和我联系
          </a>
          <a class="secondary" href="https://github.com">
            <Github :size="15" /> GitHub
          </a>
        </div>
      </div>
      <figure class="about-illustration">
        <div class="illustration-composition">
          <Transition name="portrait-fade" mode="out-in">
            <img
              :key="theme"
              :src="portraitImage"
              alt="林默的头像"
              draggable="false"
              width="1280"
              height="1280"
            />
          </Transition>
        </div>
      </figure>
    </div>
    <div class="about-grid">
      <div>
        <span class="eyebrow">WHAT I CARE ABOUT</span>
        <h2>把事情做得简单，<br />但不简单地做。</h2>
      </div>
      <div>
        <p>
          过去几年，我参与过从 0 到 1
          的产品，也做过很多只有自己会用的小工具。现在主要关注设计系统、前端体验，以及如何让团队更好地一起工作。
        </p>
        <p>
          这个博客是我的第二大脑。这里会有具体的方法，也会有还没想明白的部分。
        </p>
        <div class="chips">
          <span>产品设计</span>
          <span>前端开发</span>
          <span>Design Systems</span>
          <span>写作</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-illustration {
  width: min(340px, 100%);
  margin: 0;
  justify-self: end;
}

.illustration-composition {
  position: relative;
  isolation: isolate;
  aspect-ratio: 1;
}

/* An offset backdrop leaves the transparent character art free to overlap. */
.illustration-composition::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 22% 5% 5% 18%;
  border: 1px solid var(--line-soft);
  border-radius: 36px;
  background: linear-gradient(145deg, var(--paper-blue), var(--paper-deep));
  box-shadow: var(--shadow-sm);
  transform: rotate(6deg);
  transition:
    transform 0.55s var(--ease-out),
    box-shadow 0.55s ease,
    border-color 0.3s ease;
  pointer-events: none;
}

.about-illustration img {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  transform: translate(-6px, -8px) rotate(-2deg);
  transform-origin: 50% 75%;
  transition:
    transform 0.55s var(--ease-out),
    opacity 0.4s ease;
}

.about-illustration figcaption {
  margin-top: 18px;
  color: var(--ink-faint);
  font-size: 9px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: center;
  text-transform: uppercase;
}

.portrait-fade-enter-active,
.portrait-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.55s var(--ease-out);
}

.portrait-fade-enter-from,
.portrait-fade-leave-to {
  opacity: 0;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .illustration-composition:hover img {
    transform: translate(-12px, -18px) rotate(-4deg) scale(1.035);
  }

  .illustration-composition:hover::before {
    transform: translate(6px, 5px) rotate(9deg);
    border-color: var(--blue-line);
    box-shadow: var(--shadow-md);
  }
}

@media (max-width: 700px) {
  .about-illustration {
    width: min(255px, 100%);
    align-self: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-illustration img,
  .illustration-composition::before,
  .portrait-fade-enter-active,
  .portrait-fade-leave-active {
    transition: none;
  }
}
</style>
