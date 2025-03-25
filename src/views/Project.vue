<template>
  <div
    class="project-wrapper"
    :class="{ 'hide-presents': hasChild, 'has-child': hasChild }"
  >
    <div class="datenschutz" :class="{ open: datenschutz }">
      <button class="close" @click="datenschutz = false">
        <svg
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.75 16.32"
        >
          <defs></defs>
          <g id="Gruppe_94">
            <path id="Pfad_111" class="cls-2" d="m26.37,15.66L.37.66" />
            <path id="Pfad_112" class="cls-1" d="m.38,15.67L26.37.65" />
          </g>
        </svg>
      </button>
      <Datenschutz></Datenschutz>
    </div>
    <div
      class="left-side"
      :class="{ 'has-child': hasChild }"
      :style="{
        '--glossarbc': page?.categories?.find((c) => c.name == 'Glossar')
          ?.color,
      }"
    >
      <router-view v-slot="{ Component }" :key="$route.path">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div ref="rightside" class="right-side" :class="{ 'has-child': hasChild }">
      <div
        class="big-title"
        :class="{ disappear: hasChild }"
        v-html="page.longtitle"
      ></div>
      <div class="button-wrapper" :class="{ disappear: !hasChild }">
        <button
          ref="lesen"
          :class="{ active: currentmode == 'lesen' }"
          @click="currentmode = 'lesen'"
        >
          <span>Lesen</span>
        </button>
        <button
          ref="ausblenden"
          :class="{ active: currentmode == 'ausblenden' }"
          @click="currentmode = 'ausblenden'"
        >
          <span>Ausblenden</span>
        </button>
        <button
          ref="einblenden"
          :class="{ active: currentmode == 'einblenden' }"
          @click="currentmode = 'einblenden'"
        >
          <span>Einblenden</span>
        </button>
        <div class="spacer"></div>
        <button ref="menu" class="menubutton" :style="{ '--bc': '#2b2b2e' }">
          <router-link
            :to="'/' + page.slug"
            @click="
              permanentActiveCategry = '';
              currentmode = '';
              resetAll();
            "
          >
            <p>Menü</p>
            <svg
              id="Ebene_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226.77 85.04"
              preserveAspectRatio="none"
            >
              <path
                id="Pfad_159-2"
                d="m50.97,65.96h131.72c-11.61-5.2-19.34-14.46-19.34-25.02s7.69-19.78,19.25-24.98H50.88l.08,50Z"
              />
            </svg>
          </router-link>
        </button>
      </div>
      <div class="filter-wrapper">
        <div
          v-for="(category, index) in page.categories"
          :key="index"
          class="single-category"
          :class="{
            invert: category.invertOnHover,
            active:
              highLightedCategory == category.name ||
              permanentActiveCategry == category.name,
          }"
          :style="{ '--bc': category.color }"
          @mouseover="
            setActiveCategory(
              category.name,
              category.color,
              category.invertOnHover
            )
          "
          @mouseleave="setActiveCategory('', '', false)"
          @click="
            setActiveCategoryPermanent(
              category.name,
              category.color,
              category.invertOnHover
            )
          "
        >
          <svg
            v-if="index == 0 && !isMobile"
            id="Ebene_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 226.77 85.04"
            preserveAspectRatio="none"
          >
            <path
              id="Pfad_159-2"
              d="m50.97,65.96h131.72c-11.61-5.2-19.34-14.46-19.34-25.02s7.69-19.78,19.25-24.98H50.88l.08,50Z"
            />
          </svg>
          <svg
            v-if="index == 0 && isMobile"
            id="Ebene_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 226.77 85.04"
          >
            <path
              id="Pfad_152-2"
              :style="{
                fill:
                  openCategories[category.name] && isMobile
                    ? 'var(--bc)'
                    : 'white',
              }"
              d="m34.32,17.52h168.72c-11.56,5.2-19.25,14.45-19.25,24.98s7.73,19.82,19.34,25.02H34.4l-.08-50Z"
            />
          </svg>
          <p v-if="index == 0 && !isMobile">
            {{ category.name.substring(0, 4) }}
          </p>

          <p
            v-else
            :style="{
              backgroundColor:
                openCategories[category.name] && isMobile && index != 0
                  ? 'var(--bc) !important'
                  : 'white',
              color:
                openCategories[category.name] && index == 0 ? 'white' : 'black',
            }"
            @click="toggleCat(category.name)"
          >
            {{ category.name }}
          </p>
          <div class="text-links-mobile" :data-cat="category.name">
            <div class="content-wrapper">
              <router-link
                v-for="(text, index) in filterForCat(
                  page.children,
                  category.name
                )"
                :key="index"
                :to="text.uri"
                @click="safeScroll()"
                v-html="text.title"
              ></router-link>
            </div>
          </div>
        </div>
        <div
          class="single-category invert"
          :style="{ '--bc': '#2b2b2e' }"
          :class="{ hide: hasChild }"
        >
          <router-link :to="'/'">
            <p>Startseite</p>
            <svg
              id="Ebene_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226.77 85.04"
              preserveAspectRatio="none"
            >
              <path
                id="Pfad_144-2"
                d="m212.79,67.52H14.07c11.56-5.2,19.25-14.45,19.25-24.98s-7.73-19.82-19.34-25.02h198.72"
              />
            </svg>
          </router-link>
        </div>
      </div>
      <div class="texts-wrapper">
        <text-link
          v-for="(text, index) in page.children"
          :key="text.uri"
          :ref="(el) => (textlinks[index] = el)"
          :text="text"
          :dont-fire-click="
            currentmode == 'ausblenden' || currentmode == 'einblenden'
          "
          :currentmode="currentmode"
          :color="
            page.categories.find((cat) => cat.name == text.category).color
          "
          :invert="
            page.categories.find((cat) => cat.name == text.category)
              .invertOnHover
          "
          :text-zindex="textZindex"
          :class="{
            open: route.fullPath == '/' + text.uri,
            hidden:
              hiddenTexts.includes(text.uri) && currentmode != 'einblenden',
            halfhidden:
              hiddenTexts.includes(text.uri) && currentmode == 'einblenden',
          }"
          :active="activeCategory == text.category"
          @clicked="textclicked()"
          @resetAll="resetAll"
          @click="textClicked(text.category, text.uri, $event)"
          @mouseover="setActiveCategoryFromText(text.category)"
          @mouseleave="setActiveCategoryFromText('')"
        ></text-link>
      </div>
      <div class="footer-text" :class="{ disappear: hasChild }">
        bildungswerk des bbk berlin
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { usePage, useSite } from "~/composables";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import TextLink from "../components/TextLink.vue";
import Datenschutz from "../components/Datenschutz.vue";

