<template>
  <div class="space-y-6">
    <form @submit.prevent="$emit('submit')" class="space-y-6">
      <!-- Message Title Field -->
      <div class="space-y-2">
        <label
          for="messageTitle"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          عنوان الرسالة
        </label>
        <input
          id="messageTitle"
          :model-value="form.messageTitle"
          @input="$emit('update:form', { ...form, messageTitle: ($event.target as HTMLInputElement).value })"
          type="text"
          placeholder="عنوان"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
        />
      </div>

      <!-- Message Text Field -->
      <div class="space-y-2">
        <label
          for="messageText"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          نص الرسالة
        </label>
        <textarea
          id="messageText"
          :model-value="form.messageText"
          @input="$emit('update:form', { ...form, messageText: ($event.target as HTMLTextAreaElement).value })"
          placeholder="نص الرسالة"
          rows="6"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSending"
        class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="isSending">جاري الإرسال...</span>
        <span v-else>ارسال</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
interface ContactForm {
  messageTitle: string;
  messageText: string;
}

interface Props {
  form: ContactForm;
  isSending: boolean;
}

defineProps<Props>();
defineEmits<{
  "update:form": [form: ContactForm];
  submit: [];
}>();
</script>

