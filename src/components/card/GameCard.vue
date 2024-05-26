<template>
  <div :class="['bg-bg-main rounded-lg p-4 w-full flex gap-5', cardClass]">
    <router-link :to="`/games/${game.gameId}`" :class="variant === 'rowSlider' ? 'w-4/5' : ''">
      <img
        :src="Array.isArray(game.url) ? game.url[0] : game.url"
        :alt="game.title"
        :class="imageClass"
      />
    </router-link>
    <div
      :class="[
        'flex flex-col justify-between w-full',
        variant === 'rowSlider' ? '' : 'gap-2',
      ]"
    >
    <div class="flex justify-between items-center">
        <router-link :to="`/games/${game.gameId}`">
          <h3 class="font-bold text-text-main text-xl">{{ game.title }}</h3>
        </router-link>
        <button @click.prevent="toggleWishlist">
          <img :src="wishlistIcon" />
        </button>
      </div>
      <div class="flex justify-between items-center">
        <img :src="osImage" class="h-5 w-5" />
        <div class="flex items-center gap-5">
          <p class="text-lg font-bold">{{ "$" + game.price }}</p>
          <primary-button
            :cart="true"
            name="Add to Cart"
            :smaller="true"
            :gameId="game.gameId"
          ></primary-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, onMounted } from "vue";
import { Game } from "@/interfaces/Product";
import PrimaryButton from "../button/PrimaryButton.vue";

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

const osImage = computed(() => {
  const os = props.game.operatingSystem;
  if (os === "Microsoft Windows") {
    return "src/assets/icons/windows.svg";
  } else if (os === "macOS") {
    return "src/assets/icons/apple.svg";
  } else {
    return "src/assets/icons/os.svg";
  }
});

// Wishlist state management
const isInWishlist = ref(false);

const wishlistIcon = computed(() =>
  isInWishlist.value
    ? "src/assets/icons/heart-fill.svg"
    : "src/assets/icons/heart.svg"
);

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
};
</script>

<style scoped></style>
