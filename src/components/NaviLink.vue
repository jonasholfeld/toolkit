<template>
    <div class="inner-link-wrapper" :class="{ active: active }">
        <div class="indicator"></div>
        <div class="text">{{ pagetitle }}</div>
    </div>
</template>

<script>
export default {
  props: {
    pagetitle: {
      type: String,
      default: "",
      required: true,
    },
    active: Boolean,
  },
  setup(props) {
    //console.log(props.pagetitle);
  },
};
</script>

<style lang="scss">
.inner-link-wrapper {
    display: flex;
    transition: color .3s ease;
    .indicator {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 1.5rem;
        border: 1px solid $orange;
        background-color: white;
        transition: background-color .3s ease;
        margin-right: 0.2rem;
        @include mobile {
            width: 5.5rem;
            height: 5.5rem;
            border-radius: 5.5rem;
            margin-top: 1.5rem;
            margin-right: 1rem;
            border: 2px solid $orange;
        }
    }
    .text {
        @include galaxieMedium;
        font-size: 1.4rem;
        @include mobile {
            font-size: 7rem;
            padding-left: 2rem;
        }
    }
    &.active {
        color: $orange;
        .indicator {
            background-color: $orange;
        }
    }
}
</style>
