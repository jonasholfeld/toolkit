<template>
  <nav ref="bouncyElement" class="side-navigation" :class="[mode]">
    <router-link to="/" :style="getHoverStyle" class="home-link">{{
      pageTitle
    }}</router-link>
    <router-link
      v-if="pathSegments[0] != 'information'"
      to="/information"
      :style="{ '--hoverbackground': site?.information.color }"
      class="segment-link"
      >Information</router-link
    >
    <router-link
      v-if="pathSegments[0] != 'arbeiten'"
      to="/arbeiten"
      :style="{ '--hoverbackground': site?.works.color }"
      class="segment-link"
      >Arbeiten</router-link
    >
    <router-link
      v-for="child in page.children"
      :key="child.slug"
      :to="'/' + child.uri"
      :class="child.slug"
      class="single-child-link"
      >{{ child.title }}</router-link
    >
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useSite } from "~/composables";
import { computed, onActivated, onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
const route = useRoute();
const pageTitle = ref("Gustav Koernig");
import { store } from "~/modules/store.js";

function logViewportRatio() {
  const ratio = window.innerWidth / window.innerHeight;
  if (ratio > 2) {
    console.log("abkürzungen!!");
    pageTitle.value = "GK";
  } else {
    pageTitle.value = "Gustav Koernig";
  }
}

onMounted(() => {
  logViewportRatio(); // Log initial ratio
  window.addEventListener("resize", logViewportRatio);
});

onUnmounted(() => {
  window.removeEventListener("resize", logViewportRatio);
});

onActivated(() => {
  animateBounce();
});

onMounted(() => {
  animateBounce();
});
const site = useSite();
const bouncyElement = ref(null);
const props = defineProps({
  parent: String,
  mode: String,
});
import { usePage } from "~/composables";
const page = usePage(props.parent);
const pathSegments = useRoute()
  .fullPath.split("/")
  .filter((segment) => segment);
const getHoverStyle = computed(() => {
  if (page.title === "Arbeiten") {
    return { "--hoverbackground": site?.works?.color };
  } else if (page.title === "Information") {
    return { "--hoverbackground": site?.information?.color };
  }
  return {};
});

const animateBounce = () => {
  const str1 = route.path;
  const str2 = store.previousRoute.path;
  const segment1 = str1.split("/")[1];
  const segment2 = str2.split("/")[1];
  if (segment1 != segment2) {
    gsap.set(bouncyElement.value, { y: -window.innerHeight });
    gsap.to(bouncyElement.value, {
      y: 0,
      ease: "bounce.out",
      duration: 1.5,
    });
  }
};
</script>

<style lang="scss">
.home-link:hover {
  background-color: var(--hoverbackground) !important;
}
.side-navigation {
  position: fixed; /* Keeps the navigation fixed to the side */
  top: 1rem; /* Centers vertically */
  left: 0; /* Aligns to the left of the screen */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  height: calc(100vh - 2rem);
  flex-direction: column-reverse;
  padding: 0rem;
  padding-left: 1rem;
  z-index: 1000;
  @include mobile {
    display: none;
  }
  .single-child-link {
    &:hover {
      background-color: black;
      color: white;
      border: 1px solid transparent;
    }
  }
  a {
    border: 1px solid black;
    writing-mode: vertical-rl; /* Rotates text to read from top to bottom */
    transform: rotate(180deg); /* Adjusts the orientation */
    text-decoration: none;
    color: black; /* Customize the color */
    font-size: 1rem; /* Customize font size */
    text-align: center;
    padding: 0.5rem;
    flex: 1;
    width: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0.4rem 0;
    white-space: no-wrap;
    box-shadow: 0px 3px 6px #00000029;
    margin-top: 1px;
    background-color: white;
    &.segment-link:hover {
      background-color: var(--hoverbackground) !important;
    }
    &.router-link-exact-active {
      background-color: black;
      color: white;
      border: 1px solid transparent;
      font-style: italic;
    }
    &:nth-child(odd) {
      border-radius: 3rem;
    }
  }
  &.dark {
    a {
      //   border: 1px solid white;
      background-color: black;
      color: white;
      &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
      }
      &.router-link-exact-active {
        border: 1px solid black;
        background-color: white;
        color: black;
      }
    }
  }
}

@keyframes bounce-in {
  0% {
    transform: translateY(-250%);
    animation-timing-function: ease-out;
  }
  30% {
    transform: translateY(-50%);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-60%);
    animation-timing-function: ease-out;
  }
  60% {
    transform: translateY(-50%);
    animation-timing-function: ease-out;
  }
  75% {
    transform: translateY(-52%);
    animation-timing-function: ease-out;
  }
  80% {
    transform: translateY(-50%);
    animation-timing-function: ease-out;
  }
  90% {
    transform: translateY(-51%);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(-50%);
    animation-timing-function: ease-out;
  }
}
</style>
