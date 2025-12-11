<template>
  <div >
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
                    @click="$refs.profileAvatarInput?.click()"
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
                    class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
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
                      id="mobileNumber"
                      v-model="form.mobileNumber"
                      type="tel"
                      placeholder="رقم الجوال"
                      class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right"
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
                    class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
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
                      src="/images/profile-avatar.png"
                      alt="Profile Picture"
                      class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 sm:border-4 border-gray-100"
                    />
                    <button
                      type="button"
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
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                      حفظ
                    </button>
                  </div>
                </form>
              </div>

              <!-- Change Mobile Number Sub-tab -->
              <div v-if="settingsSubTab === 'change-mobile'" class="space-y-6">
                <form
                  class="space-y-4 sm:space-y-6"
                  @submit.prevent="handleChangeMobileSubmit"
                >
                  <!-- Current Mobile Number -->
                  <div class="space-y-2">
                    <label
                      for="currentMobile"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      رقم الجوال الحالي
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
                        id="currentMobile"
                        v-model="changeMobileForm.currentMobile"
                        type="tel"
                        placeholder="رقم الجوال الحالي"
                        class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right"
                        disabled
                      />
                    </div>
                  </div>

                  <!-- New Mobile Number -->
                  <div class="space-y-2">
                    <label
                      for="newMobile"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      رقم الجوال الجديد
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
                        id="newMobile"
                        v-model="changeMobileForm.newMobile"
                        type="tel"
                        placeholder="رقم الجوال الجديد"
                        class="flex-1 w-full bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 text-right"
                      />
                    </div>
                  </div>

                  <!-- Verification Code -->
                  <div class="space-y-2">
                    <label
                      for="verificationCode"
                      class="block text-xs sm:text-sm font-medium text-gray-700 text-right"
                    >
                      رمز التحقق
                    </label>
                    <input
                      id="verificationCode"
                      v-model="changeMobileForm.verificationCode"
                      type="text"
                      placeholder="أدخل رمز التحقق"
                      class="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#15c472] focus:outline-none focus:ring-2 focus:ring-[#15c472]/20 text-right"
                    />
                  </div>

                  <!-- Save Button -->
                  <div class="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                      حفظ
                    </button>
                  </div>
                </form>
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
                      class="w-full bg-gradient-to-r from-[#15c472] to-[#12a866] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                      حفظ
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
                    <span class="text-green-600 text-3xl sm:text-4xl font-bold"
                      >60</span
                    >
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
                  class="w-full max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm px-6 py-4 bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
                >
                  شحن
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
                      v-model="adForm.department"
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

                  <!-- Title Fields -->
                  <div class="grid grid-cols-1 gap-6">
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
                      v-model="adForm.cost"
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
                      v-model="adForm.city"
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

                  <!-- Gallery Images Upload -->
                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-start text-sm font-medium text-gray-800"
                    >
                      ارفاق صور ( بحد اقصي ٥ صور )
                    </div>
                    <label
                      class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200 shadow-sm"
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
                        <span class="flex items-center justify-center text-5xl">
                          <img
                            src="/icons/upload-icon.svg"
                            alt="upload"
                            class="w-6 h-6"
                          />
                        </span>
                        <span class="mt-3 text-sm font-medium text-gray-600">
                          إرفاق صورة
                        </span>
                      </template>
                    </label>
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
                      class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200 shadow-sm"
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
                          إرفاق صورة
                        </span>
                      </template>
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <div class="w-full">
                    <button
                      type="submit"
                      class="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      {{ selectedAdToEdit ? "تعديل" : "اضافة" }}
                    </button>
                  </div>
                </form>
              </div>

              <!-- Ads Grid -->
              <div v-else>
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                >
                  <article
                    v-for="ad in myAds"
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
                        <div class="flex items-center gap-1">
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
                            ad.rating
                          }}</span>
                        </div>
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
              <div v-if="isLoadingRatings" class="flex justify-center items-center py-12">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="ratingsError" class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
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
                <div v-if="paginatedReviews.length === 0" class="text-center py-12">
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
              <div v-if="!isLoadingRatings && !ratingsError && totalReviews > 0" class="flex justify-center pt-4">
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
              <div v-if="isLoadingFollowing" class="flex justify-center items-center py-12">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="followingError" class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
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
                <div v-if="paginatedFollowing.length === 0" class="text-center py-12">
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
              <div v-if="!isLoadingFollowing && !followingError && totalFollowing > 0" class="flex justify-center pt-4">
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
                      class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>

                  <!-- Display Amount -->
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-green-600 text-3xl sm:text-4xl font-bold">
                      {{ commissionAmount || "60" }}
                    </span>
                    <img
                      src="/icons/green-currency.svg"
                      alt="rial-icon"
                      class="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>

                  <!-- Pay Button -->
                  <button
                    type="button"
                    @click="openCommissionPaymentModal"
                    class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300"
                  >
                    دفع
                  </button>
                </div>
              </div>
            </div>

            <!-- Packages Tab Content -->
            <div v-if="activeTab === 'packages'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span class="text-lg sm:text-xl font-bold text-[#FE9B0E]">
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

            <!-- Subscription Tab Content -->
            <div v-if="activeTab === 'subscription'" class="space-y-6">
              <div
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
                          {{ subscription.medalNumber }}
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

            <!-- Favorites Tab Content -->
            <!-- <div v-if="activeTab === 'favorites'" class="space-y-6">
              <p class="text-gray-600">صفحة المفضلة - قيد التطوير</p>
            </div> -->

            <!-- FAQ Tab Content -->
            <div v-if="activeTab === 'faq'" class="space-y-6">
              <!-- Loading State -->
              <div v-if="isLoadingFaq" class="flex justify-center items-center py-12">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15c472] mb-4"></div>
                  <p class="text-gray-600 text-sm">جاري التحميل...</p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="faqError" class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
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
                  <p class="text-gray-500 text-lg">لا توجد أسئلة متكررة حالياً</p>
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
                      <div class="m-0 text-gray-700 leading-relaxed" v-html="faq.answer"></div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>

              <!-- Pagination -->
              <div v-if="!isLoadingFaq && !faqError && totalFaqs > 0" class="flex justify-center pt-4">
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
              <div class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200">
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
              <div class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200">
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
                <div class="rounded-xl p-4 sm:p-6 bg-white border border-gray-200">
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
              <!-- Complaint Detail View -->
              <div v-if="selectedComplaint" class="space-y-6">
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

                    <!-- Complaint Address -->
                    <div
                      class="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <span class="text-gray-600 text-sm sm:text-base"
                        >عنوان الشكوي</span
                      >
                      <span
                        class="text-gray-800 font-semibold text-sm sm:text-base"
                        >{{ selectedComplaint.address }}</span
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
                      "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر."
                    }}
                  </p>
                </div>
                <!-- Complaint Description Card -->
                <div
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
                    {{
                      selectedComplaint.description ||
                      "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر."
                    }}
                  </p>
                </div>
              </div>

              <!-- Complaints List View -->
              <div v-else class="space-y-6">
                <!-- Complaints Grid -->
                <div
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

                <!-- Pagination -->
                <div class="flex justify-center pt-4">
                  <Paginator
                    :rows="complaintsPerPage"
                    :total-records="totalComplaints"
                    :first="complaintsFirst"
                    @page="onComplaintsPageChange"
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    class="p-paginator"
                  />
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
            <div
              class="  p-3 sm:p-4"
            > 
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
    <ChargeWalletModal
      v-model="isChargeModalOpen"
      @confirm="handleCharge"
    />

    <!-- Commission Payment Modal -->
    <CommissionPaymentModal
      v-model="isCommissionPaymentModalOpen"
      :payment-method="selectedCommissionPaymentMethod"
      @confirm="handleCommissionPaymentConfirm"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-model="isSuccessModalOpen"
      title="تم الاشتراك بنجاح"
    />

    <!-- Package Payment Modal -->
    <PackagePaymentModal
      v-model="isPackagePaymentModalOpen"
      :payment-method="selectedPackagePaymentMethod"
      @confirm="handlePackagePaymentConfirm"
    />

    <!-- Logout Confirmation Modal -->
    <LogoutModal
      v-model="isLogoutModalOpen"
      @confirm="confirmLogout"
    />

    <!-- Delete Account Confirmation Modal -->
    <DeleteAccountModal
      v-model="isDeleteAccountModalOpen"
      @confirm="confirmDeleteAccount"
    />

    <!-- Delete Ad Confirmation Modal -->
    <DeleteAdModal
      v-model="isDeleteAdModalOpen"
      @confirm="confirmDeleteAd"
    />

    <!-- Location Modal -->
    <LocationModal
      v-model="isLocationModalOpen"
      @confirm="confirmLocation"
    />
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
} from "vue";
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
import LogoutModal from "~/components/modals/LogoutModal.vue";
import DeleteAccountModal from "~/components/modals/DeleteAccountModal.vue";
import DeleteAdModal from "~/components/modals/DeleteAdModal.vue";
import LocationModal from "~/components/modals/LocationModal.vue";
import { useUserStore } from "~/stores/user";

