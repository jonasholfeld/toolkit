<template>
  <div
    :key="props.text.uri"
    ref="singletext"
    class="single-text"
    :style="{
      '--ac': color,
    }"
    :class="{ showcross: currentmode == 'ausblenden' }"
  >
    <div
      ref="link"
      class="link"
      :class="{ invert: props.invert, active: props.active }"
      event=""
      @mousedown="startDrag"
      @click="preventClickIfDragged($event)"
      v-html="text.title + cross"
    ></div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

import { defineEmits, nextTick, onMounted, onUnmounted, ref } from "vue";

const link = ref(null);
const singletext = ref(null);
const cross = '<div class="cross">x</div>';

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let startX = 0;
let startY = 0;
let hasMoved = false; // Flag to track movement
const props = defineProps({
  text: Object,
  color: String,
  activeCategory: String,
  invert: Boolean,
  active: Boolean,
  dontFireClick: Boolean,
  currentmode: String,
  textZindex: Number,
});

const router = useRouter();

const vw = window.innerWidth * 0.01;
const textMarginVertical = 0.6;
const textMarginHorizontal = 0.6;

const emit = defineEmits(["resetAll", "clicked"]);
const resizeTimeout = null;

const updateSize = () => {
  console.log("update size");
  nextTick(() => {
    setTimeout(() => {
      if (singletext.value) {
        const child = singletext.value.querySelector(".link");
        const p = child.querySelector("p");
        if (child) {
          const childWidth = (child.offsetWidth / window.innerWidth) * 100;
          const childHeight = (child.offsetHeight / window.innerWidth) * 100;
          singletext.value.style.width = `${
            childWidth + textMarginHorizontal
          }rem`;
          singletext.value.style.height = `${
            childHeight + textMarginVertical
          }rem`;
          child.style.width = `${childWidth}rem`;
          child.style.height = `${childHeight}rem`;
        }
      }
    }, 10);
  });
};

const updateParents = () => {
  console.log("update parents");
  nextTick(() => {
    setTimeout(() => {
      if (singletext.value) {
        const child = singletext.value.querySelector(".link");
        const p = child.querySelector("p");
        if (child) {
          const childWidth = (child.offsetWidth / window.innerWidth) * 100;
          const childHeight = (child.offsetHeight / window.innerWidth) * 100;
          singletext.value.style.width = `${
            childWidth + textMarginHorizontal
          }rem`;
          singletext.value.style.height = `${
            childHeight + textMarginVertical
          }rem`;
        }
      }
    }, 10);
  });
};

const handleResize = () => {
  updateSize();
};

onMounted(() => {
  updateParents();
  setTimeout(() => {
    updateSize();
  }, 1000);
  setTimeout(() => {
    updateSize();
  }, 2000);
});

onUnmounted(() => {
  //   window.removeEventListener("resize", handleResize);
});

const startDrag = (event) => {
  emit("clicked");
  event.preventDefault();
  isDragging = true;
  hasMoved = false; // Reset movement flag
  if (props.dontFireClick) {
    isDragging = false;
  }

  const child = singletext.value.querySelector(".link");
  const rect = child.getBoundingClientRect();
  child.style.zIndex = props.textZindex;
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
  startX = event.clientX;
  startY = event.clientY;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (event) => {
  if (!isDragging) return;

  const child = singletext.value.querySelector(".link");
  const parentRect = singletext.value.getBoundingClientRect();
  const x = event.clientX - parentRect.left - offsetX;
  const y = event.clientY - parentRect.top - offsetY;

  // Check if movement exceeds 3px
  if (
    Math.abs(event.clientX - startX) > 3 ||
    Math.abs(event.clientY - startY) > 3
  ) {
    hasMoved = true;
    console.log("has moved!");
  }

  child.style.left = `${x}px`;
  child.style.top = `${y}px`;
  child.style.zIndex = props.textZindex;
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  const child = singletext.value.querySelector(".link");
};

// Prevent click if the link was dragged more than 3px
const preventClickIfDragged = (event) => {
  if (hasMoved || props.dontFireClick) {
    event.preventDefault();
  } else {
    router.push("/" + props.text.uri);
    emit("resetAll");
  }
};

defineExpose({
  resetPosition: () => {
    const child = singletext.value.querySelector(".link");
    console.log(child);
    if (child) {
      child.style.transition = "left 0.5s ease, top 0.5s ease";
      child.style.left = "0px";
      child.style.top = "0px";
      setTimeout(() => {
        child.style.transition = "";
      }, 1000);
    }
  },
});
</script>

<style lang="scss">
.single-text {
  position: relative;
  white-space: nowrap;
  position: relative;
  &.showcross:not(.open) {
    &:hover {
      .link {
        .cross {
          opacity: 1;
          z-index: 4;
          left: 50%;
          color: black;
        }
        color: $darkergray;
        background-color: $darkergray !important;
      }
    }
  }
  &.hidden {
    opacity: 0;
  }
  &.halfhidden {
    opacity: 0.5;
    .link {
      background-color: grey;
    }
  }
  &.active,
  &.open {
    .link {
      background-color: var(--ac);
      &.invert {
        color: white;
      }
    }
  }
  &.open {
    .link:hover {
      font-style: normal !important;
      cursor: default !important;
    }
  }
  .link {
    margin-bottom: 0.5rem;
    margin: 0.2rem;
    max-width: 30rem;
    position: absolute;
    padding: 0.7rem 1.5rem;
    display: block;
    border-radius: 2rem;
    background-color: white;
    text-align: center;
    line-height: 1;
    box-shadow: 0px 3px 6px #00000029;
    max-width: 30rem;
    min-height: 2.4rem;
    p {
      margin: 0;
    }
    .cross {
      opacity: 0;
      position: absolute;
      top: 0.5rem;
    }
    cursor: pointer;
    &:hover {
      background-color: var(--ac);
      font-style: italic;
      &.invert {
        color: white;
      }
    }
    &.active {
      background-color: var(--ac);
      &.invert {
        color: white;
      }
    }
  }
}
</style>
