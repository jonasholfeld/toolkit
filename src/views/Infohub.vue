<template>
  <div class="page-wrapper" :class="mode">
    <SideNavigation
      parent="/information"
      :mode="mode"
      class="side-navi"
    ></SideNavigation>
    <div class="information-content-wrapper">
      <RouterLink
        class="mobile-only-work-link"
        :style="'--backroundworks:' + site.works.color + ';'"
        to="/arbeiten"
        >Arbeiten</RouterLink
      >
      <div class="spacer" :class="{ flexone: workFlex }"></div>
      <div
        v-for="(child, index) in page.children?.slice().reverse()"
        :key="index"
        class="child"
        :class="[child.slug, isOpen == index ? 'open' : '']"
        :style="{
          top: childPositions[index].top + 'px',
          left: childPositions[index].left + 'px',
          'z-index': childPositions[index].zindex,
          flex: childPositions[index].flex,
        }"
        @mousedown="startDrag($event, index)"
        @click="bringToTop($event, index)"
      >
        <InfoChild
          :pagedata="child"
          :child-index="index"
          :slug="child.slug"
          :is-open="isOpen == index"
        ></InfoChild>
      </div>
      <div class="mobile-only-top-navigation">
        <h1>
          <RouterLink to="/" class="navi-link">{{ site.title }}</RouterLink>
        </h1>
        <div class="current-route">Information</div>
      </div>
    </div>
    <div class="mode-selector">
      <button
        :class="{ active: mode == 'dark', hovering: hoveredButton === 2 }"
        :style="'--backroundworks:' + site.information.color + ';'"
        @click="mode = 'dark'"
        @mouseover="hoveredButton = 1"
        @mouseleave="hoveredButton = null"
      >
        1
      </button>
      <button
        :class="{ active: mode == 'light', hovering: hoveredButton === 1 }"
        :style="'--backroundworks:' + site.information.color + ';'"
        @click="mode = 'light'"
        @mouseover="hoveredButton = 2"
        @mouseleave="hoveredButton = null"
      >
        2
      </button>
    </div>
    <div class="bottom-navi">
      <router-link to="/information/impressum">Impressum</router-link>
      <router-link to="/information/privatsphare">Privatsphäre</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePage, useSite } from "~/composables";
import SideNavigation from "./../components/SideNavigation.vue";
import InfoChild from "./../components/InfoChild.vue";

const route = useRoute();
const site = useSite();
const router = useRouter();
const page = usePage("/information");
const mode = ref("dark");
const childPositions = ref([]);
const slugToIndexMapping = {};
const indexToSlugMapping = {};
const draggingIndex = ref(null);
const workFlex = ref(true);
const isOpen = ref(null);
const hoveredButton = ref(null);

watch(mode, () => {
  console.log("mode changed");
  if (mode.value == "dark") {
    console.log("dark");
    document.body.classList.remove("dark-body");
  } else {
    document.body.classList.add("dark-body");
  }
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    const routeSegments = newPath.split("/").filter((segment) => segment);
    if (routeSegments.length > 1 && routeSegments[0] == "information") {
      bringToTop(null, slugToIndexMapping[routeSegments[1]]);
    }
  }
);

// Watch for changes in page.children and initialize positions when available
watch(
  () => page.children?.slice().reverse(),
  (newChildren) => {
    if (newChildren && Array.isArray(newChildren)) {
      childPositions.value = newChildren.map((el, i) => ({
        top: (window.innerHeight - (window.innerWidth / 100) * 2) / 2,
        left: (window.innerWidth * 0.98) / 2,
        zindex: 1,
        flex: "8rem 0 0",
        order: i,
      }));
      newChildren.forEach((element, i) => {
        slugToIndexMapping[element.slug] = i;
        indexToSlugMapping[i] = element.slug;
      });
      const routeSegments = route.fullPath
        .split("/")
        .filter((segment) => segment);
      if (routeSegments.length > 1) {
        bringToTop(null, slugToIndexMapping[routeSegments[1]]);
      }
    }
  }
);

function addSlugToRoute(slug) {
  // Get the path segments
  const pathSegments = route.fullPath.split("/").filter(Boolean);

  // Check if the route starts with 'information'
  if (pathSegments[0] === "information") {
    // Replace the last segment if it exists, or add a new one
    if (pathSegments.length > 1) {
      pathSegments[1] = slug; // Replace the last segment
    } else {
      pathSegments.push(slug); // Add the new slug
    }

    // Update the route
    router.replace("/" + pathSegments.join("/"));
  }
}
const isMobile = () => {
  const isMobile =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--isMobile")
      .trim() == "true";
  return isMobile;
};

function bringToTop(event, index) {
  if (isMobile()) {
    if (event?.target?.tagName == "H1" && index == isOpen.value) {
      console.log("closer!!");
      childPositions.value.forEach((e) => {
        e.flex = "0 0 8rem";
      });
      workFlex.value = true;
      isOpen.value = null;
    } else {
      isOpen.value = index;
      workFlex.value = false;
      childPositions.value.forEach((e) => {
        e.flex = "0 0 8rem";
      });
      childPositions.value[index].flex = "1 0 0";
    }
  } else {
    const sortedPositions = [...childPositions.value].sort(
      (a, b) => a.zindex - b.zindex
    );
    sortedPositions.forEach((element, i) => {
      element.zindex = i + 1;
    });
    childPositions.value[index].zindex = sortedPositions.length + 1;
  }
  addSlugToRoute(indexToSlugMapping[index]);
}

