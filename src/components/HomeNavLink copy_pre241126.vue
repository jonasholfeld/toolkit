<template>
  <div class="draggable-container" :style="inlineStyleParent">
    <div
      class="draggable"
      ref="draggable"
      :style="inlineStyle"
      @mousedown="onMouseDown"
    >
      <div v-if="url" :data-to="'/' + url" @click="onClick">{{ title }}</div>
      <span v-else>{{ title }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, toRef } from "vue";
import { RouterLink, useRouter } from "vue-router";

export default {
  setup(props) {
    const draggable = ref(null);
    let positionX = ref(0);
    const router = useRouter();
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
    const setTransition = (enable) => {
      if (draggable.value) {
        draggable.value.style.transition = enable
          ? "height 0.5s ease-in-out, width 0.5s ease-in-out, left 0.5s ease-in-out, color 0.2s ease-in-out"
          : "none";
      }
    };
    const handleResize = () => {
      if (props.workOrInfo == "work") {
        let vw = window.innerWidth / 2;
        let offset = vw - 0.35 * vw;
        offset = offset - props.index * (vw * 0.13);
        positionX.value = offset;
      } else {
        let vw = window.innerWidth / 2;
        let offset = props.index * (vw * 0.13) + vw * 0.015;
        positionX.value = offset;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });
    if (props.workOrInfo == "work") {
      let vw = window.innerWidth / 2;
      let offset = vw - 0.35 * vw;
      offset = offset - props.index * (vw * 0.13);
      positionX = ref(offset);
    } else {
      let vw = window.innerWidth / 2;
      let offset = props.index * (vw * 0.13) + vw * 0.015;
      positionX = ref(offset);
    }
    return {
      show: toRef(props, "show"),
      positionX, // Initial position of the element
      startX: 0, // Initial mouse position when drag starts
      startY: 0,
      isDragging: false, // Flag to indicate dragging state
      dragThreshold: 3,
      router: router,
      draggable,
      setTransition,
      isMobile,
    };
  },
  props: {
    current: Object,
    previous: Object,
    next: Object,
    previousLeft: HTMLDivElement,
    title: String,
    color: String,
    index: Number,
    workOrInfo: String,
    show: Boolean,
    url: String,
    globalDragX: {
      type: Number,
    },
  },
  watch: {
    globalDragX(newVal) {
      if (!this.isDragging) {
        // console.log(newVal);
        // Only update position if this component is not currently being dragged
        this.positionX = this.positionX - newVal;
      }
    },
  },
  computed: {
    inlineStyleParent() {
      let width = "100%";
      let height = "4.85rem";
      //   let transform = "translateY(0rem)";
      if (!this.show && !this.isMobile()) {
        width = "100%";
        height = "0";
        // transform = "translateY(-2rem)";
      }
      if (this.isMobile()) {
        height = "unset";
      }
      return {
        width: width,
        height: height,
        // transform: transform,
      };
    },
    inlineStyle() {
      let borderRadius = "0rem";
      if (this.index % 2 == 0) {
        borderRadius = "3rem";
      }
      let height = "4.85rem";
      let left = this.positionX + "px";
      let color = "black";
      if (!this.show && !this.isMobile()) {
        height = "0";
        color = "transparent";
        left = "30rem";
        if (this.workOrInfo == "info") {
          left = "3rem";
        }
      }
      if (this.isMobile()) {
        height = "unset";
      }
      return {
        left: left,
        "background-color": this.color,
        "border-radius": borderRadius,
        height: height,
        color: color,
      };
    },
  },
  methods: {
    onClick(event) {
      if (this.isDragging) {
        //console.log("preventing");
      } else {
        //console.log("navigating!");
        this.router.push(this.url);
      }
    },
    onMouseDown(event) {
      this.setTransition(false);
      this.startX = event.clientX - this.positionX;
      //   this.isDragging = ;
      this.startY = event.clientY;
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      if (Math.sqrt(dx * dx + dy * dy) > this.dragThreshold) {
        //console.log("dragging true");
        this.isDragging = true;
      }
      if (this.isDragging && this.index != 0) {
        let prevBox = this.previous.getBoundingClientRect();
        let prevMiddle = prevBox.left + prevBox.width / 2;

        let nextBox = this.next.getBoundingClientRect();
        let nextMiddle = nextBox.left + nextBox.width / 2;

        let curLeft = event.clientX - this.startX;
        let curRight = event.clientX - this.startX + prevBox.width;

        let allowChange = true;
        if (this.workOrInfo == "info") {
          curRight = curRight + window.innerWidth / 2;
          curLeft = curLeft + window.innerWidth / 2;
          if (curLeft < window.innerWidth / 2) {
            allowChange = false;
          }
          if (curRight > window.innerWidth) {
            allowChange = false;
          }
        } else {
          if (curRight > window.innerWidth / 2) {
            allowChange = false;
          }
          if (curLeft < 0) {
            allowChange = false;
          }
        }
        if (curLeft > prevMiddle) {
          allowChange = false;
        }
        if (curRight < prevMiddle) {
          allowChange = false;
        }
        if (curLeft > nextMiddle) {
          allowChange = false;
        }
        if (curRight < nextMiddle) {
          allowChange = false;
        }
        //console.log("change allowed?", allowChange);
        if (allowChange) {
          let oldPositionX = this.positionX;
          this.positionX = event.clientX - this.startX;
          let deltaX = oldPositionX - this.positionX;
          console.log(
            typeof this.positionX,
            typeof event.clientX,
            typeof this.startX,
            typeof deltaX
          );
          //   this.$emit("dragging", deltaX);
        }
      }
    },
    onMouseUp(event) {
      this.setTransition(true);
      setTimeout(() => {
        this.isDragging = false;
      }, 500);
      window.removeEventListener("mousemove", this.onMouseMove);
      window.removeEventListener("mouseup", this.onMouseUp);
    },
  },
};
</script>

<style lang="scss">
.works,
.information {
  @include mobile {
    width: 96rem !important;
    margin: 2rem !important;
    height: 96rem !important;
    box-shadow: 0px 3px 6px #00000029;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
}
.works {
  @include mobile {
    border-radius: 12rem;
    overflow: hidden;
  }
}
.draggable-container {
  width: 100%;
  position: relative;
  transition: transform 1s ease-in-out;
  @include mobile {
    height: auto !important;
  }
}

.draggable {
  width: 17rem;
  height: 4.85rem;
  position: absolute;
  cursor: pointer;
  user-select: none; /* Prevents text selection during dragging */
  @include heading_one;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 3px 6px #00000029;
  text-align: center;
  //   transition: height 0.5s ease-in-out, width 0.5s ease-in-out,
  // left 0.5s ease-in-out, color 0.2s ease-in-out;
  transition: height 0.5s ease-in-out, width 0.5s ease-in-out,
    left 0.5s ease-in-out, color 0.2s ease-in-out;
  overflow: hidden;
  &:hover {
    font-style: italic;
  }
  @include mobile {
    font-size: $mobileBigSize;
    position: relative;
    left: unset !important;
    box-shadow: none;
    width: 100%;
    line-height: 1.2;
  }
}
</style>
