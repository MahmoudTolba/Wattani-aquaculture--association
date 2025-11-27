<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="commitment-modal-title"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-lg rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
      >
        <!-- Header with gradient -->
        <div class="px-6 py-4">
          <h2
            id="commitment-modal-title"
            class="text-xl font-bold text-[#15c472] text-center "
          >
            تعهد بسداد العمولة الي الادارة
          </h2>
        </div>

        <!-- Content -->
        <div class="p-6">
          <p class="text-gray-900 text-right leading-relaxed">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p>
        </div>

        <!-- Footer with button -->
        <div class="px-6 pb-6">
          <button
            type="button"
            class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
            @click="handleAgree"
          >
            موافقة
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch, onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "agree"]);

const closeModal = () => {
  emit("close");
};

const handleAgree = () => {
  emit("agree");
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

<style scoped>

</style>
