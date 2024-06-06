<template>
  <div class="w-full py-5 relative bg-bg-main bg-opacity-20 rounded overflow-hidden">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :loop="true"
      :modules="modules"
      :centeredSlides="false"
      :pagination="pagination ? { clickable: true } : false"
      :navigation="true"
      :breakpoints="{
        '640': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }"
      @swiper="onSwiper"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in categories" :key="index">
        <category-card :cate="item" @click="handleCategoryClick(item)"></category-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import CategoryCard from "@/components/card/CategoryCard.vue";

const props = defineProps<{
  categories: string[];
  pagination?: boolean;
}>();
const emit = defineEmits(["selectCategory"]);

const swiperCate = ref();
function onSwiper(swiper: any) {
  swiperCate.value = swiper;
}

const handleCategoryClick = (category: string) => {
  emit("selectCategory", category);
};

const modules = [Navigation, Pagination, Autoplay];
</script>

<style lang="scss" scoped>
</style>