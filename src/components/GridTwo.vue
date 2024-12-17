<template>
  <div class="works-wrapper">
    <router-link
      class="single-work"
      v-for="work in works"
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
      width: 12rem;
      img {
        object-position: top;
      }
    }
    &.medium {
      width: 25rem;
      img {
        object-position: top;
      }
    }
    &.large {
      width: 45rem;
      img {
        object-position: top;
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
      }
    }
  }
}
</style>
