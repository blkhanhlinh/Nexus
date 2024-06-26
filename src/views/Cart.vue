<template>
  <layout>
    <div v-if="authStore.isAuthenticated" class="container mx-auto mt-12 mb-20">
      <h1 class="text-2xl font-bold mb-6 capitalize">
        {{ authStore.user?.username }}'s Shopping Cart
      </h1>
      <div v-if="cartStore.items.length > 0" class="grid grid-cols-3">
        <div class="flex flex-col gap-6 col-span-2">
          <div class="flex-1 flex flex-col gap-4">
            <div
              v-for="item in cartStore.items"
              :key="item.gameId"
              class="flex items-center gap-7 p-4 bg-bg-main rounded-lg"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="h-32 w-64 object-cover"
                loading="lazy"
              />
              <div class="flex-1 flex gap-4">
                <h3 class="font-bold text-xl">{{ item.title }}</h3>
                <icon-o-s :os="item.operatingSystem"></icon-o-s>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-xl font-bold">{{ item.price }}</span>
                <button
                  @click="removeFromCart(item.gameId)"
                  class="p-2 bg-bg-highlight rounded"
                >
                  <img
                    src="/src/assets/icons/trash.svg"
                    alt="Remove"
                    class="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <div class="bg-bg-main rounded-lg p-4 flex gap-4 flex-col">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Estimated Total</h2>
                <div class="flex gap-6 items-center">
                  <p class="text-2xl font-bold">{{ cartStore.totalAmount }}</p>
                  <button
                    @click="clearCart"
                    class="p-2 bg-bg-highlight rounded"
                  >
                    <img
                      src="/src/assets/icons/trash.svg"
                      alt="Clear Cart"
                      class="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
              <div class="flex justify-between">
                <button
                  class="py-3 px-4 bg-bg-highlight text-white rounded-lg hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
                <div class="flex gap-4">
                  <button
                    class="py-3 px-4 bg-bg-highlight text-white rounded-lg hover:bg-blue-700"
                  >
                    Purchase as a Gift
                  </button>
                  <button
                    class="py-3 px-4 bg-bg-highlight text-white rounded-lg hover:bg-blue-700"
                  >
                    Purchase for Myself
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4 col-span-3 mt-8">
          <h1 class="text-2xl font-bold">Games you may like</h1>
          <div
            v-if="loading"
            class="md:h-40 w-full flex justify-center items-center"
          >
            <loader></loader>
          </div>
          <recommend-slider v-else :games="recommendedGames"></recommend-slider>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center h-max rounded-lg bg-bg-main gap-8 py-12"
      >
        <loader></loader>
        <p class="text-2xl">
          Your cart is empty. Browse Nexus to buy your favorite games.
        </p>
        <router-link
          to="/browse"
          class="mt-4 bg-blue text-text-main font-semibold px-4 py-2 rounded text-lg hover:bg-blueHi"
          >Go to Store</router-link
        >
      </div>
    </div>
    <div
      v-else
      class="cart-block flex flex-col gap-4 items-center justify-center"
    >
      <loader></loader>
      <p class="text-2xl">Please log in to purchase items</p>
      <router-link to="/login">
        <button
          class="bg-blue text-white py-4 px-5 rounded text-lg w-64 hover:bg-blueHi"
        >
          Login
        </button>
      </router-link>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { useAuthStore, useCartStore } from "@/stores";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import Layout from "@/components/Layout.vue";
import RecommendSlider from "@/components/slider/RecommendSlider.vue";
import { RecommendCard } from "@/interfaces/Product";
import { baseURL } from "@/constants/api";
import Loader from "@/components/Loader.vue";
import IconOS from "@/components/common/IconOS.vue";

const authStore = useAuthStore();
const cartStore = useCartStore();
const loading = ref(true);
const recommendedGames = ref<RecommendCard[]>([]);

const removeFromCart = (gameId: string) => {
  cartStore.removeFromCart(gameId);
  updateRecommendations();
};

const clearCart = () => {
  cartStore.clearCart();
  updateRecommendations();
};

const fetchRecommendGames = async (gameIds: number[]) => {
  try {
    const res = await axios.post(
      `${baseURL}recommender/multirecommend`,
      { productList: gameIds, top_k: 10 },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data.response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const updateRecommendations = async () => {
  if (cartStore.items.length > 0) {
    loading.value = true;
    const gameIds = cartStore.items.map((item) => parseInt(item.gameId));
    const games = await fetchRecommendGames(gameIds);
    recommendedGames.value = games;
    loading.value = false;
  } else {
    recommendedGames.value = [];
  }
};

onMounted(() => {
  updateRecommendations();
});

watch(
  () => cartStore.items,
  () => {
    updateRecommendations();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.cart-block {
  height: calc(100vh - 105px);
}
</style>
