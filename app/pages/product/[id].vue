<template>
  <PageLoader />
  <NavHeader />
  <main class="p-6 md:p-10 mx-15">
    <!-- Breadcrumb -->
    <div class="w-full flex items-center justify-start gap-2 mb-6">
      <div
        class="w-full bg-white-100 border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-2"
      >
        <NuxtLink
          :to="backLink"
          class="font-medium text-gray-700 hover:text-[#15C472]"
        >
          {{ fromLabel }}
        </NuxtLink>
        <img src="/icons/arrow-route.svg" alt="arrow-route" class="w-4 h-4" />
        <span class="text-black font-semibold">المنتج</span>
      </div>
    </div>

    <!-- Seller Profile Section -->
    <section class="rounded-2xl mb-6">
      <!-- Card Container -->
      <div
        class="w-full max-w-2xl bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-100 p-5"
      >
        <!-- Top Section: Name/Avatar and Rating -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
          <!-- User Info (Right side in RTL) -->
          <div class="flex items-center gap-3">
            <!-- Avatar Image -->
            <img
              src="/images/card-user.jpg"
              alt="User Avatar"
              class="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <!-- Name -->
            <h2 class="text-xl font-bold text-gray-900">عبد العزيز الجبيري</h2>
          </div>

          <!-- Rating (Left side in RTL) -->
          <div
            class="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm sm:shadow-none sm:bg-transparent sm:border-none"
          >
            <!-- Star Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-amber-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-gray-600 font-bold text-sm pt-1">4.5</span>
          </div>
        </div>

        <!-- Bottom Section: Contact & Location Info -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-gray-800"
        >
          <!-- Location -->
          <div
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/location.svg"
                alt="location-icon"
                class="w-5 h-5"
              />
            </div>
            <span class="font-semibold text-base sm:text-lg">مدينة الرياض</span>
          </div>

          <!-- WhatsApp -->
          <a
            href="#"
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/whatsapp.svg"
                alt="whatsapp-icon"
                class="w-5 h-5"
              />
            </div>
            <span class="font-semibold text-base sm:text-lg"
              >محادثة واتس اب</span
            >
          </a>

          <!-- Phone Number -->
          <a
            href="#"
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/phone-icon.svg"
                alt="phone-icon"
                class="w-5 h-5"
              />
            </div>
            <span class="font-semibold text-base sm:text-lg"
              >رقم جوال المعلن</span
            >
          </a>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <div
      class="flex max-w-2xl gap-3 bg-linear-to-r from-[#00a859] to-[#15c472] hover:shadow-lg transition-shadow justify-between rounded-lg"
    >
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold cursor-pointer"
        @click="navigateTo('/chat')"
      >
        <img src="/icons/message.svg" alt="message-icon" class="w-5 h-5" />
        <span>مراسلة</span>
      </button>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold cursor-pointer"
        @click="openReportModal"
      >
        <img src="/icons/flag-2.svg" alt="report-icon" class="w-5 h-5" />
        <span>ابلاغ</span>
      </button>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold cursor-pointer"
      >
        <img src="/icons/share.svg" alt="share-icon" class="w-5 h-5" />
        <span>مشاركة</span>
      </button>
      <button
    @click="toggleFollow"
    class="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold cursor-pointer"
  >
    <img src="/icons/follow.svg" alt="follow-icon" class="w-5 h-5" />

    <span>
      {{ isFollowing ? 'الغاء المتابعة' : 'متابعة' }}
    </span>
  </button>
    </div>
    <!-- produuct-banner -->
    <section class="bg-white rounded-2xl mt-8 mb-6 overflow-hidden">
      <div class="relative w-full h-[30vw] rounded-lg">
        <img
          src="/images/product-banner.png"
          alt="product-banner"
          class="w-full h-full object-cover rounded-lg"
        />
        <!-- Overlay Layer -->
        <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg"></div> -->
      </div>
    </section>
    <!-- product-details -->
    <section class="flex flex-col md:flex-row gap-6 mb-6">
      <!-- Right Card: Location and Time Information -->
      <div
        class="flex-1 bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div class="flex flex-col gap-8">
          <!-- Location 1 -->
          <div class="flex items-center gap-2">
        <img src="/icons/located.svg" alt="location-icon" class="w-5 h-5">
            <span class="text-black text-base">الرياض - الدرعية - الهنوف</span>
          </div>

          <!-- Location 2 -->
          <div class="flex items-center gap-2">
           <img src="/icons/located.svg" alt="location-icon" class="w-5 h-5">
            <span class="text-black text-base"
              >٢١ شارع إبراهيم الزاوي الرياض</span
            >
          </div>

          <!-- Date and Time -->
          <div class="flex items-center gap-2">
          <img src="/icons/clock.svg" alt="time-icon" class="w-5 h-5">
            <span class="text-black text-base">١٣/٤/٢٠٢٥ - ١٠:٠٩ ص</span>
          </div>
        </div>
      </div>
      <!-- Left Card: Product Information -->
      <div
        class="flex-1 bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h1 class="text-2xl font-bold text-black mb-4">سنارة سمك كبيرة</h1>
       
       <div class="flex items-center justify-between gap-2">
        <div>
          <span class="text-[#15C472] text-xl font-bold flex items-center gap-2">
            200 
            <img src="/icons/green-currency.svg" alt="saudi-riyal-icon" class="w-6 h-6">
          </span>
        </div>
        <div>
          <span class="text-[#15C472] text-xl">
            سيف القحطاني
          </span>
        </div>
       </div>
        <p class="text-gray-700 text-base leading-relaxed">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
        </p>
      </div>
    </section>
  </main>
  <footerSection />
  <!-- Report Modal -->
  <ReportModal
    :is-open="isReportModalOpen"
    @close="closeReportModal"
    @submit="handleReportSubmit"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "#imports";

const route = useRoute();
const id = route.params.id;

// Report Modal State
const isReportModalOpen = ref(false);

const openReportModal = () => {
  isReportModalOpen.value = true;
};

const closeReportModal = () => {
  isReportModalOpen.value = false;
};

const handleReportSubmit = (reportData) => {
  // Handle the report submission here
  console.log("Report submitted:", reportData);
  // You can add API call here to submit the report
  closeReportModal();
};

/* خريطة الأسماء للـ tabs علشان تظهر اسم التاب في الـ breadcrumb */
const tabsMap = {
  home: "الرئيسية",
  benefits: "منافع الوطني",
  experts: "خبراء وطني",
  courses: "دورات وطني",
};

/* اسم التاب الذي جئت منه (أو قيمة افتراضية) */
const fromLabel = computed(() => tabsMap[route.query.from] || "المنتجات");

/* الرابط الخلفي اعتمادًا على التاب */
const backLink = computed(() => {
  switch (route.query.from) {
    case "home":
      return "/"; // صفحة جديدة (الرئيسية)
    case "benefits":
      return "/benefits"; // صفحة مستقلة
    case "experts":
      return "/experts";
    case "courses":
      return "/courses";
    default:
      return "/favorites";
  }
});
const isFollowing = ref(false)

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}
</style>
