<template>
<div :class="['flex items-center', isFull ? 'flex-col gap-3 mt-2' : 'gap-6']">
  <p :class="['text-left font-bold text-base md:text-xl', isFull ? 'flex justify-end w-full' : '']">{{ price === '0.00' ? 'Free' : '$'.concat(price) }}</p>
  <primary-button
    :cart="true"
    name="Add to Cart"
    :smaller="true"
    :gameId="gameId"
  ></primary-button>
</div>
</template>

<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";

const props = defineProps<{
  price: string;
  gameId: string;
  isFull?: boolean;
}>();

</script>
