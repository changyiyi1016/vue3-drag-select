# vue3-drag-select

# Vue Drag to Select Component

A Vue component for drag selecting elements. Inspired by [react-drag-select](https://github.com/pablofierro/react-drag-select).

## Usage

- Add `vue3-drag-select` to your project:

```bash
$ yarn add vue3-drag-select # or npm i --save vue3-drag-select
```

- Import the component and add it to your template:

```js
import DragSelect from "vue3-drag-select";

export default {
  components: {
    "drag-select-container": DragSelect,
  },
};
```

- Wrap the items that you want to be selectable in the `drag-select-container`
  with a `selectorClass` property and a scoped slot:

```vue
<template>
  <drag-select-container selectorClass="itemToBeSelected">
    <template slot-scope="{ selectedItems }">
      <!-- Your items here -->
    </template>
  </drag-select-container>
</template>
```

- Then write your own logic to make items look selected. For instance
  by applying a class.

## License

MIT
