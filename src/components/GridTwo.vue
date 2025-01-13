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
      width: 9rem;
      height: 9rem;
      &.landscape {
        height: 100%;
      }
      &.portrait {
        img {
          width: 100%;
        }
      }
    }
    &.medium {
      height: 25rem;
      width: 25rem;
      &.landscape {
        img {
          width: 100%;
        }
      }
      &.portrait {
        img {
          height: 100%;
        }
      }
    }
    &.large {
      height: 40rem;
      width: 40rem;
      &.landscape {
        img {
          width: 100%;
        }
      }
      &.portrait {
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