let page;
const site = useSite();
const route = useRoute();
const activeCategory = ref("");
const rightside = ref(null);
const highLightedCategory = ref("");
const activeColor = ref("");
const invertActiveTexts = ref(false);
const textlinks = ref([]);
const lesen = ref(null);
const ausblenden = ref(null);
const einblenden = ref(null);
const menu = ref(null);
const currentmode = ref("lesen");
const buttons = [lesen, ausblenden, einblenden, menu];
const permanentActiveCategry = ref("");
let textZindex = 1;
const isMobile = ref(false);

const mobileCat = ref("");
const openCategories = ref({});

const textclicked = () => {
  textZindex++;
};

const safeScroll = () => {
  scrollPoint.value = document.getElementById("page").scrollTop;
  console.log("scroll point safed!!!!!!!!", scrollPoint.value);
};

const toggleCat = (cat) => {
  if (isMobile.value) {
    if (openCategories.value[cat]) {
      openCategories.value[cat] = false;
      nextTick(() => {
        const el = document.querySelector(`[data-cat="${cat}"]`);
        if (el) {
          el.style.height = "0px";
        }
      });
    } else {
      openCategories.value[cat] = true;
      nextTick(() => {
        const el = document.querySelector(`[data-cat="${cat}"]`);
        if (el) {
          el.style.height = el.scrollHeight + "px";
        }
      });
    }
  }
};
const datenschutz = ref(false);
if (route.fullPath.split("/").length > 2) {
  page = usePage(route.fullPath.split("/")[1]);
} else {
  page = usePage();
}

console.log(page);

// const isMobile = () => {
//   return (
//     getComputedStyle(document.body).getPropertyValue("--isMobile").trim() ===
//     "true"
//   );
// };

const updateIsMobile = () => {
  isMobile.value =
    getComputedStyle(document.body).getPropertyValue("--isMobile").trim() ===
    "true";
};

