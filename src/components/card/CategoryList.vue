<template>
  <div class="flex gap-1 items-center">
    <div
      v-for="cate in categories"
      :key="cate"
      class="flex items-center py-2 px-3 rounded bg-bg-highlight text-text-dim text-sm"
    >
      {{ cate }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CategoryList",
  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
});
</script>
