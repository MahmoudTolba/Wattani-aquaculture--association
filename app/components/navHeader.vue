<!-- <template> -->
<!-- <div> -->
<!-- Nav Container -->
<!-- <div class="nav-container"> -->
<!-- First Section -->

<!-- <div class="flex gap-6"></div> -->
<!-- End Of First Section -->
<!-- Second Section  -->
<!-- <div class=""></div> -->
<!-- End Of Second Section -->
<!-- </div> -->
<!-- </div> -->
<!-- </template> -->

<!-- <script setup></script> -->

<!-- <style scoped></style> -->

<template>
  <header
    class="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100/80 rounded-2xl"
  >
    <div class="mx-auto w-full px-25">
      <!-- top row -->
      <div class="flex flex-col gap-4 py-4 md:flex-row md:items-center">
        <!-- brand -->
        <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
          <img
            src="/images/Logo.png"
            alt="Wattani Aquaculture Association"
            class="h-12 w-auto"
          />
          <div class="hidden sm:flex flex-col leading-tight">
            <span class="text-sm font-semibold text-[#00a859]">{{
              brandText.primary
            }}</span>
            <span class="text-xs text-gray-500">{{ brandText.secondary }}</span>
          </div>
        </NuxtLink>
        <!-- search -->
        <div class="w-full md:flex-1">
          <label class="sr-only" for="main-search">{{
            searchPlaceholder
          }}</label>
          <div class="relative">
            <input
              id="main-search"
              type="search"
              :placeholder="searchPlaceholder"
              class="w-full rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:border-[#15c472] focus:ring-2 focus:ring-[#15c472]/20 transition"
              :class="isRTL ? 'pr-5 pl-12 text-right' : 'pl-5 pr-12 text-left'"
            />
            <span
              class="absolute inset-y-0 flex items-center text-gray-400"
              :class="isRTL ? 'left-4' : 'right-4'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </span>
          </div>
        </div>
        <!-- actions -->
        <div
          class="flex flex-wrap items-center gap-2 md:w-auto"
          :class="
            isRTL ? 'md:flex-row-reverse md:justify-start' : 'md:justify-end'
          "
        >
          <LangSwitch />
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#15c472]"
          >
            {{ createAccountText }}
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#00a859] to-[#15c472] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow"
          >
            {{ loginText }}
          </NuxtLink>
        </div>
      </div>
      <!-- divider -->
      <div class="border-t border-solid border-gray-200"></div>
      <!-- bottom row -->
      <div
        class="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between"
        :class="isRTL ? 'md:flex-row-reverse' : ''"
      >
        <nav
          class="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-600"
          :class="isRTL ? 'md:flex-row-reverse' : ''"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            class="transition hover:text-[#15c472]"
            active-class="text-[#15c472]"
          >
            {{ resolveLabel(item.labels) }}
          </NuxtLink>
        </nav>
        <NuxtLink
          to="/ads/create"
          class="inline-flex items-center gap-2 self-start rounded-full border border-[#15c472] px-5 py-2 text-sm font-semibold text-[#15c472] transition hover:bg-[#15c472]/5 md:self-auto"
        >
          <span
            class="flex h-6 w-6 items-center justify-center rounded-full bg-[#15c472]/10 text-base"
            >+</span
          >
          {{ addListingText }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
<script setup>
import { computed } from "vue";
const { locale } = useI18n();
const navItems = [
  { id: "home", to: "/", labels: { ar: "الرئيسية", en: "Home" } },
  {
    id: "services",
    to: "/services",
    labels: { ar: "الخدمات", en: "Services" },
  },
  { id: "about", to: "/about", labels: { ar: "من نحن", en: "About us" } },
  {
    id: "contact",
    to: "/contact",
    labels: { ar: "تواصل معنا", en: "Contact us" },
  },
];
const isRTL = computed(() => locale.value === "ar");
const resolveLabel = (labels) =>
  labels[locale.value] ?? labels.en ?? Object.values(labels)[0] ?? "";
const searchPlaceholder = computed(() =>
  isRTL.value ? "ابحث عن المنتج" : "Search for a product"
);
const loginText = computed(() => (isRTL.value ? "تسجيل دخول" : "Log in"));
const createAccountText = computed(() =>
  isRTL.value ? "إنشاء حساب" : "Create account"
);
const addListingText = computed(() =>
  isRTL.value ? "إضافة إعلان" : "Add advertisement"
);
const brandText = computed(() =>
  isRTL.value
    ? {
        primary: "جمعية وطني للاستزراع المائي",
        secondary: "Wattani Aquaculture Association",
      }
    : {
        primary: "Wattani Aquaculture Association",
        secondary: "جمعية وطني للاستزراع المائي",
      }
);
</script>
<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
