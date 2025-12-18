<template>
  <div>
    <div
      class="min-h-screen bg-white-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-8 lg:px-12"
    >
      <div class="mx-auto">
        <!-- Mobile Menu Toggle Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden mb-4 w-full flex items-center justify-between bg-white rounded-xl shadow-sm p-4 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span class="font-medium">{{ getTabTitle() }}</span>
          <svg
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
              :d="
                isMobileMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              "
            />
          </svg>
        </button>

        <div class="flex flex-col lg:flex-row-reverse gap-4 lg:gap-6">
          <!-- Main Content Area (Left) -->
          <div
            class="flex-1 bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 order-2 lg:order-1"
          >
            <h1
              class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 hidden lg:block"
            >
              {{ getTabTitle() }}
            </h1>

            <!-- Profile Tab Content -->
            <div v-if="activeTab === 'profile'">
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
                    @change="handleProfileAvatarChange"
                  />
                </div>
              </div>

              <!-- Form Fields -->
              <form
                class="space-y-4 sm:space-y-6"
                @submit.prevent="handleSubmit"
              >
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
                    @click="handleDeleteAccount"
                  >
                    حذف الحساب
                  </button>
                </div>
              </form>
            </div>

            <!-- Settings Tab Content -->
            <div v-if="activeTab === 'settings'" class="space-y-6">
              <!-- Settings Sub-tabs Navigation -->
              <div
                class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6"
              >
                <button
                  @click="settingsSubTab = 'personal-info'"
                  :class="[
                    'px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all',
                    settingsSubTab === 'personal-info'
                      ? 'bg-gradient-to-r from-[#15c472] to-[#12a866] text-white shadow-md'
                      : 'bg-[#FCFCFC] border-2 border-[#15c472] text-[#15c472] hover:bg-gray-50',
                  ]"
                >
                  البيانات الشخصية
                </button>
                <button
                  @click="settingsSubTab = 'change-mobile'"
                  :class="[
                    'px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all',
                    settingsSubTab === 'change-mobile'
                      ? 'bg-gradient-to-r from-[#15c472] to-[#12a866] text-white shadow-md'
                      : 'bg-[#FCFCFC] border-2 border-[#15c472] text-[#15c472] hover:bg-gray-50',
                  ]"
                >
                  تغيير رقم الجوال
                </button>
                <button
                  @click="settingsSubTab = 'change-password'"
                  :class="[
                    'px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all',
                    settingsSubTab === 'change-password'
                      ? 'bg-gradient-to-r from-[#15c472] to-[#12a866] text-white shadow-md'
                      : 'bg-[#FCFCFC] border-2 border-[#15c472] text-[#15c472] hover:bg-gray-50',
                  ]"
                >
                  تغيير كلمة المرور
                </button>
              </div>

              <!-- Personal Information Sub-tab -->
              <div v-if="settingsSubTab === 'personal-info'" class="space-y-6">
                <!-- Profile Picture Section -->
                <div class="flex flex-col items-center mb-6 sm:mb-8">
                  <div class="relative">
                    <img
                      :src="settingsAvatarPreview || settingsForm.avatar || '/images/profile-avatar.png'"
                      alt="Profile Picture"
                      class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 sm:border-4 border-gray-100"
                    />
                    <button
                      type="button"
                      @click="(settingsAvatarInput as any)?.click()"
                      class="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#15c472] rounded-full flex items-center justify-center shadow-lg hover:bg-[#12a866] transition-colors"
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
                      ref="settingsAvatarInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleSettingsAvatarChange"
                    />
                  </div>
                </div>

                <!-- Form Fields -->
                <form
                  class="space-y-4 sm:space-y-6"
                  @submit.prevent="handleSettingsSubmit"
                >
                  <!-- Client Name -->
                  <div class="space-y-2">
                    <label
                      for="settingsClientName"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      اسم العميل
                    </label>
                    <input
                      id="settingsClientName"
                      v-model="settingsForm.clientName"
                      type="text"
                      placeholder="العميل"
                      class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                    />
                  </div>

                  <!-- Mobile Number -->
                  <div class="space-y-2">
                    <label
                      for="settingsMobileNumber"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      رقم الجوال
                    </label>
                    <div
                      class="flex flex-col sm:flex-row rounded-lg sm:rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-[#15c472] focus-within:ring-2 focus-within:ring-[#15c472]/20 overflow-hidden"
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
                        id="settingsMobileNumber"
                        v-model="settingsForm.phone"
                        type="tel"
                        placeholder="رقم الجوال"
                        class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right"
                      />
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="space-y-2">
                    <label
                      for="settingsEmail"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="settingsEmail"
                      v-model="settingsForm.email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                    />
                  </div>

                  <!-- City -->
                  <div class="space-y-2">
                    <label
                      for="settingsCity"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      المدينة
                    </label>
                    <div class="relative">
                      <select
                        id="settingsCity"
                        v-model="settingsForm.city"
                        class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 pr-8 sm:pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 appearance-none text-right"
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
                      for="settingsLocation"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      تحديد الموقع
                    </label>
                    <div class="relative">
                      <input
                        id="settingsLocation"
                        v-model="settingsForm.location"
                        type="text"
                        placeholder="تحديد الموقع"
                        class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
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

                  <!-- Save Button -->
                  <div class="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      :disabled="isUpdatingProfile"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="isUpdatingProfile">جاري التحديث...</span>
                      <span v-else>حفظ</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Change Mobile Number Sub-tab -->
              <div v-if="settingsSubTab === 'change-mobile'" class="space-y-6">
                <!-- Verification Code Section (First - Initial Verification) -->
                <div
                  v-if="!isCodeVerified && !hasEnteredNewMobile"
                  class="space-y-4"
                >
                  <div class="text-center space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-bold text-[#15c472]">
                      كود التحقق
                    </h2>
                    <p class="text-gray-600 text-sm sm:text-base">
                      تغيير رقم الجوال
                    </p>
                  </div>

                  <!-- Loading State -->
                  <div v-if="isSendingOldPhoneCode" class="text-center py-4">
                    <div
                      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#15c472] mb-2"
                    ></div>
                    <p class="text-gray-600 text-sm">
                      جاري إرسال رمز التحقق...
                    </p>
                  </div>

                  <!-- 4-Digit OTP Input -->
                  <div v-else class="flex justify-center gap-2 sm:gap-3">
                    <input
                      v-for="(digit, index) in otpDigits"
                      :key="index"
                      :ref="(el) => { if (el) otpInputs[index] = el as HTMLElement; }"
                      v-model="otpDigits[index]"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      :disabled="isVerifyingOldPhoneCode"
                      class="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 rounded-lg focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :class="
                        otpDigits[index]
                          ? 'border-[#15c472] text-[#15c472]'
                          : 'border-gray-300 text-gray-700'
                      "
                      @input="handleOtpInput(index, $event)"
                      @keydown="handleOtpKeydown(index, $event)"
                      @paste="handleOtpPaste($event)"
                    />
                  </div>

                  <!-- Verify Button -->
                  <div v-if="!isSendingOldPhoneCode" class="pt-4">
                    <button
                      type="button"
                      @click="handleVerifyCode"
                      :disabled="isVerifyingOldPhoneCode"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        v-if="isVerifyingOldPhoneCode"
                        class="flex items-center justify-center"
                      >
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري التحقق...
                      </span>
                      <span v-else>تحقق</span>
                    </button>
                  </div>
                </div>

                <!-- Mobile Number Input (After Initial Verification) -->
                <div
                  v-if="isCodeVerified && !hasEnteredNewMobile"
                  class="space-y-6"
                >
                  <!-- Mobile Number Field -->
                  <div class="space-y-2">
                    <label
                      for="newMobile"
                      class="block text-sm sm:text-base font-medium text-gray-700 text-right"
                    >
                      رقم الجوال *
                    </label>
                    <div
                      class="flex flex-col sm:flex-row rounded-lg sm:rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-[#15c472] focus-within:ring-2 focus-within:ring-[#15c472]/20 overflow-hidden"
                    >
                      <div
                        class="flex items-center justify-center gap-2 border-b border-gray-100 sm:border-b-0 sm:border-l px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 text-xs sm:text-sm text-gray-700 min-w-[90px] sm:min-w-[100px]"
                      >
                        <select
                          v-model="changeMobileForm.countryCode"
                          class="bg-transparent outline-none text-right appearance-none cursor-pointer focus:outline-none"
                          style="background-image: none"
                        >
                          <option value="+966">+966</option>
                          <option value="+971">+971</option>
                          <option value="+965">+965</option>
                          <option value="+974">+974</option>
                          <option value="+973">+973</option>
                          <option value="+968">+968</option>
                          <option value="+961">+961</option>
                          <option value="+962">+962</option>
                          <option value="+20">+20</option>
                          <option value="+212">+212</option>
                          <option value="+213">+213</option>
                          <option value="+216">+216</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+33">+33</option>
                          <option value="+49">+49</option>
                        </select>
                        <img
                          src="/images/Country Flags.png"
                          alt="Country Flag"
                          class="w-7 h-7 sm:w-6 sm:h-6"
                        />
                      </div>
                      <input
                        id="newMobile"
                        v-model="changeMobileForm.newMobile"
                        type="tel"
                        placeholder="رقم الجوال"
                        @input="handleNewMobileInput"
                        :disabled="isSendingNewPhoneCode"
                        class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <!-- Next Button -->
                  <div class="pt-4">
                    <button
                      type="button"
                      @click="handleNextStep"
                      :disabled="isSendingNewPhoneCode"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        v-if="isSendingNewPhoneCode"
                        class="flex items-center justify-center"
                      >
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري الإرسال...
                      </span>
                      <span v-else>التالي</span>
                    </button>
                  </div>
                </div>

                <!-- Verification Code Section (Second - For New Mobile Number) -->
                <div
                  v-if="hasEnteredNewMobile && !isNewCodeVerified"
                  class="space-y-4"
                >
                  <div class="text-center space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-bold text-[#15c472]">
                      كود التحقق
                    </h2>
                    <p class="text-gray-600 text-sm sm:text-base">
                      تغيير رقم الجوال
                    </p>
                  </div>

                  <!-- 4-Digit OTP Input -->
                  <div class="flex justify-center gap-2 sm:gap-3">
                    <input
                      v-for="(digit, index) in otpDigits"
                      :key="`new-${index}`"
                      :ref="(el) => { if (el) otpInputs[index] = el as HTMLElement; }"
                      v-model="otpDigits[index]"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      :disabled="isVerifyingNewPhoneCode"
                      class="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 rounded-lg focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :class="
                        otpDigits[index]
                          ? 'border-[#15c472] text-[#15c472]'
                          : 'border-gray-300 text-gray-700'
                      "
                      @input="handleOtpInput(index, $event)"
                      @keydown="handleOtpKeydown(index, $event)"
                      @paste="handleOtpPaste($event)"
                    />
                  </div>

                  <!-- Verify Button -->
                  <div class="pt-4">
                    <button
                      type="button"
                      @click="handleVerifyNewCode"
                      :disabled="isVerifyingNewPhoneCode"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        v-if="isVerifyingNewPhoneCode"
                        class="flex items-center justify-center"
                      >
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري التحقق...
                      </span>
                      <span v-else>تحقق</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Change Password Sub-tab -->
              <div
                v-if="settingsSubTab === 'change-password'"
                class="space-y-6"
              >
                <form
                  class="space-y-4 sm:space-y-6"
                  @submit.prevent="handleChangePasswordSubmit"
                >
                  <!-- Current Password -->
                  <div class="space-y-2">
                    <label
                      for="currentPassword"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      كلمة المرور الحالية
                    </label>
                    <div class="relative">
                      <input
                        id="currentPassword"
                        v-model="changePasswordForm.currentPassword"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        placeholder="أدخل كلمة المرور الحالية"
                        class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                      />
                      <button
                        type="button"
                        @click="showCurrentPassword = !showCurrentPassword"
                        class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        <svg
                          v-if="showCurrentPassword"
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
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 015.12 5.12m0 0a10.05 10.05 0 013.755 3.755M3 3l18 18"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- New Password -->
                  <div class="space-y-2">
                    <label
                      for="newPassword"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      كلمة المرور الجديدة
                    </label>
                    <div class="relative">
                      <input
                        id="newPassword"
                        v-model="changePasswordForm.newPassword"
                        :type="showNewPassword ? 'text' : 'password'"
                        placeholder="أدخل كلمة المرور الجديدة"
                        class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                      />
                      <button
                        type="button"
                        @click="showNewPassword = !showNewPassword"
                        class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        <svg
                          v-if="showNewPassword"
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
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 015.12 5.12m0 0a10.05 10.05 0 013.755 3.755M3 3l18 18"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Confirm New Password -->
                  <div class="space-y-2">
                    <label
                      for="confirmPassword"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <div class="relative">
                      <input
                        id="confirmPassword"
                        v-model="changePasswordForm.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        placeholder="أعد إدخال كلمة المرور الجديدة"
                        class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                      />
                      <button
                        type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        <svg
                          v-if="showConfirmPassword"
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
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 015.12 5.12m0 0a10.05 10.05 0 013.755 3.755M3 3l18 18"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Save Button -->
                  <div class="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      :disabled="isChangingPassword"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span v-if="isChangingPassword" class="animate-spin">
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
                      <span>{{
                        isChangingPassword ? "جاري التحديث..." : "حفظ"
                      }}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Wallet Tab Content -->
            <div v-if="activeTab === 'wallet'" class="space-y-6">
              <div
                class="flex flex-col items-center justify-center py-8 sm:py-12"
              >
                <!-- Wallet Illustration Section -->
                <div class="relative w-full max-w-md mb-8 sm:mb-12">
                  <div class="relative flex items-center justify-center">
                    <!-- Wallet Illustration -->

                    <!-- Wallet -->
                    <div class="w-60 h-60">
                      <img
                        src="/images/wallet-img.png"
                        alt="wallet-image"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Balance Text -->
                <div class="text-center mb-4">
                  <p class="text-gray-700 text-base sm:text-lg mb-3">
                    رصيدك الحالي هو
                  </p>
                  <div class="flex items-center justify-center gap-2">
                    <span 
                      v-if="!isLoadingWallet"
                      class="text-green-600 text-3xl sm:text-4xl font-bold"
                    >
                      {{ walletBalance }}
                    </span>
                    <span 
                      v-else
                      class="text-gray-400 text-3xl sm:text-4xl font-bold"
                    >
                      ...
                    </span>
                    <img
                      src="/icons/green-currency.svg"
                      alt="rial-icon"
                      class="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                </div>

                <!-- Charge Button -->
                <button
                  type="button"
                  @click="openChargeModal"
                  :disabled="isChargingWallet"
                  class="w-full max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm px-6 py-4 bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {{ isChargingWallet ? 'جاري الشحن...' : 'شحن' }}
                </button>
              </div>
            </div>

            <!-- My Ads Tab Content -->
            <div v-if="activeTab === 'my-ads'" class="space-y-6">
              <!-- Add Ad Form -->
              <div v-if="isAddAdFormOpen" class="space-y-6">
                <div class="flex items-center justify-end mb-4">
                  <!-- <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
                    اضافة اعلان
                  </h2> -->
                  <button
                    type="button"
                    @click="closeAddAdForm"
                    class="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="رجوع"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form class="space-y-6" @submit.prevent="handleAdSubmit">
                  <!-- Department Selection -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      تحديد القسم
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <select
                      v-model="adForm.categoryId"
                      class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                    >
                      <option value="" disabled>اختر القسم</option>
                      <option
                        v-for="option in departments"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Sub-Category Selection -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      تحديد القسم الفرعي
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <select
                      v-model="adForm.subCategoryId"
                      class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      required
                      :disabled="!adForm.categoryId || isLoadingSubCategories"
                    >
                      <option value="" disabled>
                        {{ isLoadingSubCategories ? "جاري التحميل..." : (!adForm.categoryId ? "اختر القسم أولاً" : (subCategories.length ? "اختر القسم الفرعي" : "لا توجد أقسام فرعية")) }}
                      </option>
                      <option
                        v-for="option in subCategories"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <p v-if="adForm.categoryId && !isLoadingSubCategories && !subCategories.length" class="text-xs text-red-500">
                      لا توجد أقسام فرعية متاحة لهذا القسم. يرجى اختيار قسم آخر.
                    </p>
                  </div>

                  <!-- Title Fields -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <div
                        class="flex items-center justify-start text-sm font-medium text-gray-800"
                      >
                        اسم الاعلان بالعربية
                        <span class="text-red-500 ms-1">*</span>
                      </div>
                      <input
                        v-model="adForm.titleAr"
                        type="text"
                        placeholder="اسم الاعلان بالعربية"
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        required
                      />
                    </div>

                    <div class="space-y-2">
                      <div
                        class="flex items-center justify-start text-sm font-medium text-gray-800"
                      >
                        اسم الاعلان بالإنجليزية
                        <span class="text-red-500 ms-1">*</span>
                      </div>
                      <input
                        v-model="adForm.titleEn"
                        type="text"
                        placeholder="اسم الاعلان بالإنجليزية"
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        required
                      />
                    </div>
                  </div>

                  <!-- Cost -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      تحديد تكلفة الاعلان
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <input
                      v-model="adForm.price"
                      type="text"
                      placeholder="التكلفة"
                      class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      required
                    />
                  </div>

                  <!-- City -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      المدينة
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <select
                      v-model="adForm.cityId"
                      class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      required
                    >
                      <option value="" disabled>اختر المدينة</option>
                      <option
                        v-for="option in cities"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Location -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      تحديد الموقع
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 end-4 flex items-center text-sm text-gray-400"
                        aria-hidden="true"
                      >
                        <img
                          src="/icons/location-icon.svg"
                          alt="location"
                          class=""
                        />
                      </span>
                      <input
                        v-model="adForm.location"
                        type="text"
                        placeholder="تحديد الموقع"
                        class="w-full rounded-xl border border-gray-200 pe-10 ps-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        readonly
                        @click="openLocationModal"
                        @keydown.enter.prevent="openLocationModal"
                        role="button"
                        :aria-expanded="isLocationModalOpen"
                        aria-haspopup="dialog"
                        required
                      />
                    </div>
                  </div>

                  <!-- Description Arabic -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      نص الاعلان بالعربية
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <textarea
                      v-model="adForm.descriptionAr"
                      rows="5"
                      placeholder="وصف"
                      class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      required
                    ></textarea>
                  </div>

                  <!-- Description English -->
                  <div class="space-y-2">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      نص الاعلان بالإنجليزية
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <textarea
                      v-model="adForm.descriptionEn"
                      rows="5"
                      placeholder="وصف"
                      class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      required
                    ></textarea>
                  </div>

                  <!-- Ad Image Upload -->
                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      ارفاق صور للاعلان
                      <span class="text-red-500 ms-1">*</span>
                    </div>
                    <label
                      class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        class="sr-only"
                        @change="handleAdImageChange"
                      />
                      <template v-if="adImagePreview">
                        <img
                          :src="adImagePreview"
                          alt="ad preview"
                          class="h-24 w-24 rounded-xl object-cover"
                        />
                      </template>
                      <template v-else>
                        <span class="flex items-center justify-center text-5xl">
                          <img
                            src="/icons/upload-icon.svg"
                            alt="upload"
                            class="w-6 h-6"
                          />
                        </span>
                        <span class="mt-3 text-sm font-medium text-gray-600">
                          {{ adImageLabel }}
                        </span>
                      </template>
                    </label>
                  </div>

                  <!-- Gallery Images Upload -->
                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      ارفاق صور ( بحد اقصي ٥ صور )
                      <span class="text-xs text-gray-500 ms-2">(يحد اقصي 5 صور)</span>
                    </div>
                    <label
                      class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        class="sr-only"
                        @change="handleGalleryImagesChange"
                      />
                      <template v-if="galleryPreviews.length">
                        <div class="flex gap-2 overflow-hidden">
                          <img
                            v-for="(preview, index) in galleryPreviews"
                            :key="`preview-${index}`"
                            :src="preview"
                            alt="gallery preview"
                            class="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                      </template>
                      <template v-else>
                        <span class="flex items-center justify-center text-2xl">
                          <img
                            src="/icons/upload-icon.svg"
                            alt="upload"
                            class="h-6 w-6"
                          />
                        </span>
                        <span class="mt-3 text-sm font-medium text-gray-600">
                          {{ galleryImagesLabel }}
                        </span>
                      </template>
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <div class="w-full">
                    <button
                      type="submit"
                      :disabled="isLoadingAd"
                      class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ isLoadingAd ? "جاري الإرسال..." : (selectedAdToEdit ? "تعديل" : "اضافة") }}
                    </button>
                  </div>
                </form>
              </div>

              <!-- Ads Grid -->
              <div v-else>
                <!-- Search and Filter Section -->
                <div class="mb-6 space-y-4">
                  <!-- Search Bar -->
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                      <input
                        v-model="advertSearchQuery"
                        type="text"
                        placeholder="ابحث في الإعلانات..."
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        @input="handleAdvertSearch"
                      />
                    </div>
                    <button
                      @click="addAdvertisement"
                      class="px-6 py-3 bg-teal-500 text-white text-sm font-semibold rounded-xl hover:bg-teal-600 transition-colors whitespace-nowrap"
                    >
                      إضافة إعلان جديد
                    </button>
                  </div>

                  <!-- Filter by Category/Subcategory -->
                  <div class="flex flex-col sm:flex-row gap-4">
                    <select
                      v-model="advertFilterCategory"
                      class="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      @change="handleCategoryFilter"
                    >
                      <option value="">جميع الأقسام</option>
                      <option
                        v-for="dept in departments"
                        :key="dept.value"
                        :value="dept.value"
                      >
                        {{ dept.label }}
                      </option>
                    </select>

                    <select
                      v-model="advertFilterSubcategory"
                      class="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                      :disabled="!advertFilterCategory"
                      @change="handleSubcategoryFilter"
                    >
                      <option value="">جميع الأقسام الفرعية</option>
                      <option
                        v-for="subCat in subCategories"
                        :key="subCat.value"
                        :value="subCat.value"
                      >
                        {{ subCat.label }}
                      </option>
                    </select>

                    <button
                      v-if="advertFilterCategory || advertFilterSubcategory || advertSearchQuery"
                      @click="clearAdvertFilters"
                      class="px-4 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 transition-colors whitespace-nowrap"
                    >
                      إعادة تعيين
                    </button>
                  </div>
                </div>

                <!-- Loading State -->
                <div v-if="isLoadingMyAdverts || isLoadingAdvertSearch" class="flex justify-center items-center py-12">
                  <div class="text-gray-500">جاري تحميل الإعلانات...</div>
                </div>
                
                <!-- Empty State -->
                <div v-else-if="filteredAds.length === 0" class="flex flex-col items-center justify-center py-12">
                  <p class="text-gray-500 text-lg mb-4">
                    {{ advertSearchQuery || advertFilterCategory || advertFilterSubcategory ? "لا توجد نتائج" : "لا توجد إعلانات" }}
                  </p>
                  <button
                    v-if="!advertSearchQuery && !advertFilterCategory && !advertFilterSubcategory"
                    @click="addAdvertisement"
                    class="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    إضافة إعلان جديد
                  </button>
                </div>
                
                <!-- Ads Grid -->
                <div
                  v-else
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 sm:gap-6"
                >
                  <article
                    v-for="ad in filteredAds"
                    :key="ad.id"
                    class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <!-- Product Image -->
                    <div class="relative">
                      <img
                        :src="ad.image"
                        :alt="ad.title"
                        class="w-full h-40 sm:h-48 object-cover"
                      />
                      <!-- Edit and Delete Buttons -->
                      <div class="absolute top-2 right-2 flex gap-2">
                        <button
                          @click="openDeleteAdModal(ad.id)"
                          class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                          aria-label="Delete"
                        >
                          <img
                            src="/icons/trash-icon.svg"
                            alt="delete-ad-icon"
                            class="w-8 h-8"
                          />
                        </button>

                        <button
                          @click="editAd(ad.id)"
                          class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                          aria-label="Edit"
                        >
                          <img
                            src="/icons/edit-icon.svg"
                            alt="edit-ad-icon"
                            class="w-8 h-8"
                          />
                        </button>
                      </div>
                    </div>

                    <!-- Product Content -->
                    <div class="p-4">
                      <div class="flex items-center justify-between mb-2">
                        <!-- Rating -->
                        <button
                          @click="viewAdRatings(ad.id)"
                          class="flex items-center gap-1 hover:opacity-80 transition-opacity"
                          :title="`${ad.ratingsCount || 0} تقييم`"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-amber-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                          <span class="text-sm font-bold text-gray-600">{{
                            ad.rating || 0
                          }}</span>
                          <span v-if="ad.ratingsCount" class="text-xs text-gray-500">({{ ad.ratingsCount }})</span>
                        </button>
                        <!-- Product Title -->
                        <h3
                          class="text-base font-bold text-gray-900 text-right flex-1 pr-2"
                        >
                          {{ ad.title }}
                        </h3>
                      </div>

                      <!-- Price -->
                      <div
                        class="text-lg font-bold text-[#15C472] mb-2 text-right"
                      >
                        {{ ad.price }} <span class="text-sm">ر.س</span>
                      </div>

                      <!-- Location and Time -->
                      <div
                        class="flex items-center gap-2 text-sm text-gray-600 mb-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 text-[#15C472]"
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
                        <span>{{ ad.location }}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 text-[#15C472] mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{{ ad.timeAgo }}</span>
                      </div>

                      <!-- Seller Information -->
                      <div
                        class="flex items-center gap-2 pt-2 border-t border-gray-100"
                      >
                        <img
                          :src="ad.seller.avatar"
                          :alt="ad.seller.name"
                          class="w-6 h-6 rounded-full object-cover"
                        />
                        <span class="text-sm text-gray-700">{{
                          ad.seller.name
                        }}</span>
                      </div>
                    </div>
                  </article>
                </div>

                <!-- Add Advertisement Button -->
                <div class="flex justify-center w-full mt-6">
                  <button
                    type="button"
                    @click="addAdvertisement"
                    class="w-full mx-auto max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm px-6 py-4 bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    اضافة اعلان
                  </button>
                </div>
              </div>
            </div>

            <!-- Ratings Tab Content -->
            <div v-if="activeTab === 'ratings'" class="space-y-6">
              <!-- Loading State -->
              <div
                v-if="isLoadingRatings"
                class="flex justify-center items-center py-12"
              >
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
                  ></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div
                v-else-if="ratingsError"
                class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p class="text-red-600 text-sm">{{ ratingsError }}</p>
                <button
                  @click="fetchRatings(ratingsCurrentPage)"
                  class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  إعادة المحاولة
                </button>
              </div>

              <!-- Reviews List -->
              <div v-else class="space-y-4">
                <!-- Empty State -->
                <div
                  v-if="paginatedReviews.length === 0"
                  class="text-center py-12"
                >
                  <p class="text-gray-500 text-lg">لا توجد تقييمات حالياً</p>
                </div>

                <!-- Reviews -->
                <div
                  v-for="review in paginatedReviews"
                  :key="review.id"
                  class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
                >
                  <!-- Review Label -->
                  <p
                    class="text-gray-800 font-bold text-sm sm:text-base mb-2 text-right"
                  >
                    تقييم العميل
                  </p>

                  <!-- Customer Name -->
                  <p
                    class="text-gray-800 font-bold text-base sm:text-lg mb-3 text-right"
                  >
                    {{ review.name }}
                  </p>

                  <!-- Star Rating -->
                  <div class="flex items-center gap-1 mb-3">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      :class="
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      "
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <!-- Review Text -->
                  <p
                    class="text-gray-800 text-sm sm:text-base leading-relaxed text-right"
                  >
                    {{ review.text }}
                  </p>
                </div>
              </div>

              <!-- Pagination -->
              <div
                v-if="!isLoadingRatings && !ratingsError && totalReviews > 0"
                class="flex justify-center pt-4"
              >
                <Paginator
                  :rows="reviewsPerPage"
                  :total-records="totalReviews"
                  :first="reviewsFirst"
                  @page="onReviewsPageChange"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  class="p-paginator"
                />
              </div>
            </div>

            <!-- Following Tab Content -->
            <div v-if="activeTab === 'following'" class="space-y-6">
              <!-- Loading State -->
              <div
                v-if="isLoadingFollowing"
                class="flex justify-center items-center py-12"
              >
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
                  ></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div
                v-else-if="followingError"
                class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p class="text-red-600 text-sm">{{ followingError }}</p>
                <button
                  @click="fetchFollowers(followingCurrentPage)"
                  class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  إعادة المحاولة
                </button>
              </div>

              <!-- Following Users List -->
              <div v-else class="space-y-3 sm:space-y-4">
                <!-- Empty State -->
                <div
                  v-if="paginatedFollowing.length === 0"
                  class="text-center py-12"
                >
                  <p class="text-gray-500 text-lg">لا يوجد متابعين حالياً</p>
                </div>

                <!-- Users List -->
                <div
                  v-for="user in paginatedFollowing"
                  :key="user.id"
                  class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4"
                >
                  <!-- User Info (Right side in RTL) -->
                  <div class="flex items-center gap-3 sm:gap-4 flex-1">
                    <!-- Profile Picture -->
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-200"
                    />

                    <!-- Name -->
                    <p
                      class="text-gray-800 font-semibold text-base sm:text-lg text-right"
                    >
                      {{ user.name }}
                    </p>
                  </div>

                  <!-- Unfollow Button (Left side in RTL) -->
                  <button
                    @click="handleUnfollow(user.id)"
                    class="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="إلغاء المتابعة"
                  >
                    <img
                      src="/icons/cancelled-follow.svg"
                      alt="cancelled-follow-icon"
                      class="w-8 h-8 sm:w-7 sm:h-7"
                    />
                  </button>
                </div>
              </div>

              <!-- Pagination -->
              <div
                v-if="
                  !isLoadingFollowing && !followingError && totalFollowing > 0
                "
                class="flex justify-center pt-4"
              >
                <Paginator
                  :rows="followingPerPage"
                  :total-records="totalFollowing"
                  :first="followingFirst"
                  @page="onFollowingPageChange"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  class="p-paginator"
                />
              </div>
            </div>

            <!-- Commission Tab Content -->
            <div v-if="activeTab === 'commission'" class="space-y-6">
              <div
                class="flex flex-col items-center justify-center py-8 sm:py-12"
              >
                <!-- Illustration Section -->
                <div class="relative w-full max-w-md mb-8 sm:mb-12">
                  <div class="relative flex items-center justify-center">
                    <!-- Calculator Illustration -->
                    <div class="w-60 h-60 sm:w-80 sm:h-80">
                      <img
                        src="/images/recharge-img.svg"
                        alt="calculator-image"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Payment Form Section -->
                <div class="w-full max-w-md space-y-6">
                  <!-- Total Amount Heading -->
                  <div class="text-right">
                    <h2
                      class="text-xl sm:text-2xl font-bold text-gray-800 mb-4"
                    >
                      المبلغ الاجمالي
                    </h2>
                  </div>

                  <!-- Input Field -->
                  <div>
                    <input
                      v-model="commissionAmount"
                      type="number"
                      placeholder="ادخل المبلغ"
                      @input="handleCommissionAmountChange"
                      class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>

                  <!-- Display Amount -->
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-green-600 text-3xl sm:text-4xl font-bold">
                      {{
                        calculatedFee !== null
                          ? calculatedFee
                          : commissionAmount || "60"
                      }}
                    </span>
                    <img
                      src="/icons/green-currency.svg"
                      alt="rial-icon"
                      class="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>

                  <!-- Loading State for Calculation -->
                  <div v-if="isCalculatingFee" class="text-center">
                    <div
                      class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#15c472]"
                    ></div>
                    <p class="text-gray-600 text-sm mt-2">
                      جاري حساب الرسوم...
                    </p>
                  </div>

                  <!-- Error State -->
                  <div
                    v-if="feeCalculationError"
                    class="bg-red-50 border border-red-200 rounded-xl p-3 text-center"
                  >
                    <p class="text-red-600 text-sm">
                      {{ feeCalculationError }}
                    </p>
                  </div>

                  <!-- Calculated Fee Info -->
                  <div
                    v-if="calculatedFee !== null && commissionAmount"
                    class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center"
                  >
                    <p class="text-blue-800 text-sm">
                      المبلغ الأصلي: {{ commissionAmount }} ريال
                    </p>
                    <p class="text-blue-800 text-sm font-semibold">
                      المبلغ الإجمالي بعد الرسوم: {{ calculatedFee }} ريال
                    </p>
                  </div>

                  <!-- Pay Button -->
                  <button
                    type="button"
                    @click="openCommissionPaymentModal"
                    :disabled="
                      isCalculatingFee ||
                      isPayingFee ||
                      !commissionAmount ||
                      parseFloat(commissionAmount) <= 0
                    "
                    class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span v-if="isPayingFee" class="animate-spin">
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
                    <span>{{ isPayingFee ? "جاري الدفع..." : "دفع" }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Packages Tab Content -->
            <div v-if="activeTab === 'packages'" class="space-y-6">
              <div
                v-if="isLoadingPackages"
                class="flex justify-center items-center py-12"
              >
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
                  ></div>
                  <p class="text-gray-600 text-sm">جاري تحميل الباقات...</p>
                </div>
              </div>

              <div
                v-else-if="packagesError"
                class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p class="text-red-600 text-sm">{{ packagesError }}</p>
                <button
                  @click="fetchPackages"
                  class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  إعادة المحاولة
                </button>
              </div>

              <div v-else>
                <div v-if="packages.length === 0" class="text-center py-12">
                  <p class="text-gray-500 text-lg">
                    لا توجد باقات متاحة حالياً
                  </p>
                </div>

                <div
                  v-else
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6"
                >
                  <!-- Golden Package Card -->
                  <div
                    v-for="(packageItem, index) in packages"
                    :key="index"
                    class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <!-- Header Section -->
                    <div class="flex items-start justify-between mb-6">
                      <!-- Price -->
                      <div class="flex items-center gap-1">
                        <span
                          class="text-3xl sm:text-4xl font-bold text-[#15c472]"
                        >
                          {{ packageItem.price }}
                        </span>
                        <img
                          src="/icons/green-currency.svg"
                          alt="currency"
                          class="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <!-- Title with Icon -->
                      <div class="flex items-center gap-2">
                        <span>🥇 </span>
                        <span
                          class="text-lg sm:text-xl font-bold text-[#FE9B0E]"
                        >
                          {{ packageItem.title }}
                        </span>
                      </div>
                    </div>

                    <!-- Features List -->
                    <ul class="space-y-3 mb-6 text-right list-disc">
                      <li
                        v-for="(feature, featureIndex) in packageItem.features"
                        :key="featureIndex"
                        class="text-gray-700 text-sm sm:text-base"
                      >
                        {{ feature }}
                      </li>
                    </ul>

                    <!-- Subscribe Button -->
                    <button
                      @click="handlePackageSubscribe(packageItem)"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                      اشتراك
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Subscription Tab Content -->
            <div v-if="activeTab === 'subscription'" class="space-y-6">
              <div
                v-if="isLoadingSubscriptions"
                class="flex justify-center items-center py-12"
              >
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
                  ></div>
                  <p class="text-gray-600 text-sm">جاري تحميل الاشتراكات...</p>
                </div>
              </div>

              <div
                v-else-if="subscriptionsError"
                class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p class="text-red-600 text-sm">{{ subscriptionsError }}</p>
                <button
                  @click="fetchSubscriptions"
                  class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  إعادة المحاولة
                </button>
              </div>

              <div v-else>
                <div
                  v-if="subscriptions.length === 0"
                  class="text-center py-12"
                >
                  <p class="text-gray-500 text-lg">لا توجد اشتراكات حالياً</p>
                </div>

                <div
                  v-else
                  class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6"
                >
                  <!-- Subscription Cards -->
                  <div
                    v-for="(subscription, index) in subscriptions"
                    :key="index"
                    class="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <!-- Header Section -->
                    <div class="flex items-start justify-between mb-6">
                      <!-- Price -->
                      <div class="flex items-center gap-1">
                        <span
                          class="text-3xl sm:text-4xl font-bold text-[#15c472]"
                        >
                          {{ subscription.price }}
                        </span>
                        <img
                          src="/icons/green-currency.svg"
                          alt="currency"
                          class="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <!-- Title with Medal Icon -->
                      <div class="flex items-center gap-2">
                        <span
                          class="text-xl sm:text-2xl font-bold text-orange-500"
                        >
                          {{ subscription.title }}
                        </span>
                        <div class="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 sm:w-7 sm:h-7 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.54-3.07 8.83-8 9.81-4.93-.98-8-5.27-8-9.81V8.18l8-4z"
                            />
                            <path
                              d="M5 16L3 5l5.5 3L12 4l3.5 4L21 5l-2 11H5zm2.7-1h8.6l1.1-7.4-3.5 4.5L12 8l-1.9 4.1-3.5-4.5L7.7 15z"
                            />
                          </svg>
                          <span
                            class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-orange-500"
                          >
                            {{ subscription.medalNumber || subscription.id }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Features List -->
                    <ul class="space-y-3 mb-6 text-right list-disc pr-6">
                      <li
                        v-for="(feature, featureIndex) in subscription.features"
                        :key="featureIndex"
                        class="text-gray-700 text-sm sm:text-base"
                      >
                        {{ feature }}
                      </li>
                    </ul>

                    <!-- Renew Button -->
                    <button
                      @click="handleRenewSubscription(subscription)"
                      class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                      تجديد
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <!-- FAQ Tab Content -->
            <div v-if="activeTab === 'faq'" class="space-y-6">
              <!-- Loading State -->
              <div
                v-if="isLoadingFaq"
                class="flex justify-center items-center py-12"
              >
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"
                  ></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div
                v-else-if="faqError"
                class="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p class="text-red-600 text-sm">{{ faqError }}</p>
                <button
                  @click="fetchFAQContent"
                  class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  إعادة المحاولة
                </button>
              </div>

              <!-- FAQ Accordion -->
              <div v-else class="space-y-3">
                <!-- Empty State -->
                <div v-if="faqs.length === 0" class="text-center py-12">
                  <p class="text-gray-500 text-lg">
                    لا توجد أسئلة متكررة حالياً
                  </p>
                </div>

                <!-- FAQs -->
                <Accordion :value="openFaqIndex">
                  <AccordionPanel
                    v-for="(faq, index) in paginatedFaqs"
                    :key="faq.id || index"
                    :value="index.toString()"
                  >
                    <AccordionHeader>
                      {{ faq.question }}
                    </AccordionHeader>
                    <AccordionContent>
                      <div
                        class="m-0 text-gray-700 leading-relaxed"
                        v-html="faq.answer"
                      ></div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>

              <!-- Pagination -->
              <div
                v-if="!isLoadingFaq && !faqError && totalFaqs > 0"
                class="flex justify-center pt-4"
              >
                <Paginator
                  :rows="faqPerPage"
                  :total-records="totalFaqs"
                  :first="faqFirst"
                  @page="onFaqPageChange"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  class="p-paginator"
                />
              </div>
            </div>

            <!-- Privacy Tab Content -->
            <div v-if="activeTab === 'privacy'" class="space-y-6">
              <div
                class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200"
              >
                <p
                  v-if="isLoadingPrivacy"
                  class="text-gray-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                >
                  جاري التحميل...
                </p>
                <p
                  v-else-if="privacyError"
                  class="text-red-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                >
                  {{ privacyError }}
                </p>
                <p
                  v-else
                  class="text-gray-700 text-base sm:text-lg leading-relaxed text-start mb-4 whitespace-pre-line"
                >
                  {{ privacyContent || "لا توجد بيانات متاحة حاليا" }}
                </p>
              </div>
            </div>

            <!-- Terms Tab Content -->
            <div v-if="activeTab === 'terms'" class="space-y-6">
              <div
                class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200"
              >
                <p
                  v-if="isLoadingTerms"
                  class="text-gray-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                >
                  جاري التحميل...
                </p>
                <p
                  v-else-if="termsError"
                  class="text-red-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                >
                  {{ termsError }}
                </p>
                <p
                  v-else
                  class="text-gray-700 text-base sm:text-lg leading-relaxed text-start mb-4 whitespace-pre-line"
                >
                  {{ termsContent || "لا توجد بيانات متاحة حاليا" }}
                </p>
              </div>
            </div>

            <!-- About Us Tab Content -->
            <div v-if="activeTab === 'about-us'" class="space-y-6">
              <div class="space-y-6">
                <!-- Introduction Section -->
                <div
                  class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200"
                >
                  <p
                    v-if="isLoadingAbout"
                    class="text-gray-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                  >
                    جاري التحميل...
                  </p>
                  <p
                    v-else-if="aboutError"
                    class="text-red-500 text-base sm:text-lg leading-relaxed text-start mb-4"
                  >
                    {{ aboutError }}
                  </p>
                  <p
                    v-else
                    class="text-gray-700 text-base sm:text-lg leading-relaxed text-start mb-4 whitespace-pre-line"
                  >
                    {{ aboutContent || "لا توجد بيانات متاحة حاليا" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Complaints Tab Content -->
            <div v-if="activeTab === 'complaints'" class="space-y-6">
              <!-- New Complaint Form View -->
              <div v-if="isShowingNewComplaintForm" class="space-y-6">
                <!-- Back Button -->
                <button
                  @click="isShowingNewComplaintForm = false"
                  class="flex items-center gap-2 text-gray-700 hover:text-[#15c472] transition-colors text-sm sm:text-base"
                >
                  <svg
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>العودة</span>
                </button>

                <!-- New Complaint Form -->
                <form
                  @submit.prevent="handleNewComplaintSubmit"
                  class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6"
                >
                  <!-- Message Title -->
                  <div class="space-y-2">
                    <label
                      for="complaintTitle"
                      class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                    >
                      عنوان الرسالة
                    </label>
                    <input
                      id="complaintTitle"
                      v-model="newComplaintForm.title"
                      type="text"
                      placeholder="عنوان"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent text-right"
                      required
                    />
                  </div>

                  <!-- Message Body -->
                  <div class="space-y-2">
                    <label
                      for="complaintMessage"
                      class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                    >
                      نص الرسالة
                    </label>
                    <textarea
                      id="complaintMessage"
                      v-model="newComplaintForm.message"
                      placeholder="نص الرسالة"
                      rows="6"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent text-right resize-none"
                      required
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <div class="flex justify-center pt-4">
                    <button
                      type="submit"
                      class="bg-gradient-to-r w-full max-w-2xl mx-auto from-teal-600 to-[#15c472] text-white font-bold py-4 px-8 sm:px-12 rounded-xl hover:from-teal-700 hover:to-[#12a866] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                    >
                      ارسال
                    </button>
                  </div>
                </form>
              </div>

              <!-- Complaint Detail View -->
              <div v-else-if="selectedComplaint || isLoadingComplaintDetails" class="space-y-6">
                <!-- Loading State -->
                <div v-if="isLoadingComplaintDetails" class="flex justify-center items-center py-12">
                  <div class="text-gray-600 text-lg">جاري تحميل التفاصيل...</div>
                </div>

                <!-- Error State -->
                <div v-else-if="complaintDetailsError" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                  <p class="text-red-800 text-center mb-4">{{ complaintDetailsError }}</p>
                  <button
                    @click="selectedComplaint = null; complaintDetailsError = null"
                    class="flex items-center gap-2 text-gray-700 hover:text-[#15c472] transition-colors text-sm sm:text-base mx-auto"
                  >
                    <svg
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>العودة</span>
                  </button>
                </div>

                <!-- Complaint Details -->
                <template v-else-if="selectedComplaint">
                  <!-- Back Button -->
                  <button
                    @click="selectedComplaint = null"
                    class="flex items-center gap-2 text-gray-700 hover:text-[#15c472] transition-colors text-sm sm:text-base"
                  >
                  <svg
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>العودة</span>
                </button>

                <!-- Header Section -->
                <div class="flex items-center justify-between flex-wrap gap-4">
                  <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                    شكوى رقم {{ selectedComplaint.number }}
                  </h1>
                  <span
                    :class="[
                      'px-3 py-1 rounded-lg text-sm sm:text-base font-semibold',
                      getStatusClass(selectedComplaint.status),
                    ]"
                  >
                    {{ selectedComplaint.status }}
                  </span>
                </div>

                <!-- Complaint Details Card -->
                <div
                  class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
                >
                  <h2
                    class="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-start border-b border-gray-200 pb-4"
                  >
                    تفاصيل الشكوى
                  </h2>
                  <div class="space-y-3">
                    <!-- Complaint Number -->
                    <div
                      class="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <span class="text-gray-600 text-sm sm:text-base"
                        >رقم الشكوى</span
                      >
                      <span
                        class="text-gray-800 font-semibold text-sm sm:text-base"
                        >{{ selectedComplaint.number }}</span
                      >
                    </div>

                    <!-- Complaint Date -->
                    <div
                      class="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <span class="text-gray-600 text-sm sm:text-base"
                        >تاريخ الشكوي</span
                      >
                      <span
                        class="text-gray-800 font-semibold text-sm sm:text-base"
                        >{{ selectedComplaint.date }}</span
                      >
                    </div>

                    <!-- Complaint Subject/Title -->
                    <div
                      class="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <span class="text-gray-600 text-sm sm:text-base"
                        >عنوان الشكوي</span
                      >
                      <span
                        class="text-gray-800 font-semibold text-sm sm:text-base"
                        >{{ selectedComplaint.subject || selectedComplaint.address || "لا يوجد عنوان" }}</span
                      >
                    </div>

                    <!-- Complaint Status -->
                    <div
                      class="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <span class="text-gray-600 text-sm sm:text-base"
                        >حالة الشكوى</span
                      >
                      <span
                        class="text-gray-800 font-semibold text-sm sm:text-base"
                        >{{ selectedComplaint.status }}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Complaint Description Card -->
                <div
                  class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
                >
                  <h2
                    class="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-start border-b border-gray-200 pb-4"
                  >
                    تفاصيل الشكوى
                  </h2>
                  <p
                    class="text-gray-700 text-sm sm:text-base leading-relaxed text-right"
                  >
                    {{
                      selectedComplaint.description ||
                      selectedComplaint.subject ||
                      "لا يوجد وصف متاح"
                    }}
                  </p>
                </div>
                <!-- Admin Response Card -->
                <div
                  v-if="selectedComplaint.admin_message"
                  class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
                >
                  <h2
                    class="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-start border-b border-gray-200 pb-4"
                  >
                    رد الادارة
                  </h2>
                  <p
                    class="text-gray-700 text-sm sm:text-base leading-relaxed text-right"
                  >
                    {{ selectedComplaint.admin_message }}
                  </p>
                </div>
                </template>
              </div>

              <!-- Complaints List View -->
              <div v-else class="space-y-6">
                <!-- Loading State -->
                <div v-if="isLoadingComplaints" class="flex justify-center items-center py-12">
                  <div class="text-gray-600 text-lg">جاري التحميل...</div>
                </div>

                <!-- Error State -->
                <div v-else-if="complaintsError" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                  <p class="text-red-800 text-center">{{ complaintsError }}</p>
                </div>

                <!-- Complaints Grid -->
                <div
                  v-else-if="complaints.length > 0"
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-1 gap-4 sm:gap-6"
                >
                  <div
                    v-for="complaint in paginatedComplaints"
                    :key="complaint.id"
                    @click="viewComplaintDetails(complaint.id)"
                    class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <!-- Title -->
                    <h3
                      class="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-right border-b border-gray-200 pb-4"
                    >
                      تفاصيل الشكوى
                    </h3>

                    <!-- Complaint Details -->
                    <div class="space-y-3 text-right">
                      <!-- Complaint Number -->
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600 text-sm sm:text-base"
                          >رقم الشكوى</span
                        >
                        <span
                          class="text-gray-800 font-semibold text-sm sm:text-base"
                          >{{ complaint.number }}</span
                        >
                      </div>

                      <!-- Complaint Date -->
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600 text-sm sm:text-base"
                          >تاريخ الشكوى</span
                        >
                        <span
                          class="text-gray-800 font-semibold text-sm sm:text-base"
                          >{{ complaint.date }}</span
                        >
                      </div>

                      <!-- Complaint Address -->
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600 text-sm sm:text-base"
                          >عنوان الشكوى</span
                        >
                        <span
                          class="text-gray-800 font-semibold text-sm sm:text-base"
                          >{{ complaint.address }}</span
                        >
                      </div>

                      <!-- Complaint Status -->
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600 text-sm sm:text-base"
                          >حالة الشكوى</span
                        >
                        <span
                          :class="[
                            'px-3 py-1 rounded-lg text-sm sm:text-base font-semibold',
                            getStatusClass(complaint.status),
                          ]"
                        >
                          {{ complaint.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-12">
                  <p class="text-gray-600 text-lg">لا توجد شكاوى متاحة</p>
                </div>

                <!-- Pagination -->
                <div v-if="!isLoadingComplaints && !complaintsError && complaints.length > 0" class="flex justify-center pt-4">
                  <Paginator
                    :rows="complaintsPerPage"
                    :total-records="totalComplaints"
                    :first="complaintsFirst"
                    @page="onComplaintsPageChange"
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    class="p-paginator"
                  />
                </div>

                <!-- New Complaint Button -->
                <div class="flex justify-center pt-6">
                  <button
                    @click="isShowingNewComplaintForm = true"
                    class="bg-gradient-to-r w-full max-w-2xl mx-auto from-teal-600 to-[#15c472] text-white font-bold py-4 px-8 sm:px-12 rounded-xl hover:from-teal-700 hover:to-[#12a866] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                  >
                    شكوي جديدة
                  </button>
                </div>
                
              </div>
            </div>

            <!-- Join Consultant Tab Content -->
            <div v-if="activeTab === 'join-consultant'" class="space-y-6">
              <form
                @submit.prevent="handleJoinConsultantSubmit"
                class="space-y-6"
              >
                <!-- CV PDF Upload -->
                <div class="space-y-2">
                  <label
                    for="cvFile"
                    class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                  >
                    ارفاق ملف السير الذاتية PDF
                    <span class="text-red-500">*</span>
                  </label>
                  <label
                    for="cvFile"
                    class="block max-w-xs border border-gray-300 rounded-xl p-3 sm:p-4 cursor-pointer hover:border-[#15c472] transition-colors bg-white"
                  >
                    <input
                      id="cvFile"
                      type="file"
                      accept=".pdf"
                      @change="handleCvFileChange"
                      class="hidden"
                    />
                    <div
                      class="flex flex-col items-center justify-center gap-2"
                    >
                      <img
                        src="/icons/pdf-uploader.svg"
                        alt="pdf-uploader"
                        class="w-4 h-4"
                      />
                      <span class="text-gray-600 text-xs sm:text-sm">
                        {{ cvFileName || "إرفاق ملف" }}
                      </span>
                    </div>
                  </label>
                </div>

                <!-- Consultant Proof PDF Upload -->
                <div class="space-y-2">
                  <label
                    for="proofFile"
                    class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                  >
                    ارفاق ما يثبت انه استشاري PDF
                    <span class="text-red-500">*</span>
                  </label>
                  <label
                    for="proofFile"
                    class="block max-w-xs border border-gray-300 rounded-xl p-3 sm:p-4 cursor-pointer hover:border-[#15c472] transition-colors bg-white"
                  >
                    <input
                      id="proofFile"
                      type="file"
                      accept=".pdf"
                      @change="handleProofFileChange"
                      class="hidden"
                    />
                    <div
                      class="flex flex-col items-center justify-center gap-2"
                    >
                      <img
                        src="/icons/pdf-uploader.svg"
                        alt="pdf-uploader"
                        class="w-4 h-4"
                      />
                      <span class="text-gray-600 text-xs sm:text-sm">
                        {{ proofFileName || "إرفاق ملف" }}
                      </span>
                    </div>
                  </label>
                </div>

                <!-- Consultation Cost -->
                <div class="space-y-2">
                  <label
                    for="consultationCost"
                    class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                  >
                    تكلفة الاستشارة
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="consultationCost"
                    v-model="joinConsultantForm.consultationCost"
                    type="text"
                    placeholder="١٠٠ ريال"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
                  />
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmittingConsultant"
                  class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isSubmittingConsultant">جاري الإرسال...</span>
                  <span v-else>ارسال طلب</span>
                </button>
              </form>
            </div>

            <!-- Contact Us Tab Content -->
            <div v-if="activeTab === 'contact-us'" class="space-y-6">
              <form @submit.prevent="handleContactUsSubmit" class="space-y-6">
                <!-- Message Title Field -->
                <div class="space-y-2">
                  <label
                    for="messageTitle"
                    class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                  >
                    عنوان الرسالة
                  </label>
                  <input
                    id="messageTitle"
                    v-model="contactForm.messageTitle"
                    type="text"
                    placeholder="عنوان"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
                  />
                </div>

                <!-- Message Text Field -->
                <div class="space-y-2">
                  <label
                    for="messageText"
                    class="block text-sm sm:text-base font-bold text-gray-800 text-right"
                  >
                    نص الرسالة
                  </label>
                  <textarea
                    id="messageText"
                    v-model="contactForm.messageText"
                    placeholder="نص الرسالة"
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSendingContact"
                  class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span v-if="isSendingContact">جاري الإرسال...</span>
                  <span v-else>ارسال</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Sidebar Navigation (Right) -->
          <div
            :class="[
              'w-full lg:w-80 shrink-0 order-1 lg:order-2',
              isMobileMenuOpen ? 'block' : 'hidden lg:block',
            ]"
          >
            <div class="p-3 sm:p-4">
              <nav
                class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"
              >
                <!-- 1. الملف الشخصي -->
                <button
                  @click="setActiveTab('profile')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors  w-full text-right',
                    activeTab === 'profile'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/profile-tab.svg"
                    alt="profile-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>الملف الشخصي</span>
                </button>

                <!-- 2. الاعدادات -->
                <button
                  @click="setActiveTab('settings')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'settings'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/settings-tab.svg"
                    alt="settings-tab"
                    class="w-7 h-7 sm:w-6 sm:h-6"
                  />
                  <span>الاعدادات</span>
                </button>

                <!-- 3. المفضلة -->
                <!-- <button
                  @click="setActiveTab('favorites')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'favorites'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/heart-icon.svg"
                    alt="favorites-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>المفضلة</span>
                </button> -->

                <!-- 4. المحفظة -->
                <button
                  @click="setActiveTab('wallet')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'wallet'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/wallet-tab.svg"
                    alt="wallet-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>المحفظة</span>
                </button>

                <!-- 5. اعلاناتي -->
                <button
                  @click="setActiveTab('my-ads')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'my-ads'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/ads-tab.svg"
                    alt="ads-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>اعلاناتي</span>
                </button>

                <!-- 6. تقييماتي -->
                <button
                  @click="setActiveTab('ratings')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'ratings'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/rating-tab.svg"
                    alt="ratings-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>تقييماتي</span>
                </button>

                <!-- 7. المتابعة -->
                <button
                  @click="setActiveTab('following')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'following'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/follow-tab.svg"
                    alt="follow-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>المتابعة</span>
                </button>

                <!-- 8. حساب عمولة التطبيق -->
                <button
                  @click="setActiveTab('commission')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'commission'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/cost-tab.svg"
                    alt="cost-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>حساب عمولة التطبيق</span>
                </button>

                <!-- 9. باقاتي -->
                <button
                  @click="setActiveTab('packages')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'packages'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/Packages-tabs.svg"
                    alt="Packages-tabs"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>باقاتي</span>
                </button>

                <!-- 10. اشتراكي -->
                <button
                  @click="setActiveTab('subscription')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'subscription'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/subscription-tab.svg"
                    alt="subscription-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>اشتراكي</span>
                </button>

                <!-- 11. تواصل معنا -->
                <button
                  @click="setActiveTab('contact-us')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'contact-us'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/contactus-tab.svg"
                    alt="contact-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>تواصل معنا</span>
                </button>

                <!-- 12. عن المنصة -->
                <button
                  @click="setActiveTab('about-us')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'about-us'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/aboutus-tab.svg"
                    alt="aboutus-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>عن المنصة</span>
                </button>

                <!-- 13. الاسئلة المتكررة -->
                <button
                  @click="setActiveTab('faq')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'faq'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/faq-tab.svg"
                    alt="faq-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>الاسئلة المتكررة</span>
                </button>

                <!-- 14. سياسة الاستخدام -->
                <button
                  @click="setActiveTab('privacy')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'privacy'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/privacy-tab.svg"
                    alt="privacy-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>سياسة الاستخدام</span>
                </button>

                <!-- 15. الشروط والاحكام -->
                <button
                  @click="setActiveTab('terms')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'terms'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/terms-tab.svg"
                    alt="terms-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>الشروط والاحكام</span>
                </button>

                <!-- 16. الشكاوي المقدمة -->
                <button
                  @click="setActiveTab('complaints')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'complaints'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/reports-tab.svg"
                    alt="complaints-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>الشكاوي المقدمة</span>
                </button>

                <!-- 17. الانظمام كمستشار -->
                <button
                  @click="setActiveTab('join-consultant')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'join-consultant'
                      ? 'bg-[#15c472] text-white'
                      : 'bg-[#FCFCFC] text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/join-tab.svg"
                    alt="consultant-tab"
                    class="w-8 h-8 sm:w-7 sm:h-7 bg-green-200 p-1 rounded-full"
                  />
                  <span>الانظمام كمستشار</span>
                </button>

                <!-- 18. تسجيل الخروج (في الأسفل باللون الأحمر) -->
                <div class="pt-2 mt-2 border-t border-gray-200">
                  <button
                    @click="openLogoutModal"
                    class="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base text-red-500 hover:bg-red-50 font-medium transition-colors w-full text-right"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span class="text-red-500">تسجيل الخروج</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charge Wallet Modal -->
    <ChargeWalletModal v-model="isChargeModalOpen" @confirm="handleCharge" />

    <!-- Commission Payment Modal -->
    <CommissionPaymentModal
      v-model="isCommissionPaymentModalOpen"
      :payment-method="typeof selectedCommissionPaymentMethod === 'string' ? selectedCommissionPaymentMethod : (selectedCommissionPaymentMethod as any)"
      @confirm="handleCommissionPaymentConfirm"
    />

    <!-- Success Modal -->
    <SuccessModal v-model="isSuccessModalOpen" title="تم الاشتراك بنجاح" />

    <!-- Package Payment Modal -->
    <PackagePaymentModal
      v-model="isPackagePaymentModalOpen"
      :payment-method="typeof selectedPackagePaymentMethod === 'string' ? selectedPackagePaymentMethod : (selectedPackagePaymentMethod as any)"
      :loading="isSubscribingPackage"
      @confirm="handlePackagePaymentConfirm"
    />

    <!-- Logout Confirmation Modal -->
    <LogoutModal v-model="isLogoutModalOpen" @confirm="confirmLogout" />

    <!-- Delete Account Confirmation Modal -->
    <DeleteAccountModal
      v-model="isDeleteAccountModalOpen"
      :loading="isDeletingAccount"
      @confirm="confirmDeleteAccount"
    />

    <!-- Delete Ad Confirmation Modal -->
    <DeleteAdModal v-model="isDeleteAdModalOpen" :loading="isDeletingAd" @confirm="confirmDeleteAd" />

    <!-- Location Modal -->
    <LocationModal v-model="isLocationModalOpen" @confirm="handleLocationConfirm" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick, onMounted } from "vue";
import Paginator from "primevue/paginator";
import { useToast } from "primevue/usetoast";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import ChargeWalletModal from "~/components/modals/ChargeWalletModal.vue";
import CommissionPaymentModal from "~/components/modals/CommissionPaymentModal.vue";
import SuccessModal from "~/components/modals/SuccessModal.vue";
import PackagePaymentModal from "~/components/modals/PackagePaymentModal.vue";
import { useWallet } from "~/composables/useWallet";
import LogoutModal from "~/components/modals/LogoutModal.vue";
import DeleteAccountModal from "~/components/modals/DeleteAccountModal.vue";
import DeleteAdModal from "~/components/modals/DeleteAdModal.vue";
import LocationModal from "~/components/modals/LocationModal.vue";
import { useUserStore } from "~/stores/user";
import { useAuthStore } from "~/stores/authUserStore";
import { useMyAds } from "~/composables/useMyAds";
import { useAdverts } from "~/composables/useAdverts";

// Type definitions
interface ApiResponse<T = any> {
  key?: string;
  msg?: string;
  message?: string;
  data?: T;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  name?: string;
  text?: string;
  user?: {
    name: string;
    avatar: string;
  };
  created_at?: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  token?: string;
  access_token?: string;
  phone?: string;
  email?: string;
  city?: string;
  location?: string;
}

interface Package {
  id: number;
  title: string;
  price: string;
  features: string[];
}

interface Subscription {
  id: number;
  title: string;
  price: string;
  features: string[];
  status?: string;
  packageId?: number;
  medalNumber?: number;
}

interface Complaint {
  id: number;
  number: string;
  date: string;
  address: string;
  status: string;
  description: string;
  subject?: string;
  admin_message?: string;
}

interface Ad {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  timeAgo: string;
  seller: {
    name: string;
    avatar: string;
  };
}

interface PaginationEvent {
  first: number;
  rows: number;
}

type PaymentMethod = string | { id: number; name: string };

const toast = useToast();
const userStore = useUserStore();
const { user, login } = useAuth();
const { showWallet, chargeWallet } = useWallet();

const activeTab = ref("profile");
const isMobileMenuOpen = ref(false);
const isChargeModalOpen = ref(false);
const chargeAmount = ref("");
const walletBalance = ref(0);
const isLoadingWallet = ref(false);
const isChargingWallet = ref(false);
const commissionAmount = ref("");
const calculatedFee = ref(null);
const isCalculatingFee = ref(false);
const isPayingFee = ref(false);
const feeCalculationError = ref(null);

// Settings Sub-tab State
const settingsSubTab = ref("personal-info");

// Password Visibility State
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const isChangingPassword = ref(false);

// Commission Payment Modal State
const isCommissionPaymentModalOpen = ref(false);
const selectedCommissionPaymentMethod = ref<PaymentMethod>("wallet");

// Success Modal State
const isSuccessModalOpen = ref(false);

// Package Payment Modal State
const isPackagePaymentModalOpen = ref(false);
const selectedPackagePaymentMethod = ref<PaymentMethod>("wallet");
const selectedPackage = ref<Package | null>(null);
const isSubscribingPackage = ref(false);

// Logout Modal State
const isLogoutModalOpen = ref(false);
const isLoggingOut = ref(false);

// Delete Account Modal State
const isDeleteAccountModalOpen = ref(false);

// Delete Ad Modal State
const isDeleteAdModalOpen = ref(false);
const selectedAdToDelete = ref<number | null>(null);

// Advert Search and Filter State
const advertSearchQuery = ref("");
const advertFilterCategory = ref("");
const advertFilterSubcategory = ref("");
const isLoadingAdvertSearch = ref(false);
const filteredAds = ref<any[]>([]);
const allAds = ref<any[]>([]); // Store all ads for filtering

// Add Ad Form State
const isAddAdFormOpen = ref(false);
const isLocationModalOpen = ref(false);
const selectedAdToEdit = ref<number | null>(null);
const isLoadingAd = ref(false);
const isLoadingSubCategories = ref(false);

// Departments and Cities - will be populated from API
const departments = ref([
  { label: "العميل", value: "1" },
  { label: "المشاريع", value: "2" },
  { label: "الخدمات", value: "3" },
]);

const cities = ref([
  { label: "الرياض", value: "48" },
  { label: "جدة", value: "2" },
  { label: "الدمام", value: "3" },
]);

// Sub-categories
const subCategories = ref<Array<{ label: string; value: string }>>([]);

// Ad Form Data
const adForm = reactive({
  categoryId: "", // category_id
  subCategoryId: "", // sub_category_id (optional)
  titleAr: "", // name[ar]
  titleEn: "", // name[en]
  price: "", // price
  cityId: "", // city_id
  countryCode: "966", // country_code (default Saudi Arabia)
  location: "",
  locationData: null as any, // Store full location data with lat/lng
  mapDesc: "0", // map_desc (0 or 1)
  descriptionAr: "", // description[ar]
  descriptionEn: "", // description[en]
  image: null as File | null, // image (main image)
  attachments: [] as File[], // attachments[] (gallery images)
});

// Image Previews
const adImagePreview = ref("");
const galleryPreviews = ref<string[]>([]);

// FAQ State
const openFaqIndex = ref(null);
const faqPerPage = ref(4); // Items per page
const faqFirst = ref(0); // First item index
const isLoadingFaq = ref(false);
const faqError = ref(null);

// Complaints Pagination State
const complaintsPerPage = ref(10); // Items per page
const complaintsFirst = ref(0); // First item index
const selectedComplaint = ref<Complaint | null>(null);
const isShowingNewComplaintForm = ref(false);
const isLoadingComplaintDetails = ref(false);
const complaintDetailsError = ref<string | null>(null);
const isLoadingComplaints = ref(false);
const complaintsError = ref<string | null>(null);
const hasFetchedComplaints = ref(false);

// New Complaint Form
const newComplaintForm = reactive({
  title: "",
  message: "",
});

// FAQ Data
const faqs = ref<FAQItem[]>([]);

// Parse HTML content to extract Q&A pairs
const parseFAQHTML = (htmlString: string): FAQItem[] => {
  if (!htmlString) return [];

  const items: FAQItem[] = [];

  // Check if we're in browser environment
  if (import.meta.client && typeof document !== "undefined") {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Find all h3 elements (questions)
    const questions = tempDiv.querySelectorAll("h3");

    questions.forEach((questionEl, index) => {
      const question = questionEl.textContent.trim();

      // Find the next sibling paragraph (answer)
      let answerEl = questionEl.nextElementSibling;
      let answer = "";

      // Collect all paragraphs until the next h3 or end
      while (answerEl && answerEl.tagName !== "H3") {
        if (answerEl.tagName === "P") {
          answer += answerEl.outerHTML;
        }
        answerEl = answerEl.nextElementSibling;
      }

      if (question && answer) {
        items.push({
          id: index + 1,
          question,
          answer,
        });
      }
    });
  } else {
    // Fallback: use regex parsing for SSR
    const parts = htmlString.split(/<h3>/);

    parts.forEach((part: string, index: number) => {
      if (index === 0) return; // Skip first empty part

      const h3Match = part.match(/^(.*?)<\/h3>/);
      if (h3Match && h3Match[1]) {
        const question = h3Match[1].trim();
        const rest = part.substring(h3Match[0].length);

        // Extract all paragraphs
        const pMatches = rest.match(/<p>[\s\S]*?<\/p>/g);
        let answer = "";
        if (pMatches) {
          answer = pMatches.join("");
        }

        if (question && answer) {
          items.push({
            id: index,
            question,
            answer,
          });
        }
      }
    });
  }

  return items;
};

// Fetch FAQ content from API
const fetchFAQContent = async () => {
  isLoadingFaq.value = true;
  faqError.value = null;

  try {
    const response = await $fetch<ApiResponse<string>>(
      "https://backend.wattani-sa.com/api/v1/frequently_asked_questions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // API response structure: { key: "success", msg: "...", data: "..." }
    if (response && response.key === "success" && response.data) {
      faqs.value = parseFAQHTML(response.data);
    } else {
      throw new Error(response?.msg || "فشل في تحميل الأسئلة المتكررة");
    }
  } catch (err: any) {
    console.error("Error fetching FAQ content:", err);
    faqError.value =
      err?.data?.message ||
      err?.message ||
      err?.data?.msg ||
      "حدث خطأ أثناء تحميل الأسئلة المتكررة. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: faqError.value,
      life: 3000,
    });
  } finally {
    isLoadingFaq.value = false;
  }
};

// Total FAQs count
const totalFaqs = computed(() => faqs.value.length);

// Paginated FAQs
const paginatedFaqs = computed(() => {
  const start = faqFirst.value;
  const end = start + faqPerPage.value;
  return faqs.value.slice(start, end);
});

// Pagination handler
const onFaqPageChange = (event: PaginationEvent) => {
  faqFirst.value = event.first;
  faqPerPage.value = event.rows;
  // Reset open accordion when page changes
  openFaqIndex.value = null;
  // Scroll to top when page changes
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Reviews Pagination State
const reviewsPerPage = ref(5); // Items per page
const reviewsFirst = ref(0); // First item index
const ratingsCurrentPage = ref(1); // Current page for API
const isLoadingRatings = ref(false);
const ratingsError = ref(null);

// Reviews Data
const reviews = ref<Review[]>([]);
const ratingsPagination = ref({
  total_items: 0,
  count_items: 0,
  per_page: 5,
  total_pages: 1,
  current_page: 1,
  next_page_url: "",
  perv_page_url: "",
});

// Fetch ratings from API
const fetchRatings = async (page: number = 1) => {
  isLoadingRatings.value = true;
  ratingsError.value = null;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/my-rate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        query: {
          page: page,
          per_page: reviewsPerPage.value,
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      // Map API response to review structure
      // Try different possible response structures
      const ratesData =
        response.data.rates || response.data.data || response.data || [];
      reviews.value = ratesData.map((rate: any) => ({
        id: rate.id || rate.rate_id,
        name: rate.user?.name || rate.name || rate.user_name || "مستخدم",
        rating: rate.rate || rate.rating || rate.stars || 0,
        text: rate.comment || rate.review || rate.text || "",
      }));

      // Handle pagination if available
      if (response.data.pagination) {
        ratingsPagination.value = response.data.pagination;
        ratingsCurrentPage.value = response.data.pagination.current_page;
        reviewsPerPage.value = response.data.pagination.per_page;
        reviewsFirst.value =
          (response.data.pagination.current_page - 1) * reviewsPerPage.value;
      } else {
        // If no pagination, assume all data is loaded
        ratingsPagination.value.total_items = reviews.value.length;
        ratingsPagination.value.current_page = page;
      }
    } else {
      throw new Error(response?.msg || "فشل في تحميل التقييمات");
    }
  } catch (err: any) {
    console.error("Error fetching ratings:", err);
    ratingsError.value =
      err?.data?.message ||
      err?.message ||
      err?.data?.msg ||
      "حدث خطأ أثناء تحميل التقييمات. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: ratingsError.value,
      life: 3000,
    });
  } finally {
    isLoadingRatings.value = false;
  }
};

