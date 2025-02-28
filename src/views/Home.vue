<template>
  <div class="home-wrapper">
    <button class="info-button" @click="info = true">INFO</button>
    <div class="datenschutz" :class="{ open: datenschutz }">
      <button class="close" @click="datenschutz = false">x</button>
      <Datenschutz></Datenschutz>
    </div>
    <div class="info" :class="{ open: info }">
      <button class="close" @click="info = false">x</button>
      <Info></Info>
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
      >
        <span :to="project.uri">{{ project.title }}</span>
        <svg
          v-if="index == 0"
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
          v-if="index == 1"
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
          v-if="index == 2"
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
const datenschutz = ref(false);
const info = ref(false);
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
}
.home-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .info-button {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-family: "Rosart", serif;
    font-size: $text;
    cursor: pointer;
  }
  .datenschutz {
    position: absolute;
    left: -50rem;
    transition: left 1s ease;
    z-index: 5;
    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: transparent;
      border: none;
      font-family: "Rosart", serif;
      font-size: 3rem;
      cursor: pointer;
      z-index: 7;
    }
    &.open {
      left: 50rem;
    }
  }
  .info {
    position: absolute;
    right: -70rem;
    transition: right 1s ease;
    z-index: 5;
    box-shadow: 10px 10px 50px #000000;
    width: 50vw;
    height: 100vh;
    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: transparent;
      border: none;
      font-family: "Rosart", serif;
      font-size: 3rem;
      cursor: pointer;
      z-index: 7;
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
    }
    &.open {
      right: 0rem;
    }
  }
}
.navi-wrapper {
  height: calc(100vh - 7rem);
  .navigatior-wrapper {
    position: relative;
    height: 15rem;
    width: 60rem;
    position: absolute;
    animation: moveRight 30s linear infinite alternate;
    &:hover {
      svg {
        .cls-1 {
          fill: var(--c);
        }
      }
    }
    &:nth-child(1) {
      top: 20vh;
      z-index: 4;
    }
    &:nth-child(2) {
      top: 40vh;
      left: 40rem;
      z-index: 3;
      animation: moveLeft 28s linear infinite alternate;
    }
    &:nth-child(3) {
      top: 60vh;
      left: 0rem;
      animation: moveRight 34s linear infinite alternate 1s;
    }
    & svg {
      position: absolute;
      width: 60rem;
      top: 0;
      -webkit-filter: drop-shadow(0px 3px 6px #00000029);
      filter: drop-shadow(0px 3px 6px #00000029);
      .cls-1 {
        fill: white;
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
      left: 47%;
      top: 6rem;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
    }
  }
}
</style>