// Start dragging a specific child element
function startDrag(event, index) {
  draggingIndex.value = index;
  const childPosition = childPositions.value[index];

  // Track initial mouse position and element position
  const initialMouseX = event.clientX;
  const initialMouseY = event.clientY;
  const initialLeft = childPosition.left;
  const initialTop = childPosition.top;

  // Move the element with the mouse
  function onMouseMove(e) {
    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;
    childPositions.value[index].left = initialLeft + deltaX;
    childPositions.value[index].top = initialTop + deltaY;
    bringToTop(null, index);
  }

  // Stop dragging on mouseup
  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    draggingIndex.value = null;
  }

  // Attach listeners to track movement and release
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}
</script>

<style scoped lang="scss">
.bottom-navi {
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  display: flex;
  padding: 0.25rem;
  z-index: 100;
  @include mobile {
    display: none;
  }
  a {
    border: 1px solid white;
    width: 15rem;
    display: block;
    font-size: 1rem; /* Customize font size */
    text-align: center;
    padding: 0.5rem;
    flex: 1;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0.4rem 0;
    white-space: no-wrap;
    box-shadow: 0px 3px 6px #00000029;
    background-color: black;
    color: white;
    &:nth-child(1) {
      border-radius: 3rem;
    }
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    &.router-link-exact-active {
      background-color: white;
      border: 1px solid black;
      color: black;
    }
  }
}
.side-navi {
  z-index: 10000;
  @include mobile {
    display: none;
  }
}
.navi-link:hover {
  font-style: italic;
}
.mobile-only-top-navigation {
  font-size: $mobileBigSize !important;
  @include mobile {
    order: 8;
  }
}
.information-content-wrapper {
  position: relative;
  width: 98rem;
  height: calc(100vh - 2rem);
  //   overflow: hidden;
  .spacer {
    @include mobile {
      order: 4;
      transition: flex 0.3s ease;
      &.flexone {
        flex: 1 0 0;
      }
    }
  }
  @include mobile {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    background-color: black;
    width: 94rem;
    height: calc(100svh - 6rem);
  }
  .mobile-only-top-navigation,
  .mobile-only-work-link,
  .information-content-wrapper {
    display: none;
    @include mobile {
      display: block;
      .current-route {
        font-style: italic;
      }
      * {
        font-size: $mobileBigSize;
        text-align: center;
        color: white;
      }
    }
  }
  .mobile-only-work-link {
    display: none;
    @include mobile {
      display: flex;
      background-color: var(--backroundworks);
      width: 100%;
      flex: 8rem 0 0;
      text-align: center;
      color: black;
      align-items: center;
      justify-content: center;
    }
    font-size: $mobileBigSize;
    color: white;
    justify-content: flex-end;
    align-items: flex-end;
    transition: flex 0.3s ease;
    &.flexone {
      flex: 1;
    }
  }
  .child {
    position: absolute;
    height: calc(100vh - 3rem);
    width: 50rem;
    overflow: scroll;
    cursor: grab;
    border: 1px solid black;
    background-color: white;
    left: 50rem;
    transform: translate(-50%, -52.7%);
    padding: 1rem;
    padding-top: 0;
    box-shadow: 0px 3px 6px #00000029;
    @include mobile {
      position: unset;
      transform: none;
      height: 8rem !important;
      width: 94rem !important;
      margin: 1rem 0rem;
      transition: flex 0.3s ease;
      padding: 0 3rem;
      cursor: default;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &:nth-child(odd) {
      border-radius: 2rem;
      @include mobile {
        border-radius: 6rem;
      }
    }
    &.kontakt {
      width: 20rem;
      height: 20rem;
      top: 20rem;
      @include mobile {
        order: 5;
      }
    }
    &.impressum {
      width: 20rem;
      height: 50vh;
      @include mobile {
        background-color: black;
        flex: 8rem 0 0 !important;
        // margin: 0 !important;
        border: 1px solid white;
        &.open {
          //   background-color: white;
          flex: 1 !important;
          transform: translateY(0rem);
          margin-top: 1rem !important;
        }
      }
    }
    &.privatsphare {
      width: 30rem;
      height: 60vh;
      @include mobile {
        background-color: black;
        flex: 8rem 0 0 !important;
        // margin: 0 !important;
        margin-bottom: 2rem !important;
        border: 1px solid white;
        &.open {
          //   background-color: white;
          flex: 1 !important;
          margin-bottom: 2rem !important;
          margin-top: 2rem !important;
        }
      }
    }
    &.ausstellungen {
      width: 70rem;
      height: 88vh;
      @include mobile {
        order: 6;
      }
    }
    &.cv {
      width: 38rem;
      height: 80vh;
      top: 10vh;
      @include mobile {
        order: 7;
      }
    }
  }
}
.child:active {
  cursor: grabbing;
}
.mode-selector {
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem;
  z-index: 100;
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
      border: 1px solid white;
    }
    &:first-child {
      border-radius: 1.5rem;
    }
  }
}
.page-wrapper {
  &.light {
    background-color: black;
  }
}
</style>
