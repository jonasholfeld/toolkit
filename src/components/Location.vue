<template>
    <h3 :id="location.id">{{ location.headline }}</h3>
    <div class="location-date">{{ location.datefield }}</div>
    <div class="location-description">{{ location.description }}</div>
    <div class="location-images" v-if="location.images.length > 1">
        <img v-for="image in location.images" :key="image" :src="image" >
    </div>
    <div class="single-location-image" v-else>
        <img v-for="image in location.images" :key="image" :src="image" >
    </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      default: null,
    },
  }
}
</script>

<style scoped lang="scss">
h3 {
    @include galaxieMedium;
    font-size: 1.3rem;
    @include mobile {
        font-size: 4.3rem;
    }
}
.location-date {
    @include LibreCaslon;
    font-size: 1.3rem;
    @include mobile {
        font-size: 4rem;
    }
}
.location-description {
    margin-top: $generalMargin;
    @include workSans;
    @include mobile {
        font-size: 4rem;
    }
}
.single-location-image {
    margin-top: $generalMargin;
    img {
        width: 100%;
    }
}
.location-images {
    column-count: 2;
    margin-top: 2rem;
    column-gap: $generalMargin;
    img {
        width: 100%;
        height: auto;
        margin-bottom: $generalMargin;
        display: block;
    }
}
</style>