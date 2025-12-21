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
              اعادة تعيين كلمة مرور
            </h1>
          </div>

          <!-- Form -->
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Phone number -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="phone"
                placeholder=""
              >
              رقم الجوال
              <span class="text-red-500">*</span>
              </label>
              <div
                class="flex rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] overflow-hidden"
              >
                
                <input
                  id="phone"
                  v-model="phone"
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                  @input="handlePhoneInput"
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <div
                  class="flex items-center gap-2 border-l border-gray-100 px-3 sm:px-4 py-3 bg-gray-50 text-sm text-dark/70 min-w-[130px]"
                >
                  <select
                    v-model="countryCode"
                    class="bg-transparent outline-none text-right appearance-none"
                    style="background-image: none;"
                  >
                    <option value="+966">+966</option>
                    <option value="+971">+971</option>
                    <option value="+965">+965</option>
                    <option value="+974">+974</option>
                  </select>
                  <img src="/images/Country Flags.png" alt="Country Flag" class="w-6 h-6" />
                </div>
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
              :disabled="isLoading"
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
              <span>{{ isLoading ? "جاري الإرسال..." : "اعادة تعيين كلمة مرور" }}</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Image column -->
      <div class="w-full lg:w-1/2 relative">
        <div class="absolute inset-6 rounded-[28px] border border-white/30" />
        <img
          src="/images/login-img.png"
          alt="fishing"
          class="relative z-1 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import langSwitch from "~/components/langSwitch.vue";
import { submitApiForm } from "~/composables/useApiFetch";

// Use clean auth layout (no nav/footer, just page content)
definePageMeta({
  layout: 'auth-clean'
});

const { showToast } = useCustomToast();

const countryCode = ref("+966");
const phone = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

// Map country codes to ISO codes
const countryCodeToIso: Record<string, string> = {
  "+966": "SA",
  "+971": "AE",
  "+965": "KW",
  "+974": "QA",
};

const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Remove all non-numeric characters
  phone.value = target.value.replace(/\D/g, '');
  // Clear error message when user types
  if (errorMessage.value) {
    errorMessage.value = "";
  }
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  
  // Reset error message
  errorMessage.value = "";
  
  // Validate phone number
  if (!phone.value.trim()) {
    errorMessage.value = "الرجاء إدخال رقم الجوال";
    return;
  }
  
  // Format phone number for API submission
  const phoneDigits = phone.value.replace(/\D/g, '');
  const cleanPhone = phoneDigits.startsWith('0') ? phoneDigits.slice(1) : phoneDigits;
  const countryCodeValue = countryCode.value.replace('+', '');
  const iso = countryCodeToIso[countryCode.value] || "SA";
  
  // Create FormData
  const fd = new FormData();
  fd.append("phone", cleanPhone);
  fd.append("country_code", countryCodeValue);
  fd.append("iso", iso);
  
  isLoading.value = true;
  
  try {
    const { data, error }: any = await submitApiForm("forget-password-send-code", fd);
    
    if (error) {
      const errorMsg = (error as any)?.msg || "حدث خطأ أثناء إرسال رمز التحقق";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
      return;
    }
    
    if (data && data.key === "success") {
      showToast("success", data.msg || "تم إرسال رمز التحقق بنجاح");
      // Navigate to OTP page with phone and country info
      navigateTo({
        path: "/pass-otp",
        query: {
          phone: cleanPhone,
          country_code: countryCodeValue,
          iso: iso
        }
      });
    } else {
      const errorMsg = data?.msg || "حدث خطأ أثناء إرسال رمز التحقق";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
    }
  } catch (err: any) {
    console.error("Error sending verification code:", err);
    const errorMsg = err?.data?.msg || "حدث خطأ أثناء إرسال رمز التحقق";
    errorMessage.value = errorMsg;
    showToast("error", errorMsg);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
