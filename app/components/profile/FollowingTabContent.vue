<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div
      v-if="isLoadingFollowing"
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
      v-else-if="followingError"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
    >
      <p class="text-red-600 text-sm">{{ followingError }}</p>
      <button
        @click="$emit('retry')"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Following Users List -->
    <div v-else class="space-y-3 sm:space-y-4">
      <!-- Empty State -->
      <div
        v-if="paginatedFollowing.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500 text-lg">لا يوجد متابعين حالياً</p>
      </div>

      <!-- Users List -->
      <div
        v-for="user in paginatedFollowing"
        :key="user.id"
        class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4"
      >
        <!-- User Info (Right side in RTL) -->
        <div class="flex items-center gap-3 sm:gap-4 flex-1">
          <!-- Profile Picture -->
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-200"
          />

          <!-- Name -->
          <p
            class="text-gray-800 font-semibold text-base sm:text-lg text-right"
          >
            {{ user.name }}
          </p>
        </div>

        <!-- Unfollow Button (Left side in RTL) -->
        <button
          @click="$emit('unfollow', user.id)"
          class="p-2 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="إلغاء المتابعة"
        >
          <img
            src="/icons/cancelled-follow.svg"
            alt="cancelled-follow-icon"
            class="w-8 h-8 sm:w-7 sm:h-7"
          />
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="
        !isLoadingFollowing && !followingError && totalFollowing > 0
      "
      class="flex justify-center pt-4"
    >
      <Paginator
        :rows="followingPerPage"
        :total-records="totalFollowing"
        :first="followingFirst"
        @page="$emit('page-change', $event)"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="p-paginator"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Paginator from "primevue/paginator";

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Props {
  isLoadingFollowing: boolean;
  followingError: string | null;
  paginatedFollowing: User[];
  totalFollowing: number;
  followingPerPage: number;
  followingFirst: number;
}

defineProps<Props>();
defineEmits<{
  retry: [];
  unfollow: [id: number];
  "page-change": [event: any];
}>();
</script>

