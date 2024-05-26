<template>
  <div class="rounded-full flex p-1 w-fit items-center flex-col-reverse">
    <div class="rounded-full flex p-1 w-40 items-center">
      <div class="pos-bar" :style="{ width: pos + '%' }"></div>
      <div class="neg-bar relative" :style="{ width: neg + '%' }"></div>
    </div>
    <div class="flex w-full justify-between">
      <div class="flex items-center gap-1">
        <p class="text-blue" >{{ pos }}%</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
        >
          <g opacity="0.4" clip-path="url(#clip0_1410_7583)">
            <path
              d="M5.89337 1.28252L8.89421 4.28335C9.09462 4.48377 9.20837 4.76002 9.20837 5.0471V10.4584C9.20837 11.0542 8.72087 11.5417 8.12504 11.5417H3.25004C2.81671 11.5417 2.42671 11.2817 2.25337 10.8863L0.48754 6.76419C0.0325403 5.69169 0.817957 4.50002 1.98254 4.50002H5.04296L4.52837 2.01919C4.47421 1.74835 4.55546 1.4721 4.75046 1.2771C5.07004 0.962938 5.57921 0.962938 5.89337 1.28252ZM11.375 11.5417C10.7792 11.5417 10.2917 11.0542 10.2917 10.4584V6.12502C10.2917 5.52919 10.7792 5.04169 11.375 5.04169C11.9709 5.04169 12.4584 5.52919 12.4584 6.12502V10.4584C12.4584 11.0542 11.9709 11.5417 11.375 11.5417Z"
              fill="#66C0F4"
            />
          </g>
          <defs>
            <clipPath id="clip0_1410_7583">
              <rect
                width="13"
                height="13"
                fill="white"
                transform="matrix(-1 0 0 1 13 0.166687)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="flex items-center gap-1 justify-end">
        <p class="text-red">{{ neg }}%</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
        >
          <g opacity="0.4">
            <path
              d="M5.89337 12.0509L8.89421 9.05002C9.09462 8.8496 9.20837 8.57335 9.20837 8.28627L9.20837 2.87502C9.20837 2.27919 8.72087 1.79168 8.12504 1.79168L3.25004 1.79168C2.81671 1.79168 2.42671 2.05168 2.25337 2.4471L0.487541 6.56918C0.0325407 7.64168 0.817957 8.83335 1.98254 8.83335L5.04296 8.83335L4.52837 11.3142C4.47421 11.585 4.55546 11.8613 4.75046 12.0563C5.07004 12.3704 5.57921 12.3704 5.89337 12.0509ZM11.375 1.79169C10.7792 1.79168 10.2917 2.27919 10.2917 2.87502L10.2917 7.20835C10.2917 7.80419 10.7792 8.29169 11.375 8.29169C11.9709 8.29169 12.4584 7.80419 12.4584 7.20835L12.4584 2.87502C12.4584 2.27919 11.9709 1.79169 11.375 1.79169Z"
              fill="#CD5444"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  pos: number;
  neg: number;
}>();
</script>

<style scoped>
.pos-bar {
  background-color: #66c0f4;
  height: 0.25rem;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5px;
  color: white;
  font-size: 0.7em;
  white-space: nowrap;
}

.neg-bar {
  background-color: #ff4500;
  height: 0.25rem;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5px;
  color: white;
  font-size: 0.7em;
  white-space: nowrap;
}
</style>
