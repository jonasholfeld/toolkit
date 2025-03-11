<template>
  <div class="home-wrapper">
    <button
      class="info-button"
      @click="
        info = true;
        datenschutz = false;
      "
    >
      <span>INFO</span>
      <span>INFORMATION</span>
    </button>
    <div class="datenschutz" :class="{ open: datenschutz }">
      <button class="close" @click="datenschutz = false">
        <svg
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.75 16.32"
        >
          <g id="Gruppe_94">
            <path id="Pfad_111" class="cls-2" d="m26.37,15.66L.37.66" />
            <path id="Pfad_112" class="cls-1" d="m.38,15.67L26.37.65" />
          </g>
        </svg>
      </button>
      <Datenschutz></Datenschutz>
    </div>
    <div class="info" :class="{ open: info }">
      <button class="close" @click="info = false">
        <svg
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.75 16.32"
        >
          <g id="Gruppe_94">
            <path id="Pfad_111" class="cls-2" d="m26.37,15.66L.37.66" />
            <path id="Pfad_112" class="cls-1" d="m.38,15.67L26.37.65" />
          </g>
        </svg>
      </button>
      <Info @closeInfo="info = false"></Info>
      <button
        class="datenschutz-button"
        @click="
          datenschutz = true;
          info = false;
        "
      >
        IMPRESSUM
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        DATENSCHUTZ
      </button>
    </div>
    <div class="presents-wrapper">
      Das bildungswerk des bbk berlin präsentiert:
    </div>
    <div class="navi-wrapper">
      <a
        v-for="(project, index) in site.children"
        :key="project.uri"
        :href="project.uri"
        class="navigatior-wrapper"
        :style="{ '--fc': project.fontcolor }"
      >
        <span v-if="isMobile()" :to="project.uri" v-html="project.title"></span>
        <span v-else :to="project.uri">{{ project.puretitle }}</span>
        <svg
          v-if="index == 0 && !isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1275.59 311.81"
        >
          <defs></defs>
          <polygon
            class="cls-1"
            :style="{ '--c': project.color }"
            points="1014.45 174.92 1137.95 297.42 145.85 297.42 173.32 271.33 112.76 271.33 137.67 247.67 85.76 247.67 205.41 134.03 85.76 14.39 1077.86 14.39 1051.48 38.05 1104.86 38.05 1075.77 64.14 1137.95 64.14 1014.45 174.92"
          />
        </svg>
        <svg
          v-if="index == 0 && isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1300 400"
        >
          <polygon
            class="cls-1"
            :style="{ '--c': project.color }"
            points="1033.06 194.07 1156.77 365 162.96 365 190.48 339.15 129.82 339.15 154.77 315.7 102.77 315.7 222.63 153.55 102.77 35 1096.58 35 1070.15 58.44 1123.62 58.44 1094.48 84.3 1156.77 84.3 1033.06 194.07"
          />
        </svg>
        <svg
          v-if="index == 1 && !isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1275.59 311.81"
        >
          <path
            id="Pfad_86-2"
            class="cls-1"
            :style="{ '--c': project.color }"
            d="m437.45,17.39v25.05h-127.55v25.83h-73.56v25.83h-76.69v25.03h-47.74v25.83h-52.44v23.49h-24.25v125.98h826.4v-24.27h126.78v-24.25h101.73v-25.05h75.12v-25.05h48.52v-25.04h26.62V17.39H437.45Z"
          />
        </svg>
        <svg
          v-if="index == 1 && isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1300 400"
        >
          <polygon
            class="cls-1"
            :style="{ '--c': project.color }"
            points="1177 35 1177 240.22 1150.37 240.22 1150.37 265.49 1101.81 265.49 1101.81 290.76 1026.63 290.76 1026.63 316.04 924.82 316.04 924.82 340.51 820.25 340.51 819.96 365 123 365 123 187.42 147.27 187.42 147.27 163.72 199.75 163.72 199.75 137.65 247.53 137.65 247.53 112.39 324.28 112.39 324.28 86.33 397.9 86.33 397.9 60.27 525.55 60.27 525.55 35 1177 35"
          />
        </svg>
        <svg
          v-if="index == 2 && !isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1275.59 311.81"
        >
          <path
            id="Pfad_142-2"
            class="cls-1"
            :style="{ '--c': project.color }"
            d="m930.27,17.39v27.87h-27.87v25.88h-27.79v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v25.88h-27.69v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v26.12h-.01v-.13h-27.86v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v26.12h-27.86v167.2h27.86v27.86h27.87v27.87h167.44v-28.12h27.62v-27.86h.01v.14h27.86v27.87h27.87v27.86h167.44v-28.11h27.62v-27.62h27.69v27.87h27.87v27.86h167.44v-28.11h27.62v-27.62h27.79v27.87h27.87v27.86h167.45v-28.11h27.61v-27.87h27.87V71.14h-27.87v-26.13h-27.61v-27.62h-167.45Z"
          />
        </svg>
        <svg
          v-if="index == 2 && isMobile()"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1300 400"
        >
          <path
            id="Pfad_142-2"
            class="cls-1"
            :style="{ '--c': project.color }"
            d="m965.2,35v28.12h-27.87v26.12h-27.8v-26.37h-27.63v-27.87h-167.47v28.12h-27.88v26.12h-27.7v-26.37h-27.63v-27.87h-167.47v28.12h-27.88v26.36h-.01v-.13h-27.86v-26.37h-27.63v-27.87h-190.48v28.12h-27.87v26.36h-27.87v219.17h27.87v28.11h27.87v28.12h190.48v-28.38h27.63v-28.11h.01v.14h27.86v28.12h27.88v28.11h167.47v-28.37h27.63v-27.87h27.7v28.12h27.88v28.11h167.47v-28.37h27.63v-27.87h27.8v28.12h27.87v28.11h167.48v-28.37h27.62v-28.12h27.87V89.24h-27.87v-26.37h-27.62v-27.87h-167.48Z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useSite } from "~/composables";
