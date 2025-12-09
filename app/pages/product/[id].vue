<template>
  <main class="p-3 sm:p-6 md:p-10 mx-2 sm:mx-4 md:mx-15">
    <!-- Breadcrumb -->
    <div class="w-full flex items-center justify-start gap-2 mb-4 sm:mb-6">
      <div
        class="w-full bg-white-100 border border-gray-200 rounded-xl px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2"
      >
        <NuxtLink
          :to="backLink"
          class="font-medium text-gray-700 hover:text-[#15C472] text-sm sm:text-base"
        >
          {{ fromLabel }}
        </NuxtLink>
        <img src="/icons/arrow-route.svg" alt="arrow-route" class="w-3 h-3 sm:w-4 sm:h-4" />
        <span class="text-black font-semibold text-sm sm:text-base">المنتج</span>
      </div>
    </div>

    <!-- Seller Profile Section -->
    <section class="rounded-2xl mb-4 sm:mb-6">
      <!-- Card Container -->
      <div
        class="w-full max-w-2xl bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5"
      >
        <!-- Top Section: Name/Avatar and Rating -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4"
        >
          <!-- User Info (Right side in RTL) -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Avatar Image -->
            <img
              src="/images/card-user.jpg"
              alt="User Avatar"
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200"
            />
            <!-- Name -->
            <NuxtLink
              :to="`/merchant/${merchantId}?from=${route.query.from || 'benefits'}`"
              class="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#15C472] transition-colors cursor-pointer"
            >
              عبد العزيز الجبيري
            </NuxtLink>
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
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6 text-gray-800"
        >
          <!-- Location -->
          <div
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1 sm:p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/location.svg"
                alt="location-icon"
                class="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
            <span class="font-semibold text-sm sm:text-base md:text-lg">مدينة الرياض</span>
          </div>

          <!-- WhatsApp -->
          <a
            href="#"
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1 sm:p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/whatsapp.svg"
                alt="whatsapp-icon"
                class="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
            <span class="font-semibold text-sm sm:text-base md:text-lg"
              >محادثة واتس اب</span
            >
          </a>

          <!-- Phone Number -->
          <a
            href="#"
            class="flex items-center gap-2 group cursor-pointer hover:text-teal-700 transition-colors"
          >
            <div class="p-1 sm:p-1.5 rounded-full text-teal-600">
              <img
                src="/icons/phone-icon.svg"
                alt="phone-icon"
                class="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
            <span class="font-semibold text-sm sm:text-base md:text-lg"
              >رقم جوال المعلن</span
            >
          </a>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <div
      class="flex flex-wrap max-w-2xl gap-2 sm:gap-3 bg-linear-to-r from-[#00a859] to-[#15c472] hover:shadow-lg transition-shadow justify-between rounded-lg p-1 sm:p-0"
    >
      <button
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold cursor-pointer text-xs sm:text-sm md:text-base flex-1 sm:flex-none min-w-0"
        @click="navigateTo('/chat')"
      >
        <img src="/icons/message.svg" alt="message-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span class="truncate">مراسلة</span>
      </button>
      <button
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold cursor-pointer text-xs sm:text-sm md:text-base flex-1 sm:flex-none min-w-0"
        @click="openReportModal"
      >
        <img src="/icons/flag-2.svg" alt="report-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span class="truncate">ابلاغ</span>
      </button>
      <button
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold cursor-pointer text-xs sm:text-sm md:text-base flex-1 sm:flex-none min-w-0"
      >
        <img src="/icons/share.svg" alt="share-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span class="truncate">مشاركة</span>
      </button>
      <button
        @click="toggleFollow"
        :disabled="isLoadingFollow"
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold cursor-pointer text-xs sm:text-sm md:text-base flex-1 sm:flex-none min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img 
          v-if="!isLoadingFollow"
          src="/icons/follow.svg" 
          alt="follow-icon" 
          class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" 
        />
        <div 
          v-else
          class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
        ></div>
        <span class="truncate">
          {{ isLoadingFollow ? 'جاري التحميل...' : (isFollowing ? 'الغاء المتابعة' : 'متابعة') }}
        </span>
      </button>
    </div>
    <!-- produuct-banner -->
    <section class="bg-white rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-6 overflow-hidden">
      <div class="relative w-full h-[200px] sm:h-[250px] md:h-[30vw] min-h-[200px] rounded-lg">
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
    <section class="flex flex-col md:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
      <!-- Right Card: Location and Time Information -->
      <div
        class="flex-1 bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
      >
        <div class="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <!-- Location 1 -->
          <div class="flex items-center gap-2">
        <img src="/icons/located.svg" alt="location-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
            <span class="text-black text-sm sm:text-base">الرياض - الدرعية - الهنوف</span>
          </div>

          <!-- Location 2 -->
          <div class="flex items-center gap-2">
           <img src="/icons/located.svg" alt="location-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
            <span class="text-black text-sm sm:text-base"
              >٢١ شارع إبراهيم الزاوي الرياض</span
            >
          </div>

          <!-- Date and Time -->
          <div class="flex items-center gap-2">
          <img src="/icons/clock.svg" alt="time-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
            <span class="text-black text-sm sm:text-base">١٣/٤/٢٠٢٥ - ١٠:٠٩ ص</span>
          </div>
        </div>
      </div>
      <!-- Left Card: Product Information -->
      <div
        class="flex-1 bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
      >
        <h1 class="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">سنارة سمك كبيرة</h1>
       
       <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-2 mb-4">
        <div>
          <span class="text-[#15C472] text-lg sm:text-xl font-bold flex items-center gap-2">
            200 
            <img src="/icons/green-currency.svg" alt="saudi-riyal-icon" class="w-5 h-5 sm:w-6 sm:h-6">
          </span>
        </div>
        <div>
          <span class="text-[#15C472] text-lg sm:text-xl">
            سيف القحطاني
          </span>
        </div>
       </div>
        <p class="text-gray-700 text-sm sm:text-base leading-relaxed mt-3 sm:mt-0">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
        </p>
      </div>
    </section>
  </main>
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
import { useToast } from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const { user, isAuthenticated } = useAuth();
const id = route.params.id;

