<template>
  <div
    class="overlay"
    :class="menuOpen ? 'clicky' : ''"
    @click="toggleMenu"
  ></div>
  <div class="worknagigation-wrapper" :class="{ open: menuOpen }">
    <h1 class="open-menu-link" @click="toggleMenu">{{ site.title }}</h1>
    <div class="current-route" @click="toggleMenu">
      {{ currentPage }}
    </div>
    <div
      ref="navigationmenutoggle"
      class="navigation-menu-toggle"
      :class="{ open: menuOpen, startanimation: startanimation }"
    >
      <RouterLink to="/" class="home-link a" @click="toggleMenu"
        >Gustav Körnig</RouterLink
      >
      <div class="work-link">Arbeiten</div>
      <RouterLink
        v-for="child in page?.children || []"
        :key="child.uri"
        :to="'/' + child.uri"
        @click="toggleMenu"
      >
        {{ child.title }}
      </RouterLink>
      <RouterLink to="/information">Information</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePage, useSite } from "~/composables";
const navigationmenutoggle = ref(null);
const page = usePage("/arbeiten");
const site = useSite();
const menuOpen = ref(false);
const startanimation = ref(false);
const props = defineProps({
  currentPage: String,
});
import { gsap } from "gsap";
onMounted(() => {
  gsap.set(navigationmenutoggle.value, { y: -window.innerHeight / 2 });
});
const toggleMenu = () => {
  if (!menuOpen.value) {
    gsap.to(navigationmenutoggle.value, {
      y: 0,
      ease: "bounce.out",
      duration: 1,
    });
  } else {
    gsap.to(navigationmenutoggle.value, {
      y: -window.innerHeight / 2,
      ease: "power1",
      duration: 1,
    });
  }
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped lang="scss">
.open-menu-link {
  cursor: pointer;
}
.overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 0, 0, 0);
  pointer-events: none;
  &.clicky {
    pointer-events: all;
  }
}
.worknagigation-wrapper {
  width: 95rem;
  display: none;
  padding-top: 3rem;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 1;
  &.open {
  }
  @include mobile {
    display: block;
    text-align: center;
    background-color: white;
    padding-bottom: 3rem;
    * {
      font-size: $mobileBigSize;
    }
    .navigation-menu-toggle {
      display: flex;
      flex-direction: column;
      background-color: black;
      color: white;
      position: fixed;
      width: 95rem;
      top: 0rem;
      border-radius: 6rem;
      border: 1px solid black;
      padding: 3rem;
      transform: translateY(-3rem);
      a {
        line-height: 1;
        &:hover {
          font-style: italic;
        }
      }
      .home-link {
        padding-bottom: 6rem;
      }
      &.open {
        height: auto;
        transform: translateY(0%);
        box-shadow: 0px 3px 6px #00000029;
      }
      &.startanimation {
        animation: bounce-in 1s ease forwards;
      }
      .work-link {
        text-decoration: underline;
      }
      .router-link-active {
        font-style: italic;
      }
      a:last-child {
        padding-top: 6rem;
        padding-bottom: 3rem;
      }
    }
  }
}
/* Keyframes for bounce animation */
@keyframes bounce-in {
  0% {
    transform: translateY(-200%);
    animation-timing-function: ease-out;
  }
  30% {
    transform: translateY(0%);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-10%);
    animation-timing-function: ease-out;
  }
  70% {
    transform: translateY(0%);
    animation-timing-function: ease-out;
  }
  85% {
    transform: translateY(-2%);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(0%);
    animation-timing-function: ease-out;
  }
}

/* Transition classes for Vue */
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.8s ease, opacity 0.5s ease;
}

.menu-enter-from {
  transform: translateY(-200%);
  opacity: 0;
}

.menu-enter-to {
  transform: translateY(0%);
  opacity: 1;
}

.menu-leave-from {
  transform: translateY(0%);
  opacity: 1;
}

.menu-leave-to {
  transform: translateY(-200%);
  opacity: 0;
}
</style>
