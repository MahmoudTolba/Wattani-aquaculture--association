<template>
  <div
    class="relative min-h-screen bg-white flex items-stretch justify-center overflow-hidden font-ge text-dark"
  >
    <div class="relative z-10 flex flex-col lg:flex-row w-full">
      <!-- Left content -->
      <div
        class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10"
      >
        <div class="w-full max-w-3xl mx-auto space-y-10 text-center">
          <div class="flex justify-start">
            <langSwitch />
          </div>

          <div class="space-y-3">
            <h1 class="text-4xl font-semibold text-[#00b16a]">كود التحقق</h1>
            <p class="text-lg leading-relaxed text-[#6b7280]">
              برجاء إدخال كود التفعيل المرسل لجوالك لتأكيد رقم
              <span class="font-semibold text-[#0a717e]">{{ maskedPhone }}</span>
            </p>
          </div>

          <form class="space-y-8" @submit.prevent="handleSubmit">
            <div class="flex justify-center gap-4" dir="ltr">
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
                class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 border-[#e6ecf2] bg-white text-center text-2xl font-semibold text-[#0a717e] shadow-[0_10px_28px_rgba(10,113,126,0.08)] transition-all duration-200 focus:border-[#0a717e] focus:ring-4 focus:ring-[#0a717e]/20"
                @input="handleOtpInput(index, $event)"
                @keydown="handleOtpKeydown(index, $event)"
                @paste="handleOtpPaste(index, $event)"
                :ref="(el) => setOtpInputRef(el, index)"
              />
            </div>

            <button
              type="submit"
              :disabled="!isOtpComplete"
              class="w-full sm:w-[520px] mx-auto rounded-2xl bg-linear-to-l from-[#15C472] to-[#0A717E] py-4 text-white text-xl font-semibold shadow-[0_15px_40px_rgba(21,196,114,0.28)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              تفعيل الحساب
            </button>
          </form>

          <div class="space-y-2 text-base">
            <p class="text-[#6b7280]">
              الوقت المتبقي: {{ remainingSeconds }} ثانية
            </p>
            <button
              type="button"
              class="text-[#0a717e] font-semibold underline underline-offset-4 disabled:text-gray-400"
              :disabled="remainingSeconds > 0"
              @click="handleResend"
            >
              إعادة إرسال الكود
            </button>
          </div>
        </div>
      </div>

      <!-- Right image -->
      <div class="w-full lg:w-1/2 relative">
        <img
          src="/images/pass-otpimage.jpg"
          alt="otp illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type ComponentPublicInstance,
} from "vue";
import langSwitch from "~/components/langSwitch.vue";

definePageMeta({
  layout: "auth-clean",
});

const OTP_LENGTH = 4;
const COUNTDOWN_START = 40;

// Get phone from query params
const route = useRoute();
const phoneNumber = computed(() => route.query.phone as string || "");

// Mask phone number for display
const maskedPhone = computed(() => {
  if (!phoneNumber.value) return "9665••••••";
  const phone = phoneNumber.value;
  if (phone.length > 4) {
    const lastFour = phone.slice(-4);
    const masked = "••".repeat(Math.max(phone.length - 4, 2));
    return `+966${masked}${lastFour}`;
  }
  return `+966${phone}`;
});

const otpDigits = ref<string[]>(Array(OTP_LENGTH).fill(""));
const otpInputRefs = ref<(HTMLInputElement | null)[]>(
  Array(OTP_LENGTH).fill(null)
);
const remainingSeconds = ref(COUNTDOWN_START);
let timer: ReturnType<typeof setInterval> | null = null;

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

const startTimer = () => {
  if (timer) clearInterval(timer);
  remainingSeconds.value = COUNTDOWN_START;
  timer = setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value -= 1;
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
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
  // Keep arrow navigation intuitive in LTR input: left moves left, right moves right
  if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
  }
  if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
    event.preventDefault();
    focusInput(index + 1);
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

const { register } = useAuth();

const handleSubmit = (event: Event) => {
  if (!isOtpComplete.value) return;
  const otpValue = otpDigits.value.join("");
  console.log("Submitted OTP:", otpValue);
  
  // Get pending registration data and complete registration
  if (process.client) {
    const pendingData = localStorage.getItem('pendingRegistration');
    if (pendingData) {
      try {
        const userData = JSON.parse(pendingData);
        // Mark as verified and register the user
        userData.isVerified = true;
        register(userData);
        
        // Clear pending registration
        localStorage.removeItem('pendingRegistration');
        
        // Navigate to login page
        navigateTo("/login");
      } catch (e) {
        console.error("Error completing registration:", e);
        navigateTo("/login");
      }
    } else {
      // No pending data, just go to login
      navigateTo("/login");
    }
  } else {
    navigateTo("/login");
  }
};

const handleResend = () => {
  otpDigits.value = Array(OTP_LENGTH).fill("");
  focusInput(0);
  startTimer();
};

onMounted(() => {
  startTimer();
  focusInput(0);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped></style>