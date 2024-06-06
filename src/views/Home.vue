<template>
  <layout>
    <div v-if="showSuccessMessage" class="absolute top-6 flex w-screen justify-center">
      <div ref="alertSuccess" class="alert-success">
        Account has been registered successfully!
      </div>
    </div>
    <div class="mb-16 lg:mb-24">
      <img loading="lazy" class="lg:h-full h-auto w-max mb-10 lg:mb-20 lg:-mt-0 -mt-[52px]" src="../assets/images/home_header_bg.gif" />
      <div class="flex flex-col gap-10 lg:gap-20">
        <div class="flex flex-col gap-5">
          <h1 class="text-lg lg:text-xl font-bold uppercase">Featured</h1>
          <featured-slider></featured-slider>
        </div>
        <div class="flex flex-col gap-5">
          <h1 class="text-lg lg:text-xl font-bold uppercase">Category</h1>
          <category-slider :pagination="true" :categories="categories"></category-slider>
        </div>
        <div v-if="isAuthenticated" class="flex flex-col gap-5">
          <h1 class="text-lg lg:text-xl font-bold uppercase">Recommend for you</h1>
          <game-slider type="recommend"></game-slider>
        </div>
        <div class="flex flex-col gap-5">
          <h1 class="text-lg lg:text-xl font-bold uppercase">New & Trending</h1>
          <game-slider type="new"></game-slider>
        </div>
        <div class="flex flex-col gap-5">
          <h1 class="text-lg lg:text-xl font-bold uppercase">Under $20</h1>
          <game-slider type="underTwenty"></game-slider>
        </div>
      </div>
    </div>
    <ChatButton class="z-50"/>
  </layout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import FeaturedSlider from "@/components/slider/FeaturedSlider.vue";
import CategorySlider from "@/components/slider/CategorySlider.vue";
import GameSlider from "@/components/slider/GameSlider.vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import Layout from "@/components/Layout.vue";
import ChatButton from "@/components/chat/ChatButton.vue";

const showSuccessMessage = ref(false);
const route = useRoute();
const alertSuccess = ref(null);

const categories = [
  'Action',
  'Adventure',
  'Drama',
  'FPS',
  'Fantasy',
  'Fighting',
  'Open World',
  'Puzzle',
  'RPG',
];

onMounted(() => {
  if (route.query.registered === "true") {
    showSuccessMessage.value = true;
    gsap.fromTo(
      alertSuccess.value,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "sine.out" }
    );

    setTimeout(() => {
      gsap.to(alertSuccess.value, {
        y: -50,
        opacity: 0,
        duration: 2.5,
        ease: "sine.in",
        onComplete: () => {
          showSuccessMessage.value = false;
        },
      });
    }, 3000);
  }
});

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<style lang="scss" scoped>
.alert-success {
  background-color: $accent-green;
  color: $text-main;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
</style>