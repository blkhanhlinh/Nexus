<template>
  <div class="box h-56 w-full relative cursor-pointer" @click="selectCategory">
    <img
      class="rectangle"
      v-if="cate?.startsWith('A')"
      src="../../assets/images/action.png"
    />
    <img
      class="rectangle"
      v-else-if="cate?.startsWith('R') || cate?.startsWith('D')"
      src="../../assets/images/rpg.png"
    />
    <img
      class="rectangle"
      v-else-if="cate?.startsWith('S') || cate?.startsWith('F')"
      src="../../assets/images/free-to-play.png"
    />
    <img
      class="rectangle"
      v-else-if="cate?.startsWith('P')"
      src="../../assets/images/co-op.png"
    />
    <img
      class="rectangle"
      v-else
      :src="defaultImage"
    />
    <div class="bg-bg-highlight bg-opacity-50 w-full h-56 absolute z-1"></div>
    <span
      class="font-semibold text-xl absolute self-center text-center flex flex-col w-full h-full justify-center z-10"
    >{{ cate }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  cate: string;
}>();
const emits = defineEmits(['selectCategory']);

const selectCategory = () => {
  emits('selectCategory', props.cate);
};

const defaultImage = "../../assets/images/anime.png";
</script>

<style scoped lang="scss">
.box {
  .rectangle {
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, rgba(23, 17, 36, 0.56) 0%, rgba(23, 17, 36, 0.80) 100%),lightgray 50% / cover no-repeat;
    backdrop-filter: blur(6px);
  }
  img:nth-child(2) {
    background: linear-gradient(180deg, rgba(14, 19, 37, 0.46) 0%, #0E1325 100%);
  }
  img:nth-child(3) {
    background: linear-gradient(180deg, rgba(35, 55, 75, 0.36) 0%, #23374B 100%);
  }
}
</style>
