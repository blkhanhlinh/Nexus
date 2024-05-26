<template>
  <layout :is-login="true">
    <div class="register mb-0 pb-12">
      <div class="w-[940px] mx-auto">
        <div class="min-h-[600px] p-12">
          <!-- Step 1: User Information -->
          <div v-if="step === 1" class="flex flex-col gap-4">
            <h1 class="font-black text-3xl">Create your account</h1>
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              class="flex flex-col gap-4"
            >
              <div class="flex flex-col gap-2">
                <label class="font-medium text-text-dim">Username</label>
                <Field
                  name="userName"
                  type="text"
                  placeholder="Username"
                  class="w-96 h-12 px-4 bg-bg-hover rounded"
                />
                <ErrorMessage name="userName" class="text-accent-red" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="font-medium text-text-dim">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  class="w-96 h-12 px-4 bg-bg-hover rounded"
                />
                <ErrorMessage name="email" class="text-accent-red" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="font-medium text-text-dim">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  class="w-96 h-12 px-4 bg-bg-hover rounded"
                />
                <ErrorMessage name="password" class="text-accent-red" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="font-medium text-text-dim">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  class="w-96 h-12 px-4 bg-bg-hover rounded"
                />
                <ErrorMessage name="confirmPassword" class="text-accent-red" />
              </div>
              <button
                type="submit"
                class="mt-4 w-96 h-12 bg-blue text-lg text-white font-semibold rounded"
              >
                Next
              </button>
            </Form>
          </div>
  
          <!-- Step 2: Select Favorite Genres -->
          <div v-else-if="step === 2" class="flex flex-col gap-4">
            <h1 class="font-black text-3xl">Select Your Favorite Genres</h1>
            <div class="flex flex-col gap-2">
              <label class="font-medium text-text-dim">Favorite Genres</label>
              <div class="grid grid-cols-3 gap-x-8 gap-y-4 items-center">
                <div
                  v-for="genre in genres"
                  :key="genre"
                  class="h-fit flex gap-2 items-center justify-between py-2 px-3 rounded bg-bg-highlight text-text-dim text-sm"
                >
                  <label class="flex gap-4 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      :value="genre"
                      v-model="selectedGenres"
                      class="hidden"
                    />
                    <div
                      :class="{
                        'bg-green text-text-main': selectedGenres.includes(genre),
                        'bg-text-main': !selectedGenres.includes(genre),
                      }"
                      class="min-w-5 min-h-5 flex items-center justify-center rounded"
                    >
                      <span v-if="selectedGenres.includes(genre)">✔</span>
                    </div>
                    <span class="text-base w-fit">{{ genre }}</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              @click="onGenreSubmit"
              class="mt-4 w-96 h-12 bg-blue text-lg text-white font-semibold rounded"
            >
              Submit
            </button>
          </div>
  
          <!-- Step 3: Enter OTP -->
          <div v-else-if="step === 3" class="flex flex-col gap-4">
            <h1 class="font-black text-3xl">Enter OTP</h1>
            <div class="flex flex-col gap-2">
              <label class="font-medium text-text-dim">OTP</label>
              <input
                v-model="otp"
                type="text"
                placeholder="Enter OTP"
                class="w-96 h-12 px-4 bg-bg-hover rounded"
              />
            </div>
            <button
              @click="onOtpSubmit"
              class="mt-4 w-96 h-12 bg-blue text-lg text-white font-semibold rounded cursor-pointer"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { gameAPI } from "@/constants/api";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";
import Layout from "@/components/Layout.vue";

const schema = yup.object({
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const step = ref(1);
const selectedGenres = ref<string[]>([]);
const genres = ref<string[]>([]);
const otp = ref("");
const authStore = useAuthStore();
const loading = ref(true);
const router = useRouter();

async function onSubmit(values: any) {
  await authStore.saveUserData({
    username: values.userName,
    email: values.email,
    password: values.password,
  });
  step.value = 2;
}

async function onGenreSubmit() {
  await authStore.setFavoriteGenres(selectedGenres.value);
  step.value = 3;
}

async function onOtpSubmit() {
  await authStore.verifyOtp(otp.value);
  setTimeout(() => {
    router.push({ name: 'Home', query: { registered: 'true' } });
  }, 1000);
}

onMounted(async () => {
  try {
    const response = await axios.get(`${gameAPI}game/category`);
    genres.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.register {
  background: radial-gradient(
        30% 40% at 40% 30%,
        rgba(33, 36, 41, 0.5) 0%,
        rgba(33, 36, 41, 0) 100%
      )
      no-repeat,
    url("https://store.cloudflare.steamstatic.com/public/shared/images/joinsteam/acct_creation_bg.jpg") -45vw
      0 no-repeat,
    #212429;
}
</style>
