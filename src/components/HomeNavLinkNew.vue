<template>
  <div class="drag-track" @mousedown="startDrag">
    <div
      ref="draggable"
      class="draggable-link"
      :style="{ backgroundColor: dragColor, left: `${left}px` }"
    >
      {{ elem.title }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const props = defineProps({
  elem: Object,
  dragColor: String,
  initialX: Number,
});

// Reactive variables
const left = ref(props.initialX);
const isDragging = ref(false);
const startX = ref(0);
const dragStartLeft = ref(0);

// Mouse down event to start dragging
const startDrag = (event) => {
  if (props.elem.title == "Arbeiten" || props.elem.title == "Information") {
    return;
  }
  if (event.target.classList.contains("draggable-link")) {
    isDragging.value = true;
    startX.value = event.clientX;
    dragStartLeft.value = left.value;

    // Add mouse move and mouse up listeners
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }
};

// Mouse move event to drag
const onDrag = (event) => {
  if (isDragging.value) {
    const deltaX = event.clientX - startX.value;
    left.value = dragStartLeft.value + deltaX;
  }
};

// Mouse up event to stop dragging
const stopDrag = () => {
  isDragging.value = false;

  // Remove event listeners
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

// Clean up event listeners on component unmount
onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
});
</script>

<style scoped lang="scss">
.drag-track {
  position: relative;
  height: 4.85rem;
  .draggable-link {
    width: 17rem;
    height: 4.85rem;
    position: absolute;
    pointer-events: all;
    cursor: pointer;
    user-select: none;
    @include heading_one;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 3px 6px #00000029;
    text-align: center;
  }
}
</style>
