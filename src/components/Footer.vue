<template>
    <footer class="footer">
        <router-link :to="`/standorte`" >
            <div 
                class="current-location" 
                :class="{ home: route.path == '/' }" 
                v-html="site.standort">
            </div>
        </router-link>
        <div class="logo-wrapper">
            <img v-for="logo in site.logos" :key="logo.url" :src="logo.url">
        </div>
        <div class="mobile-footer">
            <a>Instagram</a>
            <a>Facebook</a>
            <router-link :to="`/impressum`" >Impressum</router-link>
            <router-link :to="`/impressum`" >Disclaimer</router-link>
        </div>
    </footer>
</template>

<script setup>
import { useSite } from "~/composables";
import { useRoute } from "vue-router";
const route = useRoute();

const site = useSite();
</script>

<style scoped lang="scss">
.footer {
    bottom: 0;
    border-top: 1px solid $lilac;
    display: flex;
    width: 100rem;
    padding: $generalMargin;
    @include mobile {
        padding: 0;
        border-top: none;
        flex-direction: column;
    }
    .current-location {
        @include workSans;
        margin-right: 8rem;
        color: $orange;
        font-size: 1rem;
        @include mobile {
            display: none;
            &.home {
                display: block;
                padding: 3rem;
                border-top: 1px solid $orange;
                width: 100%;
                font-size: 3rem;
                display: flex;
            }
        }
        strong {
            font-weight: 800;
        }
    }
    .logo-wrapper {
        display: flex;
        @include mobile {
            display: none;
        }
        img {
            height: 3rem;
            margin-right: 3rem;
        }
    }
    .mobile-footer {
        display: none;
        @include mobile {
            display: flex;
            background-color: $lightblue;
            padding: 3rem;
        }
        font-size: 3.5rem;
        @include workSans;
        justify-content: space-between;
        width: 100%;
        text-transform: uppercase;
        font-weight: 500;
        color: $lilac;
    }
}
</style>