// Total reviews count
const totalReviews = computed(
  () => ratingsPagination.value.total_items || reviews.value.length
);

// Paginated reviews (now directly from API)
const paginatedReviews = computed(() => reviews.value);

// Pagination handler
const onReviewsPageChange = async (event: PaginationEvent) => {
  reviewsFirst.value = event.first;
  reviewsPerPage.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;

  // Fetch new page data from API
  if (newPage !== ratingsCurrentPage.value) {
    await fetchRatings(newPage);
  }

  // Scroll to top when page changes
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// My Ads Data - Use shared composable
const { myAds, setAds, removeAd, addAd, updateAd } = useMyAds();

// Adverts API composable
const { 
  deleteAdvert, 
  updateAdvert,
  createAdvert,
  getAdvert, 
  getMyAdverts,
  getAdvertRatings,
  searchAdverts,
  getAdvertsByCategory,
  getAdvertsBySubcategory,
  isLoading: isDeletingAd 
} = useAdverts();

// My Ads Methods
// Fetch categories from API
const fetchCategories = async () => {
  try {
    const authStore = useAuthStore();
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/categories",
      {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    ).catch(() => null);

    if (response && response.key === "success" && response.data) {
      const categories = Array.isArray(response.data) ? response.data : [];
      departments.value = categories.map((cat: any) => ({
        label: cat.name_ar || cat.name || cat.title_ar || cat.title,
        value: cat.id?.toString() || cat.category_id?.toString(),
      }));
    }
  } catch (error) {
    console.log("Categories endpoint not available, using default values");
  }
};

// Fetch cities from API
const fetchCities = async () => {
  try {
    const authStore = useAuthStore();
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/cities",
      {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    ).catch(() => null);

    if (response && response.key === "success" && response.data) {
      const citiesData = Array.isArray(response.data) ? response.data : [];
      cities.value = citiesData.map((city: any) => ({
        label: city.name_ar || city.name || city.title_ar || city.title,
        value: city.id?.toString() || city.city_id?.toString(),
      }));
    }
  } catch (error) {
    console.log("Cities endpoint not available, using default values");
  }
};

// Fetch sub-categories from API based on selected category
const fetchSubCategories = async (categoryId: string) => {
  if (!categoryId) {
    subCategories.value = [];
    adForm.subCategoryId = "";
    isLoadingSubCategories.value = false;
    return;
  }

  isLoadingSubCategories.value = true;
  // Only reset subcategory if we're not editing (to preserve loaded subcategory when editing)
  if (!selectedAdToEdit.value) {
    adForm.subCategoryId = ""; // Reset selection when category changes
  }

  try {
    const authStore = useAuthStore();
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    console.log("Fetching sub-categories for category:", categoryId);
    let response: ApiResponse<any> | null = null;
    
    try {
      response = await $fetch<ApiResponse<any>>(
        `https://backend.wattani-sa.com/api/v1/sub-categories?category_id=${categoryId}`,
        {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      console.log("Sub-categories response (endpoint 1):", response);
    } catch (error) {
      console.error("Sub-categories API error (endpoint 1):", error);
      response = null;
    }

    // If first endpoint fails or returns error, try alternative endpoint
    if (!response || response.key !== "success") {
      console.log("Trying alternative endpoint...");
      try {
        response = await $fetch<ApiResponse<any>>(
          `https://backend.wattani-sa.com/api/v1/categories/${categoryId}/sub-categories`,
          {
            method: "GET",
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        console.log("Sub-categories response (endpoint 2):", response);
      } catch (error) {
        console.error("Sub-categories API error (endpoint 2):", error);
        response = null;
      }
    }

    // If we got a successful response with data
    if (response && response.key === "success" && response.data) {
      const subCats = Array.isArray(response.data) ? response.data : [];
      subCategories.value = subCats.map((subCat: any) => ({
        label: subCat.name_ar || subCat.name || subCat.title_ar || subCat.title,
        value: subCat.id?.toString() || subCat.sub_category_id?.toString() || subCat.category_id?.toString(),
      }));
      
      // If no sub-categories exist, use the category itself as sub-category
      if (subCats.length === 0) {
        console.warn("No sub-categories found for category:", categoryId);
        subCategories.value = [{
          label: "نفس القسم",
          value: categoryId.toString()
        }];
      }
    } else {
      // If API doesn't return sub-categories or returns an error, use category as sub-category
      console.warn("Failed to fetch sub-categories or endpoint not available. Using category as sub-category.");
      // Use the category itself as sub-category if API fails or returns no data
      // This handles cases where API requires sub_category_id but category has no sub-categories
      subCategories.value = [{
        label: "نفس القسم",
        value: categoryId.toString()
      }];
    }
  } catch (error) {
    console.error("Sub-categories endpoint error:", error);
    // On any error, fall back to using the category itself as sub-category
    subCategories.value = [{
      label: "نفس القسم",
      value: categoryId.toString()
    }];
  } finally {
    isLoadingSubCategories.value = false;
  }
};

// Watch for category changes to fetch sub-categories dynamically
watch(
  () => adForm.categoryId,
  (newCategoryId) => {
    if (newCategoryId) {
      fetchSubCategories(newCategoryId);
    } else {
      subCategories.value = [];
      adForm.subCategoryId = "";
    }
  }
);

const editAd = async (adId: number) => {
  try {
    isLoadingAd.value = true;
    
    // Fetch full advert data from API
    const advert = await getAdvert(adId);
    
    // Set the ad to edit
    selectedAdToEdit.value = adId;

    // Populate form with advert data from API
    adForm.categoryId = advert.category_id?.toString() || "";
    adForm.subCategoryId = advert.sub_category_id?.toString() || "";
    adForm.titleAr = advert.name_ar || advert.name || "";
    adForm.titleEn = advert.name_en || advert.name || "";
    adForm.price = advert.price?.toString() || "";
    adForm.cityId = advert.city_id?.toString() || advert.city?.id?.toString() || "";
    adForm.descriptionAr = advert.description_ar || advert.description || "";
    adForm.descriptionEn = advert.description_en || advert.description || "";
    
    // Set location data
    if (advert.lat && advert.lng) {
      adForm.locationData = {
        lat: parseFloat(advert.lat),
        lng: parseFloat(advert.lng),
        address: advert.map_desc || "",
      };
      adForm.location = advert.map_desc || `${advert.lat}, ${advert.lng}`;
    }

    // Set image preview if available
    if (advert.image) {
      adImagePreview.value = advert.image.startsWith('http') 
        ? advert.image 
        : `https://backend.wattani-sa.com${advert.image}`;
    }

    // Set gallery previews if available
    if (advert.attachments && advert.attachments.length > 0) {
      galleryPreviews.value = advert.attachments.map(att => 
        att.url.startsWith('http') ? att.url : `https://backend.wattani-sa.com${att.url}`
      );
    }

    // Fetch sub-categories for the selected category
    if (adForm.categoryId) {
      await fetchSubCategories(adForm.categoryId);
    }

    // Open the form
    isAddAdFormOpen.value = true;

    // Scroll to top when opening form
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error: any) {
    console.error("Error loading advert for editing:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error?.data?.msg || error?.message || "فشل في تحميل بيانات الإعلان",
      life: 3000,
    });
  } finally {
    isLoadingAd.value = false;
  }
};

// Fetch user's adverts from API
const isLoadingMyAdverts = ref(false);
const fetchMyAdverts = async () => {
  if (isLoadingMyAdverts.value) return;
  
  isLoadingMyAdverts.value = true;
  try {
    const adverts = await getMyAdverts();
    
    // Transform API response to match Ad interface
    const transformedAds = adverts.map((advert: any) => ({
      id: advert.id,
      title: advert.name_ar || advert.name || "عنوان غير متاح",
      image: advert.image || advert.attachment || "/images/card-img.jpg",
      rating: advert.average_rating || 0,
      price: advert.price?.toString() || "0",
      location: advert.map_desc || advert.city?.name || "موقع غير محدد",
      timeAgo: advert.date || "منذ وقت",
      seller: {
        name: advert.user?.name || "مستخدم",
        avatar: advert.user?.avatar || "/images/profile-avatar.png",
      },
    }));
    
    allAds.value = transformedAds;
    filteredAds.value = transformedAds;
    setAds(transformedAds);
  } catch (error: any) {
    console.error("Error fetching my adverts:", error);
    // Don't show error toast if it's just unauthenticated - user might not be logged in
    if (error?.data?.key !== 'unauthenticated') {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: error?.data?.msg || error?.message || "فشل في جلب الإعلانات",
        life: 3000,
      });
    }
  } finally {
    isLoadingMyAdverts.value = false;
  }
};

// Advert Search and Filter Functions
const handleAdvertSearch = async () => {
  if (!advertSearchQuery.value.trim()) {
    // If search is empty, show all ads
    filteredAds.value = allAds.value;
    return;
  }

  isLoadingAdvertSearch.value = true;
  try {
    const results = await searchAdverts({
      search: advertSearchQuery.value,
      category_id: advertFilterCategory.value ? Number(advertFilterCategory.value) : undefined,
      sub_category_id: advertFilterSubcategory.value ? Number(advertFilterSubcategory.value) : undefined,
    });

    if (results && results.data) {
      const transformedAds = results.data.map((advert: any) => ({
        id: advert.id,
        title: advert.name_ar || advert.name || "عنوان غير متاح",
        image: advert.image || advert.attachment || "/images/card-img.jpg",
        rating: advert.average_rating || 0,
        ratingsCount: advert.ratings_count || 0,
        price: advert.price?.toString() || "0",
        location: advert.map_desc || advert.city?.name || "موقع غير محدد",
        timeAgo: advert.date || "منذ وقت",
        categoryId: advert.category_id,
        subCategoryId: advert.sub_category_id,
        seller: {
          name: advert.user?.name || "مستخدم",
          avatar: advert.user?.avatar || "/images/profile-avatar.png",
        },
      }));
      filteredAds.value = transformedAds;
    }
  } catch (error: any) {
    console.error("Error searching adverts:", error);
    // Fallback to local filtering
    filterAdsLocally();
  } finally {
    isLoadingAdvertSearch.value = false;
  }
};

const handleCategoryFilter = async () => {
  advertFilterSubcategory.value = ""; // Reset subcategory when category changes
  
  if (!advertFilterCategory.value) {
    filteredAds.value = allAds.value;
    return;
  }

  isLoadingAdvertSearch.value = true;
  try {
    const results = await getAdvertsByCategory(Number(advertFilterCategory.value));
    
    if (results && results.data) {
      const transformedAds = results.data.map((advert: any) => ({
        id: advert.id,
        title: advert.name_ar || advert.name || "عنوان غير متاح",
        image: advert.image || advert.attachment || "/images/card-img.jpg",
        rating: advert.average_rating || 0,
        ratingsCount: advert.ratings_count || 0,
        price: advert.price?.toString() || "0",
        location: advert.map_desc || advert.city?.name || "موقع غير محدد",
        timeAgo: advert.date || "منذ وقت",
        categoryId: advert.category_id,
        subCategoryId: advert.sub_category_id,
        seller: {
          name: advert.user?.name || "مستخدم",
          avatar: advert.user?.avatar || "/images/profile-avatar.png",
        },
      }));
      filteredAds.value = transformedAds;
    }
  } catch (error: any) {
    console.error("Error filtering by category:", error);
    filterAdsLocally();
  } finally {
    isLoadingAdvertSearch.value = false;
  }
};

const handleSubcategoryFilter = async () => {
  if (!advertFilterSubcategory.value) {
    await handleCategoryFilter();
    return;
  }

  isLoadingAdvertSearch.value = true;
  try {
    const results = await getAdvertsBySubcategory(Number(advertFilterSubcategory.value));
    
    if (results && results.data) {
      const transformedAds = results.data.map((advert: any) => ({
        id: advert.id,
        title: advert.name_ar || advert.name || "عنوان غير متاح",
        image: advert.image || advert.attachment || "/images/card-img.jpg",
        rating: advert.average_rating || 0,
        ratingsCount: advert.ratings_count || 0,
        price: advert.price?.toString() || "0",
        location: advert.map_desc || advert.city?.name || "موقع غير محدد",
        timeAgo: advert.date || "منذ وقت",
        categoryId: advert.category_id,
        subCategoryId: advert.sub_category_id,
        seller: {
          name: advert.user?.name || "مستخدم",
          avatar: advert.user?.avatar || "/images/profile-avatar.png",
        },
      }));
      filteredAds.value = transformedAds;
    }
  } catch (error: any) {
    console.error("Error filtering by subcategory:", error);
    filterAdsLocally();
  } finally {
    isLoadingAdvertSearch.value = false;
  }
};

const filterAdsLocally = () => {
  let filtered = [...allAds.value];
  
  if (advertSearchQuery.value.trim()) {
    const query = advertSearchQuery.value.toLowerCase();
    filtered = filtered.filter(ad => 
      ad.title.toLowerCase().includes(query) ||
      ad.location.toLowerCase().includes(query)
    );
  }
  
  if (advertFilterCategory.value) {
    filtered = filtered.filter(ad => ad.categoryId?.toString() === advertFilterCategory.value);
  }
  
  if (advertFilterSubcategory.value) {
    filtered = filtered.filter(ad => ad.subCategoryId?.toString() === advertFilterSubcategory.value);
  }
  
  filteredAds.value = filtered;
};

const clearAdvertFilters = () => {
  advertSearchQuery.value = "";
  advertFilterCategory.value = "";
  advertFilterSubcategory.value = "";
  filteredAds.value = allAds.value;
};

// View Advert Ratings
const viewAdRatings = async (advertId: number) => {
  try {
    isLoadingAdvertSearch.value = true;
    const ratingsData = await getAdvertRatings(advertId);
    
    if (ratingsData && ratingsData.data && ratingsData.data.length > 0) {
      const ratingsList = ratingsData.data.map((rating: any) => 
        `- ${rating.user?.name || 'مستخدم'}: ${rating.rate}/5 ${rating.comment ? `- ${rating.comment}` : ''}`
      ).join('\n');
      
      toast.add({
        severity: "info",
        summary: "تقييمات الإعلان",
        detail: ratingsList || `عدد التقييمات: ${ratingsData.pagination?.total_items || 0}`,
        life: 5000,
      });
    } else {
      toast.add({
        severity: "info",
        summary: "تقييمات الإعلان",
        detail: `عدد التقييمات: ${ratingsData?.pagination?.total_items || 0}`,
        life: 3000,
      });
    }
  } catch (error: any) {
    console.error("Error fetching ratings:", error);
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "فشل في جلب التقييمات",
      life: 3000,
    });
  } finally {
    isLoadingAdvertSearch.value = false;
  }
};

