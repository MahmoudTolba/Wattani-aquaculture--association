<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-l from-[#0A717E] to-[#15C472] px-4 sm:px-6 text-center overflow-hidden py-8"
  >
    <!-- Floating Animated Logo -->
    <img
      src="/icons/LOGO.svg"
      alt="Logo"
      class="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mb-4 sm:mb-6"
    />

    <!-- Error Title -->
    <div class="w-full">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2"
      >
        {{ error?.statusCode || "Error" }}
      </h1>
    </div>

    <!-- Message -->
    <div class="w-full max-w-xl px-4">
      <p
        class="text-base sm:text-lg md:text-xl opacity-90 mb-5 sm:mb-6 leading-relaxed"
      >
        {{
          error?.message || "Something went wrong. Please try again later."
        }}
      </p>
    </div>

    <!-- Button -->
    <div class="w-full max-w-xs sm:max-w-none px-4 sm:px-0">
      <NuxtLink
        to="/"
        class="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-[#0A717E] font-semibold rounded-xl shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
      >
        العودة إلى الصفحة الرئيسية
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>
