<template>
  <div class="page-wrapper">
    <WorkNavigation :current-page="page.title"></WorkNavigation>
    <SideNavigation parent="/arbeiten"></SideNavigation>
    <transition-group>
      <GridOne v-if="mode == 1" key="1" :works="page.children"></GridOne>
      <GridTwo v-if="mode == 2" key="2" :works="page.children"></GridTwo>
    </transition-group>
    <div
      v-show="page.additionalraster == 'true'"
      ref="modeselector"
      class="mode-selector"
    >
      <button
        :class="{ active: mode == 1, hovering: hoveredButton === 2 }"
        :style="'--backroundworks:' + site?.works.color + ';'"
        @click="mode = 1"
        @mouseover="hoveredButton = 1"
        @mouseleave="hoveredButton = null"
      >
        1
      </button>
      <button
        :class="{ active: mode == 2, hovering: hoveredButton === 1 }"
        :style="'--backroundworks:' + site?.works.color + ';'"
        @click="mode = 2"
        @mouseover="hoveredButton = 2"
        @mouseleave="hoveredButton = null"
      >
        2
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePage, useSite } from "~/composables";
import SideNavigation from "./../components/SideNavigation.vue";
import GridOne from "./../components/GridOne.vue";
import GridTwo from "./../components/GridTwo.vue";
import WorkNavigation from "./../components/WorkNavigation.vue";
import { onActivated, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useRoute, useRouter } from "vue-router";
import { store } from "~/modules/store.js";
const site = useSite();

const route = useRoute();
const router = useRouter();

const modeselector = ref(null);
let previousRoute = null;

router.beforeEach((to, from, next) => {
  previousRoute = from; // Store the previous route
  next();
});
const page = usePage();
const mode = ref(1);
const hoveredButton = ref(null);
onActivated(() => {
  document.body.classList.remove("dark-body");
});
onMounted(() => {
  document.body.classList.remove("dark-body");
  if (
    store.previousRoute &&
    !store.previousRoute.path.startsWith("/arbeiten/")
  ) {
    console.log(modeselector.value);
    gsap.set(modeselector.value, { y: -(window.innerHeight / 100) * 6 });
    gsap.to(modeselector.value, {
      y: 0,
      ease: "bounce.out",
      duration: 1.5,
    });
  }
});
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  position: absolute;
}
.page-wrapper {
  padding-left: 2.75rem;
  padding-right: 2.75rem;
  @include mobile {
    padding-top: 20rem;
    padding-left: 0;
    padding-right: 0;
  }
  .mode-selector {
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    @include mobile {
      display: none;
    }
    button {
      width: 2.25rem;
      height: 2.25rem;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      font-family: Rhetorik;
      box-shadow: 0px 3px 6px #00000029;
      cursor: pointer;
      font-size: 1rem;
      &:hover {
        font-style: italic;
      }
      &.active {
        background-color: black;
        color: white;
      }
      &:first-child {
        border-radius: 1.5rem;
      }
    }
  }
}
</style>
