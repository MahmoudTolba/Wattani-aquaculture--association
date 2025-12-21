<template>
  <section class="container mx-auto py-16 px-6">
    <div class="grid md:grid-cols-2 gap-15">
      <!-- Text -->
      <div :class="isRTL ? 'text-right' : 'text-left'">
        <h3 class="text-gray-500 text-lg mb-2 leading-7">
          {{ aboutData?.title || t('about-us.title') }}
        </h3>
        <h1 class="text-3xl font-bold mb-6 leading-tight">
          {{ t('about-us.heading') }}
        </h1>
        <p v-if="isLoading" class="leading-[52px] text-xl text-gray-400">
          {{ t('about-us.loading') }}
        </p>
        <p v-else-if="error" class="leading-[52px] text-xl text-red-500">
          {{ error }}
        </p>
        <div v-else-if="hasContent" class="leading-[52px] text-xl" v-html="aboutData.content"></div>
        <p v-else class="leading-[52px] text-xl">
          {{ t('about-us.fallback_description') }}
        </p>
      </div>
      <!-- Image -->
      <div class="relative w-full h-[80%] hidden 2xl:block xl:block lg:block">
        <div
          class="absolute -top-4 -left-4 w-full h-[80%] bg-[linear-gradient(270deg,#15C472_0.05%,#0A717E_99.95%)] rounded-xl -z-10"
        ></div>
        <img
          src="/images/aboutus-img.png"
          :alt="t('about-us.image_alt')"
          class="rounded-xl shadow-lg w-full h-[80%] object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const { t, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

// Landing page data
const { landingPageData, isLoading, error, fetchLandingPageData } = useLandingPage();

const aboutData = computed(() => landingPageData.value?.about);

// Check if content has meaningful text (not just empty HTML tags)
const hasContent = computed(() => {
  if (!aboutData.value?.content) return false;
  // Strip HTML tags and check if there's actual text content
  const textContent = aboutData.value.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .trim();
  return textContent.length > 0;
});

// Fetch content on component mount
onMounted(async () => {
  try {
    await fetchLandingPageData();
  } catch (err) {
    console.error('Failed to load landing page data:', err);
  }
});
</script>

<style scoped></style>
