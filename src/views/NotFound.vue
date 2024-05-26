<template>
  <layout :is-login="true">
    <div class="page flex items-center justify-center">
      <div class="flex flex-col text-center">
        <h1 class="text-[28px] font-bold">Oops...</h1>
        <h3 class="text-2xl">Page not found</h3>
        <p class="text-lg">
          This Page doesn`t exist or was removed!<br />We suggest you back to
          home.
        </p>
        <router-link
          to="/"
          class="mt-4 bg-blue text-text-main font-semibold px-4 py-2 rounded text-lg"
          >Back to Home</router-link
        >
      </div>
      <!-- <div>
            <img class="h-96" src="../assets/images/404.svg">
        </div> -->
    </div>
  </layout>
</template>

<script setup>
import Layout from "@/components/Layout.vue";
</script>

<style lang="scss">
.page {
  background-image: url("https://s3-alpha-sig.figma.com/img/5002/2404/cbffe4a96611c46a23870d28b622f27a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mk5cur4ktXMVYIlm0isUcUp5hSsc1vmbKKAVlf4lq8-6a8vDPIP0p3RvVrSUZq2eus77agKkBQlL2QO5Eb7lottxytby5CNHVIQeCVkjbiltABukhM48HITq3Qe~~Nd25ZWe4n7G7gsJNbaVOfdnaeXiBfwVOIE20ogoMm6mP1pFJXKiInTJM2a71HGetuSrdYj51zhR3aRjK9Z0-28jBmOJgdXvFlQKWsOrioo8nSQY9qj9gCMhWi-JRCEa-qgO3FOjWAe9hX1isMlH8Mu3wEij4-6Pv9G1Pg-m4rwZ-gxql4vqQbRgoEoDVMefwFKAGLI27iyKR0vAJaNJpU5hFw__");
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  height: calc(100vh - $header-height);
}
</style>
