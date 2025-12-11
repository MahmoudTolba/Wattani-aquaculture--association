<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const toast = useToast();

const form = reactive({
  firstName: "",
  countryCode: "+966",
  phone: "",
  message: "",
});

const isLoading = ref(false);
const showCountryDropdown = ref(false);
const phoneError = ref("");

// Format Saudi phone number as user types
const formatSaudiPhone = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // If Saudi Arabia is selected, format accordingly
  if (form.countryCode === "+966") {
    // Remove leading 0 if present (will be added by country code)
    let cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
    
    // Limit to 9 digits (after removing 0)
    cleaned = cleaned.slice(0, 9);
    
    // Format: 5XX XXX XXX
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
  
  // For other countries, just remove non-digits and limit length
  return digits.slice(0, 15);
};

// Validate Saudi phone number
const validateSaudiPhone = (phone: string): boolean => {
  if (form.countryCode !== "+966") {
    // For other countries, just check if it's not empty
    return phone.trim().length > 0;
  }
  
  // Remove spaces and non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Remove leading 0 if present
  const cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
  
  // Saudi mobile: 9 digits starting with 5
  // Saudi landline: 9 digits starting with 1
  if (cleaned.length === 9) {
    return cleaned.startsWith('5') || cleaned.startsWith('1');
  }
  
  // Also accept 10 digits starting with 05 or 01
  if (digits.length === 10) {
    return digits.startsWith('05') || digits.startsWith('01');
  }
  
  return false;
};

// Format phone number for API submission
const formatPhoneForSubmission = (): string => {
  // Remove all spaces and non-digits
  const digits = form.phone.replace(/\D/g, '');
  
  if (form.countryCode === "+966") {
    // Remove leading 0 if present (country code already has it)
    const cleaned = digits.startsWith('0') ? digits.slice(1) : digits;
    return `${form.countryCode}${cleaned}`;
  }
  
  return `${form.countryCode}${digits}`;
};

// Handle phone input
const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const formatted = formatSaudiPhone(target.value);
  form.phone = formatted;
  
  // Validate and show error
  if (formatted.length > 0) {
    if (validateSaudiPhone(formatted)) {
      phoneError.value = "";
    } else {
      if (form.countryCode === "+966") {
        phoneError.value = "يرجى إدخال رقم جوال سعودي صحيح (05XXXXXXXX أو 01XXXXXXXX)";
      } else {
        phoneError.value = "يرجى إدخال رقم صحيح";
      }
    }
  } else {
    phoneError.value = "";
  }
};

// Update placeholder based on country code
const phonePlaceholder = computed(() => {
  if (form.countryCode === "+966") {
    return "5XX XXX XXX";
  }
  return "رقم الجوال";
});

// Common country codes with flags
const countryCodes = [
  { code: "+966", flag: "sa", name: "السعودية" },
  { code: "+971", flag: "ae", name: "الإمارات" },
  { code: "+965", flag: "kw", name: "الكويت" },
  { code: "+974", flag: "qa", name: "قطر" },
  { code: "+973", flag: "bh", name: "البحرين" },
  { code: "+968", flag: "om", name: "عمان" },
  { code: "+961", flag: "lb", name: "لبنان" },
  { code: "+962", flag: "jo", name: "الأردن" },
  { code: "+20", flag: "eg", name: "مصر" },
  { code: "+212", flag: "ma", name: "المغرب" },
  { code: "+213", flag: "dz", name: "الجزائر" },
  { code: "+216", flag: "tn", name: "تونس" },
  { code: "+1", flag: "us", name: "الولايات المتحدة" },
  { code: "+44", flag: "gb", name: "المملكة المتحدة" },
  { code: "+33", flag: "fr", name: "فرنسا" },
  { code: "+49", flag: "de", name: "ألمانيا" },
  { code: "+91", flag: "in", name: "الهند" },
  { code: "+86", flag: "cn", name: "الصين" },
];

const selectedCountry = computed(() => {
  return countryCodes.find(c => c.code === form.countryCode) ?? countryCodes[0];
});

const toggleCountryDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value;
};

