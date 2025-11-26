<template>
  <div class="relative w-full h-screen p-8">
    <Swiper
      :key="currentDir"
      :modules="[SwiperPagination, SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        el: '.swiper-pagination',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      }"
      class="w-full h-full rounded-2xl overflow-hidden"
    >
      <!-- Slide 1 -->
      <SwiperSlide class="relative w-full h-full rounded-2xl overflow-hidden">
        <div class="absolute inset-0 z-10"></div>
        <img
          src="/images/swiper-img.png"
          alt="first image of swiper"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4"
        >
          <h1
            class="text-4xl md:text-6xl font-bold mb-6 py-8 px-30 rounded-lg text-white"
            style="
              background: linear-gradient(
                  rgba(0, 0, 0, 0.2),
                  rgba(0, 0, 0, 0.2)
                ),
                url('/images/fish-pattern.png') center/cover, #20b2aa;
            "
          >
            جمعية وطني للاستزراع المائي
          </h1>
        </div>
      </SwiperSlide>

      <!-- Add more slides as needed -->
      <SwiperSlide class="relative w-full h-full rounded-2xl overflow-hidden">
        <div class="absolute inset-0 z-10"></div>
        <img
          src="/images/swiper-img.png"
          alt="Second image"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4"
        >
          <h1
            class="text-4xl md:text-6xl font-bold mb-6 py-8 px-30 rounded-lg text-white bg-white/20 backdrop-blur-md"
            style="
              background: linear-gradient(
                  rgba(0, 0, 0, 0.2),
                  rgba(0, 0, 0, 0.2)
                ),
                url('/images/fish-pattern.png') center/cover, #20b2aa;
            "
          >
            جمعية وطني للاستزراع المائي
          </h1>
        </div>
      </SwiperSlide>

      <!-- Custom Pagination -->
      <div class="swiper-pagination !bottom-8"></div>
    </Swiper>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  Pagination as SwiperPagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const { locale, locales } = useI18n();

const currentDir = computed(() => {
  const activeLocale = locales.value?.find(
    (item) => item.code === locale.value
  );
  return activeLocale?.dir ?? "ltr";
});
</script>

<style scoped>
/* Custom pagination styles */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: white;
  opacity: 1;
  margin: 0 6px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: green;
}
</style>