const toast = useToast();
const userStore = useUserStore();
const { user, login } = useAuth();

const activeTab = ref("profile");
const isMobileMenuOpen = ref(false);
const isChargeModalOpen = ref(false);
const chargeAmount = ref("");
const commissionAmount = ref("");

// Settings Sub-tab State
const settingsSubTab = ref("personal-info");

// Password Visibility State
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Commission Payment Modal State
const isCommissionPaymentModalOpen = ref(false);
const selectedCommissionPaymentMethod = ref("wallet");

// Success Modal State
const isSuccessModalOpen = ref(false);

// Package Payment Modal State
const isPackagePaymentModalOpen = ref(false);
const selectedPackagePaymentMethod = ref("wallet");
const selectedPackage = ref(null);

// Logout Modal State
const isLogoutModalOpen = ref(false);
const isLoggingOut = ref(false);

// Delete Account Modal State
const isDeleteAccountModalOpen = ref(false);

// Delete Ad Modal State
const isDeleteAdModalOpen = ref(false);
const selectedAdToDelete = ref(null);

// Add Ad Form State
const isAddAdFormOpen = ref(false);
const isLocationModalOpen = ref(false);
const selectedAdToEdit = ref(null);

// Departments and Cities
const departments = [
  { label: "العميل", value: "client" },
  { label: "المشاريع", value: "projects" },
  { label: "الخدمات", value: "services" },
];

const cities = [
  { label: "الرياض", value: "riyadh" },
  { label: "جدة", value: "jeddah" },
  { label: "الدمام", value: "dammam" },
];

// Ad Form Data
const adForm = reactive({
  department: "",
  titleAr: "",
  titleEn: "",
  cost: "",
  city: "",
  location: "",
  descriptionAr: "",
  descriptionEn: "",
  adImage: null,
  galleryImages: [],
});

// Image Previews
const adImagePreview = ref("");
const galleryPreviews = ref([]);

// FAQ State
const openFaqIndex = ref(null);
const faqPerPage = ref(4); // Items per page
const faqFirst = ref(0); // First item index
const isLoadingFaq = ref(false);
const faqError = ref(null);

// Complaints Pagination State
const complaintsPerPage = ref(4); // Items per page
const complaintsFirst = ref(0); // First item index
const selectedComplaint = ref(null);

// FAQ Data
const faqs = ref([]);

// Parse HTML content to extract Q&A pairs
const parseFAQHTML = (htmlString) => {
  if (!htmlString) return [];
  
  const items = [];
  
  // Check if we're in browser environment
  if (process.client && typeof document !== 'undefined') {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Find all h3 elements (questions)
    const questions = tempDiv.querySelectorAll('h3');
    
    questions.forEach((questionEl, index) => {
      const question = questionEl.textContent.trim();
      
      // Find the next sibling paragraph (answer)
      let answerEl = questionEl.nextElementSibling;
      let answer = '';
      
      // Collect all paragraphs until the next h3 or end
      while (answerEl && answerEl.tagName !== 'H3') {
        if (answerEl.tagName === 'P') {
          answer += answerEl.outerHTML;
        }
        answerEl = answerEl.nextElementSibling;
      }
      
      if (question && answer) {
        items.push({
          id: index + 1,
          question,
          answer
        });
      }
    });
  } else {
    // Fallback: use regex parsing for SSR
    const parts = htmlString.split(/<h3>/);
    
    parts.forEach((part, index) => {
      if (index === 0) return; // Skip first empty part
      
      const h3Match = part.match(/^(.*?)<\/h3>/);
      if (h3Match) {
        const question = h3Match[1].trim();
        const rest = part.substring(h3Match[0].length);
        
        // Extract all paragraphs
        const pMatches = rest.match(/<p>[\s\S]*?<\/p>/g);
        let answer = '';
        if (pMatches) {
          answer = pMatches.join('');
        }
        
        if (question && answer) {
          items.push({
            id: index,
            question,
            answer
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
    const response = await $fetch(
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
  } catch (err) {
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
const onFaqPageChange = (event) => {
  faqFirst.value = event.first;
  faqPerPage.value = event.rows;
  // Reset open accordion when page changes
  openFaqIndex.value = null;
  // Scroll to top when page changes
  if (process.client) {
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
const reviews = ref([]);
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
const fetchRatings = async (page = 1) => {
  isLoadingRatings.value = true;
  ratingsError.value = null;

  try {
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/my-rate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      const ratesData = response.data.rates || response.data.data || response.data || [];
      reviews.value = ratesData.map((rate) => ({
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
        reviewsFirst.value = (response.data.pagination.current_page - 1) * reviewsPerPage.value;
      } else {
        // If no pagination, assume all data is loaded
        ratingsPagination.value.total_items = reviews.value.length;
        ratingsPagination.value.current_page = page;
      }
    } else {
      throw new Error(response?.msg || "فشل في تحميل التقييمات");
    }
  } catch (err) {
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
const totalReviews = computed(() => ratingsPagination.value.total_items || reviews.value.length);

// Paginated reviews (now directly from API)
const paginatedReviews = computed(() => reviews.value);

// Pagination handler
const onReviewsPageChange = async (event) => {
  reviewsFirst.value = event.first;
  reviewsPerPage.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;
  
  // Fetch new page data from API
  if (newPage !== ratingsCurrentPage.value) {
    await fetchRatings(newPage);
  }
  
  // Scroll to top when page changes
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// My Ads Data
const myAds = ref([
  {
    id: 1,
    title: "سنارة سمك كبيرة",
    image: "/images/card-img.jpg",
    rating: 4.5,
    price: "50",
    location: "مدينة الرياض",
    timeAgo: "منذ ٦ ساعات",
    seller: {
      name: "محمود عبد العزيز",
      avatar: "/images/profile-avatar.png",
    },
  },
  {
    id: 2,
    title: "سنارة سمك كبيرة",
    image: "/images/card-img.jpg",
    rating: 4.5,
    price: "50",
    location: "مدينة الرياض",
    timeAgo: "منذ ٦ ساعات",
    seller: {
      name: "محمود عبد العزيز",
      avatar: "/images/profile-avatar.png",
    },
  },
  {
    id: 3,
    title: "سنارة سمك كبيرة",
    image: "/images/card-img.jpg",
    rating: 4.5,
    price: "50",
    location: "مدينة الرياض",
    timeAgo: "منذ ٦ ساعات",
    seller: {
      name: "محمود عبد العزيز",
      avatar: "/images/profile-avatar.png",
    },
  },
]);

// My Ads Methods
const editAd = (adId) => {
  const ad = myAds.value.find((a) => a.id === adId);
  if (!ad) {
    console.error("Ad not found:", adId);
    return;
  }

  // Set the ad to edit
  selectedAdToEdit.value = adId;

  // Populate form with ad data
  // Note: The ad structure might not have all form fields, so we map what we can
  adForm.titleAr = ad.title || "";
  adForm.titleEn = ad.title || ""; // If no English title, use Arabic
  adForm.cost = ad.price || "";
  adForm.location = ad.location || "";

  // Set image preview if available
  if (ad.image) {
    adImagePreview.value = ad.image;
  }

  // Open the form
  isAddAdFormOpen.value = true;

  // Scroll to top when opening form
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const openDeleteAdModal = (adId) => {
  selectedAdToDelete.value = adId;
  isDeleteAdModalOpen.value = true;
};

const confirmDeleteAd = () => {
  if (selectedAdToDelete.value) {
    console.log("Deleting ad:", selectedAdToDelete.value);
    // Remove the ad from the array
    const index = myAds.value.findIndex(
      (ad) => ad.id === selectedAdToDelete.value
    );
    if (index > -1) {
      myAds.value.splice(index, 1);
    }
    // Add your delete API call here
    isDeleteAdModalOpen.value = false;
    selectedAdToDelete.value = null;
  }
};

const addAdvertisement = () => {
  isAddAdFormOpen.value = true;
  // Scroll to top when opening form
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const closeAddAdForm = () => {
  isAddAdFormOpen.value = false;
  selectedAdToEdit.value = null;
  // Reset form
  Object.assign(adForm, {
    department: "",
    titleAr: "",
    titleEn: "",
    cost: "",
    city: "",
    location: "",
    descriptionAr: "",
    descriptionEn: "",
    adImage: null,
    galleryImages: [],
  });
  // Clear previews
  if (adImagePreview.value) {
    revokePreview(adImagePreview.value);
    adImagePreview.value = "";
  }
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = [];
};

const revokePreview = (url) => {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
};

const handleAdImageChange = (event) => {
  const [file] = event.target.files || [];
  adForm.adImage = file || null;
  if (adImagePreview.value) {
    revokePreview(adImagePreview.value);
    adImagePreview.value = "";
  }
  if (file) {
    adImagePreview.value = URL.createObjectURL(file);
  }
};

const handleGalleryImagesChange = (event) => {
  const files = Array.from(event.target.files || []).slice(0, 5);
  adForm.galleryImages = files;
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = files.map((file) => URL.createObjectURL(file));
};

const openLocationModal = () => {
  isLocationModalOpen.value = true;
};

const confirmLocation = () => {
  // Placeholder: integrate real selection logic later
  // For now, just set a placeholder location
  if (!adForm.location) {
    adForm.location = "موقع محدد";
  }
  isLocationModalOpen.value = false;
};

const handleAdSubmit = () => {
  console.log("Ad form submitted", { ...adForm });

  if (selectedAdToEdit.value) {
    // Edit mode - update existing ad
    const adIndex = myAds.value.findIndex(
      (ad) => ad.id === selectedAdToEdit.value
    );
    if (adIndex > -1) {
      // Determine image: use new uploaded image if available, otherwise keep original
      const imageToUse = adForm.adImage
        ? adImagePreview.value // New file uploaded, use blob preview (in real app, upload file first)
        : myAds.value[adIndex].image; // Keep original image

      // Update the ad
      myAds.value[adIndex] = {
        ...myAds.value[adIndex],
        title: adForm.titleAr,
        price: adForm.cost || myAds.value[adIndex].price,
        location:
          cities.find((c) => c.value === adForm.city)?.label ||
          adForm.location ||
          myAds.value[adIndex].location,
        image: imageToUse,
      };
      // Add your API call here to update the ad
      console.log("Ad updated:", myAds.value[adIndex]);
    }
  } else {
    // Add mode - create new ad
    // Add your API call here to create the ad
    // After successful creation, add to myAds array and close form
    const newAd = {
      id: Date.now(), // Temporary ID
      title: adForm.titleAr,
      image: adImagePreview.value || "/images/fishing-rod.jpg",
      rating: 4.5,
      price: adForm.cost || "50",
      location:
        cities.find((c) => c.value === adForm.city)?.label || "مدينة الرياض",
      timeAgo: "الآن",
      seller: {
        name: "محمود عبد العزيز",
        avatar: "/images/profile-avatar.png",
      },
    };
    myAds.value.unshift(newAd);
  }

  closeAddAdForm();
};

// Following Pagination State
const followingPerPage = ref(15); // Items per page (matching API default)
const followingFirst = ref(0); // First item index
const followingCurrentPage = ref(1); // Current page for API
const isLoadingFollowing = ref(false);
const followingError = ref(null);

// Following Users Data
const followingUsers = ref([]);
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
const fetchFollowers = async (page = 1) => {
  isLoadingFollowing.value = true;
  followingError.value = null;

  try {
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/users/followers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        query: {
          page: page,
          per_page: followingPerPage.value,
        },
      }
    );

    if (response && response.key === "success" && response.data) {
      followingUsers.value = response.data.data.map((user) => ({
        id: user.id,
        name: user.name || "مستخدم",
        avatar: user.avatar || user.image || "/images/following-avatar2.svg",
      }));
      followingPagination.value = response.data.pagination;
      followingCurrentPage.value = response.data.pagination.current_page;
      followingPerPage.value = response.data.pagination.per_page;
      followingFirst.value = (response.data.pagination.current_page - 1) * followingPerPage.value;
    } else {
      throw new Error(response?.msg || "فشل في تحميل المتابعين");
    }
  } catch (err) {
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
const onFollowingPageChange = async (event) => {
  followingFirst.value = event.first;
  followingPerPage.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;
  
  // Fetch new page data from API
  if (newPage !== followingCurrentPage.value) {
    await fetchFollowers(newPage);
  }
  
  // Scroll to top when page changes
  if (process.client) {
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
  }
});

// Unfollow handler
const handleUnfollow = async (userId) => {
  if (confirm("هل أنت متأكد من إلغاء المتابعة؟")) {
    // Remove from local state immediately for better UX
    const index = followingUsers.value.findIndex((user) => user.id === userId);
    if (index !== -1) {
      followingUsers.value.splice(index, 1);
    }
    
    // Refresh data from API to ensure sync
    await fetchFollowers(followingCurrentPage.value);
    
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: "تم إلغاء المتابعة بنجاح",
      life: 3000,
    });
  }
};

// Packages Data
const packages = ref([
  {
    id: 1,
    price: "70",
    title: "الباقة الذهبية",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "5 أضعاف فرص البيع",
    ],
  },
  {
    id: 2,
    price: "70",
    title: "الباقة الذهبية",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "5 أضعاف فرص البيع",
    ],
  },
  {
    id: 3,
    price: "70",
    title: "الباقة الذهبية",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "5 أضعاف فرص البيع",
    ],
  },
]);

// Subscription Data
const subscriptions = ref([
  {
    id: 1,
    price: "70",
    title: "الباقة الذهبية",
    medalNumber: "1",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "٥ أضعاف فرص البيع",
    ],
  },
  {
    id: 2,
    price: "70",
    title: "الباقة الذهبية",
    medalNumber: "1",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "٥ أضعاف فرص البيع",
    ],
  },
  {
    id: 3,
    price: "70",
    title: "الباقة الذهبية",
    medalNumber: "1",
    features: [
      "إعلانك في أعلى النتائج دائما",
      "يظهر في خانة الإعلانات المميزة",
      'شعار "مميز" ظاهر للمستخدمين',
      "تثبيت الإعلان لمدة 7 أيام",
      "٥ أضعاف فرص البيع",
    ],
  },
]);

// Complaints Data
const complaints = ref([
  {
    id: 1,
    number: "٨٤٥١",
    date: "٢٠٢٥ / ١٠ / ١٠",
    address: "الرياض",
    status: "جديدة",
    description:
      "هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر. هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر هذا النص يمكن استبداله بنص اخر.",
  },
  {
    id: 2,
    number: "٥٤٨٧٦",
    date: "٢٠٢٥ / ١٠ / ٠٩",
    address: "الرياض",
    status: "جاري المعالجة",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 3,
    number: "٥٤٨٧٧",
    date: "٢٠٢٥ / ١٠ / ٠٨",
    address: "الرياض",
    status: "منتهية",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 4,
    number: "٥٤٨٧٨",
    date: "٢٠٢٥ / ١٠ / ٠٧",
    address: "الرياض",
    status: "منتهية",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 5,
    number: "٥٤٨٧٩",
    date: "٢٠٢٥ / ١٠ / ٠٦",
    address: "جدة",
    status: "جديدة",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 6,
    number: "٥٤٨٨٠",
    date: "٢٠٢٥ / ١٠ / ٠٥",
    address: "الدمام",
    status: "جاري المعالجة",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 7,
    number: "٥٤٨٨١",
    date: "٢٠٢٥ / ١٠ / ٠٤",
    address: "الرياض",
    status: "منتهية",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 8,
    number: "٥٤٨٨٢",
    date: "٢٠٢٥ / ١٠ / ٠٣",
    address: "مكة المكرمة",
    status: "جديدة",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 9,
    number: "٥٤٨٨٣",
    date: "٢٠٢٥ / ١٠ / ٠٢",
    address: "الرياض",
    status: "جاري المعالجة",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
  {
    id: 10,
    number: "٥٤٨٨٤",
    date: "٢٠٢٥ / ١٠ / ٠١",
    address: "المدينة المنورة",
    status: "منتهية",
    description:
      "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي.",
  },
]);

// Total complaints count
const totalComplaints = computed(() => complaints.value.length);

// Paginated complaints
const paginatedComplaints = computed(() => {
  const start = complaintsFirst.value;
  const end = start + complaintsPerPage.value;
  return complaints.value.slice(start, end);
});

// Pagination handler
const onComplaintsPageChange = (event) => {
  complaintsFirst.value = event.first;
  complaintsPerPage.value = event.rows;
  // Scroll to top when page changes
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// View complaint details
const viewComplaintDetails = (complaintId) => {
  const complaint = complaints.value.find((c) => c.id === complaintId);
  if (complaint) {
    selectedComplaint.value = complaint;
    // Scroll to top when viewing details
    if (process.client) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

// Get status class for styling
const getStatusClass = (status) => {
  const statusClasses = {
    جديدة: "bg-orange-100 text-orange-800",
    "جاري المعالجة": "bg-yellow-100 text-yellow-800",
    منتهية: "bg-green-100 text-green-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const setActiveTab = (tab) => {
  activeTab.value = tab;
  // Reset selected complaint when switching tabs
  selectedComplaint.value = null;
  // Reset settings sub-tab when switching away from settings
  if (tab !== "settings") {
    settingsSubTab.value = "personal-info";
  }
  // Close mobile menu on small screens after selecting a tab
  if (process.client && window.innerWidth < 1024) {
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

// Load user data from auth on mount
onMounted(() => {
  // Redirect to login if not authenticated
  if (!user.value) {
    navigateTo("/login");
    return;
  }
  
  // Load user data into form
  form.clientName = user.value.name || "";
  form.mobileNumber = user.value.phone || "";
  form.email = user.value.email || "";
  form.city = user.value.city || "";
  form.location = user.value.location || "";
  form.avatar = user.value.avatar || "/images/profile-avatar.png";
});

const settingsForm = reactive({
  clientName: "",
  email: "",
  city: "",
  location: "",
});

const changeMobileForm = reactive({
  currentMobile: "",
  newMobile: "",
  verificationCode: "",
});

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
const cvFile = ref(null);
const proofFile = ref(null);
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

const getTabTitle = () => {
  return tabTitles[activeTab.value] || "الملف الشخصي";
};

const profileAvatarInput = ref(null);

const handleProfileAvatarChange = (event) => {
  const file = event.target.files?.[0];
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
    reader.onload = (e) => {
      form.avatar = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  console.log("Form submitted:", form);
  
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

const handleSettingsSubmit = () => {
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
  console.log("Settings form submitted:", settingsForm);
  // Add your form submission logic here
  toast.add({
    severity: "success",
    summary: "نجح",
    detail: "تم حفظ البيانات الشخصية بنجاح",
    life: 3000,
  });
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
  console.log("Change mobile form submitted:", changeMobileForm);
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

const handleChangePasswordSubmit = () => {
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
  console.log("Change password form submitted:", changePasswordForm);
  // Add your form submission logic here
  toast.add({
    severity: "success",
    summary: "نجح",
    detail: "تم تغيير كلمة المرور بنجاح",
    life: 3000,
  });
  // Reset form
  changePasswordForm.currentPassword = "";
  changePasswordForm.newPassword = "";
  changePasswordForm.confirmPassword = "";
  // Reset password visibility
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
};

const handlePackageSubscribe = (packageItem) => {
  selectedPackage.value = packageItem;
  openPackagePaymentModal();
};

const openPackagePaymentModal = () => {
  isPackagePaymentModalOpen.value = true;
};


const handlePackagePaymentConfirm = (paymentMethod) => {
  if (!selectedPackage.value) {
    return;
  }
  selectedPackagePaymentMethod.value = paymentMethod;
  console.log("Processing package payment:", selectedPackage.value);
  console.log("Selected payment method:", paymentMethod);
  // Add your payment processing logic here

  // Close package payment modal
  isPackagePaymentModalOpen.value = false;
  selectedPackagePaymentMethod.value = "wallet";
  selectedPackage.value = null;

  // Open success modal after a delay
  setTimeout(() => {
    isSuccessModalOpen.value = true;
  }, 200);
};

const handleRenewSubscription = (subscription) => {
  console.log("Renewing subscription:", subscription);
  // Open the package payment modal with the subscription data
  selectedPackage.value = {
    id: subscription.id,
    price: subscription.price,
    title: subscription.title,
    features: subscription.features,
  };
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
    const response = await $fetch(
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
  } catch (error) {
    console.error("Error sending contact message:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        error?.data?.msg ||
        error?.message ||
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
    const response = await $fetch(
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
      error?.data?.msg ||
      error?.message ||
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
    const response = await $fetch(
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
      error?.data?.msg ||
      error?.message ||
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
    const response = await $fetch(
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
      error?.data?.msg ||
      error?.message ||
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

const handleCvFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    cvFileName.value = file.name;
    cvFile.value = file;
  }
};

const handleProofFileChange = (event) => {
  const file = event.target.files[0];
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
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("cv", cvFile.value);
    formData.append("proof", proofFile.value);
    formData.append("consultation_cost", joinConsultantForm.consultationCost.trim());

    // Make API call
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/consultant-application",
      {
        method: "POST",
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
      const cvInput = document.getElementById("cvFile");
      const proofInput = document.getElementById("proofFile");
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
  } catch (error) {
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

const confirmDeleteAccount = () => {
  console.log("Account deletion confirmed");
  // Add your account deletion logic here
  isDeleteAccountModalOpen.value = false;
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
    (process.client && localStorage.getItem("device_id")) || "11111111111";

  try {
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/sign-out",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(userStore.token ? { Authorization: `Bearer ${userStore.token}` } : {}),
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
        error?.data?.msg ||
        error?.message ||
        "حدث خطأ أثناء تسجيل الخروج. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isLoggingOut.value = false;
  }
};

const openChargeModal = () => {
  isChargeModalOpen.value = true;
};


const handleCharge = (amount) => {
  if (!amount || parseFloat(amount) <= 0) {
    // You can add validation feedback here
    return;
  }
  console.log("Charging wallet with amount:", amount);
  // Add your charge logic here
  isChargeModalOpen.value = false;
  chargeAmount.value = "";
};

const openCommissionPaymentModal = () => {
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
  isCommissionPaymentModalOpen.value = true;
};


const handleCommissionPaymentConfirm = (paymentMethod) => {
  const amount = commissionAmount.value || "60";
  selectedCommissionPaymentMethod.value = paymentMethod;
  console.log("Processing commission payment with amount:", amount);
  console.log("Selected payment method:", paymentMethod);
  // Add your payment processing logic here

  // Close commission modal
  isCommissionPaymentModalOpen.value = false;
  selectedCommissionPaymentMethod.value = "wallet";

  // Open success modal after a delay
  setTimeout(() => {
    isSuccessModalOpen.value = true;
  }, 200);
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
    console.log("Success modal state changed to:", isOpen);
    if (isOpen) {
      console.log("Success modal should be visible now!");
    }
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
