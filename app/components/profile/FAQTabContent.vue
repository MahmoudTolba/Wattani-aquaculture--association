<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div
      v-if="isLoadingFaq"
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
      v-else-if="faqError"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
    >
      <p class="text-red-600 text-sm">{{ faqError }}</p>
      <button
        @click="$emit('retry')"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- FAQ Accordion -->
    <div v-else class="space-y-3">
      <!-- Empty State -->
      <div v-if="faqs.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">
          لا توجد أسئلة متكررة حالياً
        </p>
      </div>

      <!-- FAQs -->
      <Accordion :model-value="openFaqIndex" @update:model-value="$emit('update:openFaqIndex', $event)">
        <AccordionPanel
          v-for="(faq, index) in paginatedFaqs"
          :key="faq.id || index"
          :value="index.toString()"
        >
          <AccordionHeader>
            {{ faq.question }}
          </AccordionHeader>
          <AccordionContent>
            <div
              class="m-0 text-gray-700 leading-relaxed"
              v-html="faq.answer"
            ></div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!-- Pagination -->
    <div
      v-if="!isLoadingFaq && !faqError && totalFaqs > 0"
      class="flex justify-center pt-4"
    >
      <Paginator
        :rows="faqPerPage"
        :total-records="totalFaqs"
        :first="faqFirst"
        @page="$emit('page-change', $event)"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="p-paginator"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Paginator from "primevue/paginator";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  isLoadingFaq: boolean;
  faqError: string | null;
  faqs: FAQItem[];
  paginatedFaqs: FAQItem[];
  totalFaqs: number;
  faqPerPage: number;
  faqFirst: number;
  openFaqIndex: string | null;
}

defineProps<Props>();
defineEmits<{
  retry: [];
  "update:openFaqIndex": [value: string | null];
  "page-change": [event: any];
}>();
</script>

