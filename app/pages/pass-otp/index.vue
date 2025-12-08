<template>
  <div
    class="relative min-h-screen bg-[#f3f7fb] flex items-stretch justify-center overflow-hidden font-ge text-2xl text-dark"
  >
    <div
      class="relative z-10 flex flex-col lg:flex-row w-full min-h-screen rounded-4xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_35px_120px_rgba(10,113,126,0.15)] overflow-hidden"
    >
      <!-- Form column -->
      <div
        class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10"
      >
        <div class="w-full max-w-lg mx-auto space-y-10">
          <!-- Language switcher -->
          <div class="flex justify-start">
            <langSwitch />
          </div>

          <!-- Title -->
          <div class="text-center space-y-3">
            <div class="inline-flex items-center justify-center gap-2"></div>
            <h1 class="text-3xl sm:text-4xl font-semibold text-[#0b9a78]">
              كود التحقق
            </h1>
          </div>

          <!-- Form -->
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- OTP inputs -->
            <div class="space-y-4">
              <label
                class="text-base font-medium text-dark flex justify-center items-center gap-1"
                :for="`otp-digit-0`"
              >
                <span class="text-red-500">*</span>
                أدخل رمز التحقق المرسل إلى رقم الجوال
              </label>
              <div
                class="flex flex-wrap justify-center gap-3 sm:gap-4"
                dir="ltr"
              >
                <input
                  v-for="(digit, index) in otpDigits"
                  :key="index"
                  :id="`otp-digit-${index}`"
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  autocomplete="one-time-code"
                  pattern="[0-9]*"
                  :value="digit"
                  class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-[#dbe3ea] bg-white text-center text-2xl font-semibold text-dark shadow-[0_12px_35px_rgba(10,113,126,0.08)] transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#15C472] focus:ring-offset-2 focus:ring-offset-white"
                  @input="handleOtpInput(index, $event)"
                  @keydown="handleOtpKeydown(index, $event)"
                  @paste="handleOtpPaste(index, $event)"
                  :ref="(el) => setOtpInputRef(el, index)"
                />
              </div>
            </div>

            <!-- CTA -->
            <button
              type="submit"
              :disabled="!isOtpComplete"
              class="w-full rounded-2xl bg-linear-to-l from-[#15C472] from-[0.05%] to-[#0A717E] to-[99.95%] py-4 text-white text-lg font-semibold shadow-[0_15px_30px_rgba(21,196,114,0.3)] transition-all duration-300 hover:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="navigateTo('new-password')"
            >
              تعيين
            </button>
          </form>
        </div>
      </div>

      <!-- Image column -->
      <div
        class="w-full lg:w-1/2 relative bg-linear-to-br from-[#0b9a78]/5 via-transparent to-[#0ab07d]/5"
      >
        <div class="absolute inset-6 rounded-[28px] border border-white/30" />
        <img
          src="/images/pass-otpimage.jpg"
          alt="pass-otpimage"
          class="relative z-1 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from "vue";
import langSwitch from "~/components/langSwitch.vue";

// Use clean auth layout (no nav/footer, just page content)
definePageMeta({
  layout: 'auth-clean'
});

const OTP_LENGTH = 6;
const otpDigits = ref<string[]>(Array(OTP_LENGTH).fill(""));
const otpInputRefs = ref<(HTMLInputElement | null)[]>(
  Array(OTP_LENGTH).fill(null)
);

const setOtpInputRef = (
  el: Element | ComponentPublicInstance | null,
  index: number
) => {
  otpInputRefs.value[index] = el instanceof HTMLInputElement ? el : null;
};

const focusInput = (index: number) => {
  const target = otpInputRefs.value[index];
  if (target) {
    target.focus();
    target.select();
  }
};

const handleOtpInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const sanitized = input.value.replace(/\D/g, "").slice(-1);
  otpDigits.value[index] = sanitized;
  input.value = sanitized;

  if (sanitized && index < OTP_LENGTH - 1) {
    focusInput(index + 1);
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    focusInput(index - 1);
  }

  if (event.key === "ArrowLeft" && index < OTP_LENGTH - 1) {
    event.preventDefault();
    focusInput(index + 1);
  }

  if (event.key === "ArrowRight" && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
  }
};

const handleOtpPaste = (index: number, event: ClipboardEvent) => {
  event.preventDefault();
  const pasted = event.clipboardData?.getData("text") ?? "";
  const digits = pasted.replace(/\D/g, "").slice(0, OTP_LENGTH);

  digits.split("").forEach((digit, offset) => {
    const targetIndex = index + offset;
    if (targetIndex < OTP_LENGTH) {
      otpDigits.value[targetIndex] = digit;
      const targetInput = otpInputRefs.value[targetIndex];
      if (targetInput) {
        targetInput.value = digit;
      }
    }
  });

  const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
  focusInput(nextIndex);
};

const isOtpComplete = computed(() =>
  otpDigits.value.every((digit) => digit !== "")
);

const handleSubmit = (event: Event) => {
  // const form = event.target as HTMLFormElement;
  // if (!form.checkValidity()) {
  //   form.reportValidity();
  //   return;
  // }
  if (!isOtpComplete.value) return;
  const otpValue = otpDigits.value.join("");
  console.log("Submitted OTP:", otpValue);
  navigateTo("/");
};
</script>

<style scoped></style>
