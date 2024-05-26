<template>
  <button
    :class="[
      smaller ? 'px-4 py-2' : 'h-[52px] py-4 px-5',
      'flex rounded justify-center items-center z-50',
      active ? 'bg-bg-hover' : 'bg-bg-highlight', cart ? 'bg-secondary hover:bg-blue' : 'hover:bg-bg-hover',
    ]"
    @click="handleClick"
  >
    <p>{{ name }}</p>
  </button>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores";
import axios from "axios";
import { Game } from "@/interfaces/Product";
import { baseURL } from "@/constants/api";

const props = defineProps<{
  cart?: boolean;
  gameId?: string;
  name: string;
  smaller?: boolean;
  active?: boolean;
}>();

const cartStore = useCartStore();

const fetchGameDetails = async (id: string): Promise<Game | null> => {
  try {
    const response = await axios.get<Game>(`${baseURL}game/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    return null;
  }
};

const handleClick = async () => {
  if (props.cart && props.gameId) {
    const game = await fetchGameDetails(props.gameId);
    if (game) {
      const gameInfo = {
        gameId: props.gameId,
        title: game.title,
        price: parseFloat(game.price),
        operatingSystem: game.operatingSystem,
        image: game.url[0],
      };
      cartStore.addToCart(gameInfo);
      console.log(cartStore.items)
    }
  }
};
</script>

<style scoped lang="scss">
button {
  transition: all 0.3s;
}
</style>