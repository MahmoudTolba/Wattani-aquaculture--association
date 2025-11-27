<template>
  <PageLoader />
  <NavHeader />
  <main class="p-6 md:p-10  mx-15">
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
    <section class=" rounded-2xl p-6   mb-6">
     <!-- Card Container -->
     <div class="w-full max-w-3xl bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-100 p-5">
        
        <!-- Top Section: Name/Avatar and Rating -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            
            <!-- User Info (Right side in RTL) -->
            <div class="flex items-center gap-3">
                <!-- Avatar Image -->
                <img src="/images/card-user.jpg" alt="User Avatar" class="w-12 h-12 rounded-full object-cover border border-gray-200">
                <!-- Name -->
                <h2 class="text-xl font-bold text-gray-900">عبد العزيز الجبيري</h2>
            </div>

            <!-- Rating (Left side in RTL) -->
            <div class="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm sm:shadow-none sm:bg-transparent sm:border-none">
                <span class="text-gray-600 font-bold text-sm pt-1">4.5</span>
                <!-- Star Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </div>
        </div>

        <!-- Bottom Section: Contact & Location Info -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-gray-800">
            
            <!-- Location -->
            <div class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors">
                <div class="p-1.5 rounded-full bg-white text-teal-600 shadow-sm border border-gray-100">
                  <img src="/icons/location.svg" alt="location-icon" class="w-5 h-5">
                </div>
                <span class="font-semibold text-base sm:text-lg">مدينة الرياض</span>
            </div>

            <!-- WhatsApp -->
            <a href="#" class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors">
                <div class="p-1.5 rounded-full bg-white text-teal-600 shadow-sm border border-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <span class="font-semibold text-base sm:text-lg">محادثة واتس اب</span>
            </a>

            <!-- Phone Number -->
            <a href="#" class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors">
                <div class="p-1.5 rounded-full bg-white text-teal-600 shadow-sm border border-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <span class="font-semibold text-base sm:text-lg">رقم جوال المعلن</span>
            </a>

        </div>
    </div>
    </section>

    <!-- Product area -->
    <section class="bg-white rounded-2xl p-6 shadow-md border mb-6">
      <h1 class="text-2xl font-bold mb-3">تفاصيل المنتج</h1>
      <p class="text-gray-600 mb-4">
        معرّف المنتج: <span class="font-medium text-gray-800">{{ id }}</span>
      </p>

      <!-- مثال محتوى: هنا تستدعي API أو تعرض بيانات المنتج -->
      <div class="grid md:grid-cols-2 gap-6">
        <img
          src="/images/card-img.jpg"
          alt="product image"
          class="w-full h-56 object-cover rounded-lg"
        />
        <div>
          <h2 class="text-xl font-semibold mb-2">عنوان المنتج التجريبي</h2>
          <p class="text-gray-700 mb-4">
            وصف قصير عن المنتج. هنا تقدر تعرض التفاصيل اللي تسحبها من API بناءً
            على الـ id.
          </p>
          <div class="text-lg font-bold text-[#15c472]">السعر: 120 ر.س</div>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 justify-center md:justify-start">
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#00a859] to-[#15c472] text-white font-semibold hover:shadow-lg transition-shadow"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>مراسلة</span>
      </button>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#00a859] to-[#15c472] text-white font-semibold hover:shadow-lg transition-shadow"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
        <span>ابلاغ</span>
      </button>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#00a859] to-[#15c472] text-white font-semibold hover:shadow-lg transition-shadow"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span>مشاركة</span>
      </button>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#00a859] to-[#15c472] text-white font-semibold hover:shadow-lg transition-shadow"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <span>متابعة</span>
      </button>
    </div>
  </main>
  <footerSection />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "#imports";

const route = useRoute();
const id = route.params.id;

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
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}
</style>
