<template>
  <layout>
    <div class="md:container md:mx-auto mt-12 mb-20">
      <div v-if="checkAuth">
        <div
          v-if="loading"
          class="h-screen container flex justify-center items-center"
        >
          <loader />
        </div>
        <div v-else class="recommendations">
          <div class="flex flex-col gap-2 mb-6">
            <h1 class="capitalize text-2xl font-bold">
              {{ authStore.user?.username }}'s Discovery Feed
            </h1>
            <p>
              Recommendations just for you, based on the games you want and your
              favorite genres.
            </p>
          </div>
          <div class="game-grid">
            <game-card
              v-for="game in paginatedGames"
              :key="game.gameId"
              :game="game"
            />
          </div>
          <div class="pagination">
            <button
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Prev
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="handlePageChange(page)"
              :class="{ active: page === currentPage }"
            >
              {{ page }}
            </button>
            <button
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="discover-block flex flex-col gap-4 items-center justify-center"
      >
        <loader></loader>
        <p class="text-2xl">Please log in to see your feed</p>
        <router-link to="/login">
          <button class="bg-secondary text-white py-4 px-5 rounded text-lg w-64">
            Login
          </button>
        </router-link>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { useAuthStore, useGameStore } from "@/stores";
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { baseURL } from "@/constants/api";
import Loader from "@/components/Loader.vue";
import GameCard from "@/components/card/GameCard.vue";
import { Game } from "@/interfaces/Product";

const authStore = useAuthStore();
const games = ref<Game[]>([]);
const loading = ref(true);
const checkAuth = computed(() => authStore.isAuthenticated);

const currentPage = ref(1);
const itemsPerPage = 12;

const totalPages = computed(() => Math.ceil(games.value.length / itemsPerPage));

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return games.value.slice(start, end);
});

const flattenGameDetails = (gameDetails: any) => {
  return gameDetails.flatMap((detail: any) => detail.gameDetailList);
};

const fetchRecommendGames = async () => {
  try {
    const res = await axios.post<[]>(
      `${baseURL}game/get-recommend-by-genres`,
      authStore.user?.favoriteGenres
    );
    games.value = flattenGameDetails(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  if (checkAuth.value) {
    fetchRecommendGames();
  }
});
</script>

<style lang="scss" scoped>
.recommendations {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: $bg-light;
    color: white;
    border: none;
    border-radius: 4px;
    &.active {
      background-color: $bg-hover;
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
.discover-block {
  height: calc(100vh - 240px);
  width: 100%;
}
</style>
