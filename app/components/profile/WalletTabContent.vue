<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center justify-center py-8 sm:py-12">
      <!-- Wallet Illustration Section -->
      <div class="relative w-full max-w-md mb-8 sm:mb-12">
        <div class="relative flex items-center justify-center">
          <div class="w-60 h-60">
            <img
              src="/images/wallet-img.png"
              alt="wallet-image"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Balance Text -->
      <div class="text-center mb-4">
        <p class="text-gray-700 text-base sm:text-lg mb-3">
          رصيدك الحالي هو
        </p>
        <div class="flex items-center justify-center gap-2">
          <span
            v-if="!isLoadingWallet"
            class="text-green-600 text-3xl sm:text-4xl font-bold"
          >
            {{ walletBalance }}
          </span>
          <span
            v-else
            class="text-gray-400 text-3xl sm:text-4xl font-bold"
          >
            ...
          </span>
          <img
            src="/icons/green-currency.svg"
            alt="rial-icon"
            class="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>
      </div>

      <!-- Charge Button -->
      <button
        type="button"
        @click="$emit('charge')"
        :disabled="isChargingWallet"
        class="w-full max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm px-6 py-4 bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {{ isChargingWallet ? 'جاري الشحن...' : 'شحن' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  walletBalance: number;
  isLoadingWallet: boolean;
  isChargingWallet: boolean;
}>();

defineEmits<{
  charge: [];
}>();
</script>