// Merchant ID - replace with actual merchant data when available
const merchantId = ref("1"); // You can replace this with actual merchant ID from product data

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

// Follow state
const isFollowing = ref(false);
const isLoadingFollow = ref(false);

// Toggle follow/unfollow via API
const toggleFollow = async () => {
  if (isLoadingFollow.value) return; // Prevent multiple clicks

  // Check if user is authenticated
  if (!isAuthenticated.value || !user.value) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يجب تسجيل الدخول لمتابعة المستخدمين",
      life: 3000,
    });
    return;
  }

  isLoadingFollow.value = true;

  try {
    // Debug: Log user info
    console.log("User object:", user.value);
    console.log("Is authenticated:", isAuthenticated.value);
    
    // Prepare headers - Laravel APIs typically use session cookies for authentication
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest", // Required for Laravel to recognize as AJAX request
    };
    
    // Try to get token if available (for API token auth)
    let token = user.value?.token || user.value?.access_token;
    if (!token && process.client) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
          console.log("Token from localStorage:", token);
        }
      } catch (e) {
        console.error('Error getting token from localStorage:', e);
      }
    }
    
    // Add Authorization header if token exists (for API token auth)
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      console.log("Using Bearer token authentication");
    } else {
      console.log("No token found - using session cookie authentication");
    }

    // Make the API request
    // Note: For cross-origin requests with cookies, backend CORS must allow credentials
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/users/toggle-follow",
      {
        method: "POST",
        headers: headers,
        body: {
          user_id: merchantId.value, // Send the merchant/user ID to follow/unfollow
        },
      }
    );

    if (response && response.key === "success") {
      // Toggle the follow state based on API response
      // If API returns the new state, use it; otherwise toggle locally
      if (response.data !== undefined) {
        isFollowing.value = response.data.is_following || response.data.following || !isFollowing.value;
      } else {
        isFollowing.value = !isFollowing.value;
      }

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: isFollowing.value ? "تم المتابعة بنجاح" : "تم إلغاء المتابعة بنجاح",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "فشل في تحديث حالة المتابعة");
    }
  } catch (err) {
    console.error("Error toggling follow:", err);
    console.error("Full error object:", err);
    
    // Check if error is due to authentication
    const errorMessage = err?.data?.message || err?.message || err?.data?.msg || "";
    const isAuthError = errorMessage.includes("user") && errorMessage.includes("null") || 
                        err?.status === 401 || 
                        err?.statusCode === 401;
    
    if (isAuthError) {
      toast.add({
        severity: "error",
        summary: "خطأ في المصادقة",
        detail: "يجب تسجيل الدخول من خلال واجهة برمجة التطبيقات. الرجاء تسجيل الدخول أولاً.",
        life: 5000,
      });
      // Optionally redirect to login
      // navigateTo('/login');
    } else {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: errorMessage || "حدث خطأ أثناء تحديث حالة المتابعة. الرجاء المحاولة مرة أخرى.",
        life: 3000,
      });
    }
  } finally {
    isLoadingFollow.value = false;
  }
};
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}
</style>
