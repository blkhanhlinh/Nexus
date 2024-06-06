<template>
  <button
    :class="[
      smaller ? 'px-4 py-2' : 'h-fit p-2 lg:h-[52px] lg:py-4 lg:px-5',
      'flex rounded justify-center items-center z-20',
      active ? 'bg-bg-hover' : 'bg-bg-highlight', 
      cart ? 'bg-secondary hover:bg-blue' : 'hover:bg-bg-hover',
    ]"
    @click="handleClick"
  >
    <p>{{ name }}</p>
  </button>
</template>

<script setup lang="ts">
import { useCartStore, useAuthStore, useAlertStore } from "@/stores";
import axios from "axios";
import { Game } from "@/interfaces/Product";
import { baseURL } from "@/constants/api";
import { useRouter } from 'vue-router';

const props = defineProps<{
  cart?: boolean;
  gameId?: string;
  name: string;
  smaller?: boolean;
  active?: boolean;
}>();

const emit = defineEmits(['addToCart']);
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

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
    if (!authStore.isAuthenticated) {
      alertStore.error("You should first login to purchase item 👾");
      router.push('/login');
      return;
    }
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
      alertStore.success("Add item to cart successfully 🥳")
      // console.log(cartStore.items);
    }
  }
};
</script>

<style scoped lang="scss">
button {
  transition: all 0.3s;
}
</style>
