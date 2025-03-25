<template>
  <Announcer />
  <div id="page" class="page" :class="{ home: route.path == '/' }">
    <router-view v-slot="{ Component }">
      <keep-alive include="Workcategory,Home">
        <component
          :is="Component"
          :key="shouldUpdateComponent ? $route.path : '/information/static'"
        />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useSite } from "~/composables";

const route = useRoute();
const site = useSite();
</script>

<style scoped lang="scss">
.page {
  margin: 0;
  padding: 0;
  min-height: 100dvh;
  width: 100vw;
  @include mobile {
    overscroll-behavior: none;
    height: 100svh;
    overflow: scroll;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
