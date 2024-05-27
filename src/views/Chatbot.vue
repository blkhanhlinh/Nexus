<template>
  <Navbar />
  <main class="bg-bg-main w-full h-full pt-[52px]">
    <div class="page container mx-auto py-4 flex flex-col justify-between">
      <div
        v-if="isFetchingHistory"
        class="w-full h-5/6 flex justify-center items-center"
      >
        <loader></loader>
      </div>
      <div
        v-else
        ref="chatContainer"
        class="chat-container h-5/6 w-full px-4 py-4 overflow-y-auto space-y-2"
      >
        <div class="flex gap-1">
          <div
            class="rounded-full flex items-center justify-center p-2 bg-bg-highlight h-9 w-9 overflow-hidden"
          >
            <img src="../assets/icons/bot.svg" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit">
              <transition>
                <p>Hi there! 👋</p>
              </transition>
            </div>
            <div class="rounded-xl bg-bg-hover p-4">
              <transition>
                <p>
                  I will help you with your question about games in Nexus store.
                </p>
              </transition>
            </div>
            <div v-if="!isAuthenticated" class="p-4 bg-bg-hover rounded-xl">
              <p>First, let's log in or create an account to chat with me.</p>
              <router-link to="/login">
                <button class="mt-2 bg-secondary text-white p-2 rounded">
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
            class="rounded-b-xl rounded-tl-xl bg-blue px-4 py-2 w-fit self-end mt-3"
          >
            <p>{{ pair.question }}</p>
          </div>
          <div class="flex gap-1">
            <div
              class="rounded-full flex items-center justify-center p-2 bg-bg-highlight h-9 w-9 overflow-hidden mt-3"
            >
              <img src="../assets/icons/bot.svg" />
            </div>
            <div
              v-if="pair.loading"
              class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit float-left mt-3"
            >
              <div class="animate-pulse w-full p-2">
                <div class="h-4 bg-text-dim rounded md:w-72"></div>
              </div>
            </div>
            <div v-if="!pair.loading && pair.answer" class="w-fit flex gap-2">
              <div
                class="rounded-bl-xl rounded-e-xl bg-bg-hover px-4 py-2 w-fit float-left mt-3"
              >
                {{ pair.answer }}
              </div>
              <div
                v-if="pair.audioUrl"
                @click="toggleAudio(pair)"
                class="cursor-pointer rounded-full flex items-center justify-center p-2 h-9 w-9 overflow-hidden mt-3 bg-bg-highlight"
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
      </div>
      <div class="w-full p-4">
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
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from "vue";
import { useAuthStore } from "@/stores";
import { useChatStore } from "@/stores/chat.store";
import Navbar from "@/components/Navbar.vue";
import gsap from "gsap";
import Loader from "@/components/Loader.vue";

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
const chatContainer = ref<HTMLElement | null>(null);
const isFetching = ref(false);
const isFetchingHistory = ref(false);
const isRecording = ref(false);

let mediaStream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
const pulsingElement = ref<HTMLElement | null>(null);

const startPulsing = () => {
  if (pulsingElement.value) {
    gsap.to(pulsingElement.value, {
      scale: 1.2,
      opacity: 0.7,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }
};

const stopPulsing = () => {
  if (pulsingElement.value) {
    gsap.killTweensOf(pulsingElement.value);
    gsap.to(pulsingElement.value, { scale: 1, opacity: 1, duration: 0.2 });
  }
};

onMounted(async () => {
  if (isAuthenticated.value) {
    isFetchingHistory.value = true;
    await chatStore.getHistory();
    chatStore.history.forEach((item) => {
      chatHistory.value.push({
        question: item.question,
        answer: item.answer,
        loading: false,
      });
    });
    isFetchingHistory.value = false;

    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }
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

    startPulsing();

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
      stopPulsing();
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
.page {
  height: calc(100vh - 53.5px);
}

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
