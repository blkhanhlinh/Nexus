<template>
  <div :class="['bg-bg-main rounded-lg p-4 w-full flex gap-5', cardClass]">
    <router-link
      :to="`/games/${game.gameId}`"
      :class="variant === 'rowSlider' ? 'w-4/5' : ''"
    >
      <img
        :src="Array.isArray(game.url) ? game.url[0] : game.url"
        :alt="game.title"
        :class="imageClass"
      />
    </router-link>
    <div
      :class="[
        'flex flex-col justify-between w-full',
        variant === 'rowSlider' ? '' : 'gap-4',
      ]"
    >
      <div class="flex justify-between items-center">
        <router-link :to="`/games/${game.gameId}`">
          <h3 class="font-bold text-text-main text-xl">{{ game.title }}</h3>
        </router-link>
        <icon-button
            @click.prevent="toggleWishlist"
            type="icon"
            :btn-style="wishlistIcon"
          ></icon-button>
      </div>
      <div class="flex justify-between items-center">
        <icon-o-s :os="props.game.operatingSystem"></icon-o-s>
        <div class="flex items-center gap-5">
          <main-cta :price="game.price" :gameId="game.gameId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Game } from "@/interfaces/Product";
import IconOS from "../common/IconOS.vue";
import MainCta from "../button/MainCta.vue";
import IconButton from "../button/IconButton.vue";

const props = defineProps<{
  game: Game;
  variant?: "columnSlider" | "rowSlider";
}>();

const variant = props.variant || "columnSlider";

const cardClass = computed(() => {
  switch (variant) {
    case "rowSlider":
      return "flex-row";
    default:
      return "flex-col";
  }
});

const imageClass = computed(() => {
  switch (variant) {
    case "rowSlider":
      return "w-full h-28 object-cover";
    default:
      return "w-full h-48 object-cover";
  }
});

// Wishlist state management
const isInWishlist = ref(false);

const wishlistIcon = computed(() =>
  isInWishlist.value
    ? "fill"
    : "default"
);

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
}
</script>

<style scoped></style>
