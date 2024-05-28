<template>
  <div class="w-full py-5 relative bg-bg-main bg-opacity-20 rounded">
    <swiper
      :modules="modules"
      :slidesPerView="3"
      :spaceBetween="30"
      :centeredSlides="false"
      :pagination="{ clickable: true }"
      :navigation="true"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }"
      class="mySwiper"
    >
      <swiper-slide
        v-for="item in props.games"
        :key="item.gameID"
      >
        <div
          class="bg-bg-main rounded-lg p-4 w-full flex flex-col gap-5 justify-between"
        >
          <img
            loading="lazy"
            :src="item.image"
            :alt="item.gameName"
            class="w-full h-60 object-cover cursor-pointer"
            @click="goToGameDetails(item.gameID)"
          />
          <div class="flex flex-col gap-4 w-full">
            <div class="flex justify-between items-center w-full">
              <h3
                class="font-bold text-text-main text-xl cursor-pointer"
                @click="goToGameDetails(item.gameID)"
              >
                {{ item.gameName }}
              </h3>
              <icon-button
                @click.prevent="toggleWishlist"
                type="icon"
                :btn-style="wishlistIcon"
              ></icon-button>
            </div>
            <div class="flex justify-between items-center">
              <icon-o-s :os="item.os[0]"></icon-o-s>
              <main-cta
                :price="item.price"
                :gameId="item.gameID.toString()"
              ></main-cta>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
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

const isInWishlist = ref(false);

const wishlistIcon = computed(() => (isInWishlist.value ? "fill" : "default"));

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
};

const goToGameDetails = (gameID: number) => {
  router.push(`/games/${gameID}`).then(() => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 0.8, ease: "power1.out" });
  });
};
</script>

<style lang="scss" scoped>
</style>
