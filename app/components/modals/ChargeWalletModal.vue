<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="charge-modal-title"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="w-full max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 text-right">
          <h2
            id="charge-modal-title"
            class="text-xl sm:text-2xl font-bold text-black"
          >
            الشحن
          </h2>
          <p class="text-sm sm:text-base text-gray-700 mt-1">اشحن محفظتك</p>
        </div>

        <!-- Content -->
        <div class="px-6 pb-6">
          <!-- Input Field -->
          <div class="mb-6">
            <input
              v-model="localAmount"
              type="number"
              placeholder="شحن المحفظة"
              class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          <!-- Charge Button -->
          <button
            type="button"
            @click="handleCharge"
            class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300"
          >
            شحن
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const localAmount = ref("");

watch(
  () => props.modelValue,
  (isOpen) => {
    if (process.client && typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    if (!isOpen) {
      localAmount.value = "";
    }
  },
  { immediate: true }
);

const handleCharge = () => {
  if (!localAmount.value || parseFloat(localAmount.value) <= 0) {
    return;
  }
  emit("confirm", localAmount.value);
  emit("update:modelValue", false);
};
</script>

