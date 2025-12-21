<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="commission-payment-modal-title"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="w-full max-w-3xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2
            id="commission-payment-modal-title"
            class="text-xl font-bold text-black"
            :class="isRTL ? 'text-right' : 'text-left'"
          >
            {{ t('modals.commission_payment.title') }}
          </h2>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Payment Method Options -->
          <div class="space-y-4">
            <!-- Wallet Option -->
            <div
              @click="localPaymentMethod = 'wallet'"
              class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
              :class="[
                localPaymentMethod === 'wallet'
                  ? 'bg-gray-50 border-2 border-[#15C472]'
                  : 'bg-gray-50 border-2 border-gray-200',
                isRTL ? 'flex-row' : 'flex-row-reverse'
              ]"
            >
              <label
                for="commission-wallet"
                class="flex-1 flex items-center gap-2 cursor-pointer"
                :class="isRTL ? 'justify-start' : 'justify-end'"
              >
                <img
                  src="/icons/wallet-icon.svg"
                  :alt="t('modals.commission_payment.wallet')"
                  class="w-8 h-8"
                />
                <span class="text-black font-medium" :class="isRTL ? 'text-right' : 'text-left'">{{ t('modals.commission_payment.wallet') }}</span>
              </label>
              <input
                type="radio"
                id="commission-wallet"
                v-model="localPaymentMethod"
                value="wallet"
                class="w-5 h-5 cursor-pointer accent-[#15C472]"
              />
            </div>

            <!-- Electronic Payment Option -->
            <div
              @click="localPaymentMethod = 'electronic'"
              class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
              :class="[
                localPaymentMethod === 'electronic'
                  ? 'bg-gray-50 border-2 border-[#15C472]'
                  : 'bg-gray-50 border-2 border-gray-200',
                isRTL ? 'flex-row' : 'flex-row-reverse'
              ]"
            >
              <label
                for="commission-electronic"
                class="flex-1 flex items-center gap-2 cursor-pointer"
                :class="isRTL ? 'justify-start' : 'justify-end'"
              >
                <img
                  src="/icons/epay-icon.svg"
                  :alt="t('modals.commission_payment.electronic')"
                  class="w-8 h-8"
                />
                <span class="text-black font-medium" :class="isRTL ? 'text-right' : 'text-left'">{{ t('modals.commission_payment.electronic') }}</span>
              </label>
              <input
                type="radio"
                id="commission-electronic"
                v-model="localPaymentMethod"
                value="electronic"
                class="w-5 h-5 cursor-pointer accent-[#15C472]"
              />
            </div>
          </div>
        </div>

        <!-- Footer with confirm button -->
        <div class="px-6 pb-6">
          <button
            type="button"
            class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
            @click="handleConfirm"
          >
            {{ t('modals.commission_payment.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const { t, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
    default: "wallet",
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const localPaymentMethod = ref(props.paymentMethod);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (process.client && typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    if (!isOpen) {
      localPaymentMethod.value = "wallet";
    } else {
      localPaymentMethod.value = props.paymentMethod;
    }
  },
  { immediate: true }
);

const handleConfirm = () => {
  emit("confirm", localPaymentMethod.value);
};
</script>

