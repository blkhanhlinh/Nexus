<template>
  <div
    class="flex flex-col lg:grid lg:grid-cols-5 gap-4 w-full bg-bg-main p-4 rounded-lg lg:h-full"
  >
    <router-link :to="`games/${game.gameId}`" class="lg:col-span-3 h-auto grid grid-cols-3 gap-2 lg:h-full">
      <img
        class="object-cover lg:w-full lg:h-full w-auto rounded col-span-2 max-sm:col-span-3 lg:col-span-3"
        :src="game.url[0]"
        alt="Game Image"
        loading="lazy"
      />
      <div
        class="max-sm:hidden lg:hidden col-span-1 flex flex-col gap-2 justify-items-center"
      >
        <img
          v-for="(image, index) in game.url.slice(1, 3)"
          :key="index"
          :src="image"
          class="object-cover h-auto w-full lg:h-28 rounded"
          loading="lazy"
        />
      </div>
    </router-link>
    <div class="flex flex-col gap-2 lg:gap-4 lg:col-span-2 justify-between">
      <div class="flex flex-col gap-2 lg:gap-3">
        <router-link :to="`games/${game.gameId}`" class="flex flex-col gap-3">
          <h2 class="font-bold text-xl lg:text-3xl">{{ game.title }}</h2>
          <p v-if="plotText">{{ plotText }}</p>
          <div
            class="hidden lg:grid grid-cols-2 grid-rows-2 gap-2 justify-items-center"
          >
            <img
              v-for="(image, index) in game.url.slice(1, 5)"
              :key="index"
              :src="image"
              class="object-cover h-20 w-full lg:h-28 rounded"
              loading="lazy"
            />
          </div>
        </router-link>
        <div class="flex flex-wrap items-center justify-between gap-2 mt-2">
          <div
            class="flex items-center py-1 px-2 lg:py-2 lg:px-3 rounded bg-bg-highlight text-text-dim text-xs lg:text-sm"
          >
            {{ game.genre }}
          </div>
          <icon-o-s
            :os="game.operatingSystem"
            class="text-sm lg:text-base"
          ></icon-o-s>
        </div>
        <div class="flex justify-between items-center mt-2 lg:mt-4">
          <icon-button
            @click.prevent="toggleWishlist"
            type="text"
            name="Wishlist"
            :btn-style="wishlistIcon"
            class="text-sm lg:text-base"
          ></icon-button>
          <main-cta
            :price="game.price"
            :gameId="game.gameId"
            class="text-sm lg:text-base z-50"
          ></main-cta>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import MainCta from "@/components/button/MainCta.vue";
import { RouterLink } from "vue-router";
import { Game } from "@/interfaces/Product";
import IconButton from "../button/IconButton.vue";
import IconOS from "@/components/common/IconOS.vue";

const props = defineProps<{
  game: Game;
}>();

const isInWishlist = ref(false);

const wishlistIcon = computed(() => (isInWishlist.value ? "fill" : "default"));

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
};

// Determine window size
const { width } = useWindowSize();

const plotText = computed(() => {
  if (width.value < 640) {
    return;
  } else if (width.value < 1024) {
    return props.game.plotAndGameplay.slice(0, 160) + "...";
  } else {
    return props.game.plotAndGameplay.slice(0, 140) + "...";
  }
});
</script>

<style scoped lang="scss"></style>
