<template>
  <img
    v-if="os == 'Microsoft Windows'"
    src="@/assets/icons/windows.svg"
    class="h-6 w-6"
  />
  <img
    v-else-if="os == 'macOS'"
    src="@/assets/icons/apple.svg"
    class="h-6 w-6"
  />
  <img v-else src="@/assets/icons/os.svg" class="h-6 w-6" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  os: string;
}>();
</script>