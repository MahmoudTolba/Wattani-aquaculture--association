<template>
  <div
    class="relative min-h-screen bg-[#f3f7fb] flex items-stretch justify-center overflow-hidden font-ge text-2xl text-dark"
  >
    <div
      class="relative z-10 flex flex-col lg:flex-row w-full min-h-screen rounded-4xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_35px_120px_rgba(10,113,126,0.15)] overflow-hidden"
    >
      <!-- Form column -->
      <div
        class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10"
      >
        <div class="w-full max-w-lg mx-auto space-y-10">
          <!-- Language switcher -->
          <div class="flex justify-start">
            <langSwitch />
          </div>

          <!-- Title -->
          <div class="text-center space-y-3">
            <div class="inline-flex items-center justify-center gap-2"></div>
            <h1 class="text-3xl sm:text-4xl font-semibold text-[#0b9a78]">
              انشاء حساب
            </h1>
          </div>

          <!-- Form -->
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Phone number -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-end items-center gap-1"
                for="phone"
                placeholder=""
              >
                <span class="text-red-500">*</span>
                رقم الجوال
              </label>
              <div
                class="flex rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d]"
              >
                <div
                  class="flex items-center gap-2 border-l border-gray-100 px-4 py-3 bg-gray-50 text-sm text-dark/70"
                >
                  +966
                  <img src="/images/Country Flags.png" alt="Country Flag" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-3">
              <div class="flex items-center justify-end">
                <label class="text-base font-medium text-dark" for="password">
                  <span class="text-red-500">*</span>
                  كلمة المرور
                </label>
              </div>

              <div
                class="flex items-center rounded-2xl border border-gray-100 bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d]"
              >
                <button type="button" class="px-4 text-gray-400">
                  <img src="/icons/openeye-icon.svg" />
                </button>
                <input
                  id="password"
                  type="password"
                  placeholder="كلمة المرور"
                  required
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
              </div>
            </div>
            <button
              type="button"
              class="text-sm text-red-500 cursor-pointer"
              @click="navigateTo('/forgot-password')"
            >
              هل نسيت كلمة المرور
            </button>

            <!-- CTA -->
            <button
              type="submit"
              class="w-full rounded-2xl bg-linear-to-l from-[#15C472] from-[0.05%] to-[#0A717E] to-[99.95%] py-4 text-white text-lg font-semibold shadow-[0_15px_30px_rgba(21,196,114,0.3)] transition-all duration-300 hover:translate-y-0.5"
            >
              تسجيل
            </button>
          </form>

          <!-- Secondary actions -->
          <div class="text-center space-y-4">
            <button
              type="button"
              @click="navigateTo('/')"
              class="text-md text-[#00000] cursor-pointer font-light"
            >
              الاستمرار كزائر
            </button>
            <p class="text-md text-[#00000]">
              ليس لديك حساب؟
              <NuxtLink to="/signup" class="text-[#0a9687]">
                إنشاء حساب
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Image column -->
      <div
        class="w-full lg:w-1/2 relative bg-gradient-to-br from-[#0b9a78]/5 via-transparent to-[#0ab07d]/5 hidden md:hidden lg:block"
      >
        <div class="absolute inset-6 rounded-[28px] border border-white/30" />
        <img
          src="/images/login-img.png"
          alt="fishing"
          class="relative z-1 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import langSwitch from "~/components/langSwitch.vue";

const handleSubmit = (event: Event) => {
  // const form = event.target as HTMLFormElement;
  // if (!form.checkValidity()) {
  //   form.reportValidity();
  //   return;
  // }
  navigateTo("/");
};
</script>

<style scoped></style>
