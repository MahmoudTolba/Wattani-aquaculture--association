<template>
  <div class="space-y-6">
    <div
      class="flex flex-col items-center justify-center py-8 sm:py-12"
    >
      <!-- Illustration Section -->
      <div class="relative w-full max-w-md mb-8 sm:mb-12">
        <div class="relative flex items-center justify-center">
          <!-- Calculator Illustration -->
          <div class="w-60 h-60 sm:w-80 sm:h-80">
            <img
              src="/images/recharge-img.svg"
              alt="calculator-image"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Payment Form Section -->
      <div class="w-full max-w-md space-y-6">
        <!-- Total Amount Heading -->
        <div class="text-right">
          <h2
            class="text-xl sm:text-2xl font-bold text-gray-800 mb-4"
          >
            المبلغ الاجمالي
          </h2>
        </div>

        <!-- Input Field -->
        <div>
          <input
            :model-value="commissionAmount"
            @input="$emit('update:commission-amount', ($event.target as HTMLInputElement).value)"
            type="number"
            placeholder="ادخل المبلغ"
            class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
          />
        </div>

        <!-- Display Amount -->
        <div class="flex items-center justify-center gap-2">
          <span class="text-green-600 text-3xl sm:text-4xl font-bold">
            {{
              calculatedFee !== null
                ? calculatedFee
                : commissionAmount || "60"
            }}
          </span>
          <img
            src="/icons/green-currency.svg"
            alt="rial-icon"
            class="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>

        <!-- Loading State for Calculation -->
        <div v-if="isCalculatingFee" class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#15c472]"
          ></div>
          <p class="text-gray-600 text-sm mt-2">
            جاري حساب الرسوم...
          </p>
        </div>

        <!-- Error State -->
        <div
          v-if="feeCalculationError"
          class="bg-red-50 border border-red-200 rounded-xl p-3 text-center"
        >
          <p class="text-red-600 text-sm">
            {{ feeCalculationError }}
          </p>
        </div>

        <!-- Calculated Fee Info -->
        <div
          v-if="calculatedFee !== null && commissionAmount"
          class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center"
        >
          <p class="text-blue-800 text-sm">
            المبلغ الأصلي: {{ commissionAmount }} ريال
          </p>
          <p class="text-blue-800 text-sm font-semibold">
            المبلغ الإجمالي بعد الرسوم: {{ calculatedFee }} ريال
          </p>
        </div>

        <!-- Pay Button -->
        <button
          type="button"
          @click="$emit('pay')"
          :disabled="
            isCalculatingFee ||
            isPayingFee ||
            !commissionAmount ||
            parseFloat(commissionAmount) <= 0
          "
          class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isPayingFee" class="animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </span>
          <span>{{ isPayingFee ? "جاري الدفع..." : "دفع" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  commissionAmount: string;
  calculatedFee: number | null;
  isCalculatingFee: boolean;
  isPayingFee: boolean;
  feeCalculationError: string | null;
}

defineProps<Props>();
defineEmits<{
  "update:commission-amount": [value: string];
  pay: [];
}>();
</script>