updateIsMobile();

window.addEventListener("resize", updateIsMobile);

const permanentCat = ref(false);

const hasChild = ref(route.matched.length > 1);

const hiddenTexts = ref([]);

const scrollPoint = ref(0);

const textClicked = (category, uri, event) => {
  if (currentmode.value == "ausblenden") {
    if (route.fullPath != "/" + uri) {
      hiddenTexts.value.push(uri);
    }
  } else if (currentmode.value == "einblenden") {
    hiddenTexts.value = hiddenTexts.value.filter((item) => item !== uri);
  } else {
    permanentActiveCategry.value = category;
    activeCategory.value = "";
  }
};

watch(route, () => {
  hasChild.value = route.matched.length > 1;
  if (hasChild.value) {
    setActiveCategory("", "", false);
    permanentActiveCategry.value = "";
  } else {
    if (isMobile.value && scrollPoint.value) {
      nextTick(() => {
        setTimeout(() => {
          document.getElementById("page").scrollTo(0, scrollPoint.value);
        }, 10);
      });
    }
  }
});

const setActiveCategoryFromText = (category) => {
  if (!isMobile.value) {
    highLightedCategory.value = category;
  }
};

const setActiveCategory = (category, color, invertOnHover) => {
  if (!permanentCat.value && !isMobile.value) {
    activeCategory.value = category;
    activeColor.value = color;
    invertActiveTexts.value = invertOnHover;
  }
};

const setActiveCategoryPermanent = (category, color, invertOnHover) => {
  if (!isMobile.value) {
    if (permanentActiveCategry.value == category) {
      permanentActiveCategry.value = "";
      activeCategory.value = "";
      activeColor.value = "";
      invertActiveTexts.value = !invertOnHover;
      permanentCat.value = false;
    } else {
      permanentActiveCategry.value = category;
      activeCategory.value = category;
      activeColor.value = color;
      invertActiveTexts.value = invertOnHover;
      permanentCat.value = true;
    }
  }
};

const resetAll = () => {
  console.log("reset all");
  textlinks.value.forEach((tl) => {
    if (tl && typeof tl.resetPosition === "function") {
      tl.resetPosition();
    }
  });
};
const vw = window.innerWidth * 0.01;

const filterForCat = (texts, category) => {
  return texts.filter((text) => text.category == category);
};

