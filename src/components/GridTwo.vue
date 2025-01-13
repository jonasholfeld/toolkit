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
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.small {
      &.landscape {
        max-width: 18.35rem;
        height: 9rem;
      }
      &.portrait {
        height: 9rem;
        img {
          height: 100%;
        }
      }
    }
    &.medium {
      &.landscape {
        height: 25rem;
        img {
          width: 100%;
        }
      }
      &.portrait {
        height: 25rem;
        img {
          height: 100%;
        }
      }
    }
    &.large {
      &.landscape {
        height: 40rem;
        img {
          width: 100%;
        }
      }
      &.portrait {
        height: 40rem;
        img {
          height: 100%;
        }
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
        //box-shadow: 0px 3px 6px #00000029;
      }
    }
  }
}
</style>
