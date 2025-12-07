<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <h2
            id="location-modal-title"
            class="text-lg font-semibold text-gray-900"
          >
            تحديد الموقع
          </h2>
          <button
            type="button"
            class="text-gray-500 transition hover:text-gray-700"
            @click="$emit('update:modelValue', false)"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          يمكن ربط هذه النافذة بخريطة أو محدد موقع لاحقًا. استخدم الأزرار
          بالأسفل لحفظ الإحداثيات.
        </p>
        <div
          class="mt-6 h-52 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm"
        >
          مساحة محتوى الخريطة / اختيار الموقع
        </div>
        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            @click="$emit('update:modelValue', false)"
          >
            إلغاء
          </button>
          <button
            type="button"
            class="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2 text-sm font-semibold text-white shadow hover:from-teal-600 hover:to-teal-700"
            @click="$emit('confirm')"
          >
            حفظ الموقع
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue", "confirm"]);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (process.client && typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  },
  { immediate: true }
);
</script>

