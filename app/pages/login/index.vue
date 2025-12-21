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
              <div class="country-selector-container">
                <div class="relative flex flex-row-reverse rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] overflow-hidden">
                  <!-- Country Code Selector -->
                  <div class="relative">
                    <button
                      ref="dropdownButtonRef"
                      type="button"
                      @click="toggleCountryDropdown"
                      class="flex items-center gap-2 px-3 py-3 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0ab07d] border-l border-gray-100"
                      :disabled="isLoadingCountries"
                    >
                      <img
                        v-if="selectedCountry?.image"
                        :src="selectedCountry.image"
                        :alt="selectedCountry?.name || 'Country Flag'"
                        class="w-5 h-4 object-cover"
                      />
                      <img
                        v-else
                        :src="`https://flagcdn.com/16x12/${selectedCountry?.flag || 'sa'}.png`"
                        :alt="selectedCountry?.name || 'Country Flag'"
                        class="w-5 h-4"
                      />
                      <span class="text-gray-700 text-sm font-medium">{{ form.countryCode }}</span>
                      <svg
                        class="w-4 h-4 text-gray-500 transition-transform"
                        :class="{ 'rotate-180': showCountryDropdown }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <!-- Dropdown Menu -->
                    <Teleport to="body">
                      <div
                        v-if="showCountryDropdown"
                        class="fixed bg-white border border-gray-300 rounded-lg shadow-xl z-9999 country-dropdown overflow-y-auto"
                        :style="dropdownStyle"
                        @click.stop
                      >
                        <div class="p-2">
                          <div class="space-y-1">
                            <button
                              v-for="country in countryCodes"
                              :key="country.code"
                              type="button"
                              @click="selectCountry(country)"
                              class="w-full flex items-center gap-3 px-3 py-2 hover:bg-teal-50 rounded-lg transition-colors text-right flex-row"
                              :class="{ 'bg-teal-100': country.code === form.countryCode }"
                            >
                              <img
                                v-if="country.image"
                                :src="country.image"
                                :alt="country.name"
                                class="w-5 h-4 object-cover shrink-0"
                              />
                              <img
                                v-else
                                :src="`https://flagcdn.com/16x12/${country.flag}.png`"
                                :alt="country.name"
                                class="w-5 h-4 shrink-0"
                              />
                              <span class="flex-1 text-sm text-gray-700 truncate">{{ country.name }}</span>
                              <span class="text-sm text-gray-500 font-medium shrink-0">{{ country.code }}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Teleport>
                  </div>
                  
                  <!-- Phone Input -->
                  <input
                    id="phone"
                    v-model="form.phone"
                    @input="handlePhoneInput"
                    type="tel"
                    :placeholder="phonePlaceholder"
                    required
                    :class="[
                      'flex-1 w-full bg-transparent pr-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right',
                      phoneError ? 'border-red-500' : ''
                    ]"
                  />
                </div>
                <p v-if="phoneError" class="mt-1 text-xs text-red-500 text-right">
                  {{ phoneError }}
                </p>
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
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import langSwitch from "~/components/langSwitch.vue";
const { showToast} = useCustomToast();
const authStore = useAuthStore();
const { login } = useAuth();
const { locale } = useI18n();

const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const isLoadingCountries = ref(false);
const showCountryDropdown = ref(false);
const phoneError = ref("");
const countriesFromApi = ref([]);
const dropdownButtonRef = ref(null);
const dropdownStyle = ref({});

const form = ref({
  countryCode: "+966",
  phone: "",
  password: "",
  iso: "SA",
});

// Format Saudi phone number as user types
const formatSaudiPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  
  if (form.value.countryCode === "+966") {
    let cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
    cleaned = cleaned.slice(0, 9);
    
    if (cleaned.length > 0) {
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      } else {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      }
    }
    return cleaned;
  }
  
  return digits.slice(0, 15);
};

// Validate Saudi phone number
const validateSaudiPhone = (phone) => {
  if (form.value.countryCode !== "+966") {
    return phone.trim().length > 0;
  }
  
  const digits = phone.replace(/\D/g, '');
  const cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
  
  if (cleaned.length === 9) {
    return cleaned.startsWith('5') || cleaned.startsWith('1');
  }
  
  if (digits.length === 10) {
    return digits.startsWith('05') || digits.startsWith('01');
  }
  
  return false;
};

// Format phone number for API submission
const formatPhoneForSubmission = () => {
  const digits = form.value.phone.replace(/\D/g, '');
  
  if (form.value.countryCode === "+966") {
    const cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
    return `${form.value.countryCode}${cleaned}`;
  }
  
  return `${form.value.countryCode}${digits}`;
};

// Update placeholder based on country code
const phonePlaceholder = computed(() => {
  if (form.value.countryCode === "+966") {
    return "5XX XXX XXX";
  }
  return "رقم الجوال";
});

// Fetch countries from API
const fetchCountries = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await $fetch(
      'https://backend.wattani-sa.com/api/v1/countries',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'lang': locale.value || 'ar',
          'X-API-KEY': '5f43766dcd92b8c3e7639d2a8791063c',
        },
      }
    );

    if (response && response.key === 'success' && response.data) {
      countriesFromApi.value = response.data.map((country) => ({
        code: `+${country.country_code}`,
        flag: country.iso?.toLowerCase() || country.iso,
        image: country.image,
        name: country.name,
        iso: country.iso,
        id: country.id,
      }));
    }
  } catch (err) {
    console.error('Error fetching countries:', err);
    countriesFromApi.value = [
      { code: "+966", flag: "sa", name: "السعودية", iso: "SA" },
    ];
  } finally {
    isLoadingCountries.value = false;
  }
};

