<template>
  <div class="space-y-6">
    <div
      v-if="isLoadingPackages"
      class="flex justify-center items-center py-12"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
        ></div>
        <p class="text-gray-600 text-sm">جاري تحميل الباقات...</p>
      </div>
    </div>

    <div
      v-else-if="packagesError"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
    >
      <p class="text-red-600 text-sm">{{ packagesError }}</p>
      <button
        @click="$emit('retry')"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        إعادة المحاولة
      </button>
    </div>

    <div v-else>
      <div v-if="packages.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">
          لا توجد باقات متاحة حالياً
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6"
      >
        <!-- Package Card -->
        <div
          v-for="(packageItem, index) in packages"
          :key="index"
          class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Header Section -->
          <div class="flex items-start justify-between mb-6">
            <!-- Price -->
            <div class="flex items-center gap-1">
              <span
                class="text-3xl sm:text-4xl font-bold text-[#15c472]"
              >
                {{ packageItem.price }}
              </span>
              <img
                src="/icons/green-currency.svg"
                alt="currency"
                class="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <!-- Title with Icon -->
            <div class="flex items-center gap-2">
              <span>🥇 </span>
              <span
                class="text-lg sm:text-xl font-bold text-[#FE9B0E]"
              >
                {{ packageItem.title }}
              </span>
            </div>
          </div>

          <!-- Features List -->
          <ul class="space-y-3 mb-6 text-right list-disc">
            <li
              v-for="(feature, featureIndex) in packageItem.features"
              :key="featureIndex"
              class="text-gray-700 text-sm sm:text-base"
            >
              {{ feature }}
            </li>
          </ul>

          <!-- Subscribe Button -->
          <button
            @click="$emit('subscribe', packageItem)"
            class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
          >
            اشتراك
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Package {
  id: number;
  title: string;
  price: string;
  features: string[];
}

interface Props {
  isLoadingPackages: boolean;
  packagesError: string | null;
  packages: Package[];
}

defineProps<Props>();
defineEmits<{
  retry: [];
  subscribe: [packageItem: Package];
}>();
</script>