const openDeleteAdModal = (adId: number) => {
  selectedAdToDelete.value = adId;
  isDeleteAdModalOpen.value = true;
};

const confirmDeleteAd = async () => {
  if (!selectedAdToDelete.value || isDeletingAd.value) return;

  try {
    // Call the delete API
    await deleteAdvert(selectedAdToDelete.value);

    // Remove the ad from the local array using composable
    removeAd(selectedAdToDelete.value);

    // Show success message
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: "تم حذف الإعلان بنجاح",
      life: 3000,
    });

    // Close modal and reset
    isDeleteAdModalOpen.value = false;
    selectedAdToDelete.value = null;
    
    // Refresh my adverts list
    if (activeTab.value === "my-ads") {
      await fetchMyAdverts();
    }
  } catch (error: any) {
    console.error("Error deleting advert:", error);
    
    // Show error message
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        error?.data?.msg ||
        error?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء حذف الإعلان. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
    
    // Don't close modal on error so user can try again
  }
};

const addAdvertisement = () => {
  isAddAdFormOpen.value = true;
  // Scroll to top when opening form
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const closeAddAdForm = () => {
  isAddAdFormOpen.value = false;
  selectedAdToEdit.value = null;
  // Reset form
  Object.assign(adForm, {
    categoryId: "",
    subCategoryId: "",
    titleAr: "",
    titleEn: "",
    price: "",
    cityId: "",
    countryCode: "966",
    location: "",
    locationData: null,
    mapDesc: "0",
    descriptionAr: "",
    descriptionEn: "",
    image: null,
    attachments: [],
  });
  // Clear previews
  if (adImagePreview.value) {
    revokePreview(adImagePreview.value);
    adImagePreview.value = "";
  }
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = [];
  subCategories.value = [];
};

const revokePreview = (url: string) => {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
};

const handleAdImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const [file] = target.files || [];
  adForm.image = file || null;
  if (adImagePreview.value) {
    revokePreview(adImagePreview.value);
    adImagePreview.value = "";
  }
  if (file) {
    adImagePreview.value = URL.createObjectURL(file);
  }
};

const handleGalleryImagesChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []).slice(0, 5);
  adForm.attachments = files as File[];
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = files.map((file: File) => URL.createObjectURL(file));
};

const adImageLabel = computed(() => {
  if (adForm.image?.name) return adForm.image.name;
  return "إرفاق صورة";
});

const galleryImagesLabel = computed(() => {
  if (adForm.attachments.length) {
    return `${adForm.attachments.length} / 5 صور مرفوعة`;
  }
  return "إرفاق صورة";
});

const openLocationModal = () => {
  isLocationModalOpen.value = true;
};

const handleLocationConfirm = (locationData: any) => {
  if (locationData) {
    adForm.locationData = locationData;
    const address =
      locationData.address ||
      `${locationData.lat?.toFixed?.(5) || ""}, ${locationData.lng?.toFixed?.(5) || ""}`;
    adForm.location = address.trim();
  }
  isLocationModalOpen.value = false;
};

const handleAdSubmit = async () => {
  // Validate required fields
  // For edit mode, image is not required if already exists
  if (
    !adForm.categoryId ||
    !adForm.subCategoryId ||
    !adForm.titleAr ||
    !adForm.titleEn ||
    !adForm.price ||
    !adForm.cityId ||
    !adForm.location ||
    !adForm.descriptionAr ||
    !adForm.descriptionEn ||
    (!adForm.image && !selectedAdToEdit.value)
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }

    // Validate that sub-category belongs to selected category
  // Only validate if we're creating a new ad (not editing) and subcategories list is loaded
  // When editing, the subcategory comes from the API and is already validated
  if (adForm.subCategoryId && adForm.categoryId && !selectedAdToEdit.value) {
    // Only validate if subcategories list is populated
    if (subCategories.value.length > 0) {
      const selectedSubCat = subCategories.value.find(
        (subCat: { label: string; value: string }) => subCat.value === adForm.subCategoryId
      );
      if (!selectedSubCat) {
        toast.add({
          severity: "warn",
          summary: "تحذير",
          detail: "يرجى اختيار قسم فرعي صحيح ينتمي للقسم الرئيسي المختار",
          life: 3000,
        });
        return;
      }
    }
  }

  // Validate that sub-categories are available (only for new ads)
  // When editing, subcategory is already set from API
  if (!selectedAdToEdit.value && !subCategories.value.length && !isLoadingSubCategories.value) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "لا توجد أقسام فرعية متاحة. يرجى اختيار قسم آخر أو الانتظار حتى يتم تحميل الأقسام الفرعية",
      life: 3000,
    });
    return;
  }

  // Validate location data
  if (!adForm.locationData || !adForm.locationData.lat || !adForm.locationData.lng) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى تحديد الموقع على الخريطة",
      life: 3000,
    });
    return;
  }

  isLoadingAd.value = true;

  try {
    // Get authentication token
    const authStore = useAuthStore();
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // Create FormData for file upload with correct API field names
    const formData = new FormData();
    formData.append("name[ar]", adForm.titleAr);
    formData.append("name[en]", adForm.titleEn);
    formData.append("category_id", adForm.categoryId);
    formData.append("sub_category_id", adForm.subCategoryId); // Required by API
    formData.append("price", adForm.price);
    formData.append("description[ar]", adForm.descriptionAr);
    formData.append("description[en]", adForm.descriptionEn);
    formData.append("country_code", adForm.countryCode);
    formData.append("city_id", adForm.cityId);
    formData.append("lat", adForm.locationData.lat.toString());
    formData.append("lng", adForm.locationData.lng.toString());
    formData.append("map_desc", adForm.mapDesc);
    
    // Main image - only append if it's a new file (not when editing without changing image)
    if (adForm.image && adForm.image instanceof File && adForm.image !== null) {
      formData.append("image", adForm.image);
    }

    // Append gallery images as attachments[] array (only new files)
    adForm.attachments.forEach((image) => {
      if (image instanceof File) {
        formData.append("attachments[]", image);
      }
    });

    let response;
    if (selectedAdToEdit.value) {
      // Update existing advert
      const updatedAdvert = await updateAdvert(selectedAdToEdit.value, formData);
      
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: "تم تحديث الإعلان بنجاح",
        life: 3000,
      });

      // Update the ad in myAds list
      if (updatedAdvert?.id) {
        updateAd(updatedAdvert.id, {
          title: adForm.titleAr,
          price: adForm.price,
          location: adForm.location || adForm.locationData?.address || "موقع غير محدد",
          image: updatedAdvert.image || adImagePreview.value || "/images/card-img.jpg",
        });
      }

      // Reset form
      closeAddAdForm();
      
      // Refresh my adverts list
      if (activeTab.value === "my-ads") {
        await fetchMyAdverts();
      }
    } else {
      // Create new advert using composable
      const createdAdvert = await createAdvert(formData);
      
      // Check if response indicates success
      if (createdAdvert) {
        toast.add({
          severity: "success",
          summary: "نجح",
          detail: "تم إنشاء الإعلان بنجاح",
          life: 3000,
        });

        // Add the new ad to myAds list
        const newAd = {
          id: createdAdvert.id || Date.now(), // Use API response ID or timestamp as fallback
          title: adForm.titleAr,
          image: createdAdvert.image || adImagePreview.value || "/images/card-img.jpg",
          rating: createdAdvert.average_rating || 0, // New ads start with no rating
          price: adForm.price,
          location: adForm.location || adForm.locationData?.address || "موقع غير محدد",
          timeAgo: "الآن",
          seller: {
            name: user.value?.name || userStore.user?.name || "مستخدم",
            avatar: user.value?.avatar || userStore.user?.avatar || "/images/profile-avatar.png",
          },
        };
        
        // Add to shared myAds state
        addAd(newAd);

        // Reset form
        closeAddAdForm();
        
        // Refresh my adverts list
        if (activeTab.value === "my-ads") {
          await fetchMyAdverts();
        }
      } else {
        throw new Error("فشل في إنشاء الإعلان");
      }
    }
  } catch (error: any) {
    console.error("Error creating ad:", error);
    
    // Extract error message from API response
    let errorMessage = "حدث خطأ أثناء إنشاء الإعلان";
    if (error?.data?.msg) {
      errorMessage = error.data.msg;
    } else if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    // Provide helpful message for category-related errors
    if (errorMessage.includes("القسم غير موجود") || errorMessage.includes("غير موجود")) {
      errorMessage = "القسم المختار غير موجود. يرجى التأكد من اختيار قسم صحيح من القائمة أو تحديث قائمة الأقسام من قاعدة البيانات.";
    } else if (errorMessage.includes("لا ينتمي") || errorMessage.includes("ينتمي")) {
      errorMessage = "القسم الفرعي المختار لا ينتمي للقسم الرئيسي. يرجى اختيار قسم فرعي صحيح أو ترك الحقل فارغاً إذا كان اختيارياً.";
    }
    
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: errorMessage,
      life: 5000,
    });
  } finally {
    isLoadingAd.value = false;
  }
};

