<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4 py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-account-modal-title"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="w-full max-w-sm sm:max-w-md md:max-w-xl rounded-xl sm:rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        @click.stop
      >
        <!-- Content -->
        <div class="p-4 sm:p-6 md:p-8 text-center">
          <!-- Question -->
          <h2
            id="delete-account-modal-title"
            class="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 sm:mb-6"
          >
            هل انت متاكد من حذف الحساب
          </h2>

          <!-- Icon -->
          <div class="flex justify-center mb-4 sm:mb-6">
            <div class="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
              <!-- Trash Can Icon -->
              <img
                src="/icons/delete-account.svg"
                alt="delete-icon"
                class="w-full h-full object-contain text-[#A6282A]"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2 sm:gap-3 md:gap-4">
            <!-- Yes Button (Right) -->
            <button
              type="button"
              @click="handleConfirmDelete"
              class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-red-700 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-800 transition-colors"
            >
              نعم
            </button>
            <!-- No Button (Left) -->
            <button
              type="button"
              @click="$emit('update:modelValue', false)"
              class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-white border-2 border-[#15c472] text-gray-800 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              لا
            </button>
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
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const { logout } = useAuth();

const handleConfirmDelete = async () => {
  // Emit confirm event for parent component to handle any additional logic
  emit("confirm");
  
  // Close the modal
  emit("update:modelValue", false);
  
  // TODO: Replace with actual API call to delete account
  // await $fetch('/api/auth/delete-account', {
  //   method: 'DELETE'
  // });
  
  // Logout the user (clears authentication state)
  logout();
  
  // Navigate to login page
  navigateTo("/login");
};

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