onMounted(() => {
  //   buttons.forEach((bt, index) => {
  //     if (index !== buttons.length) {
  //       const button = bt.value;
  //       const buttonWidth = (button.offsetWidth / window.innerWidth) * 100;
  //       button.style.width = `${buttonWidth}rem`;
  //     }
  //   });
});
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@mixin whiteBubble {
  padding: 0.7rem 1.5rem;
  margin: 0.2rem;
  border-radius: 2rem;
  background-color: white;
}
.project-wrapper {
  display: flex;
  height: 100vh;
  @include mobile {
    overscroll-behavior: none;
    flex-direction: column;
    width: 100vw;
    height: auto;
    overflow: hidden;
    min-height: 100svh;
    &.has-child {
      height: 100dvh !important;
    }
  }
  &.hide-presents {
    @include mobile {
      &.hide-presents {
        .presents-wrapper {
          display: none !important;
        }
      }
    }
  }
  .datenschutz {
    position: absolute;
    left: -50rem;
    transition: left 1s ease;
    z-index: 5;
    @include desktop {
      display: none;
    }
    .close {
      position: absolute;
      top: -1rem;
      right: 1rem;
      background-color: transparent;
      border: none;
      font-family: "Rosart", serif;
      font-size: 3rem;
      cursor: pointer;
      z-index: 7;
      @include mobile {
        top: 1rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        @include mobile {
          width: 3.9rem;
          height: 3.9rem;
        }
        cls-1 {
          stroke-miterlimit: 4;
          stroke-width: 1.5px;
        }
        .cls-1,
        .cls-2 {
          fill: none;
          stroke: #000;
        }
        .cls-2 {
          stroke-width: 1.5px;
        }
      }
    }
    &.open {
      left: 100rem;
    }
  }
  .presents-wrapper {
    display: none;
    @include mobile {
      display: block;
      font-size: $textmobile;
      text-align: center;
      line-height: 1;
      margin-bottom: 1rem;
      padding-top: 2rem;
      &.bottom {
        span {
          font-style: normal;
        }
      }
      span {
        display: block;
        font-style: italic;
      }
    }
  }
  .left-side {
    flex: 0 0 0%;
    transition: flex 0.7s ease, background-color 1s ease;
    position: relative;
    background-color: transparent;
    z-index: 6;
    &.has-child {
      flex: 0 0 50%;
      background-color: white;
      @include mobile {
        .inner-text-wrapper {
          width: 100rem;
        }
      }
    }
  }
  .right-side {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    padding: 1.5rem;
    transition: width 0.5s ease;
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &.has-child {
      width: 50vw;
      padding-right: 0;
      @include mobile {
        flex: 1;
        width: 100vw;
      }
    }
    @include mobile {
      padding: 0;
      height: 100dvh;
      flex: 1;
    }
    .button-wrapper {
      padding-right: 1.5rem;
      display: flex;
      flex: 0 0 4rem;
      transition: height 0.1s ease, opacity 1s ease;
      overflow: hidden;
      @include mobile {
        display: none;
      }
      .spacer {
        flex: 1;
      }
      &.disappear {
        height: 0;
        overflow: hidden;
        opacity: 0;
        flex: 0 0 0;
      }
      button {
        background-color: white;
        border: none;
        font-size: 1rem;
        font-family: "Rosart", serif;
        @include whiteBubble;
        padding-top: 0.5rem;
        border-radius: 0;
        height: 2.4rem;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        &.menubutton {
          padding: 0;
          margin: 0;
          background-color: transparent !important;
          width: 9rem;
          box-shadow: none;
          height: 2.4rem;

          &:hover {
            p {
              line-height: 1.5;
              color: white;
            }
            svg {
              path {
                fill: #2b2b2e !important;
              }
            }
          }
          a {
            border-radius: 0;
            height: 100%;
            width: 100%;
            position: relative;
            display: block;
            p {
              margin: 0;
              position: relative;
              z-index: 1;
              padding-top: 0.65rem;
            }
            svg {
              position: absolute;
              top: -0.6rem;
              left: -1.5rem;
              z-index: 0;
              height: 4.08rem;
              width: 13rem;
              -webkit-filter: drop-shadow(0px 3px 6px #00000029);
              filter: drop-shadow(0px 3px 6px #00000029);
              path {
                fill: white;
              }
            }
          }
        }
        &.active {
          background-color: #2b2b2e;
          color: white;
        }
        cursor: pointer;
        &:hover {
          background-color: #2b2b2e;
          span {
            color: white;
          }
        }
      }
    }
    .big-title {
      height: 8rem;
      transition: height 0.4s ease 0.2s, opacity 0.4s ease 0.2s;
      &.disappear {
        height: 0;
        opacity: 0;
        overflow: hidden;
        transition: height 0.4s ease, opacity 0.4s ease 0s;
        @include mobile {
          height: 8rem;
          opacity: 1;
        }
      }
    }
    .footer-text {
      text-transform: none !important;
      height: 2rem;
      transition: height 1s ease, opacity 1s ease;
      &.disappear {
        height: 0;
        opacity: 0;
        overflow: hidden;
      }
    }
    .big-title,
    .footer-text {
      @include mobile {
        font-size: 5.5rem;
        height: auto;
        margin: 6rem 0;
        line-height: 1.1;
      }
      font-size: 2.7rem;
      font-family: sans-serif;
      text-transform: uppercase;
      color: white;
      font-weight: 400;
      text-align: center;
      line-height: 0.9;
      letter-spacing: 0.002rem;
      filter: blur(0.05rem);
      text-shadow: 0px 2px 2px #00000066;
      p {
        margin: 0;
      }
    }
    &.has-child {
      .filter-wrapper {
        margin-bottom: 2rem !important;
        max-width: 50rem;
        // overflow: hidden;
      }
    }
    .filter-wrapper {
      display: flex;
      margin-bottom: 2rem;
      margin-top: 2rem;
      transition: margin-bottom 1s ease;
      padding-left: 0.4rem;
      @include mobile {
        flex-direction: column;
        flex: 1;
      }
      .single-category {
        cursor: pointer;
        @include whiteBubble;
        margin-right: 1rem;
        margin-top: 0;
        margin-bottom: 0;
        height: 2.4rem;
        padding-top: 0.49rem;
        // overflow: hidden;
        transition: opacity 1s ease;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        &.hide {
          opacity: 0;
          pointer-events: none;
          display: none;
        }
        .text-links-mobile {
          display: none;
        }
        @include mobile {
          height: auto;
          background-color: transparent;
          font-size: $textmobile;
          width: 99vw !important;
          margin-left: 0 !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: none;
          padding: 0 !important;
          &:hover {
            background-color: transparent !important;
            &.invert {
              color: black !important;
            }
          }
          p {
            // background-color: var(--bc);
            background-color: white;
            padding: 3rem 6rem;
            border-radius: 6rem;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
            text-align: center;
            margin-bottom: 2rem !important;
          }
          .text-links-mobile {
            display: block;
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease-out;
            a {
              p {
                text-transform: none !important;
                background-color: white;
                width: 96rem;
                padding: 2rem 6rem;
                line-height: 1;
              }
            }
          }
        }
        &.active {
          background-color: var(--bc) !important;
          > p {
            background-color: var(--bc) !important;
          }
          &.invert {
            color: white;
            svg {
              path {
                fill: var(--bc);
              }
            }
          }
        }
        &:hover {
          @include desktop {
            background-color: var(--bc);
            > p {
              //   background-color: transparent !important;
            }
            &.invert {
              color: white;
            }
          }
        }
        p {
          margin: 0;
          z-index: 1;
          position: relative;
          text-transform: uppercase;
          @include desktop {
            background-color: transparent !important;
          }
          @include mobile {
            background-color: white !important;
          }
        }
        &:first-child {
          background-color: transparent !important;
          position: relative;
          box-shadow: none;
          flex: 0 0 8rem;
          border-radius: 0 !important;
          padding-left: 0.6rem !important;
          margin-left: 0.6rem;
          margin-right: -0.7rem;
          @include mobile {
            > p {
              background-color: transparent !important;
              box-shadow: none;
              //   color: white;
              color: black;
            }
            svg {
              top: -3.57rem !important;
              left: 21.5rem !important;
              height: 19rem !important;
              width: 58rem !important;
              -webkit-filter: drop-shadow(0px 3px 6px #00000029);
              filter: drop-shadow(0px 3px 6px #00000029);
              path {
                // fill: var(--bc) !important;
                fill: white;
              }
            }
          }
          &.active {
            > p {
              background-color: transparent !important;
            }
          }
          &:hover {
            @include desktop {
              background-color: transparent !important;
              p {
                // background-color: transparent !important;
              }
            }

            svg {
              path {
                fill: var(--bc);
                @include mobile {
                  fill: white;
                }
              }
            }
          }
          svg {
            position: absolute;
            top: -0.77rem;
            left: -3.5rem;
            z-index: 0;
            height: 4.08rem;
            width: 12rem;
            -webkit-filter: drop-shadow(0px 3px 6px #00000029);
            filter: drop-shadow(0px 3px 6px #00000029);
            path {
              fill: white;
            }
          }
        }
        &:last-child {
          background-color: transparent;
          position: relative;
          box-shadow: none;
          margin-left: 1rem;
          @include mobile {
            a > p {
              background-color: transparent !important;
              box-shadow: none;
              //   color: white;
              color: black;
            }
            svg {
              top: -3rem !important;
              left: 26.5rem !important;
              height: 19rem !important;
              width: 43rem !important;
              path {
                // fill: #2b2b2e !important;
                fill: white !important;
              }
            }
          }
          &:hover {
            svg {
              path {
                fill: var(--bc);
              }
            }
          }
          svg {
            position: absolute;
            top: -0.77rem;
            right: 0rem;
            z-index: 0;
            height: 4.08rem;
            width: 10rem;
            -webkit-filter: drop-shadow(0px 3px 6px #00000029);
            filter: drop-shadow(0px 3px 6px #00000029);
            path {
              fill: white;
            }
          }
        }
      }
    }
    .texts-wrapper {
      display: flex;
      margin-bottom: 2rem;
      align-items: baseline;
      flex-wrap: wrap;
      align-items: center;
      width: 90%;
      flex: 1;
      align-content: center;
      @include mobile {
        // display: none;
        height: 0;
        flex: 0 0 0;
        overflow: hidden;
      }
    }
  }
}
</style>