// Following Pagination State
const followingPerPage = ref(15); // Items per page (matching API default)
const followingFirst = ref(0); // First item index
const followingCurrentPage = ref(1); // Current page for API
const isLoadingFollowing = ref(false);
const followingError = ref<string | null>(null);

// Following Users Data
const followingUsers = ref<User[]>([]);
const followingPagination = ref({
  total_items: 0,
  count_items: 0,
  per_page: 15,
  total_pages: 1,
  current_page: 1,
  next_page_url: "",
  perv_page_url: "",
});

// Fetch followers from API
const fetchFollowers = async (page: number = 1) => {
  isLoadingFollowing.value = true;
  followingError.value = null;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      followingError.value = "يرجى تسجيل الدخول لعرض المتابعين.";
      return;
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/users/followers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        query: {
          page: page,
          per_page: followingPerPage.value,
        },
      }
    );

    if (response?.key === "unauthenticated") {
      followingError.value =
        response?.msg || "يرجى تسجيل الدخول لعرض المتابعين.";
      return;
    }

    if (response && response.key === "success" && response.data) {
      followingUsers.value = response.data.data.map((user: any) => ({
        id: user.id,
        name: user.name || "مستخدم",
        avatar: user.avatar || user.image || "/images/following-avatar2.svg",
      }));
      followingPagination.value = response.data.pagination;
      followingCurrentPage.value = response.data.pagination.current_page;
      followingPerPage.value = response.data.pagination.per_page;
      followingFirst.value =
        (response.data.pagination.current_page - 1) * followingPerPage.value;
    } else {
      throw new Error(response?.msg || "فشل في تحميل المتابعين");
    }
  } catch (err: any) {
    console.error("Error fetching followers:", err);
    followingError.value =
      err?.data?.message ||
      err?.message ||
      err?.data?.msg ||
      "حدث خطأ أثناء تحميل المتابعين. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: followingError.value,
      life: 3000,
    });
  } finally {
    isLoadingFollowing.value = false;
  }
};