const selectCountry = (country: typeof countryCodes[0]) => {
  form.countryCode = country.code;
  showCountryDropdown.value = false;
  
  // Re-validate phone number when country changes
  if (form.phone) {
    if (validateSaudiPhone(form.phone)) {
      phoneError.value = "";
    } else {
      if (form.countryCode === "+966") {
        phoneError.value = "يرجى إدخال رقم جوال سعودي صحيح (05XXXXXXXX أو 01XXXXXXXX)";
      } else {
        phoneError.value = "يرجى إدخال رقم صحيح";
      }
    }
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.country-selector-container')) {
    showCountryDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

interface ApiResponse {
  key: string;
  msg?: string;
  data?: any;
}

const submitForm = async () => {
  // Validate form
  if (!form.firstName || !form.phone || !form.message) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }
  
  // Validate phone number
  if (!validateSaudiPhone(form.phone)) {
    if (form.countryCode === "+966") {
      phoneError.value = "يرجى إدخال رقم جوال سعودي صحيح (05XXXXXXXX أو 01XXXXXXXX)";
      toast.add({
        severity: "warn",
        summary: "تحذير",
        detail: "يرجى إدخال رقم جوال سعودي صحيح",
        life: 3000,
      });
    } else {
      phoneError.value = "يرجى إدخال رقم صحيح";
      toast.add({
        severity: "warn",
        summary: "تحذير",
        detail: "يرجى إدخال رقم صحيح",
        life: 3000,
      });
    }
    return;
  }

  isLoading.value = true;

  try {
    const response = await $fetch<ApiResponse>('https://backend.wattani-sa.com/api/v1/contact-us-send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstName: form.firstName,
        phone: formatPhoneForSubmission(),
        subject: `رسالة من ${form.firstName}`,
        message: form.message,
      },
    });

    // Check if response indicates success
    if (response && response.key === 'success') {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال الرسالة بنجاح!",
        life: 3000,
      });
      
      // Reset form after successful submission
      form.firstName = "";
      form.countryCode = "+966";
      form.phone = "";
      form.message = "";
      phoneError.value = "";
    } else {
      throw new Error(response?.msg || 'فشل في إرسال الرسالة');
    }
  } catch (error: any) {
    console.error('Error sending message:', error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error?.data?.msg || error?.message || 'حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-8xl mx-auto p-20">
    <!-- Header -->
    <h1 class="text-2xl md:text-3xl font-bold text-right mb-8">تواصل معنا</h1>

    <p class="text-right text-[#4E4C4C] text-xl leading-relaxed mb-10">
      جمعية وطني للاستنزاع المائي هي جمعية تعاونية سعودية تعمل على تطوير وتنمية
      قطاع الاستنزاع المائي في المملكة العربية السعودية، بما يواكب أهداف رؤية
      المملكة ٢٠٣٠ نحو تحقيق الأمن الغذائي والاستدامة البيئية.
    </p>

    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Name & Phone Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name / Client Name -->
        <div>
          <label
            class="block text-right text-black-600 text-sm font-medium mb-2"
          >
            {{ $t("contact-us.name") }} <span class="text-red-600">*</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            :placeholder="$t('contact-us.name_placeholder')"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-right transition"
          />
        </div>

        <!-- Phone Number with Country Code Selector -->
        <div>
          <label class="block text-right text-sm font-medium mb-2">
            {{ $t("contact-us.phone") }} <span class="text-red-600">*</span>
          </label>
          <div class="country-selector-container">
            <div class="relative flex">
            <!-- Country Code Selector -->
            <div class="relative">
              <button
                type="button"
                @click="toggleCountryDropdown"
                class="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-r-lg border-l-0 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <img
                  :src="`https://flagcdn.com/16x12/${selectedCountry?.flag || 'sa'}.png`"
                  :alt="selectedCountry?.name || 'السعودية'"
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
              <div
                v-if="showCountryDropdown"
                class="absolute top-full right-0 mt-1 w-64 max-h-80 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                @click.stop
              >
                <div class="p-2">
                  <div class="space-y-1">
                    <button
                      v-for="country in countryCodes"
                      :key="country.code"
                      type="button"
                      @click="selectCountry(country)"
                      class="w-full flex items-center gap-3 px-3 py-2 text-right hover:bg-teal-50 rounded-lg transition-colors"
                      :class="{ 'bg-teal-100': country.code === form.countryCode }"
                    >
                      <img
                        :src="`https://flagcdn.com/16x12/${country.flag}.png`"
                        :alt="country.name"
                        class="w-5 h-4"
                      />
                      <span class="flex-1 text-sm text-gray-700">{{ country.name }}</span>
                      <span class="text-sm text-gray-500 font-medium">{{ country.code }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Phone Input -->
            <input
              v-model="form.phone"
              @input="handlePhoneInput"
              type="tel"
              :placeholder="phonePlaceholder"
              required
              :class="[
                'flex-1 pr-4 py-3 border rounded-l-lg border-r-0 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-right transition',
                phoneError ? 'border-red-500' : 'border-gray-300'
              ]"
            />
            </div>
            <p v-if="phoneError" class="mt-1 text-right text-xs text-red-500">
              {{ phoneError }}
            </p>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-right text-black-600 text-sm font-medium mb-2">
          {{ $t("contact-us.message") }} <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="form.message"
          rows="6"
          :placeholder="$t('contact-us.message_placeholder')"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none text-right transition"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? $t("contact-us.sending") : $t("contact-us.send") }}
        </button>
      </div>
    </form>
  </div>
</template>
