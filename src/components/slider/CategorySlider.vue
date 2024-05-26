<template>
  <div class="w-full py-5 relative bg-bg-main bg-opacity-20 rounded">
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :loop="true"
      :modules="modules"
      :centeredSlides="false"
      :pagination="pagination ? { clickable: true } : false"
      :navigation="true"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(item, index) in categories" :key="index">
        <category-card :cate="item" @click="handleCategoryClick(item)"></category-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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

const modules = [Navigation, Pagination];
</script>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper {
  padding: 0 1.5rem !important;
}
</style>