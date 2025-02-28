<template>
  <div class="inner-text-wrapper" :style="{ '--hc': page.color }">
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
  </div>
</template>
<script setup>
import { usePage } from "~/composables";
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const page = usePage();
onMounted(() => {
  document
    .querySelector(".inner-text-wrapper")
    ?.addEventListener("click", navigate);
});

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
    document.querySelectorAll(".relateds-wrapper").forEach((wrapper) => {
      console.log(wrapper.children);
      for (const item of wrapper.children) {
        console.log(item);
        item.style.width = `${item.offsetWidth}px`;
      }
    });
    const wrapperToOpen = document.getElementById(page.slug);
    if (wrapperToOpen) {
      wrapperToOpen.click();
    }
  });
});
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
  h2,
  h3 {
    text-transform: uppercase;
    font-size: $text;
    text-align: center;
    margin-bottom: 1rem;
  }
  .author {
    text-align: center;
    font-style: italic;
    margin-bottom: $text;
  }
}
</style>
