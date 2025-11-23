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

<template>
  <header
    class="bg-[#FCFCFC] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100/80 rounded-2xl"
  >
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
      <!-- top row -->
      <div class="flex flex-col gap-4 py-4 md:flex-row md:items-center">
        <!-- brand and mobile menu button -->
        <div class="flex items-center justify-between w-full md:w-auto">
          <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
            <img
              src="/icons/LOGO.svg"
              alt="Wattani Aquaculture Association"
              class="h-10 w-auto"
            />
          </NuxtLink>
          <!-- Mobile menu button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- search -->
        <div
          class="w-full md:flex-1 px-2 md:px-0"
          :class="{ 'hidden md:block': !isMobileMenuOpen && windowWidth < 768 }"
        >
          <label class="sr-only" for="main-search">{{
            searchPlaceholder
          }}</label>
          <div class="relative">
            <input
              id="main-search"
              type="search"
              :placeholder="searchPlaceholder"
              class="w-full rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:border-gray-300 focus:ring-0 pr-10 pl-4 py-2"
              :class="{ 'text-right': isRTL }"
              dir="auto"
            />
            <span
              class="absolute inset-y-0 flex items-center text-gray-400"
              :class="isRTL ? 'right-3' : 'left-3'"
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
          :class="{ 'hidden md:flex': !isMobileMenuOpen && windowWidth < 768 }"
        >
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00a859] to-[#15c472] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow w-full md:w-auto text-center"
          >
            {{ loginText }}
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#15c472] w-full md:w-auto text-center"
          >
            {{ createAccountText }}
          </NuxtLink>
          <div class="w-full md:w-auto flex justify-center">
            <LangSwitch />
          </div>
        </div>
      </div>
      <!-- Mobile menu, show/hide based on menu state -->
      <div
        v-if="isMobileMenuOpen && windowWidth < 768"
        class="md:hidden bg-white rounded-lg shadow-lg p-4 mt-2"
      >
        <nav class="flex flex-col space-y-3">
          <NuxtLink
            v-for="item in navItems"
            :key="'mobile-' + item.id"
            :to="item.to"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#15c472] transition"
            active-class="text-[#15c472] bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            {{ resolveLabel(item.labels) }}
          </NuxtLink>
          <NuxtLink
            to="/ads/create"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-[#15c472] hover:bg-[#15c472]/10 transition mt-2"
            @click="isMobileMenuOpen = false"
          >
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-[#15c472]/10 text-base"
              >+</span
            >
            {{ addListingText }}
          </NuxtLink>
        </nav>
      </div>

      <!-- divider -->
      <div class="border-t border-solid border-gray-200"></div>

      <!-- bottom row -->
      <div
        class="hidden md:flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between"
      >
        <nav
          class="flex flex-wrap items-center gap-4 md:gap-6 text-base md:text-lg font-semibold text-[#161616]"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            class="transition hover:text-[#15c472] py-1"
            active-class="text-[#15c472]"
          >
            {{ resolveLabel(item.labels) }}
          </NuxtLink>
        </nav>
        <NuxtLink
          to="/ads/create"
          class="hidden md:inline-flex items-center gap-2 self-start rounded-full border border-[#15c472] px-5 py-2 text-sm font-semibold text-[#15c472] transition hover:bg-[#15c472]/5 md:self-auto"
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
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const isMobileMenuOpen = ref(false);
const windowWidth = ref(0);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  // Close mobile menu when resizing to desktop
  if (windowWidth.value >= 768) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
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

/* Smooth transition for mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
