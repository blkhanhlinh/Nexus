<template>
    <button class="flex h-[52px] text-text-dim border border-text-dim border-opacity-20 rounded justify-center items-center px-5 py-4">
        <p>{{ name }}</p>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    name: string;
}>();
</script>