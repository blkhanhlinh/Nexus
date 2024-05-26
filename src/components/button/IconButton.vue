<template>
  <button :class="['flex gap-2 items-center rounded bg-bg-highlight', buttonClass]">
    <p v-if="type === 'text'">{{ name }}</p>
    <img :src="iconSrc" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: "text" | "icon";
  name?: string;
  iconSrc: string;
  smaller?: boolean;
}>();

const buttonClass = props.type === "text" ? ` ${props.smaller ? 'px-3 py-2': 'px-5 py-4 h-[52px]'}` : "p-2 h-fit w-auto";

</script>

<style scoped></style>
