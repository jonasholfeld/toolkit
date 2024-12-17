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
        @click="bringToTop(index)"
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
          <RouterLink to="/">{{ site.title }}</RouterLink>
        </h1>
        <div class="current-route">Information</div>
      </div>
    </div>
    <div class="mode-selector">
      <button :class="{ active: mode == 'dark' }" @click="mode = 'dark'">
        1
      </button>
      <button :class="{ active: mode == 'light' }" @click="mode = 'light'">
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
      bringToTop(slugToIndexMapping[routeSegments[1]]);
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
        bringToTop(slugToIndexMapping[routeSegments[1]]);
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
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function bringToTop(index) {
  if (isMobile()) {
    isOpen.value = index;
    workFlex.value = false;
    childPositions.value.forEach((e) => {
      e.flex = "0 0 8rem";
    });
    childPositions.value[index].flex = "1 0 0";
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
    bringToTop(index);
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
  right: 0;
  bottom: 0;
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
  overflow: hidden;
  .spacer {
    @include mobile {
      order: 4;
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
      transition: flex 0.3s ease, background-color 1s ease;
      padding: 0 3rem;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &:nth-child(odd) {
      border-radius: 6rem;
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
        flex: 6rem 0 0 !important;
        margin: 0 !important;
        transform: translateY(1rem);
        &.open {
          background-color: white;
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
        flex: 6rem 0 0 !important;
        margin: 0 !important;
        margin-bottom: 2rem !important;
        &.open {
          background-color: white;
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
        order: 7;
      }
    }
    &.cv {
      width: 50rem;
      height: 80vh;
      top: 10vh;
      @include mobile {
        order: 6;
      }
    }
  }
}
.child:active {
  cursor: grabbing;
}
.mode-selector {
  position: fixed;
  top: 0;
  right: 0;
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
    transition: all 0.3s ease;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
    @include heading_one;
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
