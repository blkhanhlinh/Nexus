<template>
  <footer class="w-full bg-bg-highlight">
    <div class="mx-auto container px-4 flex flex-col pt-8 pb-14 lg:pt-12 lg:pb-28">
      <div class="grid grid-cols-2 lg:grid-cols-5 lg:gap-24 gap-8">
        <div class="flex flex-col gap-4 lg:gap-8 col-span-2">
          <div class="flex items-center gap-4">
            <img src="../assets/valve.svg" class="h-6 lg:h-9 w-auto" />
            <img src="../assets/logo-dim.svg" class="h-6 lg:h-9 w-auto" />
          </div>
          <p class="text-text-dim text-sm md:text-base">
            © {{ new Date().getFullYear() }} Valve Corporation. All rights reserved. All trademarks are
            property of their respective owners in the US and other countries.
            VAT included in all prices where applicable.
          </p>
        </div>
        <div class="flex flex-col gap-4 [&>a]:text-sm">
            <a>About Valve</a>
            <a>Jobs</a>
            <a>Steamworks</a>
            <a>Support</a>
        </div>
        <div class="flex flex-col gap-4">
            <a>Privacy</a>
            <a>Policy</a>
            <a>Subscriber Agreement</a>
            <a>Refunds</a>
            <a>Cookies</a>
        </div>
        <div class="flex gap-4 h-fit items-center lg:justify-end w-full">
            <div class="bg-[#76808C0D] flex p-2 rounded">
                <img src="../assets/icons/fb.svg" />
            </div>
            <div class="bg-[#76808C0D] flex p-2 rounded">
            <img src="../assets/icons/x.svg" />
            </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