// Country codes - use API data if available, otherwise use fallback
const countryCodes = computed(() => {
  if (countriesFromApi.value.length > 0) {
    return countriesFromApi.value;
  }
  return [
    { code: "+966", flag: "sa", name: "السعودية", iso: "SA" },
    { code: "+971", flag: "ae", name: "الإمارات", iso: "AE" },
    { code: "+965", flag: "kw", name: "الكويت", iso: "KW" },
    { code: "+974", flag: "qa", name: "قطر", iso: "QA" },
  ];
});

const selectedCountry = computed(() => {
  return countryCodes.value.find(c => c.code === form.value.countryCode) ?? countryCodes.value[0];
});

const updateDropdownPosition = () => {
  if (!dropdownButtonRef.value || !showCountryDropdown.value) return;
  
  const buttonRect = dropdownButtonRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const dropdownHeight = 320;
  const dropdownWidth = 256;
  const spaceBelow = viewportHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;
  
  let top, bottom;
  
  if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
    top = `${buttonRect.bottom + 4}px`;
    bottom = undefined;
  } else {
    bottom = `${viewportHeight - buttonRect.top + 4}px`;
    top = undefined;
  }
  
  // Align dropdown's right edge with button's right edge
  const viewportWidth = window.innerWidth;
  const right = `${viewportWidth - buttonRect.right}px`;
  const left = undefined;
  
  dropdownStyle.value = {
    top,
    bottom,
    right,
    left,
    width: `${dropdownWidth}px`,
    maxHeight: `${Math.min(dropdownHeight, spaceBelow >= dropdownHeight ? spaceBelow - 8 : spaceAbove - 8)}px`,
  };
};

const toggleCountryDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value;
  if (showCountryDropdown.value) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
};

const selectCountry = (country) => {
  form.value.countryCode = country.code;
  form.value.iso = country.iso;
  showCountryDropdown.value = false;
  
  if (form.value.phone) {
    if (validateSaudiPhone(form.value.phone)) {
      phoneError.value = "";
    } else {
      phoneError.value = form.value.countryCode === "+966" 
        ? "رقم الجوال غير صحيح" 
        : "رقم الجوال غير صحيح";
    }
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const target = event.target;
  if (!target.closest('.country-selector-container') && !target.closest('.country-dropdown')) {
    showCountryDropdown.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handlePhoneInput = (event) => {
  const target = event.target;
  const formatted = formatSaudiPhone(target.value);
  form.value.phone = formatted;
  
  if (formatted.length > 0) {
    if (validateSaudiPhone(formatted)) {
      phoneError.value = "";
    } else {
      phoneError.value = form.value.countryCode === "+966" 
        ? "رقم الجوال غير صحيح" 
        : "رقم الجوال غير صحيح";
    }
  } else {
    phoneError.value = "";
  }
};

// Watch locale changes to refetch countries
watch(locale, () => {
  fetchCountries();
});

// Watch for window resize and scroll to update dropdown position
watch(showCountryDropdown, (isOpen) => {
  if (isOpen) {
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
    nextTick(() => {
      updateDropdownPosition();
    });
  } else {
    window.removeEventListener('resize', updateDropdownPosition);
    window.removeEventListener('scroll', updateDropdownPosition, true);
  }
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchCountries();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
});

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
  // Validate phone number
  if (!validateSaudiPhone(form.value.phone)) {
    phoneError.value = form.value.countryCode === "+966" 
      ? "رقم الجوال غير صحيح" 
      : "رقم الجوال غير صحيح";
    return;
  }

  const fd = new FormData();
  // Extract just the phone number digits (remove spaces and formatting)
  const phoneDigits = form.value.phone.replace(/\D/g, '');
  // Remove leading 0 if present (for Saudi numbers)
  const cleanPhone = phoneDigits.startsWith('0') ? phoneDigits.slice(1) : phoneDigits;
  
  // Remove the + sign from country code for API
  const countryCode = form.value.countryCode.replace('+', '');
  
  fd.append("phone", cleanPhone);
  fd.append("password", form.value.password);
  fd.append("country_code", countryCode);
  fd.append("device_type", "web");
  fd.append("device_id", "11111111111");
  fd.append("lang", "ar");
  fd.append("iso", form.value.iso);
  
  isLoading.value = true;
  const { data, error } = await submitApiForm("sign-in", fd);
  isLoading.value = false;
  
  if ( error ) {
    showToast("error", error.msg);
    return;
  }
  if ( data.key === "success" ) {
    showToast("success", data.msg);
    // Updating the user data from store
    authStore.updateUserData(data.data);
    // Also update useAuth() state so navbar can detect the login
    login(data.data);
    navigateTo("/");
  } else {
    showToast("error", data.msg);
  }
};
</script>

<style scoped>
/* Custom scrollbar for country dropdown */
.country-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.country-dropdown::-webkit-scrollbar {
  width: 8px;
}

.country-dropdown::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.country-dropdown::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.country-dropdown::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth scrolling */
.country-dropdown {
  scroll-behavior: smooth;
}
</style>
