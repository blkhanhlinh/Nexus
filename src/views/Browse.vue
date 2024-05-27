<template>
  <layout
    :is-full="true"
    style="
      background: linear-gradient(78deg, #14344b 12.47%, #0e141b 96.75%);
      background-blend-mode: lighten;
    "
  >
    <div
      class="pb-20 w-full h-full"
      style="
        background: linear-gradient(
          204deg,
          #0e141b -5.59%,
          #14344b 85.15%,
          #14344b 85.15%
        );
      "
    >
      <div class="browse">
        <div class="md:container md:mx-auto pt-8 flex flex-col gap-12">
          <div class="flex flex-col gap-3 h-fit">
            <h1 class="text-2xl font-bold">Top Categories</h1>
            <category-slider
              :categories="genres"
              :pagination="false"
              @selectCategory="handleCategorySelect"
            ></category-slider>
          </div>
          <div ref="browseContainer" class="flex flex-col">
            <h1 class="text-2xl font-bold mb-6">Browse Nexus</h1>
            <div class="browse__container grid">
              <div
                class="browse__header grid col-span-2 bg-bg-main p-4 rounded-lg"
              >
                <div class="flex gap-4 items-center">
                  <p>View</p>
                  <div class="p-1 bg-bg-highlight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_660_10279)">
                        <path
                          d="M4.33333 15.1667H6.5C7.09583 15.1667 7.58333 14.6792 7.58333 14.0833V11.9167C7.58333 11.3208 7.09583 10.8333 6.5 10.8333H4.33333C3.7375 10.8333 3.25 11.3208 3.25 11.9167V14.0833C3.25 14.6792 3.7375 15.1667 4.33333 15.1667ZM4.33333 20.5833H6.5C7.09583 20.5833 7.58333 20.0958 7.58333 19.5V17.3333C7.58333 16.7375 7.09583 16.25 6.5 16.25H4.33333C3.7375 16.25 3.25 16.7375 3.25 17.3333V19.5C3.25 20.0958 3.7375 20.5833 4.33333 20.5833ZM4.33333 9.75H6.5C7.09583 9.75 7.58333 9.2625 7.58333 8.66667V6.5C7.58333 5.90417 7.09583 5.41667 6.5 5.41667H4.33333C3.7375 5.41667 3.25 5.90417 3.25 6.5V8.66667C3.25 9.2625 3.7375 9.75 4.33333 9.75ZM9.75 15.1667H20.5833C21.1792 15.1667 21.6667 14.6792 21.6667 14.0833V11.9167C21.6667 11.3208 21.1792 10.8333 20.5833 10.8333H9.75C9.15417 10.8333 8.66667 11.3208 8.66667 11.9167V14.0833C8.66667 14.6792 9.15417 15.1667 9.75 15.1667ZM9.75 20.5833H20.5833C21.1792 20.5833 21.6667 20.0958 21.6667 19.5V17.3333C21.6667 16.7375 21.1792 16.25 20.5833 16.25H9.75C9.15417 16.25 8.66667 16.7375 8.66667 17.3333V19.5C8.66667 20.0958 9.15417 20.5833 9.75 20.5833ZM8.66667 6.5V8.66667C8.66667 9.2625 9.15417 9.75 9.75 9.75H20.5833C21.1792 9.75 21.6667 9.2625 21.6667 8.66667V6.5C21.6667 5.90417 21.1792 5.41667 20.5833 5.41667H9.75C9.15417 5.41667 8.66667 5.90417 8.66667 6.5Z"
                          fill="#76808C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_660_10279">
                          <rect width="26" height="26" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div class="flex gap-4">
                  <primary-button
                    v-for="(type, index) in viewTypes"
                    :key="index"
                    :smaller="true"
                    :name="type"
                    :active="selectedViewType === type"
                    @click="handleViewTypeChange(type)"
                  >
                  </primary-button>
                </div>
              </div>
              <div
                class="browse__sidebar bg-bg-main p-4 rounded-lg flex flex-col gap-3 h-fit"
              >
                <div class="flex justify-between items-center">
                  <h2 class="text-lg uppercase">Filters</h2>
                  <div class="p-1 bg-bg-highlight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M12.3334 9.97918L11.1459 8.79168L14.1251 5.00001H7.35425L5.68758 3.33334H15.8334C16.1806 3.33334 16.4306 3.48612 16.5834 3.79168C16.7362 4.09723 16.7084 4.3889 16.5001 4.66668L12.3334 9.97918ZM16.4792 18.8333L11.6667 14.0208V15.8333C11.6667 16.0695 11.5869 16.2674 11.4272 16.4271C11.2674 16.5868 11.0695 16.6667 10.8334 16.6667H9.16675C8.93064 16.6667 8.73272 16.5868 8.573 16.4271C8.41328 16.2674 8.33342 16.0695 8.33342 15.8333V10.6875L1.16675 3.52084L2.33341 2.33334L17.6667 17.6667L16.4792 18.8333Z"
                        fill="#76808C"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  class="flex justify-between py-2 px-4 bg-secondary bg-opacity-20 rounded w-full"
                >
                  <input
                    v-model="searchQuery"
                    @input="filterGames"
                    class="bg-opacity-0 bg-bg-main text-text-main placeholder:text-secondary"
                    placeholder="Search for a tag..."
                  />
                  <img src="../assets/icons/search.svg" />
                </div>
                <div class="selected-tags flex flex-wrap gap-2">
                  <div
                    v-for="(tag, index) in selectedTags"
                    :key="index"
                    class="tag-item bg-bg-hover text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    {{ tag }}
                    <button @click="removeTag(tag)" class="text-white">
                      &times;
                    </button>
                  </div>
                </div>
                <div
                  v-for="(filter, index) in filters"
                  :key="index"
                  class="flex flex-col"
                >
                  <div
                    class="flex justify-between items-center cursor-pointer"
                    @click="toggleFilter(index)"
                  >
                    <p class="text-lg">{{ filter.label }}</p>
                    <img
                      :class="{ 'transform rotate-180': filter.open }"
                      src="../assets/icons/arrow-down.svg"
                      class="w-7 h-7"
                    />
                  </div>
                  <transition name="fade">
                    <div v-if="filter.open" class="flex flex-col gap-1 mt-2">
                      <div
                        v-for="(option, index) in visibleOptions(filter)"
                        :key="index"
                        class="flex items-start rounded w-full hover:bg-bg-hover focus:bg-bg-hover"
                        :class="
                          selectedFilters[filter.key].includes(option)
                            ? 'bg-bg-hover'
                            : ''
                        "
                      >
                        <input
                          type="checkbox"
                          :id="option"
                          v-model="selectedFilters[filter.key]"
                          :value="option"
                          @change="filterGames"
                          class="hidden"
                        />
                        <label
                          :for="option"
                          :class="{
                            active:
                              selectedFilters[filter.key].includes(option),
                          }"
                          class="px-3 py-2 w-full cursor-pointer"
                        >
                          {{ option }}
                        </label>
                      </div>
                      <button
                        v-if="filter.options.length > 6"
                        @click="toggleSeeMore(filter)"
                        class="text-primary mt-2"
                      >
                        {{ filter.showMore ? "Show Less" : "See More" }}
                      </button>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="browse__games">
                <div
                  v-if="loading"
                  class="h-full w-full flex justify-center items-center"
                >
                  <loader />
                </div>
                <div class="flex flex-col gap-2" v-else>
                  <game-card
                    v-for="(item, index) in paginatedGames"
                    :key="index"
                    :game="item"
                    variant="rowSlider"
                  ></game-card>
                </div>
                <div class="pagination">
                  <button
                    @click="handlePageChange(currentPage - 1)"
                    :disabled="currentPage === 1"
                  >
                    Prev
                  </button>

                  <button v-if="currentPage > 3" @click="handlePageChange(1)">
                    1
                  </button>
                  <span v-if="currentPage > 4">...</span>

                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="handlePageChange(page)"
                    :class="{ active: page === currentPage }"
                  >
                    {{ page }}
                  </button>

                  <span v-if="currentPage < totalPages - 3">...</span>
                  <button
                    v-if="currentPage < totalPages - 2"
                    @click="handlePageChange(totalPages)"
                  >
                    {{ totalPages }}
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
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useGameStore } from "@/stores/game.store";
import Layout from "@/components/Layout.vue";
import CategorySlider from "@/components/slider/CategorySlider.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import GameCard from "@/components/card/GameCard.vue";
import { Game } from "@/interfaces/Product";
import Loader from "@/components/Loader.vue";

