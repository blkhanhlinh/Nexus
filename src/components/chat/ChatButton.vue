<template>
  <div class="fixed bottom-8 right-8 flex flex-row items-end gap-4 z-10">
    <div class="flex flex-col-reverse items-end gap-3">
      <div class="flex gap-4">
        <transition name="fade">
          <div
            v-if="showGreeting"
            class="bg-white text-text-dim p-4 rounded shadow-lg flex items-center space-x-2 z-auto"
          >
            <span>👋</span>
            <span>I'm here to help you.</span>
          </div>
        </transition>
        <button
          @click="toggleChat"
          class="w-fit h-fit bg-blue text-text-main rounded-full p-2 shadow-lg hover:bg-blueHi"
        >
          <div class="h-12 w-12 flex justify-center items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1875 12C14.8537 12 14.5275 12.099 14.25 12.2844C13.9725 12.4698 13.7562 12.7334 13.6285 13.0417C13.5007 13.3501 13.4673 13.6894 13.5324 14.0167C13.5975 14.3441 13.7583 14.6447 13.9943 14.8807C14.2303 15.1167 14.5309 15.2775 14.8583 15.3426C15.1856 15.4077 15.5249 15.3743 15.8333 15.2465C16.1416 15.1188 16.4052 14.9025 16.5906 14.625C16.776 14.3475 16.875 14.0213 16.875 13.6875C16.875 13.2399 16.6972 12.8107 16.3807 12.4943C16.0643 12.1778 15.6351 12 15.1875 12Z"
                fill="#F3F3F3"
              />
              <path
                d="M9.45851 15.2465C10.3196 14.8898 10.7284 13.9027 10.3718 13.0417C10.0151 12.1806 9.02799 11.7717 8.16696 12.1284C7.30592 12.485 6.89703 13.4722 7.25369 14.3332C7.61034 15.1943 8.59748 15.6031 9.45851 15.2465Z"
                fill="#F3F3F3"
              />
              <path
                d="M23.25 11.8955C23.25 10.4334 22.0716 9.24422 20.625 9.24422C20.0153 9.24417 19.4248 9.45742 18.9558 9.84703C17.3152 8.73281 15.1692 8.05078 12.8785 7.9125L13.9097 4.20938L17.0227 4.82812C17.1117 6.06938 18.1477 7.05422 19.3969 7.05422C20.7094 7.05422 21.7772 5.97609 21.7772 4.65375C21.7772 3.33141 20.6719 2.25 19.3594 2.25C18.4439 2.25 17.6574 2.77453 17.2571 3.59859L13.0383 2.76L11.5805 7.89375L11.3635 7.89984C8.99018 8.00344 6.75378 8.69344 5.04612 9.84656C4.57725 9.45552 3.98556 9.24224 3.37503 9.24422C1.92706 9.24422 0.750026 10.4334 0.750026 11.8955C0.747959 12.3608 0.868695 12.8185 1.10004 13.2223C1.3314 13.626 1.66517 13.9616 2.06768 14.1952C2.03965 14.4024 2.02571 14.6113 2.02596 14.8205C2.03112 16.6833 3.08018 18.4298 4.97909 19.7423C6.86065 21.0361 9.35206 21.75 12 21.75C14.648 21.75 17.145 21.0361 19.0233 19.7395C20.9231 18.427 21.9694 16.68 21.9694 14.8148C21.969 14.6064 21.9558 14.3982 21.93 14.1914C22.3328 13.9589 22.667 13.6241 22.8987 13.2209C23.1305 12.8178 23.2517 12.3605 23.25 11.8955ZM19.4063 3.51562C19.6288 3.51562 19.8463 3.58161 20.0313 3.70522C20.2163 3.82884 20.3605 4.00454 20.4456 4.21011C20.5308 4.41567 20.5531 4.64187 20.5097 4.8601C20.4663 5.07833 20.3591 5.27879 20.2018 5.43612C20.0444 5.59345 19.844 5.7006 19.6258 5.74401C19.4075 5.78742 19.1813 5.76514 18.9758 5.67999C18.7702 5.59484 18.5945 5.45065 18.4709 5.26564C18.3473 5.08064 18.2813 4.86313 18.2813 4.64062C18.2813 4.34226 18.3998 4.05611 18.6108 3.84513C18.8218 3.63415 19.1079 3.51562 19.4063 3.51562ZM2.00253 11.8955C2.00115 11.528 2.14557 11.1751 2.40411 10.914C2.66264 10.6529 3.01417 10.505 3.38159 10.5028C3.60436 10.5033 3.8236 10.5585 4.02003 10.6636C3.29346 11.3391 2.75768 12.0891 2.42299 12.8986C2.2903 12.7673 2.18484 12.6111 2.11268 12.439C2.04052 12.2668 2.00309 12.0821 2.00253 11.8955ZM18.3197 18.7031C16.6444 19.8558 14.401 20.4909 12.0024 20.4909C9.60378 20.4909 7.3594 19.8567 5.68549 18.7031C4.13862 17.6348 3.28362 16.2534 3.28362 14.8125C3.28448 14.3759 3.36305 13.9429 3.51565 13.5338C3.7819 12.7959 4.27315 12.105 4.97581 11.4811C5.19534 11.2872 5.42639 11.1067 5.66768 10.9406L5.68174 10.9308L5.69299 10.9228C7.36737 9.77344 9.60799 9.14156 12.0028 9.14156C14.3977 9.14156 16.6388 9.77484 18.3132 10.9228L18.3239 10.9308L18.3399 10.9425C18.5808 11.1079 18.8117 11.2876 19.0313 11.4806C19.7344 12.105 20.2257 12.7955 20.4919 13.5342C20.5885 13.8023 20.6562 14.08 20.6939 14.3625C20.7127 14.5125 20.7221 14.6636 20.7221 14.8148C20.7216 16.2548 19.8685 17.6362 18.3197 18.7031ZM21.5822 12.8944C21.248 12.0844 20.7122 11.3339 19.9852 10.6575C20.1824 10.5535 20.4021 10.4994 20.625 10.5C20.9924 10.5022 21.3439 10.6501 21.6023 10.9112C21.8608 11.1723 22.0051 11.5253 22.0036 11.8927C22.0033 12.0794 21.9659 12.2641 21.8935 12.4363C21.8212 12.6084 21.7154 12.7644 21.5822 12.8953V12.8944Z"
                fill="#F3F3F3"
              />
              <path
                d="M15.1512 16.9791C15.1395 16.9908 13.9531 18.2011 12.0036 18.2105C10.0348 18.2011 8.89671 17.0278 8.84843 16.9791C8.81208 16.943 8.76297 16.9228 8.71179 16.9228C8.6606 16.9228 8.61149 16.943 8.57515 16.9791L7.93296 17.6105C7.91475 17.6286 7.90029 17.6501 7.89043 17.6737C7.88057 17.6974 7.87549 17.7229 7.87549 17.7485C7.87549 17.7742 7.88057 17.7996 7.89043 17.8233C7.90029 17.847 7.91475 17.8685 7.93296 17.8866C8.09233 18.0459 9.55952 19.4911 12.0008 19.5014C14.4355 19.4911 15.9092 18.0459 16.0686 17.8866C16.0868 17.8684 16.1013 17.8469 16.1111 17.8232C16.121 17.7994 16.1261 17.774 16.1261 17.7483C16.1261 17.7226 16.121 17.6971 16.1111 17.6734C16.1013 17.6497 16.0868 17.6281 16.0686 17.61L15.4259 16.9786C15.3897 16.9427 15.3407 16.9226 15.2898 16.9226C15.2388 16.9226 15.1898 16.9427 15.1536 16.9786L15.1512 16.9791Z"
                fill="#F3F3F3"
              />
            </svg>
          </div>
        </button>
      </div>
      <transition name="fade">
        <div
          v-if="showChat"
          class="chat w-[380px] bg-bg-highlight shadow-lg rounded-lg"
        >
          <div
            class="chat-bar bg-secondary flex justify-between items-center p-4 text-text-main"
          >
            <div class="flex flex-col gap-[2px]">
              <span class="font-semibold">Nexus Bot</span>
              <span>Ask me a question</span>
            </div>
            <div class="flex gap-2">
              <router-link :to="`/chatbot`">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14"
                    stroke="#F3F3F3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 9L20 4H15"
                    stroke="#F3F3F3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 11L20 4"
                    stroke="#F3F3F3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
              <button @click="toggleChat()">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 18L6 6"
                    stroke="#F3F3F3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 6L6 18"
                    stroke="#F3F3F3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref="chatContainer"
            class="chat-container h-80 w-fit px-4 py-2 overflow-y-auto space-y-2"
          >
            <div class="flex gap-2">
              <div
                class="rounded-full flex items-center justify-center bg-bg-highlight h-9 w-9 overflow-hidden"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.10268 13.5994C7.64564 13.5994 7.25377 13.8131 6.93736 14.2495C6.62096 14.6859 6.46533 15.2142 6.46533 15.8433C6.46533 16.4723 6.62611 17.0109 6.93736 17.4426C7.24861 17.8744 7.64049 18.0937 8.10268 18.0937C8.52924 18.0937 8.89955 17.8753 9.21268 17.4436C9.5258 17.0119 9.68471 16.4789 9.68471 15.8442C9.68471 15.2095 9.52393 14.6812 9.21268 14.2505C8.90143 13.8197 8.53111 13.5994 8.10268 13.5994ZM15.9524 13.5994C15.5005 13.5994 15.1035 13.8131 14.7871 14.2495C14.4706 14.6859 14.315 15.2142 14.315 15.8433C14.315 16.4723 14.4758 17.0109 14.7871 17.4426C15.0983 17.8744 15.4953 18.0937 15.9524 18.0937C16.3794 18.0937 16.7492 17.8753 17.0675 17.4436C17.3858 17.0119 17.5396 16.4789 17.5396 15.8442C17.5396 15.2095 17.3788 14.6812 17.0675 14.2505C16.7563 13.8197 16.3846 13.5994 15.9524 13.5994Z"
                    fill="#F3F3F3"
                  />
                  <path
                    d="M21.5325 7.73438C21.5273 7.73438 21.668 7.00828 21.5475 5.74359C21.4369 4.47797 21.1725 3.31641 20.7389 2.25C20.7389 2.25 20.5177 2.29078 20.0958 2.39719C19.6739 2.50359 18.9844 2.71875 18.0417 3.14906C17.1127 3.58031 16.1334 4.15406 15.1139 4.85016C14.4206 4.65188 13.3861 4.55063 12 4.55063C10.6791 4.55063 9.64453 4.65188 8.88609 4.85016C6.64641 3.28078 4.76969 2.41406 3.25594 2.25C2.82437 3.31656 2.55656 4.48453 2.4525 5.75391C2.33203 7.01953 2.47266 7.74984 2.47266 7.74984C1.25203 9.08531 0.75 11.01 0.75 12.5991C0.75 13.8281 0.785156 14.94 1.05656 15.9272C1.33781 16.9073 1.69406 17.7084 2.11594 18.3244C2.55242 18.9472 3.08868 19.4938 3.70312 19.942C4.33078 20.4145 4.90828 20.7548 5.43094 20.9681C5.95828 21.1912 6.55594 21.3539 7.23891 21.4706C7.74508 21.5686 8.25659 21.6365 8.77078 21.6741C8.77078 21.6741 10.177 21.75 12.0052 21.75C13.8333 21.75 15.2344 21.6741 15.2344 21.6741C15.7485 21.6352 16.26 21.5667 16.7663 21.4688C17.3841 21.369 17.9888 21.2005 18.5691 20.9662C19.0917 20.7478 19.6692 20.4127 20.3034 19.9402C20.9176 19.4926 21.4524 18.9451 21.8855 18.3206C22.3073 17.7061 22.6636 16.9036 22.9448 15.9234C23.2261 14.9433 23.25 13.823 23.25 12.5939C23.25 11.0555 22.748 9.10547 21.5325 7.73438ZM18.248 19.597C16.8464 20.2622 14.7872 20.5312 12.0553 20.5312H11.9498C9.2175 20.5312 7.15828 20.2673 5.7825 19.597C4.40672 18.9267 3.70828 17.5603 3.70828 15.4988C3.70828 14.265 4.14 13.2647 4.98891 12.4988C5.36062 12.1706 5.8125 11.94 6.375 11.8031C6.9375 11.6663 7.44984 11.6625 7.93172 11.6761C8.40422 11.6962 9.06703 11.7877 9.90563 11.8538C10.7442 11.9198 11.377 12.0061 12.0052 12.0061C12.5925 12.0061 13.3711 11.9044 14.6217 11.8031C15.8723 11.7019 16.8066 11.6508 17.4089 11.752C18.0267 11.8538 18.5644 12.067 19.0214 12.4988C19.9102 13.3009 20.3555 14.3009 20.3573 15.4988C20.3522 17.5603 19.6439 18.9319 18.248 19.597Z"
                    fill="#F3F3F3"
                  />
                </svg>
              </div>
              <div class="flex flex-col gap-2 float-left">
                <div
                  class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit"
                >
                  <transition>
                    <p>Hi there! 👋</p>
                  </transition>
                </div>
                <div class="rounded-xl bg-bg-hover p-4">
                  <transition>
                    <p>
                      I will help you with your question about games in Nexus
                      store.
                    </p>
                  </transition>
                </div>
                <div v-if="!isAuthenticated" class="p-4 bg-bg-hover rounded-xl">
                  <p>
                    First, let's log in or create an account to chat with me.
                  </p>
                  <router-link to="/login">
                    <button class="mt-2 bg-blue text-white p-2 rounded hover:bg-blueHi">
                      Login
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
            <div
              v-for="(pair, index) in chatHistory"
              :key="index"
              class="flex flex-col gap-2"
            >
              <div
                class="rounded-b-xl rounded-tl-xl bg-blue px-4 py-2 w-fit float-right mt-3 self-end"
              >
                <p>{{ pair.question }}</p>
              </div>
              <div class="flex gap-1">
                <div
                  class="rounded-full flex items-center justify-center p-2 bg-bg-highlight h-9 w-9 overflow-hidden mt-3"
                >
                  <img src="../../assets/icons/bot.svg" />
                </div>
                <div
                  v-if="pair.loading"
                  class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit float-left mt-3"
                >
                  <div class="animate-pulse w-full p-2">
                    <div class="h-4 bg-text-dim rounded md:w-60"></div>
                  </div>
                </div>
                <div
                  v-if="!pair.loading && pair.answer"
                  class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit float-left mt-3"
                >
                  {{ pair.answer }}
                </div>
                <div
                  v-if="pair.audioUrl"
                  @click="toggleAudio(pair)"
                  class="cursor-pointer rounded-full flex items-center justify-center p-2 h-9 w-9 overflow-hidden mt-3 bg-bg-hover"
                >
                  <svg
                    v-if="!pair.isPlaying"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 21C19.527 19.453 21.999 16.091 21.999 12C21.999 7.909 19.527 4.547 16 3V5C18.387 6.386 19.999 9.047 19.999 12C19.999 14.953 18.387 17.614 16 19V21Z"
                      fill="#F3F3F3"
                    />
                    <path
                      d="M16 6.99997V17C17.225 15.9 18 13.771 18 12C18 10.229 17.225 8.09997 16 6.99997ZM4 17H6.697L12.445 20.832C12.5958 20.9321 12.7708 20.9896 12.9516 20.9984C13.1324 21.0072 13.3122 20.967 13.472 20.882C13.6316 20.7965 13.765 20.6693 13.858 20.514C13.951 20.3587 14.0001 20.181 14 20V3.99997C13.9999 3.81909 13.9508 3.64162 13.8578 3.48646C13.7648 3.3313 13.6315 3.20427 13.472 3.11889C13.3125 3.03351 13.1329 2.99299 12.9522 3.00163C12.7715 3.01027 12.5966 3.06776 12.446 3.16797L6.697 6.99997H4C2.897 6.99997 2 7.89697 2 8.99997V15C2 16.103 2.897 17 4 17ZM4 8.99997H7C7.033 8.99997 7.061 8.98397 7.093 8.98097C7.22601 8.96741 7.35509 8.928 7.473 8.86497C7.499 8.84997 7.53 8.84797 7.555 8.83197L12 5.86797V18.132L7.555 15.168C7.53 15.151 7.499 15.148 7.473 15.135C7.35491 15.0707 7.22491 15.0312 7.091 15.019C7.059 15.016 7.032 15 7 15H4V8.99997Z"
                      fill="#F3F3F3"
                    />
                  </svg>
                  <svg
                    v-else
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 6H18V18H6V6Z" fill="#F3F3F3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full p-4 mt-2">
            <div class="w-full flex gap-1 justify-between">
              <div class="p-1 flex items-center">
                <svg
                  v-if="!isRecording"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ 'opacity-50': !isAuthenticated }"
                  class="cursor-pointer"
                  @click="startRecording"
                >
                  <path
                    d="M12.4688 18.0211C11.1079 18.0195 9.80332 17.4782 8.84107 16.5159C7.87882 15.5537 7.33753 14.249 7.33594 12.8882V5.13283C7.33594 3.77152 7.87672 2.46596 8.83931 1.50337C9.8019 0.540779 11.1075 0 12.4688 0C13.8301 0 15.1356 0.540779 16.0982 1.50337C17.0608 2.46596 17.6016 3.77152 17.6016 5.13283V12.8882C17.6005 14.2492 17.0594 15.5541 16.0971 16.5165C15.1347 17.4789 13.8298 18.02 12.4688 18.0211ZM12.4688 1.40351C11.48 1.40457 10.5321 1.79782 9.83291 2.49697C9.13376 3.19613 8.74051 4.14408 8.73945 5.13283V12.8882C8.73945 13.8773 9.13236 14.8259 9.83174 15.5253C10.5311 16.2246 11.4797 16.6175 12.4688 16.6175C13.4578 16.6175 14.4064 16.2246 15.1058 15.5253C15.8052 14.8259 16.1981 13.8773 16.1981 12.8882V5.13283C16.197 4.14408 15.8038 3.19613 15.1046 2.49697C14.4055 1.79782 13.4575 1.40457 12.4688 1.40351Z"
                    fill="#F3F3F3"
                  />
                  <path
                    d="M13.1704 20.1806V22.5867H16.3504C16.5365 22.5867 16.715 22.6606 16.8466 22.7922C16.9782 22.9238 17.0521 23.1023 17.0521 23.2884C17.0521 23.4745 16.9782 23.653 16.8466 23.7846C16.715 23.9162 16.5365 23.9902 16.3504 23.9902H8.53083C8.34471 23.9902 8.16622 23.9162 8.03461 23.7846C7.90301 23.653 7.82907 23.4745 7.82907 23.2884C7.82907 23.1023 7.90301 22.9238 8.03461 22.7922C8.16622 22.6606 8.34471 22.5867 8.53083 22.5867H11.7669V20.1806C11.063 20.1158 10.3713 19.9539 9.71178 19.6994C5.05213 17.8949 5 12.8824 5 12.6819C5 12.4958 5.07393 12.3173 5.20554 12.1857C5.33714 12.0541 5.51564 11.9801 5.70175 11.9801C5.88787 11.9801 6.06637 12.0541 6.19797 12.1857C6.32957 12.3173 6.40351 12.4958 6.40351 12.6819C6.40351 12.8824 6.48371 16.9566 10.213 18.3942C11.663 18.9556 13.2703 18.9556 14.7203 18.3942C18.4697 16.9506 18.5298 12.8543 18.5298 12.6799C18.5296 12.5871 18.5476 12.4952 18.583 12.4095C18.6184 12.3237 18.6704 12.2458 18.7359 12.1802C18.8015 12.1147 18.8794 12.0627 18.9652 12.0273C19.0509 11.9919 19.1428 11.9739 19.2356 11.9741C19.4214 11.9747 19.5993 12.0488 19.7305 12.1804C19.8617 12.3119 19.9353 12.4901 19.9353 12.6759C19.9353 12.8884 19.8812 17.9029 15.2236 19.6934C14.5649 19.9498 13.874 20.1137 13.1704 20.1806Z"
                    fill="#F3F3F3"
                  />
                </svg>
                <div
                  ref="pulsingElement"
                  v-else
                  class="bg-text-main flex justify-center items-center rounded-full"
                  @click="stopRecording"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer"
                  >
                    <path d="M6 6H18V18H6V6Z" fill="#313843" />
                  </svg>
                </div>
              </div>
              <input
                v-model="message"
                type="text"
                class="w-full bg-bg-hover rounded-full p-4"
                placeholder="Type your message..."
                :disabled="!isAuthenticated"
                @keyup.enter="handleSendMessage"
              />
              <div class="flex gap-1 mr-2">
                <div class="p-1 flex items-center">
                  <svg
                    v-if="!isFetching"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ 'opacity-50': !isAuthenticated }"
                    class="cursor-pointer"
                    @click="handleSendMessage"
                  >
                    <path
                      d="M10.3076 13.6923L15.1538 8.84619"
                      stroke="#F3F3F3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.2326 10.27C2.42568 9.86652 2.52346 8.68509 3.38572 8.41978L19.1948 3.55543C19.9621 3.31935 20.6808 4.03802 20.4447 4.8053L15.5804 20.6144C15.315 21.4767 14.1336 21.5745 13.7302 20.7675L10.38 14.0673C10.2833 13.8738 10.1264 13.7169 9.93283 13.6201L3.2326 10.27Z"
                      stroke="#F3F3F3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div v-else class="lds-dual-ring"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from "vue";
