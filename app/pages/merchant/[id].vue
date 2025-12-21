<template>
  <div>
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
          <img
            src="/icons/arrow-route.svg"
            alt="arrow-route"
            class="w-3 h-3 sm:w-4 sm:h-4"
          />
          <span class="text-black font-semibold text-sm sm:text-base"
            >التاجر</span
          >
        </div>
      </div>

      <!-- Two Cards Section -->
      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-4 sm:mb-6"
      >
        <!-- Right Card: Profile Section -->
        <div
          class="bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 relative hover:shadow-md transition-shadow"
        >
          <!-- Rating Badge (Absolute positioned to top-left) -->
          <div
            class="absolute top-4 sm:top-5 left-4 sm:left-5 flex items-center gap-1 text-gray-500 text-sm"
          >
            <span class="font-bold pt-1">{{ merchant.rating }}</span>
            <img
              src="/icons/rating-star.svg"
              alt="star-icon"
              class="w-3 h-3 text-amber-400 fill-current"
            />
          </div>

          <div v-if="isLoadingMerchant" class="flex items-center justify-center p-8">
            <div class="w-8 h-8 border-4 border-[#15C472] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div v-else class="flex flex-col sm:flex-row gap-4">
            <!-- Profile Image -->
            <div class="shrink-0">
              <img
                :src="merchant.image"
                :alt="merchant.name"
                class="w-full sm:w-32 sm:h-32 rounded-xl object-cover shadow-sm"
              />
            </div>

            <!-- Profile Details -->
            <div class="grow flex flex-col gap-3">
              <!-- Name -->
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 text-right">
                {{ merchant.name }}
              </h2>

              <!-- Contact Buttons Row -->
              <div class="flex flex-wrap gap-2 justify-start">
                <!-- Mobile Button -->
                <button
                  v-if="merchant.phone"
                  class="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                  @click="window.location.href = `tel:${merchant.phone}`"
                >
                  <img
                    src="/icons/phone-icon.svg"
                    alt="phone-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>{{ merchant.phone }}</span>
                </button>

                <!-- Email Button -->
                <button
                  v-if="merchant.email"
                  class="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                  @click="window.location.href = `mailto:${merchant.email}`"
                >
                  <img
                    src="/icons/email-icon.svg"
                    alt="email-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>{{ merchant.email }}</span>
                </button>
              </div>

              <!-- Actions Row -->
              <div class="flex flex-wrap gap-2 mt-1">
                <!-- Report Button -->
                <button
                  class="flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                  @click="openReportModal"
                >
                  <img
                    src="/icons/flag-2.svg"
                    alt="report-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>إبلاغ</span>
                </button>

                <!-- Follow Button -->
                <button
                  class="flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="toggleFollow"
                  :disabled="isLoadingFollow"
                >
                  <div
                    v-if="isLoadingFollow"
                    class="w-4 h-4 border-2 border-[#15C472] border-t-transparent rounded-full animate-spin"
                  ></div>
                  <img
                    v-else
                    src="/icons/follow.svg"
                    alt="follow-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>{{ isLoadingFollow ? "جاري التحميل..." : (isFollowing ? "الغاء المتابعة" : "متابعة") }}</span>
                </button>
                <button
                  v-if="merchant.consultation_price"
                  class="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <span> سعر الاستشارة </span>
                  <span class="text-xs font-bold text-[#15C472]"> {{ merchant.consultation_price }} </span>
                  <img
                    src="/icons/green-currency.svg"
                    alt="email-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Left Card: Location and Contact Info -->
        <div
          class="bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col justify-center gap-4 sm:gap-5 hover:shadow-md transition-shadow order-2 lg:order-1"
        >
          <!-- Locations -->
          <div
            v-for="(location, index) in merchant.locations"
            :key="index"
            class="flex items-center justify-end lg:justify-start gap-3 text-gray-800"
          >
            <div class="w-8 flex justify-center">
              <img
                src="/icons/located.svg"
                alt="location-icon"
                class="w-5 h-5 sm:w-6 sm:h-6 text-teal-500"
              />
            </div>
            <span class="text-base sm:text-lg font-medium text-right flex-1"
              >{{ location.address || location.name || location }}</span
            >
          </div>

          <!-- Default location if no locations from API -->
          <div
            v-if="merchant.locations.length === 0"
            class="flex items-center justify-end lg:justify-start gap-3 text-gray-800"
          >
            <div class="w-8 flex justify-center">
              <img
                src="/icons/located.svg"
                alt="location-icon"
                class="w-5 h-5 sm:w-6 sm:h-6 text-teal-500"
              />
            </div>
            <span class="text-base sm:text-lg font-medium text-right flex-1"
              >الرياض - الدرعية - الهنوف</span
            >
          </div>

          <!-- WhatsApp -->
          <a
            v-if="merchant.whatsapp"
            :href="`https://wa.me/${merchant.whatsapp.replace(/[^0-9]/g, '')}`"
            target="_blank"
            class="flex items-center justify-end lg:justify-start gap-3 text-gray-800 cursor-pointer group"
          >
            <div class="w-8 flex justify-center">
              <img
                src="/icons/whatsapp.svg"
                alt="whatsapp-icon"
                class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
              />
            </div>
            <span
              class="text-base sm:text-lg font-medium text-right flex-1 group-hover:text-teal-600 transition-colors"
              >محادثة واتس اب</span
            >
          </a>
        </div>
      </section>

      <!-- Reviews Section -->
      <section
        class="bg-[#F8F9FA] rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6"
      >
        <!-- Section Title -->
        <h3 class="text-lg font-bold text-right mb-4 text-gray-900">
          التعليقات
        </h3>

        <!-- Reviews List -->
        <div class="space-y-4 sm:space-y-6">
          <!-- Review Item 1 -->
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            :class="{ 'animate-fade-in': review.isNew }"
          >
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-bold text-gray-900">{{ review.name }}</h4>
              <div class="flex text-amber-400 text-xs">
                <svg
                  v-for="star in 5"
                  :key="star"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'h-3 w-3',
                    star <= review.rating
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300',
                  ]"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed text-right">
              {{ review.text }}
            </p>
          </div>
        </div>

        <!-- Add Review Area -->
        <div class="mt-6 sm:mt-8 flex flex-col items-center gap-4">
          <!-- Stars Input -->
          <div class="flex gap-1 text-gray-300 text-lg cursor-pointer">
            <svg
              v-for="star in 5"
              :key="star"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                'h-5 w-5 transition-colors cursor-pointer',
                star <= (hoverRating || currentRating)
                  ? 'text-amber-400 fill-current'
                  : 'text-gray-300',
              ]"
              viewBox="0 0 20 20"
              @click="setRating(star)"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <p class="text-xs text-gray-400 h-4">{{ ratingText }}</p>

          <!-- Input Box -->
          <div
            class="w-full bg-white rounded-lg p-2 flex items-center shadow-sm border border-gray-100 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all"
          >
            <input
              v-model="reviewText"
              type="text"
              placeholder="اكتب تقييمك هنا..."
              class="flex-1 bg-transparent px-3 text-right outline-none text-gray-700 placeholder-gray-400"
              @keyup.enter="submitReview"
            />
            <button
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 rounded-md font-medium text-sm transition-colors transform active:scale-95"
              @click="submitReview"
            >
              تقييم
            </button>
          </div>
        </div>
      </section>

      <!-- Main Category Tabs -->
      <section class="mb-4 sm:mb-6 mt-10">
        <div class="flex items-center gap-6 sm:gap-8 mb-6">
          <button
            v-for="tab in mainTabs"
            :key="tab.key"
            class="pb-3 px-2 font-medium text-base sm:text-lg transition-colors relative"
            :class="
              activeMainTab === tab.key
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#15C472] to-[#0A717E]'
                : 'text-gray-500 hover:text-gray-700'
            "
            @click="activeMainTab = tab.key"
          >
            {{ tab.label }}
            <span
              v-if="activeMainTab === tab.key"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#15C472] to-[#0A717E]"
            ></span>
          </button>
        </div>
      </section>

      <!-- Products Section -->
      <section class="mb-4 sm:mb-6">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            v-for="tab in productTabs"
            :key="tab.key"
            class="px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors"
            :class="
              activeProductTab === tab.key
                ? 'bg-[#15C472] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            "
            @click="activeProductTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Products Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <article
            v-for="product in currentProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            @click="goToProduct(product)"
          >
            <div class="relative">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-48 object-cover"
              />
              <button
                class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                @click.stop="toggleFav(product)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  :class="
                    product.isFav
                      ? 'text-[#15C472] fill-current'
                      : 'text-gray-400'
                  "
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z"
                  />
                </svg>
              </button>
            </div>

            <div class="p-4">
              <div class="flex items-center justify-between gap-2 mb-2">
                <h3 class="text-base font-bold text-gray-900 flex-1">
                  {{ product.title }}
                </h3>
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-sm font-bold text-gray-600">{{
                    product.rating
                  }}</span>
                </div>
              </div>

              <div class="text-lg font-bold text-[#15C472] mb-2">
                {{ product.price }}
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <img src="/icons/location.svg" alt="location" class="w-4 h-4" />
                <span>{{ product.location }}</span>
                <span class="text-gray-300">•</span>
                <img src="/icons/clock.svg" alt="time" class="w-4 h-4" />
                <span>{{ product.timeAgo }}</span>
              </div>

              <div
                class="flex items-center gap-2 pt-2 border-t border-gray-100"
              >
                <img
                  :src="product.owner.avatar"
                  :alt="product.owner.name"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <span class="text-sm text-gray-700">{{
                  product.owner.name
                }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <!-- Report Modal -->
    <ReportModal
      :is-open="isReportModalOpen"
      @close="closeReportModal"
      @submit="handleReportSubmit"
    />
  </div>
</template>

<script setup>
import { computed, ref, nextTick, reactive, onMounted, watch } from "vue";
import { useRoute } from "#imports";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const { id } = route.params;
const from = route.query.from;

// Loading states
const isLoadingMerchant = ref(false);
const isLoadingReviews = ref(false);
const isLoadingProducts = ref(false);
const isLoadingFollow = ref(false);

// Merchant data
const merchant = ref({
  id: null,
  name: "",
  image: "/images/card-user.jpg",
  rating: 4.5,
  phone: "",
  email: "",
  whatsapp: "",
  locations: [],
  consultation_price: 20,
  is_following: false,
});

// Build auth headers helper
const buildAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  let token = null;
  try {
    const userStore = useState("auth.user");
    token = userStore?.value?.token || userStore?.value?.access_token || null;
  } catch (e) {
    // ignore if store not available
  }

  if (!token && process.client) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || parsedUser?.access_token;
      }
    } catch (e) {
      console.error("Error getting token from localStorage:", e);
    }
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Fetch merchant details
const fetchMerchantDetails = async () => {
  isLoadingMerchant.value = true;
  try {
    // Determine endpoint based on the 'from' parameter
    // If from=experts, use consultants endpoint, otherwise use users endpoint
    const endpoint =
      from === "experts"
        ? `https://backend.wattani-sa.com/api/v1/consultants/${id}`
        : `https://backend.wattani-sa.com/api/v1/users/${id}`;

    const response = await $fetch(endpoint, {
      method: "GET",
      headers: buildAuthHeaders(),
    });

    if (response && response.key === "success" && response.data) {
      const data = response.data;
      
      // Handle consultant data structure
      if (from === "experts") {
        merchant.value = {
          id: data.id || id,
          name: data.name || data.user?.name || data.full_name || "غير معروف",
          image: data.image || data.avatar || data.user?.avatar || data.photo || "/images/card-user.jpg",
          rating: data.rating || data.avg_rating || data.rate || 4.5,
          phone: data.phone || data.mobile || data.user?.phone || "",
          email: data.email || data.user?.email || "",
          whatsapp: data.whatsapp || data.whatsapp_number || data.user?.whatsapp || "",
          locations: data.locations || data.addresses || (data.location ? [data.location] : []),
          consultation_price: data.consultation_cost || data.consultation_price || data.price || 20,
          is_following: data.is_following || false,
        };
      } else {
        // Handle regular user data structure
        merchant.value = {
          id: data.id || id,
          name: data.name || data.full_name || "غير معروف",
          image: data.image || data.avatar || "/images/card-user.jpg",
          rating: data.rating || data.avg_rating || 4.5,
          phone: data.phone || data.mobile || "",
          email: data.email || "",
          whatsapp: data.whatsapp || data.whatsapp_number || "",
          locations: data.locations || data.addresses || [],
          consultation_price: data.consultation_price || data.price || 20,
          is_following: data.is_following || false,
        };
      }
      
      isFollowing.value = merchant.value.is_following;
    } else if (response?.key === "unauthenticated") {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: response?.msg || "يرجى تسجيل الدخول لعرض بيانات التاجر",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: response?.msg || "فشل في جلب بيانات التاجر",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error fetching merchant details:", error);
    
    // Handle unauthenticated error specifically
    if (error?.data?.key === "unauthenticated" || error?.statusCode === 401) {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: error?.data?.msg || "يرجى تسجيل الدخول لعرض بيانات التاجر",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: error?.data?.msg || error?.message || "حدث خطأ أثناء جلب بيانات التاجر",
        life: 3000,
      });
    }
  } finally {
    isLoadingMerchant.value = false;
  }
};

