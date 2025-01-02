<template>
  <div class="works-wrapper">
    <router-link
      v-for="work in works"
      :key="work.uri"
      class="single-work"
      :to="'/' + work.uri"
      :class="work.size"
    >
      <figure>
        <img :src="work.thumbnail" />
      </figure>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  works: Array,
});
</script>

<style scoped lang="scss">
.works-wrapper {
  display: flex;
  flex-wrap: wrap;
  .single-work {
    // height: calc(94.5rem / 2);
    // outline: 1px solid lightblue;
    &.small {
      width: 18.35rem;
      img {
        object-position: top;
      }
    }
    &.medium {
      width: 25rem;
      img {
        object-position: top;
        box-shadow: 0px 3px 6px #00000029;
        height: unset;
        object-fit: unset;
      }
    }
    &.large {
      width: 45rem;
      img {
        object-position: top;
        box-shadow: 0px 3px 6px #00000029;
        height: unset;
        object-fit: unset;
      }
    }
    figure {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-shadow: 0px 3px 6px #00000029;
        height: unset;
        object-fit: unset;
      }
    }
  }
}
</style>
