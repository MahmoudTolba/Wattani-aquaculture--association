<template>
  <div class="space-y-6">
    <div
      v-if="isLoadingSubscriptions"
      class="flex justify-center items-center py-12"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
        ></div>
        <p class="text-gray-600 text-sm">جاري تحميل الاشتراكات...</p>
      </div>
    </div>

    <div
      v-else-if="subscriptionsError"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
    >
      <p class="text-red-600 text-sm">{{ subscriptionsError }}</p>
      <button
        @click="$emit('retry')"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        إعادة المحاولة
      </button>
    </div>

    <div v-else>
      <div
        v-if="subscriptions.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500 text-lg">لا توجد اشتراكات حالياً</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6"
      >
        <!-- Subscription Cards -->
        <div
          v-for="(subscription, index) in subscriptions"
          :key="index"
          class="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Header Section -->
          <div class="flex items-start justify-between mb-6">
            <!-- Price -->
            <div class="flex items-center gap-1">
              <span
                class="text-3xl sm:text-4xl font-bold text-[#15c472]"
              >
                {{ subscription.price }}
              </span>
              <img
                src="/icons/green-currency.svg"
                alt="currency"
                class="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <!-- Title with Medal Icon -->
            <div class="flex items-center gap-2">
              <span
                class="text-xl sm:text-2xl font-bold text-orange-500"
              >
                {{ subscription.title }}
              </span>
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 sm:w-7 sm:h-7 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.54-3.07 8.83-8 9.81-4.93-.98-8-5.27-8-9.81V8.18l8-4z"
                  />
                  <path
                    d="M5 16L3 5l5.5 3L12 4l3.5 4L21 5l-2 11H5zm2.7-1h8.6l1.1-7.4-3.5 4.5L12 8l-1.9 4.1-3.5-4.5L7.7 15z"
                  />
                </svg>
                <span
                  class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-orange-500"
                >
                  {{ subscription.medalNumber || subscription.id }}
                </span>
              </div>
            </div>
          </div>

          <!-- Features List -->
          <ul class="space-y-3 mb-6 text-right list-disc pr-6">
            <li
              v-for="(feature, featureIndex) in subscription.features"
              :key="featureIndex"
              class="text-gray-700 text-sm sm:text-base"
            >
              {{ feature }}
            </li>
          </ul>

          <!-- Renew Button -->
          <button
            @click="$emit('renew', subscription)"
            class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
          >
            تجديد
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Subscription {
  id: number;
  title: string;
  price: string;
  features: string[];
  status?: string;
  packageId?: number;
  medalNumber?: number;
}

interface Props {
  isLoadingSubscriptions: boolean;
  subscriptionsError: string | null;
  subscriptions: Subscription[];
}

defineProps<Props>();
defineEmits<{
  retry: [];
  renew: [subscription: Subscription];
}>();
</script>

