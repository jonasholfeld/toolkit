<template>
  <div class="inner-text-wrapper" :style="{ '--hc': page.color }">
    <div class="mobile-menu" @click="goBack">
      <span>Menü</span>
      <svg
        id="Ebene_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 226.77 85.04"
      >
        <path
          id="Pfad_152"
          d="m54.99,15.71h116.72c-11.56,5.2-19.25,14.45-19.25,24.98s7.73,19.82,19.34,25.02H55.07l-.08-50Z"
        />
      </svg>
    </div>
    <h2 v-if="page.category != 'Glossar'" v-html="page.title"></h2>
    <h2 v-if="page.category == 'Glossar'">Glossar</h2>
    <div class="author">{{ page.author }}</div>
    <div class="text-wrapper" v-html="page.text"></div>
    <div
      v-if="page.download != null"
      class="download-files"
      :class="page.download"
    >
      <a :href="page.download" download>Download PDF</a>
    </div>
    <div class="footnotes" v-html="page.footnotes"></div>
    <div class="mobile-menu bottom" @click="goBack">
      <span>Menü</span>
      <svg
        id="Ebene_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 226.77 85.04"
      >
        <path
          id="Pfad_157"
          d="m163.95,69.71H47.24c11.56-5.2,19.25-14.45,19.25-24.98s-7.73-19.82-19.34-25.02h116.72l.08,50Z"
        />
      </svg>
    </div>
  </div>
</template>
<script setup>
import { usePage } from "~/composables";
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const page = usePage();
console.log(page);
onMounted(() => {
  document
    .querySelector(".inner-text-wrapper")
    ?.addEventListener("click", navigate);
});

const goBack = () => {
  router.push("/" + page.parent);
};

onBeforeUnmount(() => {
  document
    .querySelector(".inner-text-wrapper")
    ?.removeEventListener("click", navigate);
});
function navigate(event) {
  const link = event.target.closest("a");

  if (
    link &&
    link.href.startsWith(origin) &&
    link.target !== "_blank" &&
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey
  ) {
    event.preventDefault();
    router.push({ path: link.href.slice(origin.length) });
  }
}
watch(page, () => {
  nextTick(() => {
    document.querySelectorAll(".text-wrapper a").forEach((link) => {
      if (link.hostname && link.hostname !== location.hostname) {
        link.setAttribute("target", "_blank");
      }
    });
    document.querySelectorAll(".glossar-wrapper").forEach((wrapper) => {
      wrapper.addEventListener("click", () => {
        const overflowWrapper = wrapper.querySelector(".overflow-wrapper");
        const innerWrapper = wrapper.querySelector(".inner-wrapper");
        if (overflowWrapper && innerWrapper) {
          if (wrapper.classList.contains("open")) {
            overflowWrapper.style.height = "0px";
            wrapper.classList.remove("open");
          } else {
            overflowWrapper.style.height = `${innerWrapper.offsetHeight}px`;
            wrapper.classList.add("open");
          }
        }
      });
    });
    if (!isMobile()) {
      document.querySelectorAll(".relateds-wrapper").forEach((wrapper) => {
        for (const item of wrapper.children) {
          console.log("wiiiiiiidth");
          item.style.width = `${item.offsetWidth}px`;
        }
      });
    }

    const wrapperToOpen = document.getElementById(page.slug);
    if (wrapperToOpen) {
      wrapperToOpen.click();
    }
  });
});
const isMobile = () => {
  return (
    getComputedStyle(document.body).getPropertyValue("--isMobile").trim() ===
    "true"
  );
};
onMounted(() => {});
</script>
<style lang="scss">
.inner-text-wrapper {
  background-color: white;
  padding: 1rem 3rem;
  height: 100vh;
  overflow: scroll;
  scroll-behavior: smooth;
  box-shadow: 10px 10px 10px #00000033;
  position: absolute;
  top: 0;
  right: 0;
  width: 50rem;
  font-size: $text;
  line-height: 1.1;
  .mobile-menu {
    display: none;
    @include mobile {
      display: block;
      width: 100%;
      height: 10rem;
      position: relative;
      margin-top: 8rem;
      margin-bottom: 8rem;
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 3;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
      }
      &.bottom {
        margin-bottom: 8rem;
        svg {
          top: -3.57rem !important;
          left: 18.5rem !important;
        }
      }
      svg {
        position: absolute;
        top: -2.57rem !important;
        left: 20.5rem !important;
        height: 17.08rem !important;
        width: 58rem !important;
        -webkit-filter: drop-shadow(0px 3px 6px #00000029);
        filter: drop-shadow(0px 3px 6px #00000029);
        path {
          fill: $lightgray !important;
        }
      }
    }
  }
  h2,
  h3 {
    text-transform: uppercase;
    font-size: $text;
    text-align: center;
    margin-bottom: 1rem;
    @include mobile {
      font-size: $textmobile;
      margin-bottom: $textmobile;
    }
  }
  .author {
    text-align: center;
    font-style: italic;
    margin-bottom: $text;
  }
}
</style>
