<template>
  <div class="vue-drag-select" @mousedown="onMouseDown" ref="drag">
    <slot :selectedItems="selectedItems" />
    <div
      v-if="mouseDown"
      class="vue-drag-select-box"
      :style="selectionBoxStyling"
    ></div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
export default defineComponent({
  name: "vue3DragSelect",
  props: {
    selectorClass: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "rgba(0, 162, 255, .4)",
    },
  },
  setup(props, { emit }) {
    const mouseDown = ref(false);
    const concat = ref(false);
    const startPoint = ref();
    const endPoint = ref();
    const selectedItems = ref<HTMLElement[]>([]);
    const { proxy } = getCurrentInstance() || {};
    const drag = ref();
    function uniqueArray(array) {
      const newArray = array.concat();
      for (let i = 0; i < newArray.length; ++i) {
        for (let j = i + 1; j < newArray.length; ++j) {
          if (newArray[i] === newArray[j]) {
            newArray.splice(j--, 1);
          }
        }
      }
      return newArray;
    }
    let selectionBox = computed(() => {
      // Only set styling when necessary
      if (!mouseDown.value || !startPoint.value || !endPoint.value) return {};

      const clientRect = proxy?.$el.getBoundingClientRect();
      const scroll = getScroll();

      // Calculate position and dimensions of the selection box
      const left =
        Math.min(startPoint.value.x, endPoint.value.x) -
        clientRect.left -
        scroll.x;
      const top =
        Math.min(startPoint.value?.y, endPoint.value?.y) -
        clientRect.top -
        scroll.y;
      const width = Math.abs(startPoint.value.x - endPoint.value.x);
      const height = Math.abs(startPoint.value.y - endPoint.value.y);

      // Return the styles to be applied
      return {
        left,
        top,
        width,
        height,
      };
    });

    const selectionBoxStyling = computed(() => {
      // Only set styling when necessary
      if (!mouseDown.value || !startPoint.value || !endPoint.value) {
        return { background: props.color };
      }
      const { left, top, width, height } = selectionBox.value;
      // Return the styles to be applied
      return {
        background: props.color,
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    });
    const getScroll = () => {
      // If we're on the server, default to 0,0
      if (typeof document === "undefined") {
        return {
          x: 0,
          y: 0,
        };
      }

      return {
        x: proxy?.$el.scrollLeft,
        // document.body.scrollLeft ||
        // document.documentElement.scrollLeft,
        y: proxy?.$el.scrollTop,
        // document.body.scrollTop ||
        // document.documentElement.scrollTop,
      };
    };
    const onMouseDown = (event: any) => {
      // Ignore right clicks
      if (event.button === 2) return;

      // Check if shift is down
      concat.value = event.shiftKey;

      // Register begin point
      mouseDown.value = true;
      startPoint.value = {
        x: event.pageX,
        y: event.pageY,
      };

      // Start listening for mouse move and up events
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = (event) => {
      // Update the end point position
      if (mouseDown.value) {
        endPoint.value = {
          x: event.pageX,
          y: event.pageY,
        };

        // const children = drag.value.children.length
        //   ? drag.value.children
        //   : proxy?.$el.children;
        const children = drag.value?.querySelectorAll(
          `.${props.selectorClass}`
        );
        if (children) {
          let selected: any = Array.from(children).filter((item) => {
            return isItemSelected(item);
          });

          // If shift was held during mousedown the new selection is added to the current. Otherwise the new selection
          // will be selected
          selectedItems.value = concat.value
            ? uniqueArray(selectedItems.value.concat(selected))
            : selected;
          // selectedItems.value = selected;
        }
      }
    };
    const onMouseUp = () => {
      // Clean up event listeners
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // Reset state
      mouseDown.value = false;
      concat.value = false;
      startPoint.value = null;
      endPoint.value = null;
    };
    const isItemSelected = (el) => {
      if (el.classList.contains(props.selectorClass)) {
        const boxA: any = selectionBox.value;
        const boxB = {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.clientWidth,
          height: el.clientHeight,
        };

        return !!(
          boxA.left <= boxB.left + boxB.width &&
          boxA.left + boxA.width >= boxB.left &&
          boxA.top <= boxB.top + boxB.height &&
          boxA.top + boxA.height >= boxB.top
        );
      }

      return false;
    };
    onMounted(() => {
      proxy?.$el.$children?.forEach((child) => {
        child.$on("click", (event) => {
          const included = selectedItems.value.find((item) => {
            return child.$el === item.$el;
          });
          if (included) {
            selectedItems.value = selectedItems.value.filter((item) => {
              return child.$el !== item.$el;
            });
          } else {
            selectedItems.value.push(child);
          }
        });
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      proxy?.$el.$children?.forEach((child) => {
        child.$off("click");
      });
    });
    watch(selectedItems, (newVal, oldVal) => {
      emit("change", oldVal);
    });
    return {
      mouseDown,
      concat,
      startPoint,
      endPoint,
      selectedItems,
      onMouseDown,
      selectionBoxStyling,
      drag,
    };
  },
});
</script>

<style scoped>
.vue-drag-select {
  position: relative;
  user-select: none;
}

.vue-drag-select-box {
  position: absolute;
  z-index: 9999;
}
</style>
