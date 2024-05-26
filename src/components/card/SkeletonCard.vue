<template>
  <div class="grid grid-cols-5 gap-4 w-full bg-bg-main p-4 rounded-lg">
    <div class="col-span-3 h-[484px]">
      <div class="bg-gray-300 h-full w-full rounded animate-pulse"></div>
    </div>
    <div class="flex flex-col gap-4 col-span-2">
      <div class="flex flex-col gap-3">
        <div class="h-8 bg-gray-300 rounded animate-pulse"></div>
        <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
        <div class="grid grid-cols-2 grid-rows-2 gap-2 justify-items-center">
          <div
            class="h-28 w-full bg-gray-300 rounded animate-pulse"
            v-for="index in 4"
            :key="index"
          ></div>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <div class="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FeaturedCardSkeleton",
};
</script>
