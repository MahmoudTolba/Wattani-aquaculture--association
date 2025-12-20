<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div
      v-if="isLoadingRatings"
      class="flex justify-center items-center py-12"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
        ></div>
        <p class="text-gray-600 text-sm">جاري التحميل...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="ratingsError"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
    >
      <p class="text-red-600 text-sm">{{ ratingsError }}</p>
      <button
        @click="$emit('retry')"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Reviews List -->
    <div v-else class="space-y-4">
      <!-- Empty State -->
      <div
        v-if="paginatedReviews.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500 text-lg">لا توجد تقييمات حالياً</p>
      </div>

      <!-- Reviews -->
      <div
        v-for="review in paginatedReviews"
        :key="review.id"
        class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
      >
        <!-- Review Label -->
        <p
          class="text-gray-800 font-bold text-sm sm:text-base mb-2 text-right"
        >
          تقييم العميل
        </p>

        <!-- Customer Name -->
        <p
          class="text-gray-800 font-bold text-base sm:text-lg mb-3 text-right"
        >
          {{ review.name }}
        </p>

        <!-- Star Rating -->
        <div class="flex items-center gap-1 mb-3">
          <svg
            v-for="star in 5"
            :key="star"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            :class="
              star <= review.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            "
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>

        <!-- Review Text -->
        <p
          class="text-gray-800 text-sm sm:text-base leading-relaxed text-right"
        >
          {{ review.text }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="!isLoadingRatings && !ratingsError && totalReviews > 0"
      class="flex justify-center pt-4"
    >
      <Paginator
        :rows="reviewsPerPage"
        :total-records="totalReviews"
        :first="reviewsFirst"
        @page="$emit('page-change', $event)"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="p-paginator"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Paginator from "primevue/paginator";

interface Review {
  id: number;
  rating: number;
  name?: string;
  text?: string;
}

interface Props {
  isLoadingRatings: boolean;
  ratingsError: string | null;
  paginatedReviews: Review[];
  totalReviews: number;
  reviewsPerPage: number;
  reviewsFirst: number;
}

defineProps<Props>();
defineEmits<{
  retry: [];
  "page-change": [event: any];
}>();
</script>

