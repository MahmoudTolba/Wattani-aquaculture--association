<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      @click.self="$emit('update:modelValue', false)"
      style="z-index: 9999 !important"
    >
      <div
        class="w-full max-w-xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        @click.stop
      >
        <!-- Content -->
        <div class="p-8 sm:p-12 text-center">
          <!-- Success Message -->
          <h2
            id="success-modal-title"
            class="text-xl sm:text-2xl font-bold text-gray-900 mb-6"
          >
            {{ title }}
          </h2>

          <!-- Loading Spinner -->
          <div class="flex justify-center mb-6">
            <img
              src="/icons/success-icon.gif"
              alt="success-icon"
              class="w-20 h-20 sm:w-24 sm:h-24"
            />
          </div>
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
  title: {
    type: String,
    default: "تم الاشتراك بنجاح",
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  autoCloseDelay: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (process.client && typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    if (isOpen && props.autoClose) {
      setTimeout(() => {
        emit("update:modelValue", false);
      }, props.autoCloseDelay);
    }
  },
  { immediate: true }
);
</script>

