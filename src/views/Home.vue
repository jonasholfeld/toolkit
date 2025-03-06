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
          <path
            id="Pfad_142-2"
            class="cls-1"
            :style="{ '--c': project.color }"
            d="m930.27,17.39v27.87h-27.87v25.88h-27.79v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v25.88h-27.69v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v26.12h-.01v-.13h-27.86v-26.13h-27.62v-27.62h-167.44v27.87h-27.87v26.12h-27.86v167.2h27.86v27.86h27.87v27.87h167.44v-28.12h27.62v-27.86h.01v.14h27.86v27.87h27.87v27.86h167.44v-28.11h27.62v-27.62h27.69v27.87h27.87v27.86h167.44v-28.11h27.62v-27.62h27.79v27.87h27.87v27.86h167.45v-28.11h27.61v-27.87h27.87V71.14h-27.87v-26.13h-27.61v-27.62h-167.45Z"
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
      bottom: 1rem;
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
    transition: right 1s ease;
    z-index: 5;
    box-shadow: 10px 10px 50px #000000;
    width: 50vw;
    height: 100vh;
    @include mobile {
      width: 100vw;
      right: -110rem;
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
      top: 17vh;
      z-index: 4;
    }
    &:nth-child(2) {
      top: 42vh;
      left: 40rem;
      z-index: 3;
      animation: moveLeft 28s linear infinite alternate;
      @include mobile {
        animation: moveDown 4s linear infinite alternate !important;
        span {
        }
      }
    }
    &:nth-child(3) {
      top: 67vh;
      left: 0rem;
      animation: moveRight 34s linear infinite alternate 1s;
      @include mobile {
        animation: moveUp 5s linear infinite alternate !important;
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
      left: 49%;
      top: 7rem;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
      @include mobile {
        font-size: $textmobile;
        width: 100vw;
        top: 11rem;
      }
    }
  }
}
</style>
