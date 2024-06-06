<template>
  <button
    :class="['flex gap-2 items-center rounded bg-bg-highlight', buttonClass]"
  >
    <p v-if="type === 'text'">{{ name }}</p>
    <img v-if="iconSrc" :src="iconSrc" />
    <div v-if="btnStyle === 'default'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        class="h-4 w-4 lg:h-6 lg:w-6"
      >
        <g clip-path="url(#clip0_1059_1632)">
          <path
            d="M20.1602 4.48998C17.5202 2.68998 14.2602 3.52998 12.5002 5.58998C10.7402 3.52998 7.48021 2.67998 4.84021 4.48998C3.44021 5.44998 2.56021 7.06998 2.50021 8.77998C2.36021 12.66 5.80021 15.77 11.0502 20.54L11.1502 20.63C11.9102 21.32 13.0802 21.32 13.8402 20.62L13.9502 20.52C19.2002 15.76 22.6302 12.65 22.5002 8.76998C22.4402 7.06998 21.5602 5.44998 20.1602 4.48998ZM12.6002 19.05L12.5002 19.15L12.4002 19.05C7.64021 14.74 4.50021 11.89 4.50021 8.99998C4.50021 6.99998 6.00021 5.49998 8.00021 5.49998C9.54021 5.49998 11.0402 6.48998 11.5702 7.85998H13.4402C13.9602 6.48998 15.4602 5.49998 17.0002 5.49998C19.0002 5.49998 20.5002 6.99998 20.5002 8.99998C20.5002 11.89 17.3602 14.74 12.6002 19.05Z"
            fill="#F3F3F3"
          />
        </g>
        <defs>
          <clipPath id="clip0_1059_1632">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div v-if="btnStyle === 'fill'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <g clip-path="url(#clip0_1410_275)">
          <path
            d="M13.8499 20.1299C13.0899 20.8199 11.9199 20.8199 11.1599 20.1199L11.0499 20.0199C5.79991 15.2699 2.36991 12.1599 2.49991 8.27992C2.55991 6.57992 3.42991 4.94992 4.83991 3.98992C7.47991 2.18992 10.7399 3.02992 12.4999 5.08992C14.2599 3.02992 17.5199 2.17992 20.1599 3.98992C21.5699 4.94992 22.4399 6.57992 22.4999 8.27992C22.6399 12.1599 19.1999 15.2699 13.9499 20.0399L13.8499 20.1299Z"
            fill="#F3F3F3"
          />
        </g>
        <defs>
          <clipPath id="clip0_1410_275">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: "text" | "icon";
  name?: string;
  iconSrc?: string;
  smaller?: boolean;
  btnStyle?: string;
}>();

const buttonClass =
  props.type === "text"
    ? ` ${props.smaller ? "px-3 py-2" : "h-auto py-2 px-3 lg:px-5 lg:py-4 lg:h-[52px]"}`
    : "p-1 md:p-2 h-fit w-auto";
</script>

<style scoped></style>
