<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { computed, watch, nextTick, onMounted as vueOnMounted, onUnmounted as vueOnUnmounted } from "vue";

const { t, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

const toast = useToast();

const form = reactive({
  firstName: "",
  countryCode: "+966",
  phone: "",
  message: "",
});

const isLoading = ref(false);
const isLoadingCountries = ref(false);
const showCountryDropdown = ref(false);
const phoneError = ref("");
const countriesFromApi = ref<any[]>([]);
const dropdownButtonRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref<{ top?: string; bottom?: string; left?: string; right?: string; width?: string; maxHeight?: string }>({});

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
        phoneError.value = t('contact-us.errors.phone_saudi');
      } else {
        phoneError.value = t('contact-us.errors.phone_invalid');
      }
    }
  } else {
    phoneError.value = "";
  }
};

// Update placeholder based on country code
const phonePlaceholder = computed(() => {
  if (form.countryCode === "+966") {
    return t('contact-us.phone_placeholder_saudi');
  }
  return t('contact-us.phone_placeholder');
});

// Fetch countries from API
const fetchCountries = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await $fetch<{ key: string; msg?: string; data?: any[] }>(
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
      // Map API data to component format
      countriesFromApi.value = response.data.map((country: any) => ({
        code: `+${country.country_code}`,
        flag: country.iso?.toLowerCase() || country.iso,
        image: country.image,
        name: country.name, // API returns name based on lang header
        iso: country.iso,
        id: country.id,
      }));
    }
  } catch (err: any) {
    console.error('Error fetching countries:', err);
    // Fallback to default countries if API fails
    countriesFromApi.value = [
      { code: "+966", flag: "sa", name: t('contact-us.countries.sa'), iso: "SA" },
    ];
  } finally {
    isLoadingCountries.value = false;
  }
};

// Country codes - use API data if available, otherwise use translations
const countryCodes = computed(() => {
  if (countriesFromApi.value.length > 0) {
    return countriesFromApi.value;
  }
  // Fallback to hardcoded list with translations
  return [
    { code: "+966", flag: "sa", name: t('contact-us.countries.sa'), iso: "SA" },
    { code: "+971", flag: "ae", name: t('contact-us.countries.ae'), iso: "AE" },
    { code: "+965", flag: "kw", name: t('contact-us.countries.kw'), iso: "KW" },
    { code: "+974", flag: "qa", name: t('contact-us.countries.qa'), iso: "QA" },
    { code: "+973", flag: "bh", name: t('contact-us.countries.bh'), iso: "BH" },
    { code: "+968", flag: "om", name: t('contact-us.countries.om'), iso: "OM" },
    { code: "+961", flag: "lb", name: t('contact-us.countries.lb'), iso: "LB" },
    { code: "+962", flag: "jo", name: t('contact-us.countries.jo'), iso: "JO" },
    { code: "+20", flag: "eg", name: t('contact-us.countries.eg'), iso: "EG" },
    { code: "+212", flag: "ma", name: t('contact-us.countries.ma'), iso: "MA" },
    { code: "+213", flag: "dz", name: t('contact-us.countries.dz'), iso: "DZ" },
    { code: "+216", flag: "tn", name: t('contact-us.countries.tn'), iso: "TN" },
    { code: "+1", flag: "us", name: t('contact-us.countries.us'), iso: "US" },
    { code: "+44", flag: "gb", name: t('contact-us.countries.gb'), iso: "GB" },
    { code: "+33", flag: "fr", name: t('contact-us.countries.fr'), iso: "FR" },
    { code: "+49", flag: "de", name: t('contact-us.countries.de'), iso: "DE" },
    { code: "+91", flag: "in", name: t('contact-us.countries.in'), iso: "IN" },
    { code: "+86", flag: "cn", name: t('contact-us.countries.cn'), iso: "CN" },
  ];
});

const selectedCountry = computed(() => {
  return countryCodes.value.find(c => c.code === form.countryCode) ?? countryCodes.value[0];
});

