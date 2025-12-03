<template>
  <h1
    id="svg-my-en-name"
    class="heading-1 font-fancy font-extrabold uppercase text-flax-smoke-900"
  >
    <span
      v-for="(letter, index) in nameLetters"
      :key="index"
      class="name-letter inline-block translate-y-full will-change-auto"
      :style="{ display: 'inline-block' }"
    >
      {{ letter === ' ' ? '\u00A0' : letter }}
    </span>
  </h1>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import gsap from 'gsap';

  const name = 'Prakhar';
  const nameLetters = name.split('');

  onMounted(() => {
    gsap.to('.name-letter', {
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: {
        amount: 0.6,
        from: 'start',
      },
      delay: 0.3,
    });
  });
</script>
