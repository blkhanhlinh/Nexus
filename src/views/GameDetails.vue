<template>
  <layout>
    <div v-if="game" class="my-8 flex flex-col gap-4">
      <!-- Game Header -->
      <div class="flex justify-between items-center p-4 rounded-lg bg-bg-main">
        <h1 class="font-bold text-3xl">{{ game.title }}</h1>
        <div class="flex justify-end items-center flex-shrink-0 gap-3">
          <secondary-button name="Ignore"></secondary-button>
          <secondary-button name="Follow"></secondary-button>
          <icon-button
            type="text"
            name="Wishlist"
            icon-src="/src/assets/icons/heart.svg"
          ></icon-button>
          <primary-button name="Browse All DLCs"></primary-button>
          <primary-button name="Community Hub"></primary-button>
        </div>
      </div>
      <!-- Game Thumbnails -->
      <div class="bg-bg-main h-fit p-6 rounded-lg grid grid-cols-3 gap-x-4">
        <div class="col-span-2">
          <div class="swiper-container">
            <swiper
              v-if="thumbsSwiper"
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '24px',
                '--swiper-theme-color': '#4B619B',
              }"
              :loop="true"
              :spaceBetween="30"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              class="mySwiper2"
            >
              <swiper-slide
                v-for="(image, index) in game.url.slice(1)"
                :key="index"
              >
                <img :src="image" class="object-cover w-full rounded-lg" />
              </swiper-slide>
            </swiper>
            <swiper
              ref="thumbsSwiperRef"
              @swiper="onSwiper"
              :loop="true"
              :spaceBetween="10"
              :slidesPerView="4"
              :freeMode="true"
              :watchSlidesProgress="true"
              :modules="modules"
              :pagination="{ clickable: true }"
              class="mySwiper"
            >
              <swiper-slide
                v-for="(image, index) in game.url.slice(1)"
                :key="index"
              >
                <img
                  :src="image"
                  class="cursor-pointer object-cover w-full rounded"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col justify-between h-full">
            <img :src="game.url[0]" class="h-48 w-full object-cover" />
            <p class="">
              {{ game.plotAndGameplay.slice(0, 150).concat("...") }}
            </p>
            <div class="flex flex-col gap-3">
              <p class="text-text-dim">Reviews</p>
              <div class="flex justify-between items-center">
                <p class="capitalize w-24">Past Month</p>
                <rating-bar :pos="90" :neg="10"></rating-bar>
                <p class="text-secondary">534,170 Reviews</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="capitalize w-24">All Time</p>
                <rating-bar :pos="90" :neg="10"></rating-bar>
                <p class="text-secondary">534,170 Reviews</p>
              </div>
              <div class="flex items-center">
                <p class="text-text-dim capitalize w-24 mr-[14px]">
                  release date
                </p>
                <p>{{ game.releaseDate }}</p>
              </div>
              <div class="flex items-center">
                <p class="text-text-dim capitalize w-24 mr-[14px]">developer</p>
                <p>{{ game.developer }}</p>
              </div>
              <div class="flex items-center">
                <p class="text-text-dim capitalize w-24 mr-[14px]">publisher</p>
                <p>{{ game.publisher }}</p>
              </div>
              <div class="flex items-center">
                <p class="text-text-dim capitalize w-24 mr-[14px]">
                  popular tags
                </p>
                <div
                  class="flex items-center py-2 px-3 rounded bg-bg-highlight text-text-dim text-sm"
                >
                  {{ game.genre }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-x-6 gap-y-4">
        <div class="col-span-2 flex flex-col gap-4">
          <div class="p-6 bg-bg-main rounded-lg flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <p class="text-xl font-bold">{{ game.title }}</p>
              <div class="flex gap-12 items-center">
                <icon-o-s :os="game.operatingSystem"></icon-o-s>
                <main-cta :price="game.price" :gameId="gameID"></main-cta>
              </div>
            </div>
            <div
              class="flex flex-col gap-2 p-5 bg-bg-highlight bg-opacity-40 rounded"
            >
              <p class="text-text-dim">Includes:</p>
              <ul class="list-disc flex flex-col">
                <li class="list-inside">{{ game.title }} (full game)</li>
                <li class="list-inside">
                  Digital Artbook & Original Soundtrack
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col gap-4 p-6 bg-bg-main rounded-lg">
            <h2 class="font-bold text-2xl text-text-dim">
              About {{ game.title }}
            </h2>
            <img class="w-full h-auto" src="../assets/images/demo.gif"/>
            <p class="flex flex-col items-center justify-center gap-4">
              {{ truncatedPlotAndGameplay }}
              <button
                @click="toggleShowFullPlot"
                class="text-secondary"
              >
                {{ showFullPlot ? "Show Less" : "Show More" }}
              </button>
            </p>
          </div>
        </div>
        <div class="p-6 bg-bg-main rounded-lg h-fit flex flex-col gap-2">
          <h2 class="text-lg text-text-dim">Features</h2>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/single-player.svg" />
              <p class="text-chalkyBlue">Single Player</p>
            </div>
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/co-op.svg" />
              <p class="text-chalkyBlue">Online Co-Op</p>
            </div>
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/achv.svg" />
              <p class="text-chalkyBlue">Nexus Achievements</p>
            </div>
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/controller.svg" />
              <p class="text-chalkyBlue">Full Controller Support</p>
            </div>
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/cards.svg" />
              <p class="text-chalkyBlue">Nexus Trading Cards</p>
            </div>
            <div class="flex items-center gap-3 w-full rounded bg-bg-highlight bg-opacity-40 py-2 px-3">
              <img src="../assets/icons/cloud.svg" />
              <p class="text-chalkyBlue">Nexus Cloud</p>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Similar Games</h1>
          </div>
          <recommend-slider :games="games"></recommend-slider>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { baseURL } from "@/constants/api";
import { Game, RecommendCard } from "@/interfaces/Product";
import Layout from "@/components/Layout.vue";
import MainCta from "@/components/button/MainCta.vue";
import IconOS from "@/components/common/IconOS.vue";
import {
  PrimaryButton,
  IconButton,
  SecondaryButton,
} from "@/components/button";
import RatingBar from "@/components/common/RatingBar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import RecommendSlider from "@/components/slider/RecommendSlider.vue";
import { gsap } from "gsap";

const route = useRoute();
const gameID = ref(route.params.id as string);
const game = ref<Game | null>(null);
const modules = [FreeMode, Navigation, Thumbs, Pagination];
const thumbsSwiper = ref<any>(null);
const showFullPlot = ref<boolean>(false);
const loading = ref<boolean>(true);
const games = ref<RecommendCard[]>([]);

const onSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

const fetchGameDetails = async (id: string) => {
  try {
    const response = await axios.get<Game>(`${baseURL}game/${id}`);
    game.value = response.data;
    await nextTick();
    if (thumbsSwiper.value) {
      thumbsSwiper.value.update();
    }
  } catch (error) {
    console.error("Failed to fetch game details:", error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.id,
  async (newGameID) => {
    if (newGameID) {
      gameID.value = newGameID as string;
      await fetchGameDetails(gameID.value).then(() => {
        gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: "power2.inOut" });
      });
      await fetchRecommendGames(gameID.value);
    }
  }
);

const fetchRecommendGames = async (id: string) => {
  try {
    const res = await axios.post(
      `${baseURL}recommender/recommend`,
      { id, top_k: 10 },
      { headers: { "Content-Type": "application/json" } }
    );
    games.value = res.data.response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchGameDetails(gameID.value);
});onMounted(async () => {
  try {
    const res = await axios.post(
      `${baseURL}recommender/recommend`,
      {
        id: gameID.value,
        top_k: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    games.value = res.data.response;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const toggleShowFullPlot = () => {
  showFullPlot.value = !showFullPlot.value;
};

const truncatedPlotAndGameplay = computed(() => {
  if (showFullPlot.value || !game.value) {
    return game.value?.plotAndGameplay;
  }
  return game.value?.plotAndGameplay.slice(0, 340).concat("...");
});
</script>

<style scoped lang="scss">
.swiper-container {
  width: 100%;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  width: 100%;
  height: 400px;
}

.mySwiper {
  height: 112px;
  margin-top: 24px;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
}

.mySwiper .swiper-slide-thumb-active {
  border: 2px solid $color-secondary;
  border-radius: 3px;
}

.mySwiper .swiper-pagination-bullet-active {
  background-color: $color-secondary;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>