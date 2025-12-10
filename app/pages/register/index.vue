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
        <div class="w-full max-w-lg mx-auto space-y-8">
          <!-- Language switcher -->
          <div class="flex justify-start">
            <langSwitch />
          </div>

          <!-- Title -->
          <div class="text-center">
            <h1 class="text-3xl sm:text-4xl font-semibold text-[#0b9a78]">
              انشاء حساب
            </h1>
          </div>

          <!-- Form -->
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Avatar Upload -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div
                  class="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
                  @click="triggerFileInput"
                >
                  <img
                    :src="avatarPreview || '/images/profile-avatar.png'"
                    alt="Profile Avatar"
                    class="w-full h-full object-cover"
                  />
                  <!-- Camera Icon Overlay -->
                  <div
                    class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-[#15c472] flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 0 0110.07 4h3.86a2 0 011.664.89l.812 1.22A2 0 0018.07 7H19a2 0 012 2v9a2 0 01-2 2H5a2 0 01-2-2V9z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <!-- Camera Icon Badge -->
                <div
                  class="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#15c472] flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#12a866] transition-colors"
                  @click.stop="triggerFileInput"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 0 0110.07 4h3.86a2 0 011.664.89l.812 1.22A2 0 0018.07 7H19a2 0 012 2v9a2 0 01-2 2H5a2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  ref="fileInputRef"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleAvatarChange"
                />
              </div>
            </div>

            <!-- Client Name -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="clientName"
              >
              اسم العميل
              <span class="text-red-500">*</span>
              </label>
              <input
                id="clientName"
                v-model="form.clientName"
                type="text"
                placeholder="العميل"
                required
                class="w-full rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
              />
            </div>

            <!-- Phone number -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="phone"
              >
              رقم الجوال
              <span class="text-red-500">*</span>
              </label>
              <div
                class="flex  rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent overflow-hidden"
              >
                <div
                  class="flex items-center gap-2 border-l border-gray-100 px-4 py-3 bg-gray-50 text-sm text-dark/70"
                >
                  +966
                  <img
                    src="/images/Country Flags.png"
                    alt="Country Flag"
                    class="w-5 h-5"
                  />
                </div>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                  class="flex-1 bg-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="email"
              >
                البريد الإلكتروني
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="البريد الإلكتروني"
                class="w-full rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 focus:outline-none text-dark placeholder:text-gray-400 text-right"
              />
            </div>

            <!-- City -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="city"
              >
                المدينة
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  id="city"
                  v-model="form.city"
                  required
                  class="w-full rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 pr-10 focus:outline-none text-dark appearance-none text-right"
                >
                  <option value="riyadh">الرياض</option>
                  <option value="jeddah">جدة</option>
                  <option value="dammam">الدمام</option>
                  <option value="makkah">مكة المكرمة</option>
                  <option value="medina">المدينة المنورة</option>
                  <option value="khobar">الخبر</option>
                  <option value="taif">الطائف</option>
                </select>
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1 cursor-pointer"
                for="location"
                @click="openLocationModal"
              >
                تحديد الموقع
                <span class="text-red-500">*</span>
              </label>
              <div class="relative" @click="openLocationModal">
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  placeholder="تحديد الموقع"
                  required
                  readonly
                  class="w-full cursor-pointer rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 pl-10 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="password"
              >
                كلمة المرور
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="كلمة المرور"
                  required
                  class="w-full rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 pl-10 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    v-if="!showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L12 12m-5.71-5.71L3 3m9 9l3.29 3.29M12 12l5.71 5.71M12 12l-5.71-5.71m11.42 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-3">
              <label
                class="text-base font-medium text-dark flex justify-start items-center gap-1"
                for="confirmPassword"
              >
                كلمة المرور
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="كلمة المرور"
                  required
                  class="w-full rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,113,126,0.08)] focus-within:border-[#0ab07d] border border-transparent px-4 py-3 pl-10 focus:outline-none text-dark placeholder:text-gray-400 text-right"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    v-if="!showConfirmPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L12 12m-5.71-5.71L3 3m9 9l3.29 3.29M12 12l5.71 5.71M12 12l-5.71-5.71m11.42 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start gap-2">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="mt-1 w-4 h-4 text-[#15c472] border-gray-300 rounded focus:ring-[#15c472] focus:ring-2"
              />
              <label for="terms" class="text-sm text-dark cursor-pointer">
                أوافق على الشروط والاحكام
              </label>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-right"
            >
              {{ errorMessage }}
            </div>

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-right"
            >
              {{ successMessage }}
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
              <span>{{ isLoading ? "جاري إنشاء الحساب..." : "انشاء حساب" }}</span>
            </button>
          </form>

          <!-- Secondary actions -->
          <div class="text-center space-y-4">
         
            <p class="text-md text-[#00000]">
              لديك حساب بالفعل؟
              <NuxtLink to="/login" class="text-[#0a9687]">
                تسجيل دخول
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Image column -->
      <div
        class="w-full lg:w-1/2 relative bg-gradient-to-br from-[#0b9a78]/5 via-transparent to-[#0ab07d]/5 hidden md:hidden lg:block"
      >
        <div class="absolute inset-6 rounded-[28px] border border-white/30" />
        <img
          src="/images/login-img.png"
          alt="fishing"
          class="relative z-1 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  <LocationModal
    v-model="isLocationModalOpen"
    @confirm="handleLocationConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import langSwitch from "~/components/langSwitch.vue";
import LocationModal from "~/components/modals/LocationModal.vue";
definePageMeta({
  layout: 'auth-clean'
});

const fileInputRef = ref<HTMLInputElement | null>(null);
const avatarPreview = ref<string | undefined>(undefined);
const avatarFile = ref<File | null>(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isLocationModalOpen = ref(false);

const form = ref({
  clientName: "",
  phone: "",
  email: "",
  city: "riyadh",
  location: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("الرجاء اختيار صورة");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }
    
    avatarFile.value = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const { register, login } = useAuth();

// Clear messages after a delay
const clearMessages = () => {
  setTimeout(() => {
    errorMessage.value = "";
    successMessage.value = "";
  }, 5000);
};

const openLocationModal = () => {
  isLocationModalOpen.value = true;
};

const handleLocationConfirm = (locationData: any) => {
  if (locationData) {
    const address =
      locationData.address ||
      `${locationData.lat?.toFixed?.(5) || ""}, ${locationData.lng?.toFixed?.(5) || ""}`;
    form.value.location = address.trim();
  }
  isLocationModalOpen.value = false;
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  
  // Reset messages
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;
  
  try {
    // Validate required fields
    if (!form.value.clientName.trim()) {
      errorMessage.value = "الرجاء إدخال اسم العميل";
      isLoading.value = false;
      clearMessages();
      return;
    }
    
    if (!form.value.phone.trim()) {
      errorMessage.value = "الرجاء إدخال رقم الجوال";
      isLoading.value = false;
      clearMessages();
      return;
    }
    
    // Validate password length
    if (form.value.password.length < 6) {
      errorMessage.value = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      isLoading.value = false;
      clearMessages();
      return;
    }
    
    // Validate passwords match
    if (form.value.password !== form.value.confirmPassword) {
      errorMessage.value = "كلمات المرور غير متطابقة";
      isLoading.value = false;
      clearMessages();
      return;
    }
    
    // Validate terms acceptance
    if (!form.value.acceptTerms) {
      errorMessage.value = "يجب الموافقة على الشروط والأحكام";
      isLoading.value = false;
      clearMessages();
      return;
    }
    
    // TODO: Replace with actual API call
    // When your API is ready, uncomment and use this:
    /*
    const formData = new FormData();
    formData.append('clientName', form.value.clientName);
    formData.append('phone', form.value.phone);
    formData.append('email', form.value.email);
    formData.append('city', form.value.city);
    formData.append('location', form.value.location);
    formData.append('password', form.value.password);
    if (avatarFile.value) {
      formData.append('avatar', avatarFile.value);
    }
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: formData
    });
    
    // Use the user data from the API response
    login({
      id: response.user.id,
      name: response.user.name || form.value.clientName,
      phone: response.user.phone || form.value.phone,
      email: response.user.email || form.value.email,
      city: response.user.city || form.value.city,
      location: response.user.location || form.value.location,
      avatar: response.user.avatar || avatarPreview.value || "/images/profile-avatar.png",
      token: response.token, // If your API returns a token
    });
    */
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, simulate successful registration
    // This will be replaced with actual API call above
    const userData = {
      id: Date.now().toString(), // Temporary ID
      name: form.value.clientName,
      phone: form.value.phone,
      email: form.value.email,
      city: form.value.city,
      location: form.value.location,
      avatar: avatarPreview.value || "/images/profile-avatar.png",
    };
    
    // Register and automatically log in the user
    register(userData);
    
    successMessage.value = "تم إنشاء الحساب بنجاح! جاري التوجيه...";
    clearMessages();
    
    // Navigate to OTP verification page after successful registration
    setTimeout(() => {
      navigateTo("/register-otp");
    }, 500);
    
  } catch (error: any) {
    console.error("Registration error:", error);
    errorMessage.value = error?.message || "حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.";
    isLoading.value = false;
    clearMessages();
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
