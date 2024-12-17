<template>
  <div class="home-wrapper">
    <h1>{{ site?.title }}</h1>
  </div>
  <div
    class="home-navigation"
    :style="
      '--workcolor: ' +
      site.works.color +
      '; --infocolor: ' +
      site.information.color
    "
  >
    <div class="work-navigation">
      <div
        v-for="(work, index) in works"
        :key="work.uri"
        class="drag-track"
        @mousedown="startDrag(index, 'work', $event, work.uri)"
      >
        <div
          :ref="work.id === 0 ? '' : 'draggableWorks'"
          class="draggable-link"
          :style="{
            backgroundColor: site?.works.color,
            left: `${work.left}px`,
            top: `${work.top}px`,
          }"
          :canMoveLeft="work.canMoveLeft"
          :canMoveRight="work.canMoveRight"
          :class="[
            work.title === 'empty' ? 'empty' : '',
            work.addClass,
            !showWorkElements ? 'hide' : '',
          ]"
          @click="work.id === 0 ? showElements('works') : null"
        >
          {{ work.title }}
        </div>
      </div>
    </div>
    <div class="info-navigation">
      <div
        v-for="(info, index) in infos"
        :key="info.uri"
        class="drag-track"
        @mousedown="startDrag(index, 'info', $event, info.uri)"
      >
        <div
          :ref="info.id === 0 ? '' : 'draggableInfos'"
          class="draggable-link"
          :style="{
            backgroundColor: site?.information.color,
            left: `${info.left}px`,
            top: `${info.top}px`,
          }"
          :canMoveLeft="info.canMoveLeft"
          :canMoveRight="info.canMoveRight"
          :class="[
            info.title === 'empty' ? 'empty' : '',
            info.addClass,
            !showInfoElements ? 'hide' : '',
          ]"
          @click="info.id === 0 ? showElements('info') : null"
        >
          {{ info.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSite } from "~/composables";
import { onMounted, onUnmounted, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";

const site = useSite();
const works = ref([]);
const infos = ref([]);
const showWorkElements = ref(false);
const showInfoElements = ref(false);
const draggableWorks = ref(null);
const draggableInfos = ref(null);
const initialXWorks = 32 * (window.innerWidth / 100);
const initialXInfo = 1 * (window.innerWidth / 100);
const router = useRouter();

const initializeData = async () => {
  try {
    const siteData = await useSite();
    const rawSite = toRaw(siteData);
    populateElements(
      rawSite.works.children,
      works,
      initialXWorks,
      "Arbeiten",
      (window.innerWidth / 100) * -18
    );
    populateElements(
      rawSite.information.children,
      infos,
      initialXInfo,
      "Information",
      window.innerWidth / 2
    );
    if (works.value.length !== infos.value.length) {
      if (works.value.length > infos.value.length) {
        infos.value.push(
          generateEmptyElement(initialXInfo, infos.value.length, "Information")
        );
      } else {
        works.value.push(
          generateEmptyElement(initialXWorks, works.value.length, "Arbeiten")
        );
      }
    }
  } catch (error) {
    console.error("Failed to initialize data:", error);
  }
};

const generateEmptyElement = (initialX, id, label) => {
  function getLeft(index) {
    const vw = window.innerWidth / 100;
    if (label == "Arbeiten") {
      return initialX - 5 * vw * (index + 1);
    } else {
      console.log(initialX);
      return initialX + 5 * vw * (index + 1);
    }
  }
  return {
    id: id,
    title: "empty",
    left: getLeft(id),
    previous: id - 1,
    uri: null,
    isDragging: false,
    canMoveRight: true,
    canMoveLeft: true,
    width: (window.innerWidth / 100) * 17,
  };
};

const populateElements = (sourceArray, targetArray, initialX, label, zeroX) => {
  let xOffset;
  if (label == "Arbeiten") {
    console.log("hi");
    xOffset = initialX;
  }
  targetArray.value[0] = {
    id: 0,
    title: label,
    left: zeroX,
    previous: null,
    uri: null,
    isDragging: false,
    canMoveRight: false,
    canMoveLeft: false,
    width: (window.innerWidth / 100) * 17,
    addClass: "heading-category",
    top: 0,
  };
  sourceArray.forEach((item, index) => {
    targetArray.value.push({
      top: 0,
      id: index + 1,
      left: getLeft(index),
      title: item.title,
      previous: index,
      uri: item.uri,
      isDragging: false,
      startX: 0,
      dragStartLeft: 0,
      canMoveRight: true,
      canMoveLeft: true,
      width: (window.innerWidth / 100) * 17,
      addClass: "link-element",
    });
  });
  function getLeft(index) {
    const vw = window.innerWidth / 100;
    if (label == "Arbeiten") {
      return initialX - 5 * vw * (index + 1);
    } else {
      console.log(initialX);
      return initialX + 5 * vw * (index + 1);
    }
  }
};

onMounted(() => {
  initializeData();
  setTimeout(() => {
    works.value[0].left = initialXWorks;
    infos.value[0].left = initialXInfo;
  }, 500);
});

const showElements = (elementArray) => {
  if (elementArray == "works") {
    if (!showWorkElements.value) {
      showWorkElements.value = true;
      gsap.set(
        draggableWorks.value.map((el) => el),
        { y: -window.innerHeight }
      );
      gsap.to(
        draggableWorks.value.map((el) => el),
        {
          y: 0,
          duration: 1.5,
          ease: "bounce.out",
        }
      );
    } else {
      showWorkElements.value = false;
    }
  } else {
    if (!showInfoElements.value) {
      showInfoElements.value = true;
      gsap.set(
        draggableInfos.value.map((el) => el),
        { y: -window.innerHeight }
      );
      gsap.to(
        draggableInfos.value.map((el) => el),
        {
          y: 0,
          duration: 1.5,
          ease: "bounce.out",
        }
      );
    } else {
      showInfoElements.value = false;
    }
  }
};

let clickBeginning;
let currentURLtoNavigate;
let mouseDownTime;

const startDrag = (index, workOrInfo, event, url) => {
  console.log(url);
  currentURLtoNavigate = url;
  clickBeginning = event.clientX;
  mouseDownTime = Date.now();
  if (workOrInfo === "work") {
    works.value[index].isDragging = true;
    works.value[index].startX = event.clientX;
    works.value[index].dragStartLeft = works.value[index].left;
  } else if (workOrInfo === "info") {
    infos.value[index].isDragging = true;
    infos.value[index].startX = event.clientX;
    infos.value[index].dragStartLeft = infos.value[index].left;
  }

  document.addEventListener("mousemove", (event) =>
    onDrag(index, workOrInfo, event)
  );
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (index, workOrInfo, event, isFake = false) => {
  let currentElement;
  let elementsArray;

  let currentElementIsDragging;
  if (isFake) {
    currentElementIsDragging = true;
  } else {
    if (workOrInfo === "work") {
      currentElementIsDragging = works.value[index].isDragging;
    } else {
      currentElementIsDragging = infos.value[index].isDragging;
    }
  }

  // Determine the active array and element
  if (workOrInfo === "work" && currentElementIsDragging) {
    currentElement = works.value[index];
    elementsArray = works.value;
  } else if (workOrInfo === "info" && currentElementIsDragging) {
    currentElement = infos.value[index];
    elementsArray = infos.value;
  }

  if (!currentElement || !elementsArray) return;
  let possibleNewLeft;
  if (isFake) {
    if (workOrInfo == "work") {
      possibleNewLeft = currentElement.left - event.clientX;
    } else {
      possibleNewLeft = currentElement.left + event.clientX;
    }
  } else {
    const deltaX = event.clientX - currentElement.startX;
    possibleNewLeft = currentElement.dragStartLeft + deltaX;
  }

  // Ensure the 0th element cannot move
  if (index === 0) {
    currentElement.canMoveLeft = false;
    currentElement.canMoveRight = false;
    return;
  }

  if (!canUpdateCurrentElement(currentElement, possibleNewLeft, elementsArray))
    return;

  if (possibleNewLeft < currentElement.left) {
    currentElement.canMoveRight = true;
  } else {
    currentElement.canMoveLeft = true;
  }

  currentElement.left = possibleNewLeft;
  const overLap = getNeighborOverlap(currentElement, workOrInfo);
  if (overLap > 0) {
    let otherGroup;
    if (workOrInfo == "work") {
      otherGroup = "info";
    } else {
      otherGroup = "work";
    }
    const fakeEvent = { clientX: overLap };
    onDrag(currentElement.id, otherGroup, fakeEvent, true);
  }

  // Adjust adjacent elements
  adjustAdjacentElements(index, elementsArray, workOrInfo);
};

const getNeighborOverlap = (element, workOrInfo) => {
  let neighbor;
  let overLap;
  const overLapMargin = 10;
  if (workOrInfo == "work") {
    neighbor = infos.value[element.id];
    if (!neighbor) {
      return 0;
    }
    overLap =
      element.left +
      element.width +
      overLapMargin -
      (neighbor.left + window.innerWidth / 2);
  } else {
    neighbor = works.value[element.id];
    if (!neighbor) {
      return 0;
    }
    overLap =
      neighbor.left +
      neighbor.width +
      overLapMargin -
      (element.left + window.innerWidth / 2);
  }
  return overLap;
};

// Helper function to determine if the current element can update its position
const canUpdateCurrentElement = (
  currentElement,
  possibleNewLeft,
  elementsArray
) => {
  const previousIndex = currentElement.previous;
  const previousElement = elementsArray[previousIndex];
  const previousMiddle = previousElement.left + previousElement.width / 2;
  if (possibleNewLeft + currentElement.width < previousMiddle) {
    if (!previousElement.canMoveLeft) {
      currentElement.canMoveLeft = false;
      return false;
    }
    currentElement.canMoveRight = true;
  }

  if (possibleNewLeft > previousMiddle) {
    if (!previousElement.canMoveRight) {
      currentElement.canMoveRight = false;
      return false;
    }
    currentElement.canMoveLeft = true;
  }

  return true;
};

// Adjust the position of adjacent elements recursively
const adjustAdjacentElements = (currentIndex, elementsArray, workOrInfo) => {
  if (currentIndex === 0) return; // Ensure the 0th element is never adjusted
  movePreviousElement(currentIndex, elementsArray, workOrInfo);
  moveNextElement(currentIndex, elementsArray);
};

// Recursive function to move the previous elements
const movePreviousElement = (currentIndex, elementsArray, workOrInfo) => {
  if (currentIndex === 0) return; // Ensure the 0th element is not moved

  const currentElement = elementsArray[currentIndex];
  const previousIndex = currentElement.previous;
  if (previousIndex === null) return;
  if (previousIndex === 0) return;

  const previousElement = elementsArray[previousIndex];
  const previousMiddle = previousElement.left + previousElement.width / 2;

  const prevPrev = elementsArray[previousIndex - 1] || null;
  const prevPrevMiddle = prevPrev ? prevPrev.left + prevPrev.width / 2 : null;

  if (currentElement.left + currentElement.width < previousMiddle) {
    const possibleNewLeft = currentElement.left + previousElement.width / 2;
    if (
      canMoveElement(
        previousElement,
        possibleNewLeft,
        prevPrevMiddle,
        "left",
        workOrInfo
      )
    ) {
      previousElement.left = possibleNewLeft;
      movePreviousElement(previousIndex, elementsArray, workOrInfo);
    }
  }

  if (currentElement.left > previousMiddle) {
    const possibleNewLeft = currentElement.left - previousElement.width / 2;
    if (
      canMoveElement(
        previousElement,
        possibleNewLeft,
        prevPrevMiddle,
        "right",
        workOrInfo
      )
    ) {
      previousElement.left = possibleNewLeft;
      movePreviousElement(previousIndex, elementsArray, workOrInfo);
    }
  }
};

// Recursive function to move the next elements
const moveNextElement = (currentIndex, elementsArray) => {
  const nextIndex = currentIndex + 1;
  if (nextIndex >= elementsArray.length) return;

  const currentElement = elementsArray[currentIndex];
  const nextElement = elementsArray[nextIndex];
  const nextMiddle = nextElement.left + nextElement.width / 2;

  if (currentElement.left + currentElement.width < nextMiddle) {
    nextElement.left = currentElement.left + currentElement.width / 2;
    moveNextElement(nextIndex, elementsArray);
  }

  if (currentElement.left > nextMiddle) {
    nextElement.left = currentElement.left - nextElement.width / 2;
    moveNextElement(nextIndex, elementsArray);
  }
};

// Check if an element can move in the specified direction
const canMoveElement = (
  element,
  possibleNewLeft,
  boundaryMiddle,
  direction,
  workOrInfo
) => {
  let previousElement;
  if (workOrInfo == "work") {
    previousElement = works.value[element.previous];
  } else {
    previousElement = infos.value[element.previous];
  }
  if (direction === "left" && boundaryMiddle !== null) {
    if (
      possibleNewLeft + element.width < boundaryMiddle &&
      !previousElement.canMoveLeft
    ) {
      element.canMoveLeft = false;
      return false;
    }
    element.canMoveRight = true;
  }

  if (direction === "right" && boundaryMiddle !== null) {
    if (possibleNewLeft > boundaryMiddle && !previousElement.canMoveRight) {
      element.canMoveRight = false;
      return false;
    }
    element.canMoveLeft = true;
  }

  return true;
};

const stopDrag = (event) => {
  works.value.forEach((work) => {
    if (work.isDragging) {
      work.isDragging = false; // Stop dragging
    }
  });

  infos.value.forEach((info) => {
    if (info.isDragging) {
      info.isDragging = false; // Stop dragging
    }
  });
  if (
    Math.abs(event.clientX - clickBeginning) < 3 &&
    mouseDownTime - Date.now() < 300
  ) {
    console.log("click!!!");
    if (currentURLtoNavigate) {
      router.push("/" + currentURLtoNavigate);
    }
  }
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
});
</script>

<style scoped lang="scss">
.home-wrapper {
  h1 {
    text-align: center;
    @include heading_one;
    @include mobile {
      line-height: 1;
    }
  }
}
.home-navigation {
  display: flex;
  justify-content: center;
  margin-top: 7.275rem;
  width: 100vw;
  transform: translateX(-1rem);
  padding-bottom: 4.275rem;
  @include mobile {
    flex-direction: column;
    height: calc(100vh - 20rem);
    width: 100%;
    transform: none;
    gap: 3rem;
  }
  .work-navigation {
    @include mobile {
      background-color: var(--workcolor);
      border-radius: 15rem;
      overflow: hidden;
    }
  }
  .info-navigation {
    @include mobile {
      background-color: var(--infocolor);
    }
  }
  .drag-track {
    position: relative;
    height: 4.85rem;
    pointer-events: none;
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
      //   box-shadow: 0px 3px 6px #00000029;
      text-align: center;
      pointer-events: all;
      transition: top 0.5s ease;
      &::before {
        content: "";
        width: 17rem;
        height: 4.85rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0px 3px 6px #00000029;
        z-index: -1; /* Places the shadow behind the element */
        border-radius: inherit; /* Matches the box's border radius if any */
      }
      &.link-element {
        z-index: 1;
        &:hover {
          font-style: italic;
        }
      }
      &.heading-category {
        opacity: 1 !important;
        transition: left 1s ease, opacity 1s ease !important;
        text-decoration: underline !important;
        text-decoration-thickness: 1px !important;
        // z-index: 20;
      }
      &.hide {
        opacity: 0;
        transition: opacity 1s ease;
        @include mobile {
          opacity: 1;
        }
      }
      &.empty {
        opacity: 0;
        pointer-events: none !important;
      }
    }
  }
  .work-navigation,
  .info-navigation {
    width: 50rem;
    position: relative;
    pointer-events: none;
    @include mobile {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .draggable-link {
        width: 100%;
        position: relative;
        left: 0 !important;
        box-shadow: none;
        &::before {
          display: none;
        }
      }
    }
  }
  .work-navigation {
    .draggable-link {
      background-color: var(--workcolor);
    }
  }
  .info-navigation {
    .draggable-link {
      background-color: var(--infocolor);
    }
  }
}
</style>
