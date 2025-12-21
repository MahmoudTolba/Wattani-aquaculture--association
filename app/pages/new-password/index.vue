<template>
  <div
    class="min-h-screen bg-[#f3f7fb] flex items-stretch justify-center overflow-hidden font-ge text-2xl text-dark"
  >
    <div
      class="flex flex-col lg:flex-row w-full min-h-screen rounded-4xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_35px_120px_rgba(10,113,126,0.15)] overflow-hidden"
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
            <!-- Password -->
            <div class="space-y-3">
              <div class="flex items-center justify-start">
                <label class="text-base font-medium text-dark" for="password">
                  كلمة المرور
                  <span class="text-red-500">*</span>
                </label>
              </div>

              <div
                class="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border border-gray-100 bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] overflow-hidden"
              >
                
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="كلمة المرور"
                  required
                  minlength="6"
                  maxlength="100"
                  class="flex-1 w-full bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <button
                  type="button"
                  class="px-4 py-3 text-gray-400 text-right sm:text-left border-b border-gray-100 sm:border-b-0 sm:border-r"
                  @click="togglePasswordVisibility"
                  :aria-pressed="showPassword"
                  :aria-label="
                    showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
                  "
                >
                  <img src="/icons/openeye-icon.svg" />
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-3">
              <div class="flex items-center justify-start">
                <label class="text-base font-medium text-dark" for="confirmPassword">
                  تأكيد كلمة المرور
                  <span class="text-red-500">*</span>
                </label>
              </div>

              <div
                class="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border border-gray-100 bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] overflow-hidden"
              >
              
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="تأكيد كلمة المرور"
                  required
                  minlength="6"
                  maxlength="100"
                  class="flex-1 w-full bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <button
                  type="button"
                  class="px-4 py-3 text-gray-400 text-right sm:text-left border-b border-gray-100 sm:border-b-0 sm:border-r"
                  @click="toggleConfirmPasswordVisibility"
                  :aria-pressed="showConfirmPassword"
                  :aria-label="
                    showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
                  "
                >
                  <img src="/icons/openeye-icon.svg" />
                </button>
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
              <span>{{ isLoading ? "جاري إعادة التعيين..." : "اعادة تعيين كلمة مرور" }}</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Image column -->
      <div class="w-full lg:w-1/2 hidden md:hidden lg:block xl:block 2xl:block">
        <img
          src="/images/login-img.png"
          alt="fishing"
          class="w-full h-full object-cover"
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
const route = useRoute();

// Get required parameters from query (passed from pass-otp page)
const code = ref<string>(route.query.code as string || "");
const phone = ref<string>(route.query.phone as string || "");
const countryCode = ref<string>(route.query.country_code as string || "");
const iso = ref<string>(route.query.iso as string || "");

// Form fields
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  
  // Reset error message
  errorMessage.value = "";

  // Validate required parameters
  if (!code.value || !phone.value || !countryCode.value || !iso.value) {
    errorMessage.value = "معلومات غير مكتملة. يرجى العودة إلى الصفحة السابقة";
    showToast("error", "معلومات غير مكتملة. يرجى العودة إلى الصفحة السابقة");
    return;
  }

  // Validate password fields
  if (!password.value || !confirmPassword.value) {
    errorMessage.value = "يرجى إدخال كلمة المرور وتأكيدها";
    showToast("error", "يرجى إدخال كلمة المرور وتأكيدها");
    return;
  }

  // Validate password length
  if (password.value.length < 6 || password.value.length > 100) {
    errorMessage.value = "كلمة المرور يجب أن تكون بين 6 و 100 حرف";
    showToast("error", "كلمة المرور يجب أن تكون بين 6 و 100 حرف");
    return;
  }

  // Validate password match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "كلمات المرور غير متطابقة";
    showToast("error", "كلمات المرور غير متطابقة");
    return;
  }

  // Create FormData with all required parameters
  const fd = new FormData();
  fd.append("code", code.value);
  fd.append("phone", phone.value);
  fd.append("country_code", countryCode.value);
  fd.append("iso", iso.value);
  fd.append("password", password.value);

  isLoading.value = true;

  try {
    const { data, error }: any = await submitApiForm("reset-password", fd);
    
    if (error) {
      const errorMsg = (error as any)?.msg || "حدث خطأ أثناء إعادة تعيين كلمة المرور";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
      return;
    }
    
    if (data && data.key === "success") {
      showToast("success", data.msg || "تم إعادة تعيين كلمة المرور بنجاح");
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigateTo("/login");
      }, 1500);
    } else {
      const errorMsg = data?.msg || "فشل إعادة تعيين كلمة المرور";
      errorMessage.value = errorMsg;
      showToast("error", errorMsg);
    }
  } catch (err: any) {
    console.error("Error resetting password:", err);
    const errorMsg = err?.data?.msg || "حدث خطأ أثناء إعادة تعيين كلمة المرور";
    errorMessage.value = errorMsg;
    showToast("error", errorMsg);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
