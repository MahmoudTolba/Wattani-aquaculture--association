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
      <div
        v-else-if="hasContent"
        class="text-gray-700 text-base sm:text-lg leading-relaxed text-start mb-4"
        v-html="content"
      ></div>
      <p
        v-else
        class="text-gray-500 text-base sm:text-lg leading-relaxed text-start mb-4"
      >
        لا توجد بيانات متاحة حاليا
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isLoading: boolean;
  error: string | null;
  content: string;
}

const props = defineProps<Props>();

// Check if content has meaningful text (not just empty HTML tags)
const hasContent = computed(() => {
  if (!props.content) return false;
  // Strip HTML tags and check if there's actual text content
  const textContent = props.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&[a-z]+;/gi, ' ') // Replace other HTML entities
    .trim();
  return textContent.length > 0;
});
</script>

