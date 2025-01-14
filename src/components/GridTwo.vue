<template>
  <div class="works-wrapper">
    <router-link
      v-for="work in works"
      :key="work.uri"
      class="single-work"
      :to="'/' + work.uri"
      :class="[work.size, work.ratio > 1 ? 'landscape' : 'portrait']"
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
    &.small {
      &.landscape {
        img {
          height: 9rem;
          width: auto;
        }
      }
      &.portrait {
        img {
          width: 9rem;
          height: auto;
        }
      }
    }
    &.medium {
      &.landscape {
        img {
          width: 25rem;
          height: auto;
        }
      }
      &.portrait {
        img {
          height: 25rem;
          width: auto;
        }
      }
    }
    &.large {
      &.landscape {
        img {
          width: 40rem;
          height: auto;
        }
      }
      &.portrait {
        img {
          height: 40rem;
          width: auto;
        }
      }
    }
    figure {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        //box-shadow: 0px 3px 6px #00000029;
      }
    }
  }
}
</style>
