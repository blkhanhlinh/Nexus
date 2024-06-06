<template>
  <div class="w-full py-5 relative bg-bg-main bg-opacity-20 rounded">
    <swiper
      :modules="modules"
      :centeredSlides="false"
      :pagination="{ clickable: true }"
      :navigation="true"
      :breakpoints="breakpoints"
      :grid="{
          rows: grid.rows,
          fill: grid.fill as 'row' | 'column' | undefined,
        }"
      :slidesPerView="1"
      :spaceBetween="30"
      class="mySwiper"
    >
      <swiper-slide v-for="item in games" :key="item.gameId">
        <game-card
          :game="item"
          :variant="variant"
          class="flex justify-between"
        ></game-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import GameCard from "../card/GameCard.vue";
import { useGameStore } from "@/stores/game.store";

const modules = [Navigation, Pagination, Grid];

const props = defineProps<{ type: string }>();

const gameStore = useGameStore();

const flattenGameDetails = (gameDetails: any) => {
  return gameDetails.flatMap((detail: any) => detail.gameDetailList);
};

const games = computed(() => {
  switch (props.type) {
    case "recommend":
      return flattenGameDetails(gameStore.recommend).slice(0, 10);
    case "new":
      return gameStore.newAndTrending;
    case "underTwenty":
      return gameStore.underTwenty?.slice(0, 10) ?? [];
    default:
      return [];
  }
});

const grid = computed(() => {
  switch (props.type) {
    case "recommend":
      return { rows: 1, fill: "row" };
    case "new":
      return { rows: 3, fill: "row" };
    case "underTwenty":
      return { rows: 1, fill: "row" };
    default:
      return { rows: 2, fill: "row" };
  }
});

const breakpoints = computed(() => {
  return {
    "640": {
      slidesPerView: props.type === "new" ? 1 : 2,
      spaceBetween: 30,
    },
    "768": {
      slidesPerView: props.type === "new" ? 1 : 2,
      spaceBetween: 30,
    },
    "1024": {
      slidesPerView: props.type === "new" ? 2 : 3,
      spaceBetween: 30,
    },
  };
});

const variant = computed(() => {
  switch (props.type) {
    case "new":
      return "rowSlider";
    case "recommend":
    case "underTwenty":
      return "columnSlider";
  }
});

onMounted(() => {
  if (props.type === "recommend" && (gameStore.recommend ?? []).length === 0) {
    gameStore.fetchGamesHome();
  } else if (
    props.type === "new" &&
    (gameStore.newAndTrending ?? []).length === 0
  ) {
    gameStore.fetchGamesHome();
  } else if (
    props.type === "underTwenty" &&
    (gameStore.underTwenty ?? []).length === 0
  ) {
    gameStore.fetchGamesHome();
  }
});
</script>

<style lang="scss" scoped></style>
