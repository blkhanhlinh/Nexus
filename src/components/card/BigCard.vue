<template>
  <router-link :to="`games/${game.gameId}`">
    <div class="grid grid-cols-5 gap-4 w-full bg-bg-main p-4 rounded-lg">
      <div class="col-span-3 h-52">
        <img
          class="object-cover w-full h-full rounded"
          :src="game.url[0]"
          alt="Game Image"
        />
        <div class="grid grid-cols-2 grid-rows-2 gap-2 justify-items-center">
          <img
            v-for="(image, index) in game.url.slice(1, 4)"
            :key="index"
            :src="image"
            class="object-cover h-28 w-full rounded"
          />
        </div>
      </div>
      <div class="flex flex-col gap-4 col-span-2 justify-between">
        <div class="flex flex-col gap-3">
          <h2 class="font-bold text-3xl">{{ game.title }}</h2>
          <p>{{ game.plotAndGameplay }}</p>
          <div class="flex flex-wrap items-center justify-between gap-2 mt-2">
            <div
              class="flex items-center py-2 px-3 rounded bg-bg-highlight text-text-dim text-sm"
            >
              {{ game.genre }}
            </div>
            <icon-o-s :os="props.game.operatingSystem"></icon-o-s>
          </div>
          <div class="flex justify-between items-center mt-4">
            <icon-button type="text" name="Wishlist" icon-src="/src/assets/icons/heart.svg" ></icon-button>
            <main-cta :game-id="game.gameId" :price="game.price"></main-cta>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Game } from "@/interfaces/Product";
import IconButton from "../button/IconButton.vue";
import MainCta from "@/components/button/MainCta.vue";
import IconOS from "../common/IconOS.vue";

const props = defineProps<{
  game: Game;
}>();
</script>

<style scoped lang="scss"></style>