import { useAuthStore } from "@/stores";
import { useChatStore } from "@/stores/chat.store";
import Navbar from "@/components/Navbar.vue";
import Loader from "@/components/Loader.vue";

const showChat = ref(false);
const showGreeting = ref(false);

const authStore = useAuthStore();
const chatStore = useChatStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const message = ref<string>("");
const chatHistory = ref<
  {
    question: string;
    answer: string | null;
    loading: boolean;
    audioUrl?: string;
    isPlaying?: boolean;
    audioElement?: HTMLAudioElement;
  }[]
>([]);
const isRecording = ref(false);
const chatContainer = ref<HTMLElement | null>(null);
const isFetching = ref(false);

let mediaStream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

function toggleChat() {
  showChat.value = !showChat.value;
  showGreeting.value = false;
}

onMounted(() => {
  setTimeout(() => {
    showGreeting.value = true;
    setTimeout(() => {
      showGreeting.value = false;
    }, 5000);
  }, 3000);
});

const handleSendMessage = async () => {
  if (message.value.trim() === "") return;

  const newMessage = { question: message.value, answer: null, loading: true };
  chatHistory.value.push(newMessage);

  const queryIndex = chatHistory.value.length - 1;

  message.value = "";
  isFetching.value = true;

  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });

  try {
    await chatStore.fetchAnswer(newMessage.question);
    chatHistory.value[queryIndex].answer = chatStore.answer;
    
    const audioUrl = await chatStore.textToSpeech(chatStore.answer);
    if (audioUrl) {
      chatHistory.value[queryIndex].audioUrl = audioUrl;
      const audio = new Audio(audioUrl);
      audio.play();
      chatHistory.value[queryIndex].isPlaying = true;
      chatHistory.value[queryIndex].audioElement = audio;
      audio.addEventListener("ended", () => {
        chatHistory.value[queryIndex].isPlaying = false;
      });
    }
  } catch (error) {
    console.log("Failed to get chatbot answer", error);
    chatHistory.value[queryIndex].answer = "Sorry, there was an error.";
  } finally {
    chatHistory.value[queryIndex].loading = false;
    isFetching.value = false;
  }

  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

// Voice recording and transcription
const startRecording = () => {
  if (!isAuthenticated.value) return;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaStream = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    isRecording.value = true;

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", async () => {
      const audioBlob = new Blob(audioChunks);
      audioChunks = [];
      const transcript = await chatStore.transcribeAudio(audioBlob);
      if (transcript) {
        message.value = transcript;
        handleSendMessage();
      }
      isRecording.value = false;
    });
  });
};

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
    }
  }
};

const toggleAudio = (pair: any) => {
  if (pair.audioElement) {
    if (pair.isPlaying) {
      pair.audioElement.pause();
    } else {
      pair.audioElement.play();
    }
    pair.isPlaying = !pair.isPlaying;
  } else {
    const audio = new Audio(pair.audioUrl);
    audio.play();
    pair.audioElement = audio;
    pair.isPlaying = true;
    audio.addEventListener("ended", () => {
      pair.isPlaying = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.chat {
  opacity: 1;
  transform: translateY(0px) translateZ(0px);
}

.chat-bar {
  border-radius: 10px 10px 0 0;
}

.lds-dual-ring {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 18px;
  height: 18px;
  margin: 1px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.skeleton-loader .skeleton {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
