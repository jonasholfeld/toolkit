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
          console.log(item);
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
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
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
        margin-bottom: 30rem;
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
    }
  }
  .author {
    text-align: center;
    font-style: italic;
    margin-bottom: $text;
  }
}
</style>
