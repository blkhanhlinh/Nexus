<template>
  <div
    ref="navbar"
    class="navbar w-full min-h-fit fixed top-0 left-0 right-0 z-50"
  >
    <header class="bg-bg-main w-full min-h-full">
      <div class="mx-auto container py-2 px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-8 lg:gap-16 max-lg:p-2">
            <a class="logo" href="/">
              <img class="h-5" src="../assets/logo.svg" alt="" />
            </a>
            <nav class="hidden lg:inline-flex gap-16">
              <router-link
                :to="'/'"
                :class="[
                  'uppercase',
                  'font-semibold',
                  { active: isActiveStore },
                ]"
                >Store</router-link
              >
              <router-link to="/chatbot" class="uppercase font-semibold"
                >Chatbot</router-link
              >
              <router-link to="/library" class="uppercase font-semibold"
                >Library</router-link
              >
            </nav>
          </div>
          <div @click="toggleHamburger" class="lg:hidden">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.00008 5.00001C2.86757 4.99813 2.73601 5.02262 2.61304 5.07203C2.49007 5.12144 2.37815 5.1948 2.28378 5.28785C2.18941 5.38089 2.11447 5.49177 2.06333 5.61402C2.01218 5.73628 1.98584 5.86748 1.98584 6.00001C1.98584 6.13253 2.01218 6.26374 2.06333 6.38599C2.11447 6.50825 2.18941 6.61912 2.28378 6.71217C2.37815 6.80521 2.49007 6.87857 2.61304 6.92799C2.73601 6.9774 2.86757 7.00188 3.00008 7.00001H21.0001C21.1326 7.00188 21.2642 6.9774 21.3871 6.92799C21.5101 6.87857 21.622 6.80521 21.7164 6.71217C21.8108 6.61912 21.8857 6.50825 21.9368 6.38599C21.988 6.26374 22.0143 6.13253 22.0143 6.00001C22.0143 5.86748 21.988 5.73628 21.9368 5.61402C21.8857 5.49177 21.8108 5.38089 21.7164 5.28785C21.622 5.1948 21.5101 5.12144 21.3871 5.07203C21.2642 5.02262 21.1326 4.99813 21.0001 5.00001H3.00008ZM3.00008 11C2.86757 10.9981 2.73601 11.0226 2.61304 11.072C2.49007 11.1214 2.37815 11.1948 2.28378 11.2878C2.18941 11.3809 2.11447 11.4918 2.06333 11.614C2.01218 11.7363 1.98584 11.8675 1.98584 12C1.98584 12.1325 2.01218 12.2637 2.06333 12.386C2.11447 12.5083 2.18941 12.6191 2.28378 12.7122C2.37815 12.8052 2.49007 12.8786 2.61304 12.928C2.73601 12.9774 2.86757 13.0019 3.00008 13H21.0001C21.1326 13.0019 21.2642 12.9774 21.3871 12.928C21.5101 12.8786 21.622 12.8052 21.7164 12.7122C21.8108 12.6191 21.8857 12.5083 21.9368 12.386C21.988 12.2637 22.0143 12.1325 22.0143 12C22.0143 11.8675 21.988 11.7363 21.9368 11.614C21.8857 11.4918 21.8108 11.3809 21.7164 11.2878C21.622 11.1948 21.5101 11.1214 21.3871 11.072C21.2642 11.0226 21.1326 10.9981 21.0001 11H3.00008ZM3.00008 17C2.86757 16.9981 2.73601 17.0226 2.61304 17.072C2.49007 17.1214 2.37815 17.1948 2.28378 17.2878C2.18941 17.3809 2.11447 17.4918 2.06333 17.614C2.01218 17.7363 1.98584 17.8675 1.98584 18C1.98584 18.1325 2.01218 18.2637 2.06333 18.386C2.11447 18.5083 2.18941 18.6191 2.28378 18.7122C2.37815 18.8052 2.49007 18.8786 2.61304 18.928C2.73601 18.9774 2.86757 19.0019 3.00008 19H21.0001C21.1326 19.0019 21.2642 18.9774 21.3871 18.928C21.5101 18.8786 21.622 18.8052 21.7164 18.7122C21.8108 18.6191 21.8857 18.5083 21.9368 18.386C21.988 18.2637 22.0143 18.1325 22.0143 18C22.0143 17.8675 21.988 17.7363 21.9368 17.614C21.8857 17.4918 21.8108 17.3809 21.7164 17.2878C21.622 17.1948 21.5101 17.1214 21.3871 17.072C21.2642 17.0226 21.1326 16.9981 21.0001 17H3.00008Z"
                  fill="#C3C3C3"
                />
              </svg>
            </div>
            <div v-if="showHamburger">
              <nav class="absolute flex flex-col gap-4 w-full">
                <router-link
                  :to="'/'"
                  :class="[
                    'uppercase',
                    'font-semibold',
                    { active: isActiveStore },
                  ]"
                  >Store</router-link
                >
                <router-link to="/chatbot" class="uppercase font-semibold"
                  >Chatbot</router-link
                >
                <router-link to="/library" class="uppercase font-semibold"
                  >Library</router-link
                >
              </nav>
            </div>
          </div>
          <div class="iconlist flex gap-4 items-center max-lg:hidden">
            <router-link
              to="/wishlist"
              class="w-14 h-9 bg-bg-highlight flex items-center justify-center rounded"
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
      <div class="hidden lg:flex items-center py-2 px-4 mx-auto container">
        <div class="flex justify-between w-full">
          <nav class="subnav inline-flex gap-4">
            <router-link to="/" class="px-4 py-2">Home</router-link>
            <router-link to="/browse" class="px-4 py-2">Browse</router-link>
            <router-link to="/discover" class="px-4 py-2">Discover</router-link>
          </nav>
          <div
            class="flex justify-between py-2 px-4 bg-bg-main bg-opacity-20 rounded relative"
          >
            <input
              v-model="searchQuery"
              @input="searchGames"
              class="bg-opacity-0 bg-bg-main text-text-main placeholder:text-secondary md:w-80 sm:w-56"
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
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { baseURL } from "@/constants/api";
import { Game } from "@/interfaces/Product";
import gsap from "gsap";

const props = defineProps<{
  showSubnav?: boolean;
}>();

const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const showDropdown = ref(false);
const showHamburger = ref(false);
const searchQuery = ref("");
const searchResults = ref<Game[]>([]);

const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const navbar = ref();

let lastScrollY = window.scrollY;

const handleScroll = () => {
  if (window.scrollY <= 0) {
    gsap.set(navbar.value, { y: 0 });
  } else if (window.scrollY > lastScrollY) {
    if (navbar.value) {
      gsap.to(navbar.value, { y: -navbar.value.offsetHeight, duration: 0.5 });
    }
  } else {
    gsap.to(navbar.value, { y: 0, duration: 0.5 });
  }
  lastScrollY = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const subNavRoutes = [
  "/",
  "/browse",
  "/discover",
  "/points-shop",
  "/gift-cards",
  "/news",
];

const isActiveStore = computed(() => {
  return subNavRoutes.includes(route.path);
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function toggleHamburger() {
  showHamburger.value = !showHamburger.value;
}

function logout() {
  authStore.logout();
  toggleDropdown();
  window.location.reload();
}

async function searchGames() {
  if (searchQuery.value.trim() === "") {
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
    console.error("Error fetching search results:", error);
  }
}

function selectResult(result: any) {
  searchQuery.value = "";
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
