<template>
  <div class="mobile-menu">
    <transition name="slide">
      <div v-if="store.mobileMenuOpen" class="inner-menu">
        <div
          v-for="page in site.children.filter((page) => page.isListed)"
          :key="page.uri"
          class="single-nav-link-wrapper"
          @click="store.mobileMenuOpen = !store.mobileMenuOpen"
        >
          <router-link :to="`/${page.uri}`">
            {{ page.title }}
          </router-link>
        </div>
      </div>
    </transition>
    <div class="menu-button-wrapper">
      <button @click="store.mobileMenuOpen = !store.mobileMenuOpen">
        <div v-if="!store.mobileMenuOpen" class="open">menu</div>
        <div v-if="store.mobileMenuOpen" class="close">close</div>
      </button>
    </div>
  </div>
</template>

<script>
import { useSite } from "~/composables";
import { store } from "~/modules/store.js";
export default {
  setup() {
    return {
      site: useSite(),
      store: store,
    };
  },
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>

<style lang="scss">
.slide-enter-active {
  transition: all 0.5s ease;
  transform: translateY(100%);
}

.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave {
  transform: translateY(0);
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
.mobile-menu {
  position: fixed;
  bottom: 0rem;
  left: 0rem;
  z-index: 2;
  width: 100vw;
  background-color: white;
  display: none;
  @include mobile {
    display: block;
  }
  .menu-button-wrapper {
    z-index: 800;
    button {
      all: unset;
      text-align: center;
      width: 100%;
      border-top: 2px solid;
      padding: 2rem;
      background-color: white;
      z-index: 3;
      position: relative;
      height: 9rem;
      .open {
        @include contenttitle;
      }
      .close {
        @include smallserif;
        font-size: 7rem;
      }
    }
  }
  .inner-menu {
    height: auto;
    overflow: hidden;
    position: absolute;
    bottom: 13rem;
    z-index: 2;
    background-color: white;
    width: 100vw;
    .single-nav-link-wrapper {
      z-index: 2;
      width: 100%;
      border-top: 2px solid;
      padding: 2rem;
      @include contenttitle;
      text-align: center;
      text-transform: lowercase;
      a {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