// Total following count
const totalFollowing = computed(() => followingPagination.value.total_items);

// Paginated following users (now directly from API)
const paginatedFollowing = computed(() => followingUsers.value);

// Pagination handler
const onFollowingPageChange = async (event: PaginationEvent) => {
  followingFirst.value = event.first;
  followingPerPage.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;

  // Fetch new page data from API
  if (newPage !== followingCurrentPage.value) {
    await fetchFollowers(newPage);
  }

  // Scroll to top when page changes
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Watch activeTab to fetch data when following, ratings, or faq tab is opened
watch(activeTab, (newTab) => {
  if (newTab === "following") {
    fetchFollowers(followingCurrentPage.value || 1);
  } else if (newTab === "ratings") {
    fetchRatings(ratingsCurrentPage.value || 1);
  } else if (newTab === "faq") {
    fetchFAQContent();
  } else if (newTab === "packages" && !hasFetchedPackages.value) {
    fetchPackages();
  } else if (newTab === "subscription" && !hasFetchedSubscriptions.value) {
    fetchSubscriptions();
  } else if (newTab === "complaints" && !hasFetchedComplaints.value && !isLoadingComplaints.value) {
    fetchComplaints();
  } else if (newTab === "wallet") {
    loadWalletBalance();
  } else if (newTab === "my-ads") {
    // Fetch user's adverts from API
    fetchMyAdverts();
    // Fetch categories and cities when my-ads tab is opened
    fetchCategories();
    fetchCities();
    // If a category is already selected, fetch its sub-categories
    if (adForm.categoryId) {
      fetchSubCategories(adForm.categoryId);
    }
    // Reset filters when switching to my-ads tab
    clearAdvertFilters();
  }
});

// Reset OTP when switching settings sub-tabs
watch(settingsSubTab, (newTab) => {
  otpDigits.value = ["", "", "", ""];
  isCodeVerified.value = false;
  hasEnteredNewMobile.value = false;
  isNewCodeVerified.value = false;
  hasSentOldPhoneCode.value = false;
  changeMobileForm.verificationCode = "";
  changeMobileForm.newMobile = "";
  changeMobileForm.countryCode = "+966";

  // Send code to old phone when change-mobile tab is opened
  if (newTab === "change-mobile") {
    // Use nextTick to ensure the component is ready
    nextTick(() => {
      sendOldPhoneCode();
    });
  }
});

// Watch for when first verification section becomes visible
watch(
  () =>
    settingsSubTab.value === "change-mobile" &&
    !isCodeVerified.value &&
    !hasEnteredNewMobile.value,
  (shouldShow) => {
    if (
      shouldShow &&
      !hasSentOldPhoneCode.value &&
      !isSendingOldPhoneCode.value
    ) {
      sendOldPhoneCode();
    }
  },
  { immediate: true }
);

// Unfollow handler
const handleUnfollow = async (userId: number) => {
  if (!confirm("هل أنت متأكد من إلغاء المتابعة؟")) {
    return;
  }

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/users/toggle-follow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          user_id: userId,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      // Remove from local state immediately for better UX
      const index = followingUsers.value.findIndex(
        (user) => user.id === userId
      );
      if (index !== -1) {
        followingUsers.value.splice(index, 1);
        // Update pagination total
        if (followingPagination.value.total_items > 0) {
          followingPagination.value.total_items--;
        }
      }

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إلغاء المتابعة بنجاح",
        life: 3000,
      });

      // Refresh data from API to ensure sync
      await fetchFollowers(followingCurrentPage.value);
    } else {
      throw new Error(response?.msg || "فشل في إلغاء المتابعة");
    }
  } catch (err: any) {
    console.error("Error unfollowing user:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "حدث خطأ أثناء إلغاء المتابعة. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  }
};

// Consultant packages (fetched from API)
const packages = ref<Package[]>([]);
const isLoadingPackages = ref(false);
const packagesError = ref<string | null>(null);
const hasFetchedPackages = ref(false);

const mapConsultantPackage = (item: any, index: number = 0): Package => {
  const rawFeatures = Array.isArray(item?.features)
    ? item.features
    : (item?.description || item?.details || "")
        .split(/<br\s*\/?>|\r?\n/g)
        .map((feature: string) => feature.replace(/<\/?[^>]+(>|$)/g, "").trim())
        .filter((f: string) => Boolean(f));

  return {
    id: item?.id ?? item?.package_id ?? `pkg-${index + 1}`,
    price: String(
      item?.price ??
        item?.price_after_discount ??
        item?.package_price ??
        item?.amount ??
        0
    ),
    title: item?.title ?? item?.name ?? item?.name_ar ?? "باقات استشارية",
    features: rawFeatures.length
      ? rawFeatures
      : ["لا توجد مميزات متاحة لهذه الباقة"],
  };
};

const fetchPackages = async () => {
  isLoadingPackages.value = true;
  packagesError.value = null;

  try {
    // Try to get auth token (API requires authentication)
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      packagesError.value = "يرجى تسجيل الدخول لعرض الباقات.";
      return;
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/consultant-packages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response?.key === "unauthenticated") {
      packagesError.value = response?.msg || "يرجى تسجيل الدخول لعرض الباقات.";
      return;
    }

    const apiPackages =
      (Array.isArray(response?.data) && response.data) ||
      (Array.isArray((response?.data as any)?.packages) && (response.data as any).packages) ||
      (Array.isArray((response as any)?.packages) && (response as any).packages) ||
      (Array.isArray(response) && response) ||
      [];

    packages.value = apiPackages.map((pkg: any, index: number) =>
      mapConsultantPackage(pkg, index)
    );
    hasFetchedPackages.value = true;
  } catch (error: any) {
    console.error("Error fetching consultant packages:", error);
    packagesError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "تعذر تحميل الباقات في الوقت الحالي، حاول مرة أخرى لاحقاً.";
  } finally {
    isLoadingPackages.value = false;
  }
};

// Subscription Data (fetched from API)
const subscriptions = ref<Subscription[]>([]);
const isLoadingSubscriptions = ref(false);
const subscriptionsError = ref<string | null>(null);
const hasFetchedSubscriptions = ref(false);

const mapSubscription = (item: any, index: number = 0): Subscription => {
  const rawFeatures = Array.isArray(item?.features)
    ? item.features
    : (item?.description || item?.details || "")
        .split(/<br\s*\/?>|\r?\n/g)
        .map((feature: string) => feature.replace(/<\/?[^>]+(>|$)/g, "").trim())
        .filter((f: string) => Boolean(f));

  return {
    id: item?.id ?? item?.subscription_id ?? `sub-${index + 1}`,
    packageId:
      item?.package_id ??
      item?.packageId ??
      item?.id ??
      item?.subscription_id ??
      `sub-${index + 1}`,
    price: String(
      item?.price ??
        item?.price_after_discount ??
        item?.subscription_price ??
        item?.amount ??
        0
    ),
    title: item?.title ?? item?.name ?? item?.name_ar ?? "اشتراك",
    medalNumber: item?.medalNumber ?? item?.rank ?? item?.order ?? index + 1,
    features: rawFeatures.length
      ? rawFeatures
      : ["لا توجد مميزات متاحة لهذا الاشتراك"],
  };
};

const fetchSubscriptions = async () => {
  isLoadingSubscriptions.value = true;
  subscriptionsError.value = null;

  try {
    // Get token
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      subscriptionsError.value = "يرجى تسجيل الدخول لعرض الاشتراكات.";
      return;
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/my-consultant-subscriptions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response?.key === "unauthenticated") {
      subscriptionsError.value =
        response?.msg || "يرجى تسجيل الدخول لعرض الاشتراكات.";
      return;
    }

    const apiSubs =
      (Array.isArray(response?.data) && response.data) ||
      (Array.isArray((response?.data as any)?.subscriptions) &&
        (response.data as any).subscriptions) ||
      (Array.isArray((response as any)?.subscriptions) && (response as any).subscriptions) ||
      (Array.isArray(response) && response) ||
      [];

    subscriptions.value = apiSubs.map((sub: any, index: number) =>
      mapSubscription(sub, index)
    );
    hasFetchedSubscriptions.value = true;
  } catch (error: any) {
    console.error("Error fetching consultant subscriptions:", error);
    subscriptionsError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "تعذر تحميل الاشتراكات حالياً، حاول مرة أخرى لاحقاً.";
  } finally {
    isLoadingSubscriptions.value = false;
  }
};

// Complaints Data
const complaints = ref<Complaint[]>([]);

// Total complaints count
const totalComplaints = computed(() => complaints.value.length);

// Paginated complaints
const paginatedComplaints = computed(() => {
  const start = complaintsFirst.value;
  const end = start + complaintsPerPage.value;
  return complaints.value.slice(start, end);
});

// Pagination handler
const onComplaintsPageChange = (event: PaginationEvent) => {
  complaintsFirst.value = event.first;
  complaintsPerPage.value = event.rows;
  // Scroll to top when page changes
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Fetch complaints from API
const fetchComplaints = async () => {
  isLoadingComplaints.value = true;
  complaintsError.value = null;

  try {
    // Get token for authenticated request
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      complaintsError.value = "يرجى تسجيل الدخول لعرض الشكاوى.";
      return;
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/complaints",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response?.key === "unauthenticated") {
      complaintsError.value =
        response?.msg || "يرجى تسجيل الدخول لعرض الشكاوى.";
      return;
    }

    if (response && response.key === "success" && response.data) {
      // API structure: response.data.complaints.data
      const complaintsData = (response.data as any)?.complaints?.data || 
                            (Array.isArray((response.data as any)?.data) ? (response.data as any).data : []) ||
                            (Array.isArray(response.data) ? response.data : []);


      // Map API response to complaint structure
      const mappedComplaints = complaintsData.map((item: any) => ({
        id: item.id || 0,
        number: item.complaint_num || item.number || item.id?.toString() || "",
        date: item.created_at || item.date || "",
        address: item.address || item.location || "",
        status: item.status?.title || (typeof item.status === 'string' ? item.status : "جديدة"),
        description: item.message || item.description || "",
        subject: item.subject || "",
        admin_message: item.admin_message || "",
      }));

      // Sort by ID descending (newest first) to show latest complaints at the top
      complaints.value = mappedComplaints.sort((a: Complaint, b: Complaint) => b.id - a.id);
      hasFetchedComplaints.value = true;
      
    } else {
      throw new Error(response?.msg || "فشل في تحميل الشكاوى");
    }
  } catch (error: any) {
    console.error("Error fetching complaints:", error);
    complaintsError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تحميل الشكاوى. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: complaintsError.value,
      life: 3000,
    });
  } finally {
    isLoadingComplaints.value = false;
  }
};

