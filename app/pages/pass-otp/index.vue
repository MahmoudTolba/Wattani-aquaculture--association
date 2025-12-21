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

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-right"
            >
              {{ errorMessage }}
            </div>

            <!-- CTA -->
            <button
              type="submit"
              :disabled="!isOtpComplete || isLoading"
              class="w-full rounded-2xl bg-linear-to-l from-[#15C472] from-[0.05%] to-[#0A717E] to-[99.95%] py-4 text-white text-lg font-semibold shadow-[0_15px_30px_rgba(21,196,114,0.3)] transition-all duration-300 hover:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isLoading" class="animate-spin">
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
              <span>{{ isLoading ? "جاري التحقق..." : "تعيين" }}</span>
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
import { submitApiForm } from "~/composables/useApiFetch";

// Use clean auth layout (no nav/footer, just page content)
definePageMeta({
  layout: 'auth-clean'
});

const { showToast } = useCustomToast();
const route = useRoute();

// Get phone, country_code, and iso from query parameters
const phone = ref<string>(route.query.phone as string || "");
const countryCode = ref<string>(route.query.country_code as string || "");
const iso = ref<string>(route.query.iso as string || "");

const OTP_LENGTH = 4;
const otpDigits = ref<string[]>(Array(OTP_LENGTH).fill(""));
const otpInputRefs = ref<(HTMLInputElement | null)[]>(
  Array(OTP_LENGTH).fill(null)
);
const isLoading = ref(false);
const errorMessage = ref("");

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

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  
  if (!isOtpComplete.value) return;
  
  // Validate required parameters
  if (!phone.value || !countryCode.value || !iso.value) {
    errorMessage.value = "معلومات غير مكتملة. يرجى العودة إلى الصفحة السابقة";
    showToast("error", "معلومات غير مكتملة. يرجى العودة إلى الصفحة السابقة");
    return;
  }
  
  // Reset error message
  errorMessage.value = "";
  
  const otpValue = otpDigits.value.join("");
  
  // Create FormData with all required parameters
  const fd = new FormData();
  fd.append("code", otpValue);
  fd.append("phone", phone.value);
  fd.append("country_code", countryCode.value);
  fd.append("iso", iso.value);
  
  isLoading.value = true;
  
  try {
    const { data, error }: any = await submitApiForm("forget-password-check-code", fd);
    
    if (error) {
      const errorMsg = (error as any)?.msg || "حدث خطأ أثناء التحقق من رمز التحقق";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
      return;
    }
    
    if (data && data.key === "success") {
      showToast("success", data.msg || "تم التحقق من رمز التحقق بنجاح");
      // Navigate to new password page with required parameters
      navigateTo({
        path: "/new-password",
        query: {
          code: otpValue,
          phone: phone.value,
          country_code: countryCode.value,
          iso: iso.value,
        },
      });
    } else {
      const errorMsg = data?.msg || "رمز التحقق غير صحيح";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
    }
  } catch (err: any) {
    console.error("Error verifying OTP code:", err);
    const errorMsg = err?.data?.msg || "حدث خطأ أثناء التحقق من رمز التحقق";
    errorMessage.value = errorMsg;
    showToast("error", errorMsg);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
