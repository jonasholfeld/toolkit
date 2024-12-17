<template>
  <header class="header">
    <div class="top-info-row">
        <div class="info-title">{{ site.infoheader }}</div>
        <div class="info-title mobile" v-if="route.path != '/'" ><router-link :to="`/`">{{ site.title }}</router-link></div>
        <div class="info-title-mobile-home" v-if="route.path == '/'">
            <h1>{{ site.title }}</h1>
            <h2>{{ site.subtitle }}</h2>
        </div>
        <div class="link-list-right">
            <router-link :to="`/impressum`" class="title-link">Impressum</router-link>
            <router-link :to="`/impressum`" class="title-link">Disclaimer</router-link>
            <a><img src="https://herumtreiber.jholfeld.uber.space/img/240906_Icons_IG.png"></a>
            <a><img src="https://herumtreiber.jholfeld.uber.space/img/240906_Icons-FB.png"></a>
        </div>
    </div>
    <nav id="menu" class="menu">
        <router-link :to="`/`" class="title-link">
            <div class="title-wrapper" :class="{ active: route.path == '/' }">
                <h1>{{ site.title }}</h1>
                <h2>{{ site.subtitle }}</h2>
            </div>
        </router-link>
        <div class="mobile-menu-closed" :class="{ show: !mobileMenuOpen, home: route.path == '/' }">
            <div class="page-title">
                <div class="indicator"></div>
                <div class="page-title-title">{{ pageTitle }}</div>
            </div>
            <div class="mobile-menu-expander" @click="mobileMenuOpen = true">MENÜ</div>
        </div>
        <div class="navigation" :class="{ show: mobileMenuOpen }" :style="parentStyle">
            <div class="inner-content-container" ref="content">
                <div class="close-menu-mobile" @click="mobileMenuOpen = false">×</div>
                    <div
                        v-for="page in site.children.filter((page) => page.isListed)"
                        :key="page.uri"
                        class="single-link"
                        :class="{ open: route.path.startsWith(`/${page.uri}`) }"
                    >
                        <router-link
                        :to="`/${page.uri}`"
                        :class="{
                            open: route.path.startsWith(`/${page.uri}`),
                        }"
                        >
                        <NaviLink
                            :pagetitle="page.title"
                            :active="route.path.startsWith(`/${page.uri}`)"
                            @click="mobileMenuOpen = false"
                        ></NaviLink>
                        </router-link>
                    </div>
                </div>
        </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePage } from "~/composables";
import { useSite } from "~/composables";
import NaviLink from "~/components/NaviLink.vue";
import { computed } from "vue";
import { store } from "~/modules/store.js";
import { ref, watch, onMounted, nextTick } from 'vue';

const site = useSite();
const route = useRoute();
const page = usePage(window.location.pathname);
const pageTitle = computed(() => route.meta.title || '');
const staticNavs = site.children
  .filter((page) => page.isListed)
  .map((page) => page.uri);
const mobileMenuOpen = ref(false);
const parentStyle = ref({ height: '0px' });
const content = ref(null);

// Watch for mobileMenuOpen changes to adjust height
watch(mobileMenuOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    const contentHeight = content.value.scrollHeight;
    parentStyle.value.height = `${contentHeight}px`;
  } else {
    parentStyle.value.height = '0px';
  }
});
// On component mount, check the initial state
onMounted(async () => {
  if (mobileMenuOpen.value) {
    await nextTick();
    const contentHeight = content.value.scrollHeight;
    parentStyle.value.height = `${contentHeight}px`;
  }
});
</script>

