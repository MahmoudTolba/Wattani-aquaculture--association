<template>
  <div class="space-y-6">
    <form
      @submit.prevent="$emit('submit')"
      class="space-y-6"
    >
      <!-- CV PDF Upload -->
      <div class="space-y-2">
        <label
          for="cvFile"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          ارفاق ملف السير الذاتية PDF
          <span class="text-red-500">*</span>
        </label>
        <label
          for="cvFile"
          class="block max-w-xs border border-gray-300 rounded-xl p-3 sm:p-4 cursor-pointer hover:border-[#15c472] transition-colors bg-white"
        >
          <input
            id="cvFile"
            type="file"
            accept=".pdf"
            @change="$emit('cv-file-change', ($event.target as HTMLInputElement).files?.[0])"
            class="hidden"
          />
          <div
            class="flex flex-col items-center justify-center gap-2"
          >
            <img
              src="/icons/pdf-uploader.svg"
              alt="pdf-uploader"
              class="w-4 h-4"
            />
            <span class="text-gray-600 text-xs sm:text-sm">
              {{ cvFileName || "إرفاق ملف" }}
            </span>
          </div>
        </label>
      </div>

      <!-- Consultant Proof PDF Upload -->
      <div class="space-y-2">
        <label
          for="proofFile"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          ارفاق ما يثبت انه استشاري PDF
          <span class="text-red-500">*</span>
        </label>
        <label
          for="proofFile"
          class="block max-w-xs border border-gray-300 rounded-xl p-3 sm:p-4 cursor-pointer hover:border-[#15c472] transition-colors bg-white"
        >
          <input
            id="proofFile"
            type="file"
            accept=".pdf"
            @change="$emit('proof-file-change', ($event.target as HTMLInputElement).files?.[0])"
            class="hidden"
          />
          <div
            class="flex flex-col items-center justify-center gap-2"
          >
            <img
              src="/icons/pdf-uploader.svg"
              alt="pdf-uploader"
              class="w-4 h-4"
            />
            <span class="text-gray-600 text-xs sm:text-sm">
              {{ proofFileName || "إرفاق ملف" }}
            </span>
          </div>
        </label>
      </div>

      <!-- Consultation Cost -->
      <div class="space-y-2">
        <label
          for="consultationCost"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          تكلفة الاستشارة
          <span class="text-red-500">*</span>
        </label>
        <input
          id="consultationCost"
          :model-value="form.consultationCost"
          @input="$emit('update:form', { ...form, consultationCost: ($event.target as HTMLInputElement).value })"
          type="text"
          placeholder="١٠٠ ريال"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting">جاري الإرسال...</span>
        <span v-else>ارسال طلب</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
interface JoinConsultantForm {
  consultationCost: string;
}

interface Props {
  form: JoinConsultantForm;
  cvFileName: string;
  proofFileName: string;
  isSubmitting: boolean;
}

defineProps<Props>();
defineEmits<{
  "update:form": [form: JoinConsultantForm];
  "cv-file-change": [file: File | undefined];
  "proof-file-change": [file: File | undefined];
  submit: [];
}>();
</script>

