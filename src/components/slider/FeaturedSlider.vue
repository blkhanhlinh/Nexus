<template>
  <div class="w-full h-full py-5 relative bg-bg-main bg-opacity-20 rounded-lg">
    <div v-if="loading" class="flex justify-center items-center h-[524px]">
      <loader></loader>
    </div>
    <swiper
      v-else
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="30"
      :centeredSlides="false"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :navigation="true"
      @swiper="onSwiper"
      :loop="true"
      class="mySwiper"
    >
      <swiper-slide v-for="item in featuredItems" :key="item.gameId">
        <featured-card :game="item"></featured-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import axios from "axios";
import FeaturedCard from "@/components/card/FeaturedCard.vue";
import { gameAPI } from "@/constants/api";
import { Game } from "@/interfaces/Product";
import Loader from "../Loader.vue";

const modules = [Navigation, Pagination, Autoplay];

const swiperInstance = ref(null);
function onSwiper(swiper: any) {
  swiperInstance.value = swiper;
}

const featuredItems = ref<Game[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get<Game[]>(`${gameAPI}game/featured`);
    featuredItems.value = response.data;
  } catch (error) {
    console.error("Failed to fetch featured games:", error);
  } finally {
    loading.value = false;
  }
});
</script>
