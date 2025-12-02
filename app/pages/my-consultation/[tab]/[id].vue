<template>
  <div>
    <navHeader />
    <main class="p-3 sm:p-6 md:p-10 mx-2 sm:mx-4 md:mx-15">
      <!-- Breadcrumb -->
      <div class="w-full flex items-center justify-start gap-2 mb-4 sm:mb-6">
        <div
          class="w-full bg-white border border-gray-200 rounded-xl px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2"
        >
          <NuxtLink
            to="/my-consultation"
            class="font-medium text-gray-700 hover:text-[#15C472] text-sm sm:text-base"
          >
            استشاراتي
          </NuxtLink>
          <img src="/icons/arrow-route.svg" alt="arrow-route" class="w-3 h-3 sm:w-4 sm:h-4" />
          <NuxtLink
            :to="`/my-consultation?tab=${tabParam}`"
            class="font-medium text-gray-700 hover:text-[#15C472] text-sm sm:text-base"
          >
            {{ tabLabel }}
          </NuxtLink>
          <img src="/icons/arrow-route.svg" alt="arrow-route" class="w-3 h-3 sm:w-4 sm:h-4" />
          <span class="text-black font-semibold text-sm sm:text-base">رقم الطلب</span>
        </div>
      </div>

      <!-- Order Detail Content -->
      <section class="mb-4 sm:mb-6">
        <div class="bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
        

       

          <!-- Content for New Tab (جديدة) -->
          <template v-if="tabParam === 'new'">
            <!-- Video Call Interface -->
            <div class="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div class="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <!-- Video Call Screen Placeholder -->
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div class="text-center text-white">
                    <div class="mb-4">
                      <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p class="text-gray-300 text-sm">جلسة استشارية</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Details Section -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                

                <!-- Left Column - Values -->
                <div class="space-y-4">
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">#{{ orderData.orderNumber }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span
                      class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                      :class="getStatusClass(orderData.status)"
                    >
                      {{ orderData.status }}
                    </span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{ orderData.department }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{ orderData.courseName || "دورة الاستزراع المائي" }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{ orderData.location }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold flex items-center gap-1">
                      {{ orderData.price }}
                      <img src="/icons/green-currency.svg" alt="currency" class="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cancel Order Button -->
            <div class="w-full">
              <button
                @click="cancelOrder"
                class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                الغاء الطلب
              </button>
            </div>
          </template>

          <!-- Content for Current Tab (حالية) -->
          <template v-if="tabParam === 'current'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <!-- Order Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات الطلب</h2>
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <img src="/icons/clock.svg" alt="time-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">تاريخ الطلب: {{ orderData.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/located.svg" alt="location-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">المكان: {{ orderData.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Department Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات القسم</h2>
                <div class="space-y-3">
                  <div>
                    <p class="text-gray-700 text-sm sm:text-base">{{ orderData.department }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/phone-icon.svg" alt="phone-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">للتواصل: {{ orderData.contactNumber }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accepted Status Message -->
            <div class="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div class="flex items-start gap-3">
                <img src="/icons/clock.svg" alt="accepted" class="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 class="text-lg font-bold text-green-900 mb-2">تم قبول الطلب</h3>
                  <p class="text-green-800 text-sm sm:text-base">
                    تم قبول طلبك بنجاح! الفريق المختص يعمل على تنفيذ طلبك. يمكنك متابعة التحديثات من هنا.
                  </p>
                </div>
              </div>
            </div>

            <!-- Order Description -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 class="text-lg font-bold text-black mb-4">وصف الطلب</h2>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                {{ orderData.description }}
              </p>
            </div>
          </template>

          <!-- Content for Finished Tab (منتهية) -->
          <template v-if="tabParam === 'finished'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <!-- Order Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات الطلب</h2>
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <img src="/icons/clock.svg" alt="time-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">تاريخ الطلب: {{ orderData.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/located.svg" alt="location-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">المكان: {{ orderData.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/clock.svg" alt="completed-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">تاريخ الإنجاز: {{ orderData.date }}</span>
                  </div>
                </div>
              </div>

              <!-- Department Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات القسم</h2>
                <div class="space-y-3">
                  <div>
                    <p class="text-gray-700 text-sm sm:text-base">{{ orderData.department }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/phone-icon.svg" alt="phone-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">للتواصل: {{ orderData.contactNumber }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Completed Status Message -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div class="flex items-start gap-3">
                <img src="/icons/clock.svg" alt="completed" class="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 class="text-lg font-bold text-blue-900 mb-2">تم إنجاز الطلب</h3>
                  <p class="text-blue-800 text-sm sm:text-base">
                    تم إنجاز طلبك بنجاح! نأمل أن تكون راضياً عن الخدمة المقدمة. يمكنك تقييم الخدمة أو طلب خدمة جديدة.
                  </p>
                </div>
              </div>
            </div>

            <!-- Order Description -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 class="text-lg font-bold text-black mb-4">وصف الطلب</h2>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                {{ orderData.description }}
              </p>
            </div>

            <!-- Rating Section (only for finished orders) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 class="text-lg font-bold text-black mb-4">تقييم الخدمة</h2>
              <p class="text-gray-700 text-sm sm:text-base mb-4">
                كيف كانت تجربتك مع هذه الخدمة؟
              </p>
              <div class="flex items-center gap-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  class="text-2xl hover:text-yellow-400 transition-colors"
                  :class="star <= 4 ? 'text-yellow-400' : 'text-gray-300'"
                >
                  ★
                </button>
                <span class="text-gray-600 text-sm mr-2">4.0</span>
              </div>
            </div>
          </template>

          <!-- Content for Canceled Tab (ملغية) -->
          <template v-if="tabParam === 'canceled'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <!-- Order Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات الطلب</h2>
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <img src="/icons/clock.svg" alt="time-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">تاريخ الطلب: {{ orderData.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/located.svg" alt="location-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">المكان: {{ orderData.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/clock.svg" alt="canceled-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">تاريخ الإلغاء: {{ orderData.date }}</span>
                  </div>
                </div>
              </div>

              <!-- Department Information Card -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 class="text-lg font-bold text-black mb-4">معلومات القسم</h2>
                <div class="space-y-3">
                  <div>
                    <p class="text-gray-700 text-sm sm:text-base">{{ orderData.department }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/icons/phone-icon.svg" alt="phone-icon" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-gray-700 text-sm sm:text-base">للتواصل: {{ orderData.contactNumber }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Canceled Status Message -->
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div class="flex items-start gap-3">
                <img src="/icons/clock.svg" alt="canceled" class="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 class="text-lg font-bold text-red-900 mb-2">تم إلغاء الطلب</h3>
                  <p class="text-red-800 text-sm sm:text-base">
                    تم إلغاء هذا الطلب. إذا كان لديك أي استفسارات، يرجى التواصل مع فريق الدعم.
                  </p>
                </div>
              </div>
            </div>

            <!-- Order Description -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 class="text-lg font-bold text-black mb-4">وصف الطلب</h2>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                {{ orderData.description }}
              </p>
            </div>
          </template>
        </div>
      </section>
    </main>
    <footerSection />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "#imports";

const route = useRoute();
const orderId = route.params.id;
const tabParam = route.params.tab || "new";

// Tab labels mapping
const tabLabels = {
  new: "جديدة",
  current: "حالية",
  finished: "منتهية",
  canceled: "ملغية",
};

const tabLabel = computed(() => tabLabels[tabParam] || "جديدة");

// Get order data using composable
// TODO: When API is ready, make this async:
// const { getOrderById } = useOrders();
// const orderData = ref(await getOrderById(orderId, tabParam));
const { getOrderById } = useOrders();
const orderData = ref(getOrderById(orderId, tabParam));

function getStatusClass(status) {
  const statusClasses = {
    معلق: "bg-yellow-100 text-yellow-800",
    "تم القبول": "bg-green-100 text-green-800",
    منتهي: "bg-blue-100 text-blue-800",
    ملغي: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
}

// Cancel order function
const cancelOrder = () => {
  // Add your cancel order logic here
  if (confirm("هل أنت متأكد من إلغاء هذا الطلب؟")) {
    // Handle order cancellation
    console.log("Order cancelled:", orderId);
    // You can navigate back or show a success message
  }
};
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}
</style>