// Fetch complaint details from API
const fetchComplaintDetails = async (complaintId: number) => {
  isLoadingComplaintDetails.value = true;
  complaintDetailsError.value = null;

  try {
    // Get token for authenticated request
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      complaintDetailsError.value = "يرجى تسجيل الدخول لعرض تفاصيل الشكوى.";
      return;
    }

    const response = await $fetch<ApiResponse<any>>(
      `https://backend.wattani-sa.com/api/v1/complaint/${complaintId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response?.key === "unauthenticated") {
      complaintDetailsError.value =
        response?.msg || "يرجى تسجيل الدخول لعرض تفاصيل الشكوى.";
      return;
    }

    if (response && response.key === "success" && response.data) {
      // Map API response to complaint structure
      const complaintData = response.data;
      selectedComplaint.value = {
        id: complaintData.id || complaintId,
        number: complaintData.complaint_num || complaintData.number || complaintData.id?.toString() || "",
        date: complaintData.created_at || complaintData.date || "",
        address: complaintData.address || complaintData.location || "",
        status: complaintData.status?.title || (typeof complaintData.status === 'string' ? complaintData.status : "جديدة"),
        description: complaintData.message || complaintData.description || "",
        subject: complaintData.subject || "",
        admin_message: complaintData.admin_message || "",
      };
      
      // Scroll to top when viewing details
      if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      throw new Error(response?.msg || "فشل في تحميل تفاصيل الشكوى");
    }
  } catch (error: any) {
    console.error("Error fetching complaint details:", error);
    complaintDetailsError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تحميل تفاصيل الشكوى. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: complaintDetailsError.value,
      life: 3000,
    });
  } finally {
    isLoadingComplaintDetails.value = false;
  }
};

// View complaint details
const viewComplaintDetails = (complaintId: number) => {
  // Fetch details from API
  fetchComplaintDetails(complaintId);
};

// Handle new complaint form submission
const handleNewComplaintSubmit = async () => {
  if (!newComplaintForm.title.trim() || !newComplaintForm.message.trim()) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }

  try {
    // Get token for authenticated request
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: "يرجى تسجيل الدخول قبل إرسال الشكوى",
        life: 3000,
      });
      return;
    }

    // Make API call to submit complaint
    // Create FormData for form-data request
    const formData = new FormData();
    formData.append("subject", newComplaintForm.title);
    formData.append("complaint", newComplaintForm.message);
    formData.append("lang", "ar");
    formData.append("iso", "SA");

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/new-complaint",
      {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال الشكوى بنجاح",
        life: 3000,
      });

      // Reset form
      newComplaintForm.title = "";
      newComplaintForm.message = "";
      isShowingNewComplaintForm.value = false;

      // Refresh complaints list - reset flag and pagination to force refresh
      // Add a small delay to ensure API has processed the new complaint
      hasFetchedComplaints.value = false;
      complaintsFirst.value = 0; // Reset to first page
      
      // Wait a moment for the API to process, then fetch
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchComplaints();
    } else {
      throw new Error(response?.msg || "فشل في إرسال الشكوى");
    }
  } catch (error: any) {
    console.error("Error submitting complaint:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        error?.data?.msg ||
        error?.message ||
        "حدث خطأ أثناء إرسال الشكوى. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  }
};

// Get status class for styling
const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    جديدة: "bg-orange-100 text-orange-800",
    "جاري المعالجة": "bg-yellow-100 text-yellow-800",
    منتهية: "bg-green-100 text-green-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  // Reset selected complaint when switching tabs
  selectedComplaint.value = null;
  // Reset settings sub-tab when switching away from settings
  if (tab !== "settings") {
    settingsSubTab.value = "personal-info";
  }
  // Close mobile menu on small screens after selecting a tab
  if (import.meta.client && window.innerWidth < 1024) {
    isMobileMenuOpen.value = false;
  }
};

const form = reactive({
  clientName: "",
  mobileNumber: "",
  email: "",
  city: "",
  location: "",
  avatar: "",
});

// Function to load user data into form
const loadUserDataToForm = () => {
  // Get authStore to check for additional user data
  const authStore = useAuthStore();
  
  // Load user data into form - check both user.value and authStore.authUser
  // Prioritize authStore.authUser as it may have more complete data from API
  let userData = (authStore.authUser as any) || user.value || {};
  
  // If userData has nested structure (e.g., userData.user or userData.data), extract it
  if (userData && typeof userData === 'object') {
    if (userData.user && typeof userData.user === 'object') {
      userData = { ...userData, ...userData.user };
    }
    if (userData.data && typeof userData.data === 'object') {
      userData = { ...userData, ...userData.data };
    }
  }
  
  form.clientName = userData.name || userData.username || "";
  form.mobileNumber = userData.phone || userData.mobile || "";
  form.email = userData.email || "";
  // City can be an object {id, name} or a string
  if (userData.city && typeof userData.city === 'object') {
    form.city = userData.city.id?.toString() || userData.city.name || "";
  } else {
    form.city = userData.city || userData.city_id || userData.city_name || userData.cityName || "";
  }
  // Location is map_desc in the API response
  form.location = userData.map_desc || userData.location || userData.mapDesc || userData.address || "";
  form.avatar = userData.avatar || userData.image || userData.profile_picture || "/images/profile-avatar.png";
  
  // Also load data into settingsForm
  settingsForm.clientName = userData.name || userData.username || "";
  settingsForm.email = userData.email || "";
  settingsForm.phone = userData.phone || userData.mobile || "";
  // City can be an object {id, name} or a string
  if (userData.city && typeof userData.city === 'object') {
    settingsForm.city = userData.city.id?.toString() || userData.city.name || "";
  } else {
    settingsForm.city = userData.city || userData.city_id || userData.city_name || userData.cityName || "";
  }
  // Location is map_desc in the API response
  settingsForm.location = userData.map_desc || userData.location || userData.mapDesc || userData.address || "";
  settingsForm.avatar = userData.avatar || userData.image || userData.profile_picture || "/images/profile-avatar.png";
  settingsAvatarPreview.value = settingsForm.avatar;
};

// Fetch user profile from API - primary data source
const fetchUserProfile = async () => {
  try {
    // Get token for authenticated request
    let token = userStore.token || user.value?.token || user.value?.access_token;
    
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      return;
    }

    // Fetch user profile from API
    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      // Extract user data - handle different possible structures
      let profileData = response.data;
      if (profileData.user && typeof profileData.user === 'object') {
        profileData = { ...profileData, ...profileData.user };
      }
      if (profileData.data && typeof profileData.data === 'object') {
        profileData = { ...profileData, ...profileData.data };
      }
      
      // Update authStore with complete profile data
      const authStore = useAuthStore();
      authStore.updateUserData(profileData);
      
      // Also update user.value with complete data for persistence
      if (user.value) {
        login({ ...user.value, ...profileData });
      } else {
        login(profileData);
      }
      
      // Load form with fresh API data
      loadUserDataToForm();
    } else {
      // If API fails, still try to load from stored data
      loadUserDataToForm();
    }
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    // If API fails, still try to load from stored data
    loadUserDataToForm();
  }
};

// Load user data from auth on mount
onMounted(() => {
  // Fetch user's adverts from API if on my-ads tab
  if (activeTab.value === "my-ads") {
    fetchMyAdverts();
  }

  // Wait for auth hydration from localStorage (useAuth uses nextTick)
  nextTick(() => {
    // Check both user.value and localStorage for authentication
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const hasUser = user.value || storedUser;
    
    // Only redirect if truly not authenticated (after hydration check)
    if (!hasUser) {
      navigateTo("/login");
      return;
    }

    // First load from stored data as fallback (for immediate display)
    loadUserDataToForm();
  
    // Then fetch complete profile from API (primary data source)
    // This will update all fields including city and location
    if (import.meta.client) {
      fetchUserProfile();
    }
  });
});

// Watch for changes in authStore.authUser and user.value to update form when data changes
watch(() => {
  const authStore = useAuthStore();
  return {
    authUser: authStore.authUser,
    user: user.value
  };
}, () => {
  if (user.value) {
    loadUserDataToForm();
  }
}, { deep: true, immediate: false });

const settingsForm = reactive({
  clientName: "",
  email: "",
  phone: "",
  city: "",
  location: "",
  avatar: "",
});

const settingsAvatarInput = ref<HTMLInputElement | null>(null);
const settingsAvatarPreview = ref<string>("");

const changeMobileForm = reactive({
  currentMobile: "",
  newMobile: "",
  verificationCode: "",
  countryCode: "+966",
});

// OTP Verification State
const otpDigits = ref<string[]>(["", "", "", ""]);
const otpInputs = ref<HTMLElement[]>([]);
const isCodeVerified = ref(false);
const hasEnteredNewMobile = ref(false);
const isNewCodeVerified = ref(false);
const isSendingOldPhoneCode = ref(false);
const hasSentOldPhoneCode = ref(false);
const isVerifyingOldPhoneCode = ref(false);
const isSendingNewPhoneCode = ref(false);
const isVerifyingNewPhoneCode = ref(false);

const changePasswordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const contactForm = reactive({
  messageTitle: "",
  messageText: "",
});
const aboutContent = ref("");
const isLoadingAbout = ref(false);
const aboutError = ref(null);
const hasFetchedAbout = ref(false);
const termsContent = ref("");
const isLoadingTerms = ref(false);
const termsError = ref(null);
const hasFetchedTerms = ref(false);
const privacyContent = ref("");
const isLoadingPrivacy = ref(false);
const privacyError = ref(null);
const hasFetchedPrivacy = ref(false);
const isSendingContact = ref(false);

const joinConsultantForm = reactive({
  consultationCost: "",
});

const cvFileName = ref("");
const proofFileName = ref("");
const cvFile = ref<File | null>(null);
const proofFile = ref<File | null>(null);
const isSubmittingConsultant = ref(false);

const tabTitles = {
  profile: "الملف الشخصي",
  settings: "الاعدادات",
  wallet: "المحفظة",
  "my-ads": "اعلاناتي",
  ratings: "تقييماتي",
  following: "المتابعة",
  commission: "حساب عمولة التطبيق",
  packages: "باقاتي",
  subscription: "اشتراكي",
  faq: "الاسئلة المتكررة",
  privacy: "سياسة الاستخدام",
  terms: "الشروط والاحكام",
  complaints: "الشكاوي المقدمة",
  "join-consultant": "الانظمام كمستشار",
  "contact-us": "تواصل معنا",
  "about-us": "عن المنصة",
};

const getTabTitle = (): string => {
  return (tabTitles as Record<string, string>)[activeTab.value] || "الملف الشخصي";
};

const profileAvatarInput = ref(null);

const handleProfileAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "الرجاء اختيار صورة",
        life: 3000,
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
        life: 3000,
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      form.avatar = (e.target?.result as string) || "";
    };
    reader.readAsDataURL(file);
  }
};

const handleMobileNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Remove all non-numeric characters
  form.mobileNumber = target.value.replace(/\D/g, "");
};

const handleNewMobileInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Remove all non-numeric characters
  changeMobileForm.newMobile = target.value.replace(/\D/g, "");
};

// OTP Input Handlers
const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, ""); // Only allow digits
  if (value) {
    otpDigits.value[index] = value.slice(-1); // Only take the last character

    // Move to next input if available
    if (index < 3 && otpInputs.value[index + 1]) {
      otpInputs.value[index + 1]?.focus();
    }
  } else {
    otpDigits.value[index] = "";
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  // Handle backspace
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
  // Handle arrow keys
  if (event.key === "ArrowLeft" && index > 0 && otpInputs.value[index - 1]) {
    otpInputs.value[index - 1]?.focus();
  }
  if (event.key === "ArrowRight" && index < 3 && otpInputs.value[index + 1]) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || (window as any).clipboardData;
  if (!clipboardData) return;
  const pastedData = clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 4);
  pastedData.split("").forEach((digit: string, index: number) => {
    if (index < 4) {
      otpDigits.value[index] = digit;
    }
  });
  // Focus the last filled input or the last input
  const lastIndex = Math.min(pastedData.length - 1, 3);
  otpInputs.value[lastIndex]?.focus();
};

// Send verification code to old phone
const sendOldPhoneCode = async () => {
  if (hasSentOldPhoneCode.value || isSendingOldPhoneCode.value) {
    return; // Already sent or currently sending
  }

  isSendingOldPhoneCode.value = true;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isSendingOldPhoneCode.value = false;
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/old-phone-send-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      hasSentOldPhoneCode.value = true;
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال رمز التحقق إلى رقم الجوال الحالي",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "فشل في إرسال رمز التحقق");
    }
  } catch (err: any) {
    console.error("Error sending old phone code:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "حدث خطأ أثناء إرسال رمز التحقق. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isSendingOldPhoneCode.value = false;
  }
};

const handleVerifyCode = async () => {
  const code = otpDigits.value.join("");
  if (code.length !== 4) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال رمز التحقق المكون من 4 أرقام",
      life: 3000,
    });
    return;
  }

  isVerifyingOldPhoneCode.value = true;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isVerifyingOldPhoneCode.value = false;
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/old-phone-check-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          code: code,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      // Store the verification code
      changeMobileForm.verificationCode = code;

      // Mark as verified only after successful API response
      isCodeVerified.value = true;

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم التحقق من الكود بنجاح",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "رمز التحقق غير صحيح");
    }
  } catch (err) {
    console.error("Error verifying old phone code:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "رمز التحقق غير صحيح. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isVerifyingOldPhoneCode.value = false;
  }
};

const handleNextStep = async () => {
  if (!changeMobileForm.newMobile.trim()) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال رقم الجوال",
      life: 3000,
    });
    return;
  }

  // Validate mobile number format (should be 9 digits for Saudi Arabia)
  const mobileNumber = changeMobileForm.newMobile.replace(/\D/g, "");
  if (mobileNumber.length !== 9) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال رقم جوال صحيح (9 أرقام)",
      life: 3000,
    });
    return;
  }

  isSendingNewPhoneCode.value = true;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isSendingNewPhoneCode.value = false;
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/change-phone-send-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          phone: mobileNumber,
          country_code: changeMobileForm.countryCode.replace("+", ""),
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      // Mark that we've entered the new mobile number
      hasEnteredNewMobile.value = true;

      // Reset OTP for new verification
      otpDigits.value = ["", "", "", ""];

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال رمز التحقق إلى الرقم الجديد",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "فشل في إرسال رمز التحقق");
    }
  } catch (err) {
    console.error("Error sending new phone code:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "حدث خطأ أثناء إرسال رمز التحقق. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isSendingNewPhoneCode.value = false;
  }
};

const handleVerifyNewCode = async () => {
  const code = otpDigits.value.join("");
  if (code.length !== 4) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال رمز التحقق المكون من 4 أرقام",
      life: 3000,
    });
    return;
  }

  isVerifyingNewPhoneCode.value = true;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isVerifyingNewPhoneCode.value = false;
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/change-phone-check-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          code: code,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      // Store the new verification code
      changeMobileForm.verificationCode = code;

      // Mark as verified only after successful API response
      isNewCodeVerified.value = true;

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم التحقق من الكود بنجاح وتم تغيير رقم الجوال",
        life: 3000,
      });

      // Navigate to personal-info section after successful verification
      setTimeout(() => {
        // Reset all states
        otpDigits.value = ["", "", "", ""];
        isCodeVerified.value = false;
        hasEnteredNewMobile.value = false;
        isNewCodeVerified.value = false;
        changeMobileForm.newMobile = "";
        changeMobileForm.verificationCode = "";

        // Navigate to personal-info section
        settingsSubTab.value = "personal-info";
      }, 2000);
    } else {
      throw new Error(response?.msg || "رمز التحقق غير صحيح");
    }
  } catch (err) {
    console.error("Error verifying new phone code:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "رمز التحقق غير صحيح. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isVerifyingNewPhoneCode.value = false;
  }
};

const handleSubmit = () => {

  // Update user data in auth
  if (user.value) {
    const updatedUser = {
      ...user.value,
      name: form.clientName,
      phone: form.mobileNumber,
      email: form.email,
      city: form.city,
      location: form.location,
      avatar: form.avatar,
    };

    login(updatedUser);

    // Show success message
    toast.add({
      severity: "success",
      summary: "تم التحديث",
      detail: "تم تحديث البيانات بنجاح",
      life: 3000,
    });
  }
};

// Handle settings avatar change
const settingsAvatarFile = ref<File | null>(null);
const handleSettingsAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "الرجاء اختيار صورة",
        life: 3000,
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
        life: 3000,
      });
      return;
    }

    settingsAvatarFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        settingsAvatarPreview.value = e.target.result as string;
        // Also update the form avatar so it shows immediately
        settingsForm.avatar = settingsAvatarPreview.value;
      }
    };
    reader.readAsDataURL(file);
  }
};

// Handle settings form submission
const isUpdatingProfile = ref(false);
const handleSettingsSubmit = async () => {
  if (
    !settingsForm.clientName.trim() ||
    !settingsForm.email.trim() ||
    !settingsForm.city.trim()
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }

  if (isUpdatingProfile.value) return;
  isUpdatingProfile.value = true;

  try {
    // Get token for authenticated request
    let token = userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isUpdatingProfile.value = false;
      return;
    }

    // Create FormData for the update request
    const formData = new FormData();
    formData.append("name", settingsForm.clientName.trim());
    formData.append("email", settingsForm.email.trim());
    formData.append("phone", settingsForm.phone.trim());
    formData.append("city", settingsForm.city.trim());
    formData.append("city_id", settingsForm.city.trim());
    formData.append("location", settingsForm.location || "");
    formData.append("map_desc", settingsForm.location || "");
    formData.append("lang", "ar");
    formData.append("iso", "SA");

    // Add avatar file if selected
    if (settingsAvatarFile.value) {
      formData.append("avatar", settingsAvatarFile.value);
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/update-profile?_method=put",
      {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // Don't set Content-Type for FormData, browser will set it automatically
        },
        body: formData,
      }
    );

    if (response && response.key === "success") {
      // Update user data in stores
      const authStore = useAuthStore();
      const updatedUserData = {
        ...user.value,
        name: settingsForm.clientName,
        email: settingsForm.email,
        phone: settingsForm.phone,
        city: settingsForm.city,
        location: settingsForm.location,
        map_desc: settingsForm.location,
        avatar: response.data?.avatar || settingsForm.avatar || settingsAvatarPreview.value || user.value?.avatar,
      };

      // Update authStore
      authStore.updateUserData(updatedUserData);
      
      // Update user.value (localStorage) - this will update navbar
      login(updatedUserData);

      // Reload profile data to get latest from API
      await fetchUserProfile();

      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم تحديث البيانات الشخصية بنجاح",
        life: 3000,
      });

      // Reset avatar file
      settingsAvatarFile.value = null;
    } else {
      throw new Error(response?.msg || "فشل في تحديث البيانات");
    }
  } catch (error: any) {
    console.error("Error updating profile:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        (error as any)?.data?.msg ||
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "حدث خطأ أثناء تحديث البيانات. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isUpdatingProfile.value = false;
  }
};

const handleChangeMobileSubmit = () => {
  if (
    !changeMobileForm.newMobile.trim() ||
    !changeMobileForm.verificationCode.trim()
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }
  // Add your form submission logic here
  toast.add({
    severity: "success",
    summary: "نجح",
    detail: "تم تغيير رقم الجوال بنجاح",
    life: 3000,
  });
  // Reset form
  changeMobileForm.newMobile = "";
  changeMobileForm.verificationCode = "";
};

const handleChangePasswordSubmit = async () => {
  if (
    !changePasswordForm.currentPassword.trim() ||
    !changePasswordForm.newPassword.trim() ||
    !changePasswordForm.confirmPassword.trim()
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }
  if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
      life: 3000,
    });
    return;
  }

  // Validate password length
  if (changePasswordForm.newPassword.length < 6) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      life: 3000,
    });
    return;
  }

  // Get token from multiple sources
  let token = userStore.token || user.value?.token || user.value?.access_token;

  // If no token found, try to get from localStorage
  if (!token && import.meta.client) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || parsedUser?.access_token;
      }
    } catch (e) {
      console.error("Error getting token from localStorage:", e);
    }
  }

  // If still no token, try authStore
  if (!token) {
    const authStore = useAuthStore();
    if (
      authStore.authUser &&
      typeof authStore.authUser === "object" &&
      "token" in authStore.authUser
    ) {
      token = (authStore.authUser as any).token;
    } else if (authStore.token) {
      token = authStore.token;
    }
  }

  if (!token) {
    toast.add({
      severity: "warn",
      summary: "تنبيه",
      detail: "يرجى تسجيل الدخول قبل تغيير كلمة المرور.",
      life: 3000,
    });
    return;
  }

  // Show loading state
  isChangingPassword.value = true;

  try {
    // Create form data
    const formData = new FormData();
    formData.append("old_password", changePasswordForm.currentPassword);
    formData.append("password", changePasswordForm.newPassword);
    formData.append(
      "password_confirmation",
      changePasswordForm.confirmPassword
    );

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/update-passward",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set the Content-Type with the boundary
        },
        body: formData,
      }
    );

    // Check if response indicates success
    if (response && response.key === "success") {
      // Reset form after successful submission
      changePasswordForm.currentPassword = "";
      changePasswordForm.newPassword = "";
      changePasswordForm.confirmPassword = "";
      // Reset password visibility
      showCurrentPassword.value = false;
      showNewPassword.value = false;
      showConfirmPassword.value = false;

      // Show success message
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم تغيير كلمة المرور بنجاح",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "فشل في تغيير كلمة المرور");
    }
  } catch (error: any) {
    console.error("Error changing password:", error);
    const errorMessage =
      error?.data?.message ||
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تغيير كلمة المرور. الرجاء المحاولة مرة أخرى.";

    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    isChangingPassword.value = false;
  }
};

const handlePackageSubscribe = (packageItem: Package) => {
  selectedPackage.value = packageItem;
  openPackagePaymentModal();
};

const openPackagePaymentModal = () => {
  isPackagePaymentModalOpen.value = true;
};

const handlePackagePaymentConfirm = async (paymentMethod: PaymentMethod) => {
  if (!selectedPackage.value) {
    return;
  }

  const packageId = (selectedPackage.value as any)?.id;
  if (!packageId) {
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: "معرف الباقة غير موجود",
      life: 3000,
    });
    return;
  }

  isSubscribingPackage.value = true;
  selectedPackagePaymentMethod.value = typeof paymentMethod === 'string' ? paymentMethod : paymentMethod;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      return;
    }

    const response = await $fetch<ApiResponse>(
      `https://backend.wattani-sa.com/api/v1/consultant-packages/${packageId}/subscribe-with-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          payment_method: typeof paymentMethod === 'string' ? paymentMethod : paymentMethod.id,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم الاشتراك في الباقة بنجاح",
        life: 3000,
      });

      // Close package payment modal
      isPackagePaymentModalOpen.value = false;
      selectedPackagePaymentMethod.value = "wallet";
      selectedPackage.value = null;

      // Refresh packages list to show updated subscription status
      if (hasFetchedPackages.value) {
        await fetchPackages();
      }

      // Refresh subscriptions list if it was fetched (for renewals)
      if (hasFetchedSubscriptions.value) {
        await fetchSubscriptions();
      }

      // Open success modal after a delay
      setTimeout(() => {
        isSuccessModalOpen.value = true;
      }, 200);
    } else {
      throw new Error(response?.msg || "فشل في الاشتراك في الباقة");
    }
  } catch (err) {
    console.error("Error subscribing to package:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "حدث خطأ أثناء الاشتراك في الباقة. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isSubscribingPackage.value = false;
  }
};

