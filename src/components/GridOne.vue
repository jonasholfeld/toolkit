<template>
  <div class="works-wrapper">
    <router-link
      v-for="work in works"
      :key="work.uri"
      class="single-work"
      :to="'/' + work.uri"
    >
      <figure :class="[work.ratio > 1 ? 'landscape' : 'portrait']">
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
  @include mobile {
    gap: 3rem;
  }
  .single-work {
    width: calc(94.5rem / 5.15);
    height: calc(94.5rem / 5.15);
    @include mobile {
      width: calc(85rem / 3);
      height: calc(94rem / 3);
    }
    figure {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      @include mobile {
        padding: 0;
      }
      img {
        //box-shadow: 0px 3px 6px #00000029;
      }
      &.landscape {
        img {
          width: 100%;
          height: auto;
        }
      }
      &.portrait {
        img {
          height: 100%;
          width: auto;
        }
      }
    }
  }
}
</style>