const updateDropdownPosition = () => {
  if (!dropdownButtonRef.value || !showCountryDropdown.value) return;
  
  const buttonRect = dropdownButtonRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const dropdownHeight = 320; // max-h-80 = 20rem = 320px
  const dropdownWidth = 256; // w-64 = 16rem = 256px
  const spaceBelow = viewportHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;
  
  // Calculate position
  let top: string | undefined;
  let bottom: string | undefined;
  
  if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
    // Open downward
    top = `${buttonRect.bottom + 4}px`;
    bottom = undefined;
  } else {
    // Open upward
    bottom = `${viewportHeight - buttonRect.top + 4}px`;
    top = undefined;
  }
  
  // Calculate horizontal position
  let left: string | undefined;
  let right: string | undefined;
  
  if (isRTL.value) {
    right = `${viewportWidth - buttonRect.right}px`;
    left = undefined;
  } else {
    left = `${buttonRect.left}px`;
    right = undefined;
  }
  
  dropdownStyle.value = {
    top,
    bottom,
    left,
    right,
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

const selectCountry = (country: typeof countryCodes.value[0]) => {
  form.countryCode = country.code;
  showCountryDropdown.value = false;
  
  // Re-validate phone number when country changes
  if (form.phone) {
    if (validateSaudiPhone(form.phone)) {
      phoneError.value = "";
    } else {
      if (form.countryCode === "+966") {
        phoneError.value = t('contact-us.errors.phone_saudi');
      } else {
        phoneError.value = t('contact-us.errors.phone_invalid');
      }
    }
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.country-selector-container') && !target.closest('.country-dropdown')) {
    showCountryDropdown.value = false;
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

vueOnMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchCountries();
});

vueOnUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
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
      summary: t('contact-us.toast.warning'),
      detail: t('contact-us.errors.required_fields'),
      life: 3000,
    });
    return;
  }
  
  // Validate phone number
  if (!validateSaudiPhone(form.phone)) {
    if (form.countryCode === "+966") {
      phoneError.value = t('contact-us.errors.phone_saudi');
      toast.add({
        severity: "warn",
        summary: t('contact-us.toast.warning'),
        detail: t('contact-us.errors.phone_saudi'),
        life: 3000,
      });
    } else {
      phoneError.value = t('contact-us.errors.phone_invalid');
      toast.add({
        severity: "warn",
        summary: t('contact-us.toast.warning'),
        detail: t('contact-us.errors.phone_invalid'),
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
        subject: `${t('contact-us.subject_prefix')} ${form.firstName}`,
        message: form.message,
      },
    });

    // Check if response indicates success
    if (response && response.key === 'success') {
      toast.add({
        severity: "success",
        summary: t('contact-us.toast.success'),
        detail: response.msg || t('contact-us.success.message_sent'),
        life: 3000,
      });
      
      // Reset form after successful submission
      form.firstName = "";
      form.countryCode = "+966";
      form.phone = "";
      form.message = "";
      phoneError.value = "";
    } else {
      throw new Error(response?.msg || t('contact-us.errors.send_failed'));
    }
  } catch (error: any) {
    console.error('Error sending message:', error);
    toast.add({
      severity: "error",
      summary: t('contact-us.toast.error'),
      detail: error?.data?.msg || error?.message || t('contact-us.errors.send_error'),
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
    <h1 class="text-2xl md:text-3xl font-bold mb-8" :class="isRTL ? 'text-right' : 'text-left'">
      {{ t('contact-us.title') }}
    </h1>

    <p class="text-[#4E4C4C] text-xl leading-relaxed mb-10" :class="isRTL ? 'text-right' : 'text-left'">
      {{ t('contact-us.description') }}
    </p>

    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Name & Phone Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name / Client Name -->
        <div>
          <label
            class="block text-black-600 text-sm font-medium mb-2"
            :class="isRTL ? 'text-right' : 'text-left'"
          >
            {{ t("contact-us.name") }} <span class="text-red-600">*</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            :placeholder="t('contact-us.name_placeholder')"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            :class="isRTL ? 'text-right' : 'text-left'"
          />
        </div>

        <!-- Phone Number with Country Code Selector -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isRTL ? 'text-right' : 'text-left'">
            {{ t("contact-us.phone") }} <span class="text-red-600">*</span>
          </label>
          <div class="country-selector-container">
            <div class="relative flex" :class="isRTL ? 'flex-row' : 'flex-row-reverse'">
            <!-- Country Code Selector -->
            <div class="relative">
              <button
                ref="dropdownButtonRef"
                type="button"
                @click="toggleCountryDropdown"
                class="flex items-center gap-2 px-3 py-3 border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                :class="isRTL ? 'rounded-r-lg border-l-0' : 'rounded-l-lg border-r-0'"
                :disabled="isLoadingCountries"
              >
                <img
                  v-if="selectedCountry?.image"
                  :src="selectedCountry.image"
                  :alt="selectedCountry?.name || t('contact-us.countries.sa')"
                  class="w-5 h-4 object-cover"
                />
                <img
                  v-else
                  :src="`https://flagcdn.com/16x12/${selectedCountry?.flag || 'sa'}.png`"
                  :alt="selectedCountry?.name || t('contact-us.countries.sa')"
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
                        class="w-full flex items-center gap-3 px-3 py-2 hover:bg-teal-50 rounded-lg transition-colors"
                        :class="[
                          { 'bg-teal-100': country.code === form.countryCode },
                          isRTL ? 'text-right flex-row' : 'text-left flex-row-reverse'
                        ]"
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
              v-model="form.phone"
              @input="handlePhoneInput"
              type="tel"
              :placeholder="phonePlaceholder"
              required
              :class="[
                'flex-1 py-3 border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition',
                phoneError ? 'border-red-500' : 'border-gray-300',
                isRTL ? 'pr-4 rounded-l-lg border-r-0 text-right' : 'pl-4 rounded-r-lg border-l-0 text-left'
              ]"
            />
            </div>
            <p v-if="phoneError" class="mt-1 text-xs text-red-500" :class="isRTL ? 'text-right' : 'text-left'">
              {{ phoneError }}
            </p>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-black-600 text-sm font-medium mb-2" :class="isRTL ? 'text-right' : 'text-left'">
          {{ t("contact-us.message") }} <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="form.message"
          rows="6"
          :placeholder="t('contact-us.message_placeholder')"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none transition"
          :class="isRTL ? 'text-right' : 'text-left'"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? t("contact-us.sending") : t("contact-us.send") }}
        </button>
      </div>
    </form>
  </div>
</template>

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
