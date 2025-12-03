<template>
  <div class="invisible relative z-99999999 hidden md:visible md:block">
    <!-- Outer cursor ring with rotation -->
    <div
      id="cursor-outer"
      class="fixed z-100 pointer-events-none origin-center scale-0 opacity-0"
    >
      <div
        class="size-16 rounded-full border-2 border-flax-smoke-400"
        style="transform-origin: center;"
      ></div>
    </div>

    <!-- Main cursor dot -->
    <div
      id="cursor-dot"
      class="fixed z-101 pointer-events-none origin-center scale-0 opacity-0"
    >
      <div
        class="size-3 rounded-full bg-flax-smoke-500"
        style="transform-origin: center;"
      ></div>
    </div>

    <!-- Trail particles -->
    <div
      id="cursor-trail"
      class="fixed z-99 pointer-events-none origin-center opacity-0"
    >
      <div
        v-for="i in 5"
        :key="i"
        :class="`trail-particle trail-${i}`"
        class="absolute size-2 rounded-full bg-flax-smoke-400"
      ></div>
    </div>

    <!-- Hover text indicator -->
    <div
      id="cursor-text"
      class="fixed z-102 pointer-events-none origin-center scale-0 opacity-0"
    >
      <div
        class="flex-center whitespace-nowrap rounded-full bg-flax-smoke-500 px-4 py-2 text-sm font-semibold uppercase text-white"
      >
        <span id="cursor-text-content">View</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap';
  import { onMounted, onUnmounted } from 'vue';

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isHovering = false;
  let currentHoverElement: HTMLElement | null = null;
  let animationFrameId: number | null = null;

  onMounted(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    const cursorOuter = document.getElementById('cursor-outer') as HTMLDivElement;
    const cursorDot = document.getElementById('cursor-dot') as HTMLDivElement;
    const cursorTrail = document.getElementById('cursor-trail') as HTMLDivElement;
    const cursorText = document.getElementById('cursor-text') as HTMLDivElement;
    const cursorTextContent = document.getElementById('cursor-text-content') as HTMLSpanElement;

    // Initialize cursor position
    gsap.set([cursorOuter, cursorDot, cursorTrail, cursorText], {
      xPercent: -50,
      yPercent: -50,
    });

    // Show cursor on mount
    gsap.to([cursorOuter, cursorDot], {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

    gsap.to(cursorTrail, {
      opacity: 0.6,
      duration: 0.3,
    });

    // Smooth cursor movement with magnetic effect
    const updateCursor = () => {
      // Calculate distance and angle for magnetic effect
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Magnetic pull effect
      let magneticX = mouseX;
      let magneticY = mouseY;

      if (currentHoverElement && isHovering) {
        const rect = currentHoverElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullStrength = 0.3;

        magneticX = mouseX + (centerX - mouseX) * pullStrength;
        magneticY = mouseY + (centerY - mouseY) * pullStrength;
      }

      // Smooth follow with elastic easing
      cursorX += (magneticX - cursorX) * 0.15;
      cursorY += (magneticY - cursorY) * 0.15;

      // Update outer ring with rotation
      gsap.set(cursorOuter, {
        x: cursorX,
        y: cursorY,
        rotation: (distance * 0.5) % 360,
      });

      // Update dot (faster, more responsive)
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });

      // Update text position
      if (isHovering) {
        gsap.set(cursorText, {
          x: cursorX,
          y: cursorY - 40, // Position above cursor
        });
      }

      // Update trail particles with stagger
      for (let i = 1; i <= 5; i++) {
        const delay = i * 0.03;
        const trailX = cursorX - (cursorX - mouseX) * (1 - delay);
        const trailY = cursorY - (cursorY - mouseY) * (1 - delay);
        gsap.set(`.trail-${i}`, {
          x: trailX,
          y: trailY,
        });
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Check if element is interactive
    const isInteractiveElement = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      return (
        element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest('a') !== null ||
        element.closest('button') !== null ||
        element.closest('[id="button"]') !== null ||
        element.classList.contains('group') ||
        element.closest('.group') !== null ||
        element.style.cursor === 'pointer' ||
        window.getComputedStyle(element).cursor === 'pointer'
      );
    };

    // Hover handlers for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest('a, button, [id="button"], .group') as HTMLElement || target;

      if (isInteractiveElement(interactiveElement) && !isHovering) {
        isHovering = true;
        currentHoverElement = interactiveElement;

        // Scale up cursor
        gsap.to(cursorOuter, {
          scale: 1.8,
          duration: 0.4,
          ease: 'back.out(1.7)',
        });

        gsap.to(cursorDot, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Show text indicator
        const text = interactiveElement?.textContent?.trim() || 'View';
        if (cursorTextContent) {
          cursorTextContent.textContent = text.length > 15 ? text.substring(0, 15) + '...' : text;
        }

        gsap.to(cursorText, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });

        // Change colors
        const outerDiv = cursorOuter.querySelector('div') as HTMLElement;
        const dotDiv = cursorDot.querySelector('div') as HTMLElement;
        if (outerDiv) {
          gsap.to(outerDiv, {
            borderColor: '#a855f7',
            duration: 0.3,
          });
        }
        if (dotDiv) {
          gsap.to(dotDiv, {
            backgroundColor: '#a855f7',
            duration: 0.3,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;

      // Check if we're leaving an interactive element
      if (isHovering && (!relatedTarget || !isInteractiveElement(relatedTarget))) {
        isHovering = false;
        currentHoverElement = null;

        // Scale down cursor
        gsap.to(cursorOuter, {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        });

        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Hide text indicator
        gsap.to(cursorText, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        });

        // Reset colors
        const outerDiv = cursorOuter.querySelector('div') as HTMLElement;
        const dotDiv = cursorDot.querySelector('div') as HTMLElement;
        if (outerDiv) {
          gsap.to(outerDiv, {
            borderColor: '#7dd3fc',
            duration: 0.3,
          });
        }
        if (dotDiv) {
          gsap.to(dotDiv, {
            backgroundColor: '#a855f7',
            duration: 0.3,
          });
        }
      }
    };

    // Click animation
    const handleMouseDown = () => {
      gsap.to(cursorOuter, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });

      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    };

    const handleMouseUp = () => {
      if (isHovering) {
        gsap.to(cursorOuter, {
          scale: 1.8,
          duration: 0.2,
          ease: 'back.out(1.7)',
        });
      } else {
        gsap.to(cursorOuter, {
          scale: 1,
          duration: 0.2,
          ease: 'back.out(1.7)',
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation loop
    updateCursor();

    // Cleanup on unmount
    onUnmounted(() => {
      // Restore default cursor
      document.body.style.cursor = 'auto';
      
      // Cancel animation frame
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    });
  });
</script>

<style scoped>
  .trail-particle {
    transform: translate(-50%, -50%);
  }

  #cursor-outer,
  #cursor-dot,
  #cursor-trail,
  #cursor-text {
    will-change: transform;
  }
</style>
