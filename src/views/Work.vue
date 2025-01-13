<template>
  <div class="page-wrapper">
    <div class="close-work" @click="goBack">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 43 43"
        width="40"
        height="40"
      >
        <g>
          <g id="Ebene_1">
            <g id="Ebene_1-2" data-name="Ebene_1">
              <path
                class="cls-2"
                d="M21.5,42C10.2,42,1,32.8,1,21.5S10.2,1,21.5,1s20.5,9.2,20.5,20.5-9.2,20.5-20.5,20.5"
              />
              <line class="cls-1" x1="12" y1="21.5" x2="31" y2="21.5" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="overlay" @click="goBack"></div>
    <button @click="toggleInfoSection">Information</button>
    <div class="image-wrapper" @click="eventuallyToggleInfoSection">
      <figure :class="page.coverimageRatio > 1.1 ? 'landscape' : 'portrait'">
        <img id="current-image" :src="page.coverimage" />
      </figure>
    </div>
    <div class="spacer"></div>
    <div
      v-show="showInfo"
      ref="infoSection"
      class="info-section-work"
      :style="{
        top: `${position.y}px`,
        left: `${position.x}px`,
        '--bgcolor': page.color,
        'max-width': infoMaxWidth(),
      }"
      @mousedown="startDrag"
      @touchstart="startTouch"
    >
      <div class="close-me-mobile" @click="toggleInfoSection">
        <svg
          id="Ebene_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 28 28"
          style="enable-background: new 0 0 28 28"
          xml:space="preserve"
        >
          <line class="st0" x1="4.1" y1="4.1" x2="23.9" y2="23.9" />
          <line class="st0" x1="23.9" y1="4.1" x2="4.1" y2="23.9" />
        </svg>
      </div>
      <h1 ref="title">{{ page.title }}</h1>
      <div v-kirbytext class="infofield" v-html="page.infofield"></div>
      <div v-kirbytext class="ratio" v-html="page.ratio"></div>
      <div v-kirbytext class="year" v-html="page.year"></div>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, nextTick, onMounted, ref } from "vue";
import { usePage } from "~/composables";

const page = usePage();
console.log(page);
const position = ref({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // Initial position for info-section
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const showInfo = ref(false);
const title = ref(null);
const infoSection = ref(null);
defineExpose({ title, infoSection });

async function eventuallyToggleInfoSection() {
  if (showInfo.value) {
    showInfo.value = false;
  }
}

async function toggleInfoSection() {
  showInfo.value = !showInfo.value;
  console.log("hi");
  if (showInfo.value) {
    await nextTick();
    const titleWidth = title.value.getBoundingClientRect().width;
    const maxWidth = parseFloat(infoMaxWidth());
    if (titleWidth > maxWidth) {
      title.value.style.whiteSpace = "break-spaces";
      infoSection.value.style.width = infoMaxWidth();
    }
  }
}

function infoMaxWidth() {
  return document.getElementById("current-image")?.offsetWidth + "px";
}

function goBack() {
  history.back();
}

function startTouch(event) {
  isDragging.value = true;
  dragOffset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  };
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", stopDrag);
}

function startDrag(event) {
  isDragging.value = true;
  dragOffset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(event) {
  if (isDragging.value) {
    position.value = {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y,
    };
  }
}

function stopDrag() {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

console.log(page);
</script>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  width: 98rem;
  height: calc(100vh - 2rem);
  align-items: flex-end;
  @include mobile {
    height: calc(100svh - 6rem);
    width: 94rem;
  }
  cursor: url("/assets/images/Minus_groß_1.svg"), auto;
  @include mobile {
    cursor: default;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    @include mobile {
      display: none;
    }
  }
  .spacer {
    flex: 10rem 0 0;
    @include mobile {
      display: none;
    }
  }
  button {
    border: none;
    background-color: transparent;
    font-family: Rhetorik;
    flex: 10rem 0 0;
    font-size: 1.7rem;
    z-index: 300;
    padding: 0;
    display: flex;
    align-items: flex-end;
    line-height: 0.6;
    @include mobile {
      font-size: $mobileBigSize;
      position: fixed;
      left: 50vw;
      bottom: 6rem;
      transform: translateX(-50%);
      z-index: 0;
      color: black;
    }
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
    }
  }
  .image-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    figure {
      margin: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      @include mobile {
        align-items: center;
      }
      img {
        ////box-shadow: 0px 3px 6px #00000029;
      }
      &.landscape {
        align-items: center;
        img {
          width: 100%;
          max-height: calc(100vh - 2rem);
          object-fit: contain;
          @include mobile {
            width: 100%;
          }
        }
      }
      &.portrait {
        @include mobile {
          padding: 20rem 0;
        }
        img {
          height: 100%;
          //   width: 100%;

          object-fit: contain;
          @include mobile {
            max-width: 100%;
            max-height: 100%;
            height: unset;
            object-fit: unset;
          }
        }
      }
    }
  }
  .info-section-work {
    position: absolute;
    border: 1px solid black;
    background-color: white;
    border-radius: 5rem;
    text-align: center;
    padding: 2rem;
    font-size: 1.7rem;
    transform: translate(-50%, -50%);
    min-width: min-content;
    @include mobile {
      font-size: $mobileSmallSize;
      position: fixed;
      bottom: 2rem;
      //   top: unset !important;
      height: fit-content;
      transform: translate(-50%, -50%);
      background-color: white;
      z-index: 10;
      width: 94rem !important;
      z-index: 100;
    }
    p {
      margin: 0;
    }
    .close-me-mobile {
      display: none;
      @include mobile {
        display: none;
        position: absolute;
        top: -1.4rem;
        right: 3.5rem;
        font-size: 8rem;
        z-index: 200;
        svg {
          width: 5rem;
          height: 5rem;
          .st0 {
            fill: none;
            stroke: #1d1d1b;
            stroke-miterlimit: 10;
          }
        }
      }
    }
    &:hover {
      background-color: var(--bgcolor);
    }
    cursor: grab;
    * {
      font-size: 1.7rem;
      @include mobile {
        font-size: 3.4rem;
      }
    }
    h1 {
      font-style: italic;
      white-space: nowrap;
    }
    &:active {
      cursor: grabbing;
    }
  }
}
.close-work {
  display: none;
  position: absolute;
  top: 3rem;
  right: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 3rem;
  height: 6rem;
  @include mobile {
    display: block;
    cursor: pointer;
  }
  svg {
    width: 10rem;
    height: 10rem;
    .cls-1 {
      fill: none;
    }

    .cls-1,
    .cls-2 {
      stroke: #1d1d1b;
      stroke-miterlimit: 10;
    }

    .cls-2 {
      fill: #fff;
    }
  }
  .st0 {
    fill: #ffffff;
  }
  .st1 {
    fill: #1d1d1b;
  }
  .st2 {
    fill: none;
    stroke: #1d1d1b;
    stroke-width: 2;
    stroke-miterlimit: 10;
  }
}
</style>
