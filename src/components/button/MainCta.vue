<template>
<div class="flex gap-6 items-center">
  <p class="text-left font-bold text-xl">${{ price }}</p>
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
}>();
</script>
