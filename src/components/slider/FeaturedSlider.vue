<template>
  <div class="w-full h-full py-5 relative bg-bg-main bg-opacity-20 rounded-lg">
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="30"
      :centeredSlides="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :navigation="true"
      @swiper="onSwiper"
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

const modules = [Navigation, Pagination, Autoplay];

const swiperInstance = ref();
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

<style scoped>
.swiper {
  height: 100%;
  width: 100%;
  padding: 0 1.5rem !important;
}
</style>

<style lang="scss">
.swiper-pagination {
  position: relative !important;
  margin-top: 2rem !important;
}

.swiper-pagination-bullet {
  color: $bg-main !important;
  width: 2.25rem !important;
  border-radius: 9999px !important;
  margin: 0 0.5rem !important;
}

.swiper-pagination-bullet-active {
  background-color: $color-secondary !important;
}

.swiper-button-prev,
.swiper-button-next {
  color: $text-main !important;
  position: absolute !important;
}

.swiper-button-prev {
  left: 0 !important;
}

.swiper-button-next {
  right: 0 !important;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 24px !important;
  font-weight: 700 !important;
}
</style>
