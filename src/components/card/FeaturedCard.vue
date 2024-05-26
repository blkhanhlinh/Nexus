<template>
  <div class="grid grid-cols-5 gap-4 w-full bg-bg-main p-4 rounded-lg h-full">
    <router-link :to="`games/${game.gameId}`" class="col-span-3 h-[484px]">
      <img
        class="object-cover w-full h-full rounded"
        :src="game.url[0]"
        alt="Game Image"
      />
    </router-link>
    <div class="flex flex-col gap-4 col-span-2 justify-between">
      <div class="flex flex-col gap-3">
        <router-link :to="`games/${game.gameId}`" class="flex flex-col gap-3">
          <h2 class="font-bold text-3xl">{{ game.title }}</h2>
          <p>{{ game.plotAndGameplay.slice(0, 180) + "..." }}</p>
          <div class="grid grid-cols-2 grid-rows-2 gap-2 justify-items-center">
            <img
              v-for="(image, index) in game.url.slice(1, 5)"
              :key="index"
              :src="image"
              class="object-cover h-28 w-full rounded"
            />
          </div>
        </router-link>
        <div class="flex flex-wrap items-center justify-between gap-2 mt-2">
          <div
            class="flex items-center py-2 px-3 rounded bg-bg-highlight text-text-dim text-sm"
          >
            {{ game.genre }}
          </div>
          <icon-o-s :os="game.operatingSystem"></icon-o-s>
        </div>
        <div class="flex justify-between items-center mt-4">
          <icon-button
            @click.prevent="toggleWishlist"
            type="text"
            name="Wishlist"
            :icon-src="wishlistIcon"
          ></icon-button>
          <main-cta :price="game.price" :gameId="game.gameId" class="z-50"></main-cta>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import MainCta from "@/components/button/MainCta.vue";
import { RouterLink } from "vue-router";
import { Game } from "@/interfaces/Product";
import IconButton from "../button/IconButton.vue";
import IconOS from "@/components/common/IconOS.vue";

const props = defineProps<{
  game: Game;
}>();

const isInWishlist = ref(false);

const wishlistIcon = computed(() =>
  isInWishlist.value
    ? "src/assets/icons/heart-fill.svg"
    : "src/assets/icons/heart.svg"
);

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
}
</script>

<style scoped lang="scss"></style>