// Fetch merchant reviews
const fetchReviews = async () => {
  isLoadingReviews.value = true;
  try {
    // Use consultants endpoint for reviews if from=experts
    const endpoint =
      from === "experts"
        ? `https://backend.wattani-sa.com/api/v1/consultants/${id}/reviews`
        : `https://backend.wattani-sa.com/api/v1/users/${id}/reviews`;

    const response = await $fetch(endpoint, {
      method: "GET",
      headers: buildAuthHeaders(),
    });

    if (response && response.key === "success" && response.data) {
      const reviewsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      reviews.value = reviewsData.map((review) => ({
        name: review.user?.name || review.name || "مستخدم",
        rating: review.rating || 0,
        text: review.comment || review.text || "",
        isNew: false,
      }));
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Don't show error toast for reviews, just use empty array
  } finally {
    isLoadingReviews.value = false;
  }
};

// Fetch merchant products/services
const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    // Determine endpoint based on active tab
    let endpoint = "";
    
    // If we're viewing a consultant (from=experts) and the active tab is "experts",
    // we don't need to fetch consultants again - we're already viewing one
    // Instead, we can fetch their consultations/services or skip
    if (from === "experts" && activeMainTab.value === "experts") {
      // For consultant's own page, maybe fetch consultations or skip
      // For now, skip fetching and use empty array or existing data
      isLoadingProducts.value = false;
      return;
    }
    
    switch (activeMainTab.value) {
      case "benefits":
        endpoint = `https://backend.wattani-sa.com/api/v1/adverts?user_id=${id}`;
        break;
      case "experts":
        // When viewing a regular user's page and experts tab is selected
        // Try to fetch their consultations if available, otherwise skip
        endpoint = `https://backend.wattani-sa.com/api/v1/consultations?user_id=${id}`;
        break;
      case "courses":
        endpoint = `https://backend.wattani-sa.com/api/v1/courses?user_id=${id}`;
        break;
      default:
        endpoint = `https://backend.wattani-sa.com/api/v1/adverts?user_id=${id}`;
    }

    const response = await $fetch(endpoint, {
      method: "GET",
      headers: buildAuthHeaders(),
    });

    if (response && response.key === "success" && response.data) {
      const productsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      // Transform API response to match product structure
      const transformedProducts = productsData.map((item, index) => ({
        id: item.id || `${activeMainTab.value}-${index}`,
        title: item.title || item.name || "عنوان غير محدد",
        price: item.price || item.consultation_cost || "0 ر.س",
        rating: item.rating || item.avg_rating || "4.5",
        image: item.image || item.photo || item.avatar || "/images/card-img.jpg",
        location: item.location || item.city || "مدينة الرياض",
        timeAgo: item.created_at
          ? formatTimeAgo(item.created_at)
          : "منذ ٦ ساعات",
        owner: {
          name: merchant.value.name || "عبد العزيز الجبيري",
          avatar: merchant.value.image || "/images/card-user.jpg",
        },
        isFav: item.is_favorite || false,
      }));

      // Update products based on active tab
      if (activeProductTab.value === "all") {
        productsByMainTab[activeMainTab.value].all = transformedProducts;
      } else {
        // If you have category filtering, implement it here
        productsByMainTab[activeMainTab.value].all = transformedProducts;
      }
    } else if (response?.key === "exception" || response?.key === "error") {
      // Handle 404 or other errors silently for products
      console.warn("Products endpoint returned error:", response?.msg);
      // Keep existing products or use empty array
      productsByMainTab[activeMainTab.value].all = [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    // Don't show error toast, just keep existing products or use empty array
    // If it's a 404, that's expected for some endpoints
    if (error?.statusCode !== 404) {
      console.warn("Non-404 error fetching products:", error);
    }
    productsByMainTab[activeMainTab.value].all = [];
  } finally {
    isLoadingProducts.value = false;
  }
};

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  // Simple implementation - you can use a library like date-fns or moment
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "منذ أقل من ساعة";
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `منذ ${diffInWeeks} أسبوع`;
};