import { ref } from "vue";
import Datenschutz from "../components/Datenschutz.vue";
import Info from "../components/Info.vue";
const site = useSite();
console.log(site);
const datenschutz = ref(false);
const info = ref(false);
const isMobile = () => {
  console.log(
    "is mobile: ",
    getComputedStyle(document.body).getPropertyValue("--isMobile").trim()
  );
  return (
    getComputedStyle(document.body).getPropertyValue("--isMobile").trim() ===
    "true"
  );
};
</script>

<style scoped lang="scss">
@keyframes moveRight {
  from {
    left: 0rem;
  }
  to {
    left: 40rem;
  }
}
@keyframes moveUp {
  from {
    top: -4rem;
  }
  to {
    top: 4rem;
  }
}
@keyframes moveDown {
  from {
    top: 4rem;
  }
  to {
    top: -4rem;
  }
}
@keyframes moveLeft {
  from {
    left: 40rem;
  }
  to {
    left: 0rem;
  }
}
.presents-wrapper {
  padding: 0.8rem 1rem;
  font-size: $text;
  @include mobile {
    padding: 3rem 1rem;
  }
  span {
    display: none;
    @include mobile {
      display: inline;
      font-style: italic;
    }
  }
  @include mobile {
    text-align: center;
    font-size: $textmobile;
  }
}
.home-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  @include mobile {
    height: 100svh;
  }
  .info-button {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-family: "Rosart", serif;
    font-size: $text;
    cursor: pointer;
    @include mobile {
      bottom: 2rem;
      left: 0rem;
      width: 100rem;
      height: 10rem;
      top: unset;
      z-index: 4;
    }
    span {
      color: black !important;
      @include mobile {
        font-size: $textmobile;
      }
      &:first-child {
        display: block;
        @include mobile {
          color: black !important;
          display: none;
        }
      }
      &:nth-child(2) {
        display: none;
        @include mobile {
          display: block;
          color: black !important;
        }
      }
    }
  }
  .datenschutz {
    position: absolute;
    left: -50rem;
    transition: left 1s ease;
    z-index: 5;
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
        display: none;
      }
      svg {
        width: 1.3rem;
        height: 1rem;
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
      left: 50rem;
    }
  }
  .info {
    position: absolute;
    right: -70rem;
    transition: right 1s ease, top 1s ease;
    z-index: 5;
    box-shadow: 10px 10px 50px #000000;
    width: 50vw;
    height: 100vh;
    @include mobile {
      width: 100vw;
      right: 0rem;
      top: 120vh;
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
        display: none;
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
    .datenschutz-button {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background-color: transparent;
      border: none;
      font-family: "Rosart", serif;
      font-size: $text;
      cursor: pointer;
      @include mobile {
        display: none;
      }
    }
    &.open {
      right: 0rem;
      @include mobile {
        top: 0rem;
      }
    }
  }
}
.navi-wrapper {
  height: calc(100vh - 7rem);
  @include mobile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 18rem;
    height: calc(100svh - 42rem);
  }
  .navigatior-wrapper {
    position: relative;
    height: 17rem;
    width: 70rem;
    position: absolute;
    animation: moveRight 30s linear infinite alternate;
    @include mobile {
      animation: moveUp 3s linear infinite alternate !important;
      left: 0 !important;
      position: relative;
      display: block;
      height: auto;
      //   top: unset !important;
      left: unset !important;
      width: 100rem;
    }
    &:hover {
      svg {
        .cls-1 {
          fill: var(--c);
        }
      }
      span {
        color: var(--fc);
      }
    }
    &:nth-child(1) {
      top: 14vh;
      z-index: 4;
      @include mobile {
        span {
          width: 37vw;
          top: 14rem;
        }
      }
    }
    &:nth-child(2) {
      top: 40vh;
      left: 40rem;
      z-index: 3;
      animation: moveLeft 28s linear infinite alternate;
      @include mobile {
        animation: moveDown 4s linear infinite alternate !important;
        span {
          top: 14rem;
        }
      }
    }
    &:nth-child(3) {
      top: 65vh;
      left: 0rem;
      animation: moveRight 34s linear infinite alternate 1s;
      @include mobile {
        animation: moveUp 5s linear infinite alternate !important;
        span {
          top: 14rem;
        }
      }
    }
    & svg {
      position: absolute;
      width: 65rem;
      top: 0;
      -webkit-filter: drop-shadow(0px 3px 6px #00000029);
      filter: drop-shadow(0px 3px 6px #00000029);
      @include mobile {
        width: 100rem;
        position: static;
      }
      .cls-1 {
        fill: white;
      }
    }
    &:nth-child(1) {
      span {
        left: 30rem;
        top: 7rem;
        @include mobile {
          left: 47rem;
          top: 13rem;
        }
      }
    }
    &:nth-child(2) {
      span {
        left: 32rem;
        top: 7rem;
        @include mobile {
          left: 49rem;
          top: 13rem;
        }
      }
    }
    &:nth-child(3) {
      span {
        left: 32rem;
        top: 7rem;
        @include mobile {
          left: 52rem;
          top: 14rem;
        }
      }
    }
    span {
      width: 35rem;
      text-align: center;
      position: absolute;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      margin: 1rem;
      z-index: 3;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
      @include mobile {
        font-size: $textmobile;
        width: 100vw;
        top: 11rem;
        line-height: 1;
      }
    }
  }
}
</style>
