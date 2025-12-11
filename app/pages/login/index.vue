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
              تسجيل الدخول
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
                class="flex flex-col sm:flex-row rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] overflow-hidden"
              >
              
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                  class="flex-1 w-full bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <div
                  class="flex items-center justify-between sm:justify-center gap-2 border-b border-gray-100 sm:border-b-0 sm:border-l px-2 sm:px-3 py-3 bg-gray-50 text-sm text-dark/70 min-w-[115px]"
                >
                  <select
                    v-model="form.countryCode"
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
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="كلمة المرور"
                  required
                  class="flex-1 w-full bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <button
                  type="button"
                  class="px-4 py-3 text-gray-400 text-right sm:text-left "
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
            <button
              type="button"
              class="text-sm text-red-500 cursor-pointer"
              @click="navigateTo('/forgot-password')"
            >
              هل نسيت كلمة المرور
            </button>

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
              <span>{{ isLoading ? "جاري تسجيل الدخول..." : "تسجيل" }}</span>
            </button>
          </form>

          <!-- Secondary actions -->
          <div class="text-center space-y-4">
            <button
              type="button"
              @click="navigateTo('/')"
              class="text-md text-[#00000] cursor-pointer font-light"
            >
              الاستمرار كزائر
            </button>
            <p class="text-md text-[#00000]">
              ليس لديك حساب؟
              <NuxtLink to="/register" class="text-[#0a9687]">
                إنشاء حساب
              </NuxtLink>
            </p>
          </div>
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

<script setup>
definePageMeta({
  layout: 'auth-clean'
});
import { ref } from "vue";
import langSwitch from "~/components/langSwitch.vue";
const { showToast} = useCustomToast();

const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const form = ref({
  countryCode: "+966",
  phone: "",
  password: "",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// const { login } = useAuth();

// const handleSubmit = async (event: Event) => {
//   event.preventDefault();
  
//   // Reset error message
//   errorMessage.value = "";
//   isLoading.value = true;
  
//   try {
//     // Validate required fields
//     if (!form.value.phone.trim()) {
//       errorMessage.value = "الرجاء إدخال رقم الجوال";
//       isLoading.value = false;
//       return;
//     }
    
//     if (!form.value.password.trim()) {
//       errorMessage.value = "الرجاء إدخال كلمة المرور";
//       isLoading.value = false;
//       return;
//     }
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     // Get stored user data
//     if (typeof window !== "undefined") {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
          
//           // Verify credentials
//           if (userData.phone === form.value.phone && userData.password === form.value.password) {
//             // Successful login
//             login(userData);
//             navigateTo("/");
//           } else {
//             errorMessage.value = "رقم الجوال أو كلمة المرور غير صحيحة";
//             isLoading.value = false;
//           }
//         } catch (e) {
//           console.error("Error parsing user data:", e);
//           errorMessage.value = "حدث خطأ. الرجاء المحاولة مرة أخرى.";
//           isLoading.value = false;
//         }
//       } else {
//         errorMessage.value = "لا يوجد حساب مسجل. الرجاء إنشاء حساب أولاً.";
//         isLoading.value = false;
//       }
//     }
//   } catch (error: any) {
//     console.error("Login error:", error);
//     errorMessage.value = error?.message || "حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.";
//     isLoading.value = false;
//   } finally {
//     isLoading.value = false;
//   }
// };
const handleSubmit = async () => {
  const fd = new FormData();
  fd.append("phone", form.value.phone);
  fd.append("password", form.value.password);
  fd.append("country_code", form.value.countryCode);
  fd.append("device_type", "web");
  fd.append("device_id", "11111111111");
  fd.append("lang", "ar");
  const { data, error } = await submitApiForm("sign-in", fd);
  if ( error ) {
    showToast("error", error.msg);
    return;
  }
  if ( data.key === "success" ) {
    showToast("success", data.msg);
     // Updating the user data from store
  } else {
    showToast("error", data.msg);
  }
};
</script>

<style scoped></style>