// Load data on mount
onMounted(async () => {
  await Promise.all([
    fetchMerchantDetails(),
    fetchReviews(),
    fetchProducts(),
  ]);
});

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

// Follow State
const isFollowing = ref(false);

const toggleFollow = async () => {
  isLoadingFollow.value = true;

  try {
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/users/toggle-follow",
      {
        method: "POST",
        headers: buildAuthHeaders(),
        body: {
          user_id: id,
        },
      }
    );

    if (response && response.key === "success") {
      isFollowing.value = !isFollowing.value;
      merchant.value.is_following = isFollowing.value;
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: isFollowing.value
          ? "تمت المتابعة بنجاح"
          : "تم إلغاء المتابعة بنجاح",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: response?.msg || "فشل في تحديث حالة المتابعة",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error?.data?.msg || error?.message || "حدث خطأ أثناء تحديث حالة المتابعة",
      life: 3000,
    });
  } finally {
    isLoadingFollow.value = false;
  }
};

// Reviews State
const reviews = ref([
  {
    name: "محمد المهني",
    rating: 4,
    text: "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر.",
    isNew: false,
  },
  {
    name: "محمد المهني",
    rating: 4,
    text: "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر.",
    isNew: false,
  },
  {
    name: "محمد المهني",
    rating: 4,
    text: "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر.",
    isNew: false,
  },
]);

