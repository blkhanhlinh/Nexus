<template>
  <div ref="navbar" class="w-full min-h-fit fixed top-0 left-0 right-0 z-50">
    <header class="bg-bg-main w-full min-h-full">
      <div class="mx-auto container p-2 flex flex-col">
        <div class="flex justify-between">
          <div class="flex items-center gap-16">
            <a class="logo" href="/">
              <img class="h-5" src="../assets/logo.svg" alt="" />
            </a>
            <nav class="inline-flex gap-16">
              <router-link
                :to="'/'"
                :class="['uppercase', 'font-semibold', { active: isActiveStore }]"
                >Store</router-link
              >
              <router-link to="/chatbot" class="uppercase font-semibold"
                >Chatbot</router-link
              >
              <router-link to="/library" class="uppercase font-semibold"
                >Library</router-link
              >
              <router-link to="/downloads" class="uppercase font-semibold"
                >Downloads</router-link
              >
            </nav>
          </div>
          <div class="iconlist flex gap-4 items-center">
            <router-link
              to="/wishlist"
              class="w-14 h-9 bg-bg-highlight flex items-center justify-center rounded relative"
            >
              <img src="../assets/icons/filled-heart.svg" />
            </router-link>
            <router-link
              to="/cart"
              class="w-14 h-9 bg-bg-highlight flex items-center justify-center rounded relative"
            >
              <img src="../assets/icons/cart.svg" />
              <span
                v-if="cartStore.totalQuantity > 0"
                class="absolute -top-1 -right-1 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center bg-blue"
              >
                {{ cartStore.totalQuantity }}
              </span>
            </router-link>
            <template v-if="!isAuthenticated">
              <router-link
                to="/login"
                class="w-fit h-9 bg-bg-highlight flex items-center justify-center rounded"
              >
                <button class="uppercase font-medium px-4">Login</button>
              </router-link>
              <router-link
                to="/register"
                class="w-fit h-9 bg-bg-highlight flex items-center justify-center rounded"
              >
                <button class="uppercase font-medium px-4">Sign up</button>
              </router-link>
            </template>
            <template v-else>
              <div class="relative inline-block">
                <div
                  class="inline-flex items-center relative space-x-3 w-fit h-9 py-1 px-3 bg-bg-highlight rounded cursor-pointer"
                  @click="toggleDropdown"
                >
                  <img
                    class="rounded-full h-7 w-7 overflow-hidden"
                    src="../assets/images/profile.png"
                    alt="Profile"
                  />
                  <p class="text-text-main text-sm capitalize">
                    {{ user?.username }}
                  </p>
                  <img
                    class="h-4 w-4"
                    src="../assets/icons/arrow-down.svg"
                    alt="Dropdown"
                  />
                </div>
                <div
                  v-if="showDropdown"
                  class="dropdown absolute mt-2 right-0 z-10 origin-top-right w-48 rounded-lg shadow-lg bg-bg-highlight p-1 cursor-pointer"
                >
                  <ul>
                    <li
                      class="transform transition-colors duration-200 hover:bg-bg-hover"
                    >
                      <router-link
                        to="/profile"
                        class="block px-4 py-2 text-text-dim"
                        >Profile</router-link
                      >
                    </li>
                    <li
                      class="transform transition-colors duration-200 hover:bg-bg-hover"
                    >
                      <router-link
                        to="/settings"
                        class="block px-4 py-2 text-text-dim"
                        >Settings</router-link
                      >
                    </li>
                    <li
                      class="transform transition-colors duration-200 hover:bg-bg-hover"
                    >
                      <button
                        @click="logout"
                        class="block w-full text-left px-4 py-2 text-text-dim"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>
    <div v-if="showSubnav" class="bg-bg-tertiary w-full">
      <div class="flex items-center p-2 mx-auto container">
        <div class="flex justify-between w-full">
          <nav class="subnav inline-flex gap-4">
            <router-link to="/" class="px-4 py-2">Home</router-link>
            <router-link to="/browse" class="px-4 py-2">Browse</router-link>
            <router-link to="/discover" class="px-4 py-2">Discover</router-link>
            <router-link to="/points-shop" class="px-4 py-2"
              >Points Shop</router-link
            >
            <router-link to="/curators" class="px-4 py-2">Curators</router-link>
            <router-link to="/gift-cards" class="px-4 py-2"
              >Gift Cards</router-link
            >
            <router-link to="/news" class="px-4 py-2">News</router-link>
          </nav>
          <div
            class="flex justify-between py-2 px-4 bg-bg-main bg-opacity-20 rounded w-[400px] relative"
          >
            <input
              v-model="searchQuery"
              @input="searchGames"
              class="bg-opacity-0 bg-bg-main text-text-main placeholder:text-secondary w-full"
              placeholder="Search..."
            />
            <img src="../assets/icons/search.svg" />
            <div
              v-if="searchResults.length > 0"
              class="absolute top-full left-0 right-0 bg-bg-main mt-1 rounded shadow-xl z-[100]"
            >
              <ul>
                <li
                  v-for="result in searchResults.slice(0, 10)"
                  :key="result.gameId"
                  @click="selectResult(result)"
                  class="cursor-pointer hover:bg-bg-hover px-3 py-4"
                >
                  {{ result.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { baseURL } from '@/constants/api';
import { Game } from '@/interfaces/Product';
import gsap from 'gsap';

const props = defineProps<{
  showSubnav?: boolean;
}>();

const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const showDropdown = ref(false);
const searchQuery = ref('');
const searchResults = ref<Game[]>([]);

const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const navbar = ref();

let lastScrollY = window.scrollY;

const handleScroll = () => {
  if (window.scrollY > lastScrollY) {
    if (navbar.value) {
      gsap.to(navbar.value, { y: -navbar.value.offsetHeight, duration: 0.5 });
    }
  } else {
    gsap.to(navbar.value, { y: 0, duration: 0.5 });
  }
  lastScrollY = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const subNavRoutes = [
  "/",
  "/browse",
  "/discover",
  "/points-shop",
  "/curators",
  "/gift-cards",
  "/news",
];

const isActiveStore = computed(() => {
  return subNavRoutes.includes(route.path);
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function logout() {
  authStore.logout();
  toggleDropdown();
  window.location.reload();
}
async function searchGames() {
  if (searchQuery.value.trim() === '') {
    searchResults.value = [];
    return;
  }

  try {
    const response = await axios.post(`${baseURL}game/search`, {
      title: searchQuery.value,
      genres: [],
      developers: [],
      publishers: null,
      operatingSystems: [],
      minYear: null,
      maxYear: null,
      minPrice: null,
      maxPrice: null,
    });
    searchResults.value = response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
}

function selectResult(result: any) {
  searchQuery.value = '';
  searchResults.value = [];
  router.push(`/games/${result.gameId}`);
}
</script>

<style lang="scss" scoped>
.active {
  color: $color-blue;
}

.subnav .active {
  background: $color-secondary;
  color: $text-main;
  border-radius: 3px;
}

.subnav {
  a {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      cursor: pointer;
      background: linear-gradient(
          0deg,
          var(--hover-layer, rgba(255, 255, 255, 0.1)) 0%,
          var(--hover-layer, rgba(255, 255, 255, 0.1)) 100%
        ),
        var(--Background-Tertiary, #212b45);
      color: $text-main;
      border-radius: 3px;
    }
  }
}

.iconlist .active:first-child {
  background: $accent-red;
}
.iconlist {
  .active:nth-child(2) {
    background: $color-secondary;
  }
  .active {
    background: $color-secondary;
    color: $text-main;
  }
}
</style>
