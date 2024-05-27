<template>
  <div class="w-full py-5 relative bg-bg-main bg-opacity-20 rounded">
    <swiper
      :modules="modules"
      :slidesPerView="3"
      :spaceBetween="30"
      :centeredSlides="false"
      :pagination="{ clickable: true }"
      :navigation="true"
    >
      <swiper-slide
        v-for="item in props.games"
        :key="item.gameID"
        class="cursor-pointer"
      >
        <div
          class="bg-bg-main rounded-lg p-4 w-full flex flex-col gap-5 justify-between"
        >
          <img
            :src="item.image"
            :alt="item.gameName"
            class="w-full h-60 object-cover"
            @click="goToGameDetails(item.gameID)"
          />
          <div class="flex flex-col gap-4 w-full">
            <div class="flex justify-between items-center w-full">
              <h3
                class="font-bold text-text-main text-xl"
                @click="goToGameDetails(item.gameID)"
              >
                {{ item.gameName }}
              </h3>
              <icon-button
                type="icon"
                name="Wishlist"
                icon-src="/src/assets/icons/heart.svg"
              ></icon-button>
            </div>
            <div class="flex justify-between items-center">
              <icon-o-s :os="item.os[0]"></icon-o-s>
              <main-cta :price="item.price" :gameId="item.gameID.toString()"></main-cta>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RecommendCard } from "@/interfaces/Product";
import IconButton from "@/components/button/IconButton.vue";
import IconOS from "@/components/common/IconOS.vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MainCta from "../button/MainCta.vue";

gsap.registerPlugin(ScrollToPlugin);

const modules = [Navigation, Pagination];
const router = useRouter();
const props = defineProps<{
  games: RecommendCard[];
}>();

const goToGameDetails = (gameID: number) => {
  router.push(`/games/${gameID}`).then(() => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: "power2.inOut" });
  });
};
</script>

<style scoped>
.swiper {
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
