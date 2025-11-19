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
              تسجيل الدخول
            </h1>
          </div>

          <!-- Form -->
          <form class="space-y-7">
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
                class="flex rounded-2xl border border-gray-100 bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d]"
              >
                <div
                  class="flex items-center gap-2 border-l border-gray-100 px-4 py-3 bg-gray-50 text-sm text-dark/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 20"
                    class="w-6 h-4 rounded-sm shadow-sm"
                  >
                    <rect width="28" height="20" fill="#006c35" rx="2" />
                    <text
                      x="14"
                      y="11.5"
                      text-anchor="middle"
                      dominant-baseline="middle"
                      font-size="6"
                      fill="#fff"
                      font-family="'Amiri', serif"
                    >
                      لا إله إلا الله
                    </text>
                  </svg>
                  +966
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="رقم الجوال"
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-base font-medium text-dark" for="password">
                  كلمة المرور <span class="text-red-500">*</span>
                </label>
              </div>

              <div
                class="flex items-center rounded-2xl border border-gray-100 bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d]"
              >
                <input
                  id="password"
                  type="password"
                  placeholder="كلمة المرور"
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400"
                />
                <button type="button" class="px-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button type="button" class="text-sm text-red-500">
              هل نسيت كلمة المرور
            </button>

            <!-- CTA -->
            <button
              type="submit"
              class="w-full rounded-2xl bg-gradient-to-l from-[#15C472] from-[0.05%] to-[#0A717E] to-[99.95%] py-4 text-white text-lg font-semibold shadow-[0_15px_30px_rgba(21,196,114,0.3)] transition-all duration-300 hover:translate-y-0.5"
            >
              تسجيل
            </button>
          </form>

          <!-- Secondary actions -->
          <div class="text-center space-y-4">
            <button type="button" class="text-lg text-dark/60">
              الاستمرار كزائر
            </button>
            <p class="text-lg text-dark/70">
              ليس لديك حساب؟
              <NuxtLink to="/signup" class="text-[#0a9687] font-semibold">
                إنشاء حساب
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Image column -->
      <div
        class="w-full lg:w-1/2 relative bg-gradient-to-br from-[#0b9a78]/5 via-transparent to-[#0ab07d]/5"
      >
        <div class="absolute inset-6 rounded-[28px] border border-white/30" />
        <img
          src="/images/login-img.png"
          alt="fishing"
          class="relative z-[1] w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import langSwitch from "~/components/langSwitch.vue";
</script>

<style scoped></style>
