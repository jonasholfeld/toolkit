<template>
  <h1 :class="[props.slug, isOpen ? 'open' : '']">{{ pagedata.title }}</h1>
  <div class="info-section">
    <div
      v-for="block in pagedata.blocks"
      :key="block.id"
      class="single-info"
      v-html="block"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  pagedata: Object,
  childIndex: Number,
  slug: String,
  isOpen: Boolean,
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  margin-bottom: 1rem;
  position: sticky;
  top: 0rem;
  background-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  background-color: white;
  @include mobile {
    font-size: $mobileBigSize !important;
    text-decoration: none;
    &.impressum,
    &.privatsphare {
      //   padding-top: 0;
      //   line-height: 1;
      background-color: black;
      color: white;
      &.open {
        color: black;
        padding-top: 0.5rem;
        line-height: 1.2;
      }
    }
  }
}
* {
  font-size: 1rem;
  @include mobile {
    font-size: 4rem;
  }
}
</style>