interface FilterOption {
  label: string;
  key: keyof typeof selectedFilters.value;
  open: boolean;
  options: string[];
  showMore?: boolean;
}

const searchQuery = ref<string>("");
const selectedFilters = ref({
  genres: [] as string[],
  developers: [] as string[],
  publishers: [] as string[],
  operatingSystems: [] as string[],
  price: [] as string[],
});

const filters = ref<FilterOption[]>([
  { label: "Genres", key: "genres", open: true, options: [] },
  { label: "Developers", key: "developers", open: false, options: [] },
  { label: "Publishers", key: "publishers", open: false, options: [] },
  {
    label: "Operating Systems",
    key: "operatingSystems",
    open: false,
    options: [],
  },
  {
    label: "Price",
    key: "price",
    open: false,
    options: [
      "$0 - $10",
      "$10 - $20",
      "$20 - $30",
      "$30 - $40",
      "$40 - $50",
      "Above $50",
    ],
  },
]);

const games = ref<Game[]>([]);
const gameStore = useGameStore();
const selectedViewType = ref<string>("All Items");
const loading = ref<boolean>(true);
const genres = ref<string[]>([]);
const browseContainer = ref<HTMLElement | null>(null);

const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(games.value.length / itemsPerPage));

const visiblePages = computed(() => {
  const startPage = Math.max(currentPage.value - 2, 1);
  const endPage = Math.min(currentPage.value + 2, totalPages.value);

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

onMounted(async () => {
  loading.value = true;
  genres.value = (await gameStore.fetchGenre()) ?? [];
  filters.value.find((filter) => filter.key === "genres")!.options =
    (await gameStore.fetchGenre()) || [];
  filters.value.find((filter) => filter.key === "developers")!.options =
    (await gameStore.fetchDeveloper()) || [];
  filters.value.find((filter) => filter.key === "publishers")!.options =
    (await gameStore.fetchPublisher()) || [];
  filters.value.find((filter) => filter.key === "operatingSystems")!.options =
    (await gameStore.fetchOS()) || [];

  await fetchGamesByViewType();
  loading.value = false;
});

const fetchGamesByViewType = async () => {
  loading.value = true;
  switch (selectedViewType.value) {
    case "New and Trending":
      await gameStore.fetchGamesHome();
      games.value = gameStore.newAndTrending || [];
      break;
    default:
      games.value = (await gameStore.fetchAllGames()) || [];
      break;
  }
  loading.value = false;
};

const toggleFilter = (index: number) => {
  filters.value[index].open = !filters.value[index].open;
};

const toggleSeeMore = (filter: FilterOption) => {
  filter.showMore = !filter.showMore;
};

const visibleOptions = (filter: FilterOption) => {
  return filter.showMore ? filter.options : filter.options.slice(0, 6);
};

const filterGames = async () => {
  const searchParams = {
    title: searchQuery.value,
    genres: selectedFilters.value.genres,
    developers: selectedFilters.value.developers,
    publishers: selectedFilters.value.publishers,
    operatingSystems: selectedFilters.value.operatingSystems,
    minPrice:
      selectedFilters.value.price.length > 0
        ? selectedFilters.value.price[0].split(" - ")[0].replace("$", "")
        : undefined,
    maxPrice:
      selectedFilters.value.price.length > 0
        ? selectedFilters.value.price[0].split(" - ")[1].replace("$", "")
        : undefined,
  };
  games.value = (await gameStore.searchGame(searchParams)) || [];
  browseContainer.value?.scrollIntoView({ behavior: "smooth" });
};

const handleViewTypeChange = async (viewType: string) => {
  loading.value = true;
  selectedViewType.value = viewType;

  switch (viewType) {
    case "New and Trending":
      await gameStore.fetchGamesHome();
      games.value = gameStore.newAndTrending || [];
      break;
    default:
      games.value = (await gameStore.fetchAllGames()) || [];
      break;
  }

  loading.value = false;
};

const viewTypes = [
  "All Items",
  "New and Trending",
  "Top Sellers",
  "Top Rated",
  "Discounted",
  "Coming Soon",
  "On Wishlist",
];

const handleCategorySelect = async (category: string) => {
  selectedFilters.value.genres = [category];
  loading.value = true;
  await filterGames();
  browseContainer.value?.scrollIntoView({ behavior: "smooth" });
  loading.value = false;
};

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return games.value.slice(start, end);
});

const handlePageChange = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    browseContainer.value?.scrollIntoView({ behavior: "smooth" });
  }
};
const selectedTags = computed(() => {
  return Object.values(selectedFilters.value).flat();
});

const removeTag = (tag: string) => {
  for (let key in selectedFilters.value) {
    const index =
      selectedFilters.value[key as keyof typeof selectedFilters.value].indexOf(
        tag
      );
    if (index > -1) {
      selectedFilters.value[key as keyof typeof selectedFilters.value].splice(
        index,
        1
      );
    }
  }
  filterGames();
};
</script>

<style scoped lang="scss">
.browse {
  background-blend-mode: lighten;
  .browse__container {
    grid-template-columns: 320px auto;
    grid-row-gap: 1rem;
    grid-column-gap: 0.5rem;
    .browse__header {
      grid-template-columns: 304px auto;
      grid-column-gap: 0.5rem;
    }
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
    }
  }
  .selected-tags {
    margin-top: 10px;
  }
  .tag-item {
    background-color: $bg-hover;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .tag-item button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 5px;
  }
}

label.active {
  background-color: $bg-hover;
  color: white;
}
.primary-button.active {
  background-color: $bg-hover;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
