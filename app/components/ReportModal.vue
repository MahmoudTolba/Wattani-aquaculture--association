<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-3xl p-6 rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
      >
        <!-- Content -->
        <div class="p-6">
          <!-- Reason for Report Field -->
          <div class="mb-6">
            <label
              for="report-reason"
              class="block text-right mb-2 font-bold text-black"
            >
              سبب البلاغ
              <span class="text-red-500">*</span>
            </label>
            <input
              id="report-reason"
              v-model="reportReason"
              type="text"
              placeholder="سبب البلاغ"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent"
            />
          </div>

          <!-- Report Details Field -->
          <div class="mb-6">
            <label
              for="report-details"
              class="block text-right mb-2 font-bold text-black"
            >
              تفاصيل البلاغ
              <span class="text-red-500">*</span>
            </label>
            <textarea
              id="report-details"
              v-model="reportDetails"
              placeholder="تفاصيل البلاغ"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            class="w-full bg-gradient-to-r from-[#00a859] to-[#15c472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
            @click="handleSubmit"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "submit"]);

const reportReason = ref("");
const reportDetails = ref("");

const closeModal = () => {
  reportReason.value = "";
  reportDetails.value = "";
  emit("close");
};

const handleSubmit = () => {
  if (!reportReason.value.trim() || !reportDetails.value.trim()) {
    // You can add validation feedback here
    return;
  }
  emit("submit", {
    reason: reportReason.value,
    details: reportDetails.value,
  });
  closeModal();
};

// Prevent body scroll when modal is open (client-side only)
const updateBodyOverflow = (isOpen) => {
  if (process.client && typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
};

watch(
  () => props.isOpen,
  (isOpen) => {
    updateBodyOverflow(isOpen);
  },
  { immediate: true }
);

onMounted(() => {
  if (props.isOpen) {
    updateBodyOverflow(true);
  }
});

onBeforeUnmount(() => {
  updateBodyOverflow(false);
});
</script>

<style scoped></style>

