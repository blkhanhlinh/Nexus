<template>
    <Navbar :show-subnav="!isLogin" />
    <main v-bind="$attrs">
        <div :class="
            isLogin || isFull ? '' : 'container mx-auto pb-20 px-2'
        ">
            <slot></slot>
        </div>
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useAttrs } from "vue";

const props = defineProps<{
    isLogin?: boolean;
    isFull?: boolean;
}>();
const attrs = useAttrs();
</script>