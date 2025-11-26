<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-l from-[#0A717E] to-[#15C472] px-6 text-center overflow-hidden"
  >
    <!-- Floating Animated Logo -->
    <motion-img
      src="/icons/LOGO.svg"
      alt="Logo"
      class="w-32 h-32 object-contain mb-6"
      :initial="{ y: -40, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { duration: 0.8 } }"
      :hover="{ scale: 1.08 }"
    />

    <!-- Error Title -->
    <motion-div
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }"
    >
      <h1 class="text-4xl font-bold mb-4">
        {{ error?.statusCode || "Error" }}
      </h1>
    </motion-div>

    <!-- Message -->
    <motion-div
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }"
    >
      <p class="text-lg opacity-90 max-w-xl mb-6">
        {{ error?.message || "Something went wrong. Please try again later." }}
      </p>
    </motion-div>

    <!-- Button -->
    <motion-div
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 0.8, duration: 0.6 } }"
    >
      <NuxtLink
        to="/"
        class="px-8 py-3 text-[#0A717E] font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300"
      >
        العودة إلى الصفحة الرئيسية
      </NuxtLink>
    </motion-div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>