const currentRating = ref(0);
const hoverRating = ref(0);
const reviewText = ref("");
const ratingText = ref("");

const ratingLabels = ["سيء", "مقبول", "جيد", "جيد جداً", "ممتاز"];

const setRating = (value) => {
  currentRating.value = value;
  if (value > 0) {
    ratingText.value = ratingLabels[value - 1];
  } else {
    ratingText.value = "";
  }
};

const submitReview = async () => {
  // Basic Validation
  if (currentRating.value === 0) {
    toast.add({
      severity: "warn",
      summary: "تنبيه",
      detail: "الرجاء اختيار التقييم (عدد النجوم) أولاً",
      life: 3000,
    });
    return;
  }
  if (reviewText.value.trim() === "") {
    toast.add({
      severity: "warn",
      summary: "تنبيه",
      detail: "الرجاء كتابة تعليق",
      life: 3000,
    });
    return;
  }

  try {
    // Use consultants endpoint for reviews if from=experts
    const endpoint =
      from === "experts"
        ? `https://backend.wattani-sa.com/api/v1/consultants/${id}/reviews`
        : `https://backend.wattani-sa.com/api/v1/users/${id}/reviews`;

    const response = await $fetch(endpoint, {
      method: "POST",
      headers: buildAuthHeaders(),
      body: {
        rating: currentRating.value,
        comment: reviewText.value.trim(),
      },
    });

    if (response && response.key === "success") {
      // Add new review to list
      const newReview = {
        name: "مستخدم جديد",
        rating: currentRating.value,
        text: reviewText.value.trim(),
        isNew: true,
      };

      reviews.value.push(newReview);

      // Reset form
      reviewText.value = "";
      setRating(0);
      hoverRating.value = 0;

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: "تم إضافة التقييم بنجاح",
        life: 3000,
      });

      // Scroll to new review
      nextTick(() => {
        const reviewElements = document.querySelectorAll(".animate-fade-in");
        if (reviewElements.length > 0) {
          reviewElements[reviewElements.length - 1].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });

      // Refresh reviews from API
      await fetchReviews();
    } else {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: response?.msg || "فشل في إضافة التقييم",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error?.data?.msg || error?.message || "حدث خطأ أثناء إضافة التقييم",
      life: 3000,
    });
  }
};

