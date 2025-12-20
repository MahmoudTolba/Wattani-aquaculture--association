<template>
  <div>
    <!-- Profile Picture Section -->
    <div class="flex flex-col items-center mb-6 sm:mb-8">
      <div class="relative">
        <img
          :src="form.avatar || '/images/profile-avatar.png'"
          alt="Profile Picture"
          class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 sm:border-4 border-gray-100"
        />
        <button
          type="button"
          @click="(profileAvatarInput as any)?.click()"
          class="hidden"
          aria-label="Edit Profile Picture"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <input
          ref="profileAvatarInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="$emit('avatar-change', ($event.target as HTMLInputElement).files?.[0])"
        />
      </div>
    </div>

    <!-- Form Fields -->
    <form class="space-y-4 sm:space-y-6" @submit.prevent="$emit('submit')">
      <!-- Client Name -->
      <div class="space-y-2">
        <label
          for="clientName"
          class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
        >
          اسم العميل
        </label>
        <input
          id="clientName"
          v-model="form.clientName"
          type="text"
          placeholder="العميل"
          readonly
          class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right cursor-not-allowed opacity-75"
        />
      </div>

      <!-- Mobile Number -->
      <div class="space-y-2">
        <label
          for="mobileNumber"
          class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
        >
          رقم الجوال
        </label>
        <div
          class="flex flex-col sm:flex-row rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 shadow-sm overflow-hidden opacity-75"
        >
          <div
            class="flex items-center justify-center gap-2 border-b border-gray-100 sm:border-b-0 sm:border-l px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 text-xs sm:text-sm text-gray-700 min-w-[90px] sm:min-w-[100px]"
          >
            <span>+966</span>
            <img
              src="/images/Country Flags.png"
              alt="Saudi Arabia Flag"
              class="w-7 h-7 sm:w-6 sm:h-6"
            />
          </div>
          <input
            id="mobileNumber"
            v-model="form.mobileNumber"
            type="tel"
            placeholder="رقم الجوال"
            readonly
            class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right cursor-not-allowed opacity-75"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <label
          for="email"
          class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="البريد الإلكتروني"
          readonly
          class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right cursor-not-allowed opacity-75"
        />
      </div>

      <!-- City -->
      <div class="space-y-2">
        <label
          for="city"
          class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
        >
          المدينة
        </label>
        <div class="relative">
          <select
            id="city"
            v-model="form.city"
            disabled
            class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 pr-8 sm:pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 appearance-none text-right cursor-not-allowed opacity-75"
          >
            <option value="">اختر المدينة</option>
            <option value="riyadh">الرياض</option>
            <option value="jeddah">جدة</option>
            <option value="dammam">الدمام</option>
            <option value="makkah">مكة المكرمة</option>
            <option value="medina">المدينة المنورة</option>
          </select>
          <div
            class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
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
      <div class="space-y-2">
        <label
          for="location"
          class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
        >
          تحديد الموقع
        </label>
        <div class="relative">
          <input
            id="location"
            v-model="form.location"
            type="text"
            placeholder="تحديد الموقع"
            readonly
            class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right cursor-not-allowed opacity-75"
          />
          <div
            class="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5 text-[#15c472]"
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

      <!-- Delete Account Button -->
      <div class="pt-4 sm:pt-6 mt-4 sm:mt-6 max-w-lg mx-auto">
        <button
          type="button"
          class="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-red-500 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors"
          @click="$emit('delete-account')"
        >
          حذف الحساب
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  form: {
    clientName: string;
    mobileNumber: string;
    email: string;
    city: string;
    location: string;
    avatar: string;
  };
}>();

defineEmits<{
  'avatar-change': [file: File | undefined];
  submit: [];
  'delete-account': [];
}>();

const profileAvatarInput = ref<HTMLInputElement | null>(null);
</script>


