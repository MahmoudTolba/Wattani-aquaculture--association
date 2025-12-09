<template>
  <section
    class="w-full py-20 px-6 bg-[linear-gradient(270deg,#15C472_0.05%,#0A717E_99.95%)]"
  >
    <div class="container mx-auto grid md:grid-cols-2 gap-15 items-center">
      <!-- Phones / App Mockup -->
      <div class="flex justify-center">
        <img src="/images/mobile-imgs.png" alt="App Mockup" class="w-full" />
      </div>
      <!-- Text Section -->
      <div class="text-white text-right" dir="rtl">
        <h1 class="text-3xl font-bold leading-[52px] mb-6">
          {{ platformAbout?.title || 'جمعية وطني للاستزراع المائي' }}
        </h1>

        <p v-if="isLoading" class="leading-[40px] mb-4 text-3xl text-gray-300">
          جاري التحميل...
        </p>
        <p v-else-if="error" class="leading-[40px] mb-4 text-3xl text-red-200">
          {{ error }}
        </p>
        <p v-else-if="platformAbout?.content" class="leading-[40px] mb-4 text-3xl">
          {{ platformAbout.content }}
        </p>
        <p v-else class="leading-[40px] mb-4 text-3xl">
          جمعية وطني للاستزراع المائي هي جمعية تعاونية سعودية تعمل على تطوير
          وتنمية قطاع الاستزراع المائي في المملكة العربية السعودية، بما يواكب
          أهداف رؤية المملكة 2030 نحو تحقيق الأمن الغذائي والاستدامة البيئية.
        </p>

        <div
          class="flex gap-6 justify-center items-center md:justify-center mt-10"
        >
          <a
            v-if="appLinks?.app_store"
            :href="appLinks.app_store"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              class="h-12"
              alt="App Store"
            />
          </a>
          <a
            v-if="appLinks?.google_play"
            :href="appLinks.google_play"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              class="h-12"
              alt="Google Play"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';

// Landing page data
const { landingPageData, isLoading, error, fetchLandingPageData } = useLandingPage();

const platformAbout = computed(() => landingPageData.value?.platform_about);
const appLinks = computed(() => landingPageData.value?.app_links);

// Fetch content on component mount
onMounted(async () => {
  try {
    await fetchLandingPageData();
  } catch (err) {
    console.error('Failed to load landing page data:', err);
  }
});
</script>