// Main Category Tabs
const mainTabs = [
  { key: "benefits", label: "منافع الوطني" },
  { key: "experts", label: "خبراء وطني" },
  { key: "courses", label: "دورات وطني" },
];

const activeMainTab = ref(from || "benefits");

// Watch for tab changes to fetch products
watch(activeMainTab, () => {
  fetchProducts();
});

// Products Section
const productTabs = [
  { key: "all", label: "الكل" },
  { key: "section1", label: "القسم الاول" },
  { key: "section2", label: "القسم الثاني" },
  { key: "section3", label: "القسم الثالث" },
];

const activeProductTab = ref("all");

const createProducts = (title, price) => {
  return Array.from({ length: 4 }).map((_, index) => ({
    id: `${title.replace(/\s+/g, "-")}-${index}`,
    title,
    price,
    rating: "4.5",
    image: "/images/card-img.jpg",
    location: "مدينة الرياض",
    timeAgo: "منذ ٦ ساعات",
    owner: {
      name: "عبد العزيز الجبيري",
      avatar: "/images/card-user.jpg",
    },
    isFav: false,
  }));
};

const productsByMainTab = reactive({
  benefits: {
    all: [
      ...createProducts("سنارة سمك كبيرة", "50 ر.س"),
      ...createProducts("شبكة صيد احترافية", "120 ر.س"),
    ],
    section1: createProducts("سنارة سمك كبيرة", "50 ر.س"),
    section2: createProducts("شبكة صيد احترافية", "120 ر.س"),
    section3: createProducts("معدات صيد متقدمة", "200 ر.س"),
  },
  experts: {
    all: [
      ...createProducts("استشارة تربية أسماك", "200 ر.س"),
      ...createProducts("استشارة إدارة المزارع", "300 ر.س"),
    ],
    section1: createProducts("استشارة تربية أسماك", "200 ر.س"),
    section2: createProducts("استشارة إدارة المزارع", "300 ر.س"),
    section3: createProducts("استشارة تقنية", "250 ر.س"),
  },
  courses: {
    all: [
      ...createProducts("دورة إدارة المزارع", "350 ر.س"),
      ...createProducts("دورة تربية الأسماك", "400 ر.س"),
    ],
    section1: createProducts("دورة إدارة المزارع", "350 ر.س"),
    section2: createProducts("دورة تربية الأسماك", "400 ر.س"),
    section3: createProducts("دورة متقدمة", "450 ر.س"),
  },
});

const currentProducts = computed(() => {
  const mainTabProducts =
    productsByMainTab[activeMainTab.value] || productsByMainTab.benefits;
  return mainTabProducts[activeProductTab.value] || mainTabProducts.all;
});

const goToProduct = (product) => {
  navigateTo({
    path: `/product/${product.id}`,
    query: {
      from: activeMainTab.value,
    },
  });
};

const toggleFav = (product) => {
  product.isFav = !product.isFav;
};

/* خريطة الأسماء للـ tabs علشان تظهر اسم التاب في الـ breadcrumb */
const tabsMap = {
  home: "الرئيسية",
  benefits: "منافع الوطني",
  experts: "خبراء وطني",
  courses: "دورات وطني",
};

/* اسم التاب الذي جئت منه (أو قيمة افتراضية) */
const fromLabel = computed(() => tabsMap[from] || "منافع الوطني");

/* الرابط الخلفي اعتمادًا على التاب */
const backLink = computed(() => {
  switch (from) {
    case "home":
      return "/";
    case "benefits":
      return "/products";
    case "experts":
      return "/experts";
    case "courses":
      return "/courses";
    default:
      return "/benefits";
  }
});
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}

/* Animation for new reviews */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
