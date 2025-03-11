<template>
  <div class="inner-text-wrapper">
    <div class="home-button top" @click="emit('closeInfo')">
      <a>
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
      </a>
    </div>
    <h2 v-html="page.title"></h2>
    <div class="text-wrapper" v-html="page.text"></div>
    <h2 class="da" v-html="dp.title"></h2>
    <div class="da text-wrapper" v-html="dp.text"></div>
    <div class="footnotes" v-html="page.footnotes"></div>
    <div class="home-button" @click="emit('closeInfo')">
      <a>
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
      </a>
    </div>
  </div>
</template>
<script setup>
import { usePage } from "~/composables";
import { defineEmits, nextTick, onMounted, watch } from "vue";
const page = usePage("info");
const dp = usePage("datenschutz-impressum");
const emit = defineEmits(["closeInfo"]);
</script>
<style lang="scss">
.inner-text-wrapper {
  background-color: white;
  padding: 1rem 3rem;
  height: 100vh;
  overflow: scroll;
  scroll-behavior: smooth;
  box-shadow: 10px 10px 10px #00000033;
  position: absolute;
  top: 0;
  right: 0;
  width: 50rem;
  font-size: $text;
  line-height: 1.1;
  @include noscroll;
  @include mobile {
    padding: 0 3rem !important;
    width: 100vw !important;
  }
  .da {
    display: none;
    @include mobile {
      display: block;
    }
  }
  h2,
  h3 {
    text-transform: uppercase;
    font-size: $text;
    text-align: center;
    margin-bottom: 1rem;
  }
  .author {
    text-align: center;
    font-style: italic;
    margin-bottom: $text;
  }
  .home-button {
    background-color: transparent;
    position: relative;
    box-shadow: none;
    margin-left: 1rem;
    height: 11rem;
    display: none;
    @include mobile {
      display: block;
      margin: 4rem 0;
      &:first-child {
        svg {
          transform: translateX(-2rem);
        }
      }
      &:last-child {
        svg {
          transform: rotate(180deg) translateX(-2rem);
        }
      }
      a {
        display: block;
      }
      a > p {
        background-color: transparent !important;
        box-shadow: none;
        //   color: white;
        color: black;
        text-align: center;
        z-index: 5;
        position: relative;
        padding-top: 4rem;
        padding-left: 3rem;
        text-transform: uppercase;
      }
      svg {
        top: -2.37rem !important;
        left: 27rem !important;
        height: 17.08rem !important;
        width: 43rem !important;
        path {
          // fill: #2b2b2e !important;
          fill: #e8e4e4 !important;
        }
      }
      &.top {
        svg {
          -webkit-filter: drop-shadow(0px 5px 6px #00000029) !important;
          filter: drop-shadow(0px 3px 6px #00000029) !important;
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
      -webkit-filter: drop-shadow(0px -5px 6px #00000029);
      filter: drop-shadow(0px 3px -6px #00000029);
      path {
        fill: white;
      }
    }
  }
}
</style>
