<template>
  <div class="project-wrapper">
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
    <div class="right-side" :class="{ 'has-child': hasChild }">
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
            v-if="index == 0"
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
          <p v-if="index == 0">
            {{ category.name.substring(0, 4) }}
          </p>
          <p v-else>
            {{ category.name }}
          </p>
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
          @clicked="textZindex++"
          @resetAll="resetAll"
          @click="textClicked(text.category, text.uri, $event)"
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
import { usePage } from "~/composables";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import TextLink from "../components/TextLink.vue";

let page;
const route = useRoute();
const activeCategory = ref("");
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
const textZindex = 1;

if (route.fullPath.split("/").length > 2) {
  page = usePage(route.fullPath.split("/")[1]);
} else {
  page = usePage();
}

const permanentCat = ref(false);

const hasChild = ref(route.matched.length > 1);

const hiddenTexts = ref([]);

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
  console.log(route.fullPath);
  if (hasChild.value) {
    setActiveCategory("", "", false);
    permanentActiveCategry.value = "";
  }
});

const setActiveCategory = (category, color, invertOnHover) => {
  if (!permanentCat.value) {
    activeCategory.value = category;
    activeColor.value = color;
    invertActiveTexts.value = invertOnHover;
  }
};

const setActiveCategoryPermanent = (category, color, invertOnHover) => {
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
};

const resetAll = () => {
  if (!hasChild.value) {
    textlinks.value.forEach((tl) => {
      if (tl && typeof tl.resetPosition === "function") {
        tl.resetPosition();
      }
    });
  }
};
const vw = window.innerWidth * 0.01;

onMounted(() => {
  buttons.forEach((bt, index) => {
    console.log(index);
    if (index !== buttons.length) {
      const button = bt.value;
      const buttonWidth = (button.offsetWidth / window.innerWidth) * 100;
      button.style.width = `${buttonWidth}rem`;
    }
  });
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
  .left-side {
    flex: 0 0 0%;
    transition: flex 1s ease, background-color 1s ease;
    position: relative;
    background-color: transparent;
    z-index: 6;
    &.has-child {
      flex: 0 0 50%;
      background-color: white;
    }
  }
  .right-side {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    width: 100%;
    padding: 1.5rem;
    .button-wrapper {
      display: flex;
      height: 4rem;
      transition: height 0.1s ease, opacity 1s ease;
      overflow: hidden;
      .spacer {
        flex: 1;
      }
      &.disappear {
        height: 0;
        overflow: hidden;
        opacity: 0;
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
          background-color: transparent;
          width: 9rem;
          box-shadow: none;
          height: 2.4rem;
          &:hover {
            p {
              font-style: italic;
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
            p {
              margin: 0;
              position: relative;
              z-index: 1;
            }
            svg {
              position: absolute;
              top: -1.17rem;
              left: -6.5rem;
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
          font-style: italic;
        }
        cursor: pointer;
        &:hover {
          span {
            font-style: italic;
          }
        }
      }
    }
    .big-title {
      height: 8rem;
      transition: height 1s ease, opacity 1s ease;
      &.disappear {
        height: 0;
        opacity: 0;
        overflow: hidden;
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
      font-size: 2.7rem;
      font-family: sans-serif;
      text-transform: uppercase;
      color: white;
      font-weight: 400;
      text-align: center;
      line-height: 0.9;
      letter-spacing: 0.002rem;
      filter: blur(1px);
      text-shadow: 0px 2px 2px #00000066;
      p {
        margin: 0;
      }
    }
    &.has-child {
      .filter-wrapper {
        margin-bottom: 2rem !important;
      }
    }
    .filter-wrapper {
      display: flex;
      margin-bottom: 7rem;
      margin-top: 1rem;
      transition: margin-bottom 1s ease;
      .single-category {
        cursor: pointer;
        @include whiteBubble;
        margin-right: 1rem;
        margin-top: 0;
        margin-bottom: 0;
        height: 2.4rem;
        padding-top: 0.5rem;
        // overflow: hidden;
        transition: opacity 1s ease;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        &.hide {
          opacity: 0;
          pointer-events: none;
        }
        &.active {
          background-color: var(--bc);
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
          background-color: var(--bc);
          &.invert {
            color: white;
          }
        }
        p {
          margin: 0;
          z-index: 1;
          position: relative;
          text-transform: uppercase;
        }
        &:first-child {
          background-color: transparent;
          position: relative;
          box-shadow: none;
          width: 8rem;
          border-radius: 0 !important;
          padding-left: 0.6rem !important;
          margin-left: 0.6rem;
          margin-right: -0.7rem;
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
      margin-bottom: auto;
      align-items: baseline;
      flex-wrap: wrap;
      align-items: center;
      width: 90%;
    }
  }
}
</style>
