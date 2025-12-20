<template>
  <div class="space-y-6">
    <div
      class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200"
    >
      <p
        v-if="isLoading"
        class="text-gray-500 text-base sm:text-lg leading-relaxed text-start mb-4"
      >
        جاري التحميل...
      </p>
      <p
        v-else-if="error"
        class="text-red-500 text-base sm:text-lg leading-relaxed text-start mb-4"
      >
        {{ error }}
      </p>
      <p
        v-else
        class="text-gray-700 text-base sm:text-lg leading-relaxed text-start mb-4 whitespace-pre-line"
      >
        {{ content || "لا توجد بيانات متاحة حاليا" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean;
  error: string | null;
  content: string;
}

defineProps<Props>();
</script>