const handleRenewSubscription = (subscription: Subscription) => {
  // Open the package payment modal with the subscription data
  // Use packageId if available, otherwise fall back to id
      const packageId = (subscription as any).packageId || subscription.id;

  if (!packageId) {
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: "معرف الباقة غير موجود",
      life: 3000,
    });
    return;
  }

  selectedPackage.value = {
    id: packageId,
    price: subscription.price,
    title: subscription.title,
    features: subscription.features,
  } as Package;
  openPackagePaymentModal();
};

const handleContactUsSubmit = async () => {
  if (!contactForm.messageTitle.trim() || !contactForm.messageText.trim()) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول",
      life: 3000,
    });
    return;
  }
  isSendingContact.value = true;
  try {
    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/contact-us-send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName: form.clientName || "مستخدم",
          phone: form.mobileNumber ? `+966${form.mobileNumber}` : "",
          subject: contactForm.messageTitle,
          message: contactForm.messageText,
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال الرسالة بنجاح",
        life: 3000,
      });
      contactForm.messageTitle = "";
      contactForm.messageText = "";
    } else {
      throw new Error(response?.msg || "فشل في إرسال الرسالة");
    }
  } catch (error: any) {
    console.error("Error sending contact message:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
      (error as any)?.data?.msg ||
      (error as any)?.message ||
        "حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isSendingContact.value = false;
  }
};

const fetchAboutContent = async () => {
  isLoadingAbout.value = true;
  aboutError.value = null;
  try {
    const response = await $fetch<ApiResponse<string>>(
      "https://backend.wattani-sa.com/api/v1/about",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      aboutContent.value = response.data;
      hasFetchedAbout.value = true;
    } else {
      throw new Error(response?.msg || "فشل في تحميل صفحة من نحن");
    }
  } catch (error) {
    console.error("Error fetching about content:", error);
    aboutError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تحميل صفحة من نحن. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: aboutError.value,
      life: 3000,
    });
  } finally {
    isLoadingAbout.value = false;
  }
};

const fetchTermsContent = async () => {
  isLoadingTerms.value = true;
  termsError.value = null;
  try {
    const response = await $fetch<ApiResponse<string>>(
      "https://backend.wattani-sa.com/api/v1/terms",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      termsContent.value = response.data;
      hasFetchedTerms.value = true;
    } else {
      throw new Error(response?.msg || "فشل في تحميل الشروط والأحكام");
    }
  } catch (error) {
    console.error("Error fetching terms content:", error);
    termsError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تحميل الشروط والأحكام. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: termsError.value,
      life: 3000,
    });
  } finally {
    isLoadingTerms.value = false;
  }
};

const fetchPrivacyContent = async () => {
  isLoadingPrivacy.value = true;
  privacyError.value = null;
  try {
    const response = await $fetch<ApiResponse<string>>(
      "https://backend.wattani-sa.com/api/v1/privacy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      privacyContent.value = response.data;
      hasFetchedPrivacy.value = true;
    } else {
      throw new Error(response?.msg || "فشل في تحميل سياسة الخصوصية");
    }
  } catch (error) {
    console.error("Error fetching privacy content:", error);
    privacyError.value =
      (error as any)?.data?.msg ||
      (error as any)?.message ||
      "حدث خطأ أثناء تحميل سياسة الخصوصية. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: privacyError.value,
      life: 3000,
    });
  } finally {
    isLoadingPrivacy.value = false;
  }
};

watch(
  () => activeTab.value,
  (tab) => {
    if (tab === "about-us" && !hasFetchedAbout.value && !isLoadingAbout.value) {
      fetchAboutContent();
    }
    if (tab === "terms" && !hasFetchedTerms.value && !isLoadingTerms.value) {
      fetchTermsContent();
    }
    if (
      tab === "privacy" &&
      !hasFetchedPrivacy.value &&
      !isLoadingPrivacy.value
    ) {
      fetchPrivacyContent();
    }
  },
  { immediate: true }
);

const handleCvFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    cvFileName.value = file.name;
    cvFile.value = file;
  }
};

const handleProofFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    proofFileName.value = file.name;
    proofFile.value = file;
  }
};

const handleJoinConsultantSubmit = async () => {
  // Validate form
  if (
    !cvFile.value ||
    !proofFile.value ||
    !joinConsultantForm.consultationCost.trim()
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }

  isSubmittingConsultant.value = true;

  try {
    // Get token for authenticated request
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      toast.add({
        severity: "warn",
        summary: "تنبيه",
        detail: "يرجى تسجيل الدخول قبل إرسال الطلب.",
        life: 3000,
      });
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("cv", cvFile.value);
    formData.append("proof", proofFile.value);
    formData.append(
      "consultation_cost",
      joinConsultantForm.consultationCost.trim()
    );

    // Make API call
    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/consultant-application",
      {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      }
    );

    // Check if response indicates success
    if (response && response.key === "success") {
      // Reset form after successful submission
      cvFileName.value = "";
      proofFileName.value = "";
      cvFile.value = null;
      proofFile.value = null;
      joinConsultantForm.consultationCost = "";

      // Reset file inputs
      const cvInput = document.getElementById("cvFile") as HTMLInputElement;
      const proofInput = document.getElementById("proofFile") as HTMLInputElement;
      if (cvInput) cvInput.value = "";
      if (proofInput) proofInput.value = "";

      // Show success message
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال الطلب بنجاح",
        life: 3000,
      });
    } else {
      throw new Error(response?.msg || "فشل في إرسال الطلب");
    }
  } catch (error: any) {
    console.error("Error submitting consultant application:", error);
    const errorMessage =
      error?.data?.message ||
      error?.data?.msg ||
      error?.message ||
      "حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.";

    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    isSubmittingConsultant.value = false;
  }
};

const openDeleteAccountModal = () => {
  isDeleteAccountModalOpen.value = true;
};

const isDeletingAccount = ref(false);

const confirmDeleteAccount = async () => {
  if (isDeletingAccount.value) return;
  isDeletingAccount.value = true;

  try {
    // Get token for authenticated request
    let token = userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    if (!token) {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: "يرجى تسجيل الدخول أولاً",
        life: 3000,
      });
      isDeleteAccountModalOpen.value = false;
      isDeletingAccount.value = false;
      return;
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/delete-account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم حذف الحساب بنجاح",
        life: 3000,
      });
      
      // Close modal
      isDeleteAccountModalOpen.value = false;
      
      // Logout user and clear all data
      const { logout } = useAuth();
      logout();
      userStore.logout();
      
      // Navigate to login page
      navigateTo("/login");
    } else {
      throw new Error(response?.msg || "فشل في حذف الحساب");
    }
  } catch (error: any) {
    console.error("Error deleting account:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        (error as any)?.data?.msg ||
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "حدث خطأ أثناء حذف الحساب. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isDeletingAccount.value = false;
  }
};

const handleDeleteAccount = () => {
  openDeleteAccountModal();
};

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const confirmLogout = async () => {
  if (isLoggingOut.value) return;
  isLoggingOut.value = true;

  const deviceId =
    (import.meta.client && localStorage.getItem("device_id")) || "11111111111";

  try {
    // Prepare token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/sign-out",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        query: {
          device_id: deviceId,
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم تسجيل الخروج بنجاح",
        life: 3000,
      });
      userStore.logout();
      isLogoutModalOpen.value = false;
      navigateTo("/login");
    } else {
      throw new Error(response?.msg || "فشل في تسجيل الخروج");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
      (error as any)?.data?.msg ||
      (error as any)?.message ||
        "حدث خطأ أثناء تسجيل الخروج. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isLoggingOut.value = false;
  }
};

// Load wallet balance
const loadWalletBalance = async () => {
  isLoadingWallet.value = true;
  try {
    const data = await showWallet();
    console.log("=== Wallet API Response ===", JSON.stringify(data, null, 2));
    console.log("=== Data keys ===", Object.keys(data || {}));
    
    // Handle different possible balance field names
    const balance = data.balance || data.wallet_balance || data.amount || data.current_balance || 0;
    walletBalance.value = typeof balance === 'number' ? balance : parseFloat(balance) || 0;
    console.log("✓ Wallet balance loaded:", walletBalance.value);
    console.log("✓ Balance type:", typeof walletBalance.value);
  } catch (err: any) {
    console.error("Error loading wallet balance:", err);
    const isUnauthenticated =
      err?.data?.key === "unauthenticated" ||
      err?.data?.msg?.includes("يرجى اعادة تسجيل الدخول") ||
      err?.message === "unauthenticated";
    
    // Don't redirect on wallet load - just show error or set balance to 0
    // User might be viewing profile without being fully authenticated
    if (isUnauthenticated) {
      walletBalance.value = 0;
      console.warn("User not authenticated, wallet balance set to 0");
    } else {
      toast.add({
        severity: "error",
        summary: "خطأ",
        detail: err?.data?.msg || err?.message || "حدث خطأ أثناء تحميل رصيد المحفظة",
        life: 3000,
      });
    }
  } finally {
    isLoadingWallet.value = false;
  }
};

const openChargeModal = () => {
  isChargeModalOpen.value = true;
};

const handleCharge = async (amount: string) => {
  if (!amount || parseFloat(amount) <= 0) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال مبلغ صحيح",
      life: 3000,
    });
    return;
  }

  isChargingWallet.value = true;
  
  try {
    const response = await chargeWallet(amount);
    console.log("=== Charge wallet response ===", JSON.stringify(response, null, 2));
    console.log("=== Response data ===", response?.data);
    
    // Check if response contains updated balance
    const responseData = response?.data || {};
    const newBalance = responseData.balance || responseData.wallet_balance || responseData.amount || responseData.new_balance;
    
    if (newBalance !== undefined && newBalance !== null) {
      console.log("✓ Found balance in charge response:", newBalance);
      walletBalance.value = newBalance;
    } else {
      console.log("⚠ No balance in charge response, reloading from API...");
      // Wait a bit for backend to update, then reload
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadWalletBalance();
    }
    
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: response?.msg || "تم شحن المحفظة بنجاح",
      life: 3000,
    });
    
    isChargeModalOpen.value = false;
    chargeAmount.value = "";
  } catch (err: any) {
    console.error("Error charging wallet:", err);
    const isUnauthenticated =
      err?.data?.key === "unauthenticated" ||
      err?.data?.msg?.includes("يرجى اعادة تسجيل الدخول");
    
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: isUnauthenticated
        ? "يرجى تسجيل الدخول لشحن المحفظة"
        : err?.data?.msg || err?.message || "حدث خطأ أثناء شحن المحفظة",
      life: 3000,
    });
    
    // Don't auto-redirect - let user decide to login
    // if (isUnauthenticated) {
    //   setTimeout(() => {
    //     navigateTo("/login");
    //   }, 500);
    // }
  } finally {
    isChargingWallet.value = false;
  }
};

// Calculate fee when amount changes
const handleCommissionAmountChange = async () => {
  const amount = commissionAmount.value;

  // Reset previous calculation
  calculatedFee.value = null;
  feeCalculationError.value = null;

  // Only calculate if amount is valid
  if (!amount || parseFloat(amount) <= 0) {
    return;
  }

  await calculateFee(amount);
};

// Calculate fee API call
const calculateFee = async (amount: string) => {
  isCalculatingFee.value = true;
  feeCalculationError.value = null;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    const response = await $fetch<ApiResponse<any>>(
      "https://backend.wattani-sa.com/api/v1/calculate-fee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          amount: amount,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      // Store the calculated fee (total amount including fees)
      calculatedFee.value =
        response.data?.total_amount || response.data?.fee || amount;
    } else {
      throw new Error(response?.msg || "فشل في حساب الرسوم");
    }
  } catch (err: any) {
    console.error("Error calculating fee:", err);
    feeCalculationError.value =
      err?.data?.msg ||
      err?.message ||
      err?.data?.message ||
      "حدث خطأ أثناء حساب الرسوم. الرجاء المحاولة مرة أخرى.";
  } finally {
    isCalculatingFee.value = false;
  }
};

const openCommissionPaymentModal = async () => {
  const amount = commissionAmount.value || "60";
  if (!amount || parseFloat(amount) <= 0) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال مبلغ صحيح",
      life: 3000,
    });
    return;
  }

  // Calculate fee if not already calculated
  if (calculatedFee.value === null) {
    await calculateFee(amount);
  }

  isCommissionPaymentModalOpen.value = true;
};

const handleCommissionPaymentConfirm = async (paymentMethod: PaymentMethod) => {
  const amount = commissionAmount.value || "60";
  const finalAmount = calculatedFee.value || amount;

  if (!amount || parseFloat(amount) <= 0) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى إدخال مبلغ صحيح",
      life: 3000,
    });
    return;
  }

  isPayingFee.value = true;
  selectedCommissionPaymentMethod.value = typeof paymentMethod === 'string' ? paymentMethod : paymentMethod;

  try {
    // Get token from multiple sources
    let token =
      userStore.token || user.value?.token || user.value?.access_token;

    // If no token found, try to get from localStorage
    if (!token && import.meta.client) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error("Error getting token from localStorage:", e);
      }
    }

    // If still no token, try authStore
    if (!token) {
      const authStore = useAuthStore();
      if (
        authStore.authUser &&
        typeof authStore.authUser === "object" &&
        "token" in authStore.authUser
      ) {
        token = (authStore.authUser as any).token;
      } else if (authStore.token) {
        token = (authStore.token as any);
      }
    }

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/pay-fee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: {
          amount: amount,
          payment_method: paymentMethod,
          lang: "ar",
          iso: "SA",
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم الدفع بنجاح",
        life: 3000,
      });

      // Close commission modal
      isCommissionPaymentModalOpen.value = false;
      selectedCommissionPaymentMethod.value = "wallet";

      // Reset form
      commissionAmount.value = "";
      calculatedFee.value = null;
      feeCalculationError.value = null;

      // Open success modal after a delay
      setTimeout(() => {
        isSuccessModalOpen.value = true;
      }, 200);
    } else {
      throw new Error(response?.msg || "فشل في عملية الدفع");
    }
  } catch (err) {
    console.error("Error paying fee:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
        detail:
        (err as any)?.data?.msg ||
        (err as any)?.message ||
        (err as any)?.data?.message ||
        "حدث خطأ أثناء عملية الدفع. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isPayingFee.value = false;
  }
};

// Reset password visibility when switching away from change-password sub-tab
watch(
  () => settingsSubTab.value,
  (newTab) => {
    if (newTab !== "change-password") {
      showCurrentPassword.value = false;
      showNewPassword.value = false;
      showConfirmPassword.value = false;
    }
  }
);

// Debug watcher for success modal
watch(
  () => isSuccessModalOpen.value,
  (isOpen) => {
  },
  { immediate: true }
);
</script>

<style scoped>
/* Custom select arrow styling */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 0.75rem center;
  background-size: 1.25rem;
  padding-left: 2.5rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Hide scrollbar but keep functionality */
.custom-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* RTL List dots positioning */
ul.list-disc {
  list-style-position: outside;
  direction: rtl;
  padding-right: 1.5rem;
}

ul.list-disc li {
  direction: rtl;
  text-align: right;
}
</style>
