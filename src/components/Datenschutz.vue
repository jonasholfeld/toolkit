<template>
  <div class="inner-text-wrapper">
    <h2 v-html="page.title"></h2>
    <div class="text-wrapper" v-html="page.text"></div>
    <div class="footnotes" v-html="page.footnotes"></div>
  </div>
</template>
<script setup>
import { usePage } from "~/composables";
import { nextTick, onMounted, watch } from "vue";
const page = usePage("datenschutz-impressum");
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
}
</style>
