<template>
  <div class="home-wrapper">
    <h1>{{ site.title }}</h1>
    <div
      class="home-navigation"
      :style="
        '--workcolor: ' +
        site.works.color +
        '; --infocolor: ' +
        site.information.color
      "
    >
      <div class="works nav-container">
        <HomeNavLink
          key="work_button"
          :ref="(el) => (works[0] = el)"
          :previous="previousWorks[0]"
          :next="nextWorks[0]"
          :index="0"
          :color="site.works.color"
          :title="'Arbeiten'"
          :work-or-info="'work'"
          class="button_show_works"
          :globalis-initial-chain-move="isInitialChainMove"
          :show="true"
          :class="{ active: showWorks }"
          @dragging="onChildDrag"
          @click="showHideWorkButtons()"
        >
        </HomeNavLink>
        <HomeNavLink
          v-for="(child, index) in site.works.children.filter(
            (child) => child.template === 'workcategory'
          )"
          :key="child.id"
          :ref="(el) => (works[index + 1] = el)"
          :current="child"
          :previous="previousWorks[index + 1]"
          :next="nextWorks[index + 1]"
          :index="index + 1"
          :color="site.works.color"
          :title="child.title"
          :work-or-info="'work'"
          :globalis-initial-chain-move="isInitialChainMove"
          :global-drag-x="globalDragX"
          :current-chain="currentChain"
          class="single-work single-container"
          :show="showWorks"
          :url="child.uri"
          @dragging="onChildDrag"
        >
        </HomeNavLink>
      </div>
      <div class="information nav-container">
        <HomeNavLink
          key="info_button"
          :ref="(el) => (infos[0] = el)"
          :previous="previousInfos[0]"
          :next="nextInfos[0]"
          :index="0"
          :color="site.information.color"
          :title="'Informationen'"
          :work-or-info="'info'"
          class="button_show_infos"
          :globalis-initial-chain-move="isInitialChainMove"
          :show="true"
          :class="{ active: showInfos }"
          @click="showHideInfos()"
          @dragging="onChildDrag"
        >
        </HomeNavLink>
        <HomeNavLink
          v-for="(child, index) in site.information.children.filter(
            (child) =>
              child.template === 'information' &&
              child.uri != 'information/privatsphare' &&
              child.uri != 'information/impressum'
          )"
          :key="child.id"
          :ref="(el) => (infos[index + 1] = el)"
          :work-or-info="'info'"
          :current="child"
          :previous="previousInfos[index + 1]"
          :next="nextInfos[index + 1]"
          :index="index + 1"
          :global-drag-x="globalDragX"
          :globalis-initial-chain-move="isInitialChainMove"
          :color="site.information.color"
          :title="child.title"
          :current-chain="currentChain"
          class="single-work single-container"
          :show="showInfos"
          :url="child.uri"
          @dragging="onChildDrag"
        >
        </HomeNavLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useSite } from "~/composables";
import { useRoute } from "vue-router";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import HomeNavLink from "./../components/HomeNavLink.vue";

export default {
  setup() {
    const works = [];
    const infos = [];
    const previousWorks = ref([]);
    const nextWorks = ref([]);
    const previousInfos = ref([]);
    const nextInfos = ref([]);
    const updateWorks = () => {
      previousWorks.value = works.map((el, index) => {
        if (index > 0 && works[index - 1]) {
          return works[index - 1].$el.children[0];
        } else if (index == 0) {
          return works[1].$el.children[0];
        }
        return null;
      });
      nextWorks.value = works.map((el, index) => {
        if (works[index + 1]) {
          return works[index + 1].$el.children[0];
        } else {
          return works[index].$el.children[0];
        }
        return null;
      });
    };
    const updateInfos = () => {
      previousInfos.value = infos.map((el, index) => {
        if (index > 0 && infos[index - 1]) {
          return infos[index - 1].$el.children[0];
        } else if (index == 0) {
          return infos[1].$el.children[0];
        }
        return null;
      });
      nextInfos.value = infos.map((el, index) => {
        if (infos[index + 1]) {
          return infos[index + 1].$el.children[0];
        } else {
          return infos[index].$el.children[0];
        }
        return null;
      });
    };
    onMounted(async () => {
      await nextTick(); // Ensure refs are populated
      updateWorks();
      updateInfos();
      //console.log(useSite());
    });
    return {
      site: useSite(),
      previousWorks,
      nextWorks,
      previousInfos,
      nextInfos,
      works,
      infos,
      route: useRoute(),
      showWorks: ref(false),
      showInfos: ref(false),
      globalDragX: ref(0),
      isInitialChainMove: ref(false),
      currentChain: ref(""),
    };
  },
  methods: {
    onChildDrag(deltaX, isInitialChainMove, workOrInfo) {
      this.globalDragX = deltaX;
      this.isInitialChainMove = isInitialChainMove;
      this.currentChain = workOrInfo;
    },
    showHideInfos() {
      //console.log("hiiii");
      this.showInfos = !this.showInfos;
    },
    showHideWorkButtons() {
      //console.log("hiiii");
      this.showWorks = !this.showWorks;
    },
  },
};
</script>

<style lang="scss">
.home-wrapper {
  height: 100%;
  h1 {
    width: 100%;
    text-align: center;
    font-style: italic;
    @include mobile {
      font-size: $mobileBigSize;
    }
  }
  .home-navigation {
    display: flex;
    justify-content: center;
    margin-top: 10rem;
    @include mobile {
      flex-direction: column;
      height: calc(100vh - 20rem);
    }
    .works {
      @include mobile {
        background-color: var(--workcolor);
      }
    }
    .information {
      @include mobile {
        background-color: var(--infocolor);
      }
    }
  }
  .button_show_works,
  .button_show_infos {
    z-index: 100;
    &:hover {
      text-decoration: underline;
    }
  }
  .nav-container {
    width: 50rem;
    .single-container {
      width: 50rem;
      text-align: center;
    }
    .single-work {
      //   height: 0;
      //   overflow: hidden;
      transition: height 0.5s ease-in-out, width 0.5s ease-in-out,
        transform 0.5s ease-in-out;
      //   width: 0;
      &.show {
        // height: 4.85rem;
        // width: 50rem;
      }
    }
  }
}
</style>
