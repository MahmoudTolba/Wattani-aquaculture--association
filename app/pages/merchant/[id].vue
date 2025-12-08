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
          class="bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 relative hover:shadow-md transition-shadow order-1 lg:order-2"
        >
          <!-- Rating Badge (Absolute positioned to top-left) -->
          <div
            class="absolute top-4 sm:top-5 left-4 sm:left-5 flex items-center gap-1 text-gray-500 text-sm"
          >
            <span class="font-bold pt-1">4.5</span>
      <img src="/icons/rating-star.svg" alt="star-icon" class="w-3 h-3 text-amber-400 fill-current">
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Profile Image -->
            <div class="shrink-0">
              <img
                src="/images/card-user.jpg"
                alt="Merchant Profile"
                class="w-full sm:w-32 sm:h-32 rounded-xl object-cover shadow-sm"
              />
            </div>

            <!-- Profile Details -->
            <div class="grow flex flex-col gap-3">
              <!-- Name -->
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 text-right">
                عبد العزيز الجبيري
              </h2>

              <!-- Contact Buttons Row -->
              <div class="flex flex-wrap gap-2 justify-start">
                <!-- Mobile Button -->
                <button
                  class="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <img
                    src="/icons/phone-icon.svg"
                    alt="phone-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>رقم جوال المعلن</span>
                </button>

                <!-- Email Button -->
                <button
                  class="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                >
              <img src="/icons/email-icon.svg" alt="email-icon" class="w-4 h-4 text-[#15C472]">
                  <span>البريد الالكتروني</span>
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
                  class="flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors shadow-sm"
                  @click="toggleFollow"
                >
                  <img
                    src="/icons/follow.svg"
                    alt="follow-icon"
                    class="w-4 h-4 text-[#15C472]"
                  />
                  <span>{{ isFollowing ? "الغاء المتابعة" : "متابعة" }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
           <!-- Left Card: Location and Contact Info -->
           <div
          class="bg-[#F8F9FA] rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col justify-center gap-4 sm:gap-5 hover:shadow-md transition-shadow order-2 lg:order-1"
        >
          <!-- Location 1 -->
          <div class="flex items-center justify-end lg:justify-start gap-3 text-gray-800">
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

          <!-- Location 2 -->
          <div class="flex items-center justify-end lg:justify-start gap-3 text-gray-800">
            <div class="w-8 flex justify-center">
              <img
                src="/icons/located.svg"
                alt="location-icon"
                class="w-5 h-5 sm:w-6 sm:h-6 text-teal-500"
              />
            </div>
            <span class="text-base sm:text-lg font-medium text-right flex-1"
              >٢١ شارع إبراهيم الزاوي الرياض</span
            >
          </div>

          <!-- WhatsApp -->
          <a
            href="#"
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
        <div class="flex items-center gap-6 sm:gap-8 mb-6 ">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  :class="product.isFav ? 'text-[#15C472] fill-current' : 'text-gray-400'"
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
                <h3 class="text-base font-bold text-gray-900 flex-1">{{ product.title }}</h3>
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
                  <span class="text-sm font-bold text-gray-600">{{ product.rating }}</span>
                </div>
              </div>

              <div class="text-lg font-bold text-[#15C472] mb-2">{{ product.price }}</div>

              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <img src="/icons/location.svg" alt="location" class="w-4 h-4" />
                <span>{{ product.location }}</span>
                <span class="text-gray-300">•</span>
                <img src="/icons/clock.svg" alt="time" class="w-4 h-4" />
                <span>{{ product.timeAgo }}</span>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-gray-100">
                <img
                  :src="product.owner.avatar"
                  :alt="product.owner.name"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <span class="text-sm text-gray-700">{{ product.owner.name }}</span>
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
import { computed, ref, nextTick } from "vue";
import { useRoute } from "#imports";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const { id } = route.params;
const from = route.query.from;

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

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
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

const submitReview = () => {
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

  // Add new review
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
};

// Main Category Tabs
const mainTabs = [
  { key: "benefits", label: "منافع الوطني" },
  { key: "experts", label: "خبراء وطني" },
  { key: "courses", label: "دورات وطني" },
];

const activeMainTab = ref(from || "benefits");

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

const productsByMainTab = {
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
};

const currentProducts = computed(() => {
  const mainTabProducts = productsByMainTab[activeMainTab.value] || productsByMainTab.benefits;
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
