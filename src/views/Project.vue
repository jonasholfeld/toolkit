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
            v-if="index == 0 && !isMobile()"
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
            v-if="index == 0 && isMobile()"
            id="Ebene_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 226.77 85.04"
          >
            <path
              id="Pfad_152-2"
              :style="{
                fill:
                  openCategories[category.name] && isMobile()
                    ? 'var(--bc)'
                    : 'white',
              }"
              d="m34.32,17.52h168.72c-11.56,5.2-19.25,14.45-19.25,24.98s7.73,19.82,19.34,25.02H34.4l-.08-50Z"
            />
          </svg>
          <p v-if="index == 0 && !isMobile()">
            {{ category.name.substring(0, 4) }}
          </p>

          <p
            v-else
            :style="{
              backgroundColor:
                openCategories[category.name] && isMobile()
                  ? 'var(--bc)'
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
import Datenschutz from "../components/Datenschutz.vue";

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
let textZindex = 1;

const mobileCat = ref("");
const openCategories = ref({});

const textclicked = () => {
  textZindex++;
};

const safeScroll = () => {
  scrollPoint.value = window.scrollY || document.documentElement.scrollTop;
};

const toggleCat = (cat) => {
  if (isMobile()) {
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
    if (isMobile() && scrollPoint.value) {
      console.log("scrollpoint", scrollPoint.value);
      //   window.scrollTo(0, scrollPoint.value);
      //   window.scrollTo({ top: scrollPoint.value, behavior: "smooth" });
      nextTick(() => {
        setTimeout(() => {
          window.scrollTo(0, scrollPoint.value);
        }, 10);
      });
    }
  }
});

const setActiveCategory = (category, color, invertOnHover) => {
  if (!permanentCat.value && !isMobile()) {
    activeCategory.value = category;
    activeColor.value = color;
    invertActiveTexts.value = invertOnHover;
  }
};

const setActiveCategoryPermanent = (category, color, invertOnHover) => {
  if (!isMobile()) {
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
  buttons.forEach((bt, index) => {
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
  @include mobile {
    flex-direction: column;
    width: 100vw;
    height: auto;
    overflow: hidden;
    min-height: 100dvh;
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
    height: calc(100vh);
    width: 100%;
    padding: 1.5rem;
    @include mobile {
      padding: 0;
      height: 100dvh;
      flex: 1;
    }
    .button-wrapper {
      display: flex;
      height: 4rem;
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
        font-size: 5rem;
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
      filter: blur(0.07rem);
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
        padding-top: 0.5rem;
        // overflow: hidden;
        transition: opacity 1s ease;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        &.hide {
          opacity: 0;
          pointer-events: none;
        }
        .text-links-mobile {
          display: none;
        }
        @include mobile {
          height: auto;
          background-color: transparent;
          font-size: $textmobile;
          width: 100rem !important;
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
              background-color: transparent !important;
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
        }
        &:first-child {
          background-color: transparent !important;
          position: relative;
          box-shadow: none;
          width: 8rem;
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
                background-color: transparent !important;
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
      margin-bottom: auto;
      align-items: baseline;
      flex-wrap: wrap;
      align-items: center;
      width: 90%;
      @include mobile {
        display: none;
      }
    }
  }
}
</style>