<style scoped lang="scss">
.header {
    color: $lilac;
    @include mobile {
        position: fixed;
        top: 0;
        left: 0;
        width: 100rem;
        background-color: white;
        z-index: 3;
        border-bottom: 1px solid $orange;
    }
    .top-info-row {
        color: $lilac;
        border-bottom: 1px solid $orange;
        @include workSans;
        display: flex;
        text-transform: uppercase;
        font-size: 1rem;
        padding: $generalMargin;
        @include mobile {
            padding: 2rem;
        }
        .info-title-mobile-home {
            display: none;
            @include mobile {
                display: block;
                color: $orange;
                h1 {
                    @include galaxieMedium;
                    font-size: 6rem;
                    width: 90%;
                }
                h2 {
                    font-family: LibreCaslon;
                    font-size: 6rem;
                    line-height: 1;
                    padding-top: 0.2rem;
                    text-transform: none;
                }
            }
        }
        .info-title {
            flex-grow: 1;
            @include mobile {
                display: none;
            }
            &.mobile {
                display: none;
                @include mobile {
                    display: block;
                    font-size: 3.5rem;
                    @include workSans;
                    font-weight: 600;
                    text-align: center;
                }
            }
        }
        .link-list-right {
            max-height: 1rem;
            display: flex;
            align-items: flex-end;
            transform: translateY(0.2rem);
            @include mobile {
                display: none;
            }
            a {
                padding-right: 1rem;
                &:last-child {
                    padding-right: 0;
                }
                img {
                    width: 1.5rem;
                    height: 1.5rem;
                    transform: translateY(0.3rem);
                }
            }
        }
    }
    .menu {
        padding: $generalMargin;
        display: flex;
        @include mobile {
            display: block;
            overflow: hidden;
            transition: height 1s ease;
            min-height: 10rem;
            .title-link {
                display: none;
            }
        }
        .title-wrapper {
            transition: color .5s ease;
            &.active {
                color: $orange;
            }
            h1 {
                @include galaxieMedium;
                font-size: 2rem;
            }
            h2 {
                font-family: LibreCaslon;
                font-size: 1.9rem;
                line-height: 1;
                padding-top: 0.2rem;
                width: 40rem;
            }
        }
        .mobile-menu-closed {
            display: none;
            @include mobile {
                flex-grow: 1;
                opacity: 0;
                height: 0;
                display: flex;
                transition: opacity 1s ease, display 0s ease 1s;
                padding-left: 2rem;
                &.show {
                    opacity: 1;
                }
                &.home {
                    display: flex;
                    justify-content: center;
                    .page-title {
                        display: none;
                    }
                }
                @include galaxieMedium;
                font-size: 7rem;
                width: 100%;
                .mobile-menu-expander {
                    padding-right: 3rem;
                }
                .page-title {
                    flex-grow: 1;
                    display: flex;
                    .page-title-title {
                        padding-left: 2rem;
                    }
                    .indicator {
                        width: 5.5rem;
                        height: 5.5rem;
                        border-radius: 5.5rem;
                        margin-top: 1.5rem;
                        margin-right: 1rem;
                        background-color: $orange;
                    }
                }
            }
        }
        .navigation {
            .inner-content-container {
                display: flex;
                flex-wrap: wrap;
                padding-left: 24rem;
                @include mobile {
                    padding-left: 2rem;
                    flex-direction: column;
                }
            }
            @include mobile {
                    flex-direction: column;
                position: relative;
                width: 100%;
                overflow: hidden;
                // transform: translateY(calc( -100% - 20rem ));
                transition: opacity .5s ease, height 1s ease;
                opacity: 0;
                &.show {
                    height: 100%;
                    overflow: hidden;
                    opacity: 1;
                    // transform: translateY(calc( 0% - 5rem ));
                }
            }
            .close-menu-mobile {
                display: none;
                @include mobile {
                    display: block;
                    position: absolute;
                    right: 2rem;
                    top: 2rem;
                    font-size: 12rem;
                    font-weight: 700;
                    right: 1rem;
                    top: -3rem;
                    color: $orange;
                }
            }
            .single-link {
                width: 15rem;
                margin-bottom: 0.2rem;
                @include mobile {
                    width: 100%;
                    padding-bottom: 2rem;
                }
            }
        }
    }
}
</style>
