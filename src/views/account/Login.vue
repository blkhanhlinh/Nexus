<template>
  <layout :is-login="true">
    <div class="login flex flex-col justify-between mb-0">
      <div class="w-fit flex flex-col items-center pt-20 pb-28 gap-8 mx-auto">
        <h1 class="font-black text-3xl self-start">Sign in</h1>
        <div>
          <div class="flex items-center p-8 bg-bg-highlight rounded-lg">
            <form @submit.prevent="onSubmit">
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <p class="font-medium uppercase text-blue">Sign in with Email</p>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="Email"
                    class="w-96 h-12 px-4 bg-bg-hover rounded"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <p class="font-medium uppercase text-text-dim">Password</p>
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    class="w-96 h-12 px-4 bg-bg-hover rounded"
                  />
                </div>
                <button
                  type="submit"
                  class="mt-4 w-96 h-12 bg-blue text-lg text-white font-semibold rounded cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="w-full bg-bg-main py-12">
        <div class="flex items-center justify-center gap-4">
          <div class="flex flex-col gap-2 items-center">
            <p class="text-text-main font-black text-2xl">New to Nexus?</p>
            <router-link
              to="/register"
              class="text-text-main px-6 py-2 rounded bg-blue font-semibold"
              >Create an account</router-link
            >
          </div>
          <p class="flex-1 max-w-60 text-center text-text-dim">
            It's free and easy. Discover thousands of games to play with millions
            of new friends.
          </p>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import Layout from "@/components/Layout.vue";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const onSubmit = async () => {
  await authStore.login(email.value, password.value);
};
</script>

<style lang="scss">
.login {
  background-image: url("https://s3-alpha-sig.figma.com/img/5002/2404/cbffe4a96611c46a23870d28b622f27a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mk5cur4ktXMVYIlm0isUcUp5hSsc1vmbKKAVlf4lq8-6a8vDPIP0p3RvVrSUZq2eus77agKkBQlL2QO5Eb7lottxytby5CNHVIQeCVkjbiltABukhM48HITq3Qe~~Nd25ZWe4n7G7gsJNbaVOfdnaeXiBfwVOIE20ogoMm6mP1pFJXKiInTJM2a71HGetuSrdYj51zhR3aRjK9Z0-28jBmOJgdXvFlQKWsOrioo8nSQY9qj9gCMhWi-JRCEa-qgO3FOjWAe9hX1isMlH8Mu3wEij4-6Pv9G1Pg-m4rwZ-gxql4vqQbRgoEoDVMefwFKAGLI27iyKR0vAJaNJpU5hFw__");
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  height: calc(100vh - $header-height);
}
</style>
