<template>
  <Announcer />
  <div class="page" :class="{ home: route.path == '/' }">
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
import MobileMenu from "./components/MobileMenu.vue";
import { store } from "~/modules/store.js";
import { ref } from "vue";
import { computed, watch } from "vue";

const route = useRoute();
const site = useSite();
const scrollContainer = ref("scrollContainer");
const showScrollUp = ref(false);

const shouldUpdateComponent = computed(() => {
  return !route.path.startsWith("/information/");
});

watch(route, () => {
  console.log(route.path.split("/")[1]);
  if (route.path.split("/")[1] == "information") {
    document.body.classList.add("info");
  } else {
    document.body.classList.remove("info");
  }
});
console.log(useSite());
</script>

<style scoped lang="scss">
.page {
  margin: 0;
  padding: 0;
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
