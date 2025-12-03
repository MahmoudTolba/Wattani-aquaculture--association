<template>
  <div>
    <navHeader />
    <div
      class="min-h-screen bg-gray-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-8 lg:px-12"
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
                        class="w-4 h-4 sm:w-5 sm:h-5"
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
                <div class="pt-4 sm:pt-6 mt-4 sm:mt-6">
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
              <p class="text-gray-600">صفحة الإعدادات - قيد التطوير</p>
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
                    <img
                      src="/icons/green-currency.svg"
                      alt="rial-icon"
                      class="w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <span class="text-green-600 text-3xl sm:text-4xl font-bold"
                      >60</span
                    >
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
              <p class="text-gray-600">صفحة إعلاناتي - قيد التطوير</p>
            </div>

            <!-- Ratings Tab Content -->
            <div v-if="activeTab === 'ratings'" class="space-y-6">
              <!-- Reviews List -->
              <div class="space-y-4">
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
              <div class="flex justify-center pt-4">
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
              <!-- Following Users List -->
              <div class="space-y-3 sm:space-y-4">
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
                   <img src="/icons/cancelled-follow.svg" alt="cancelled-follow-icon" class="w-6 h-6 sm:w-5 sm:h-5">
                  </button>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex justify-center pt-4">
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
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
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
                    <img
                      src="/icons/green-currency.svg"
                      alt="rial-icon"
                      class="w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <span class="text-green-600 text-3xl sm:text-4xl font-bold">
                      {{ commissionAmount || "60" }}
                    </span>
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
              <p class="text-gray-600">صفحة الباقات - قيد التطوير</p>
            </div>

            <!-- Subscription Tab Content -->
            <div v-if="activeTab === 'subscription'" class="space-y-6">
              <p class="text-gray-600">صفحة اشتراكي - قيد التطوير</p>
            </div>

            <!-- Favorites Tab Content -->
            <div v-if="activeTab === 'favorites'" class="space-y-6">
              <p class="text-gray-600">صفحة المفضلة - قيد التطوير</p>
            </div>

            <!-- FAQ Tab Content -->
            <div v-if="activeTab === 'faq'" class="space-y-6">
              <!-- FAQ Accordion -->
              <div class="space-y-3">
                <Accordion :value="openFaqIndex">
                  <AccordionPanel
                    v-for="(faq, index) in faqs"
                    :key="faq.id"
                    :value="index.toString()"
                  >
                    <AccordionHeader>
                      {{ faq.question }}
                    </AccordionHeader>
                    <AccordionContent>
                      <p class="m-0 text-gray-700 leading-relaxed">
                        {{ faq.answer }}
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </div>

            <!-- Terms Tab Content -->
            <div v-if="activeTab === 'terms'" class="space-y-6">
              <p class="text-gray-600">صفحة الشروط والاحكام - قيد التطوير</p>
            </div>

            <!-- Complaints Tab Content -->
            <div v-if="activeTab === 'complaints'" class="space-y-6">
              <p class="text-gray-600">صفحة الشكاوي المقدمة - قيد التطوير</p>
            </div>

            <!-- Join Consultant Tab Content -->
            <div v-if="activeTab === 'join-consultant'" class="space-y-6">
              <p class="text-gray-600">صفحة الانظمام كمستشار - قيد التطوير</p>
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
                  class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300"
                >
                  ارسال
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
              class="bg-white rounded-xl lg:rounded-2xl shadow-sm p-3 sm:p-4"
            >
              <nav
                class="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"
              >
                <!-- 1. الملف الشخصي -->
                <button
                  @click="setActiveTab('profile')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'profile'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/profile-tab.svg"
                    alt="profile-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/settings-tab.svg"
                    alt="settings-tab"
                    class="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span>الاعدادات</span>
                </button>

                <!-- 3. المفضلة -->
                <button
                  @click="setActiveTab('favorites')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'favorites'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/heart-icon.svg"
                    alt="favorites-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
                  />
                  <span>المفضلة</span>
                </button>

                <!-- 4. المحفظة -->
                <button
                  @click="setActiveTab('wallet')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'wallet'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/wallet-tab.svg"
                    alt="wallet-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/rating-tab.svg"
                    alt="ratings-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/follow-tab.svg"
                    alt="follow-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/cost-tab.svg"
                    alt="cost-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/Packages-tabs.svg"
                    alt="Packages-tabs"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/contactus-tab.svg"
                    alt="contact-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
                  />
                  <span>تواصل معنا</span>
                </button>

                <!-- 12. عن المنصة -->
                <NuxtLink
                  to="/aboutUs"
                  class="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-50 hover:text-[#15c472] font-medium transition-colors"
                >
                  <img
                    src="/icons/aboutus-tab.svg"
                    alt="aboutus-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
                  />
                  <span>عن المنصة</span>
                </NuxtLink>

                <!-- 13. الاسئلة المتكررة -->
                <button
                  @click="setActiveTab('faq')"
                  :class="[
                    'flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors w-full text-right',
                    activeTab === 'faq'
                      ? 'bg-[#15c472] text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/faq-tab.svg"
                    alt="faq-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/terms-tab.svg"
                    alt="terms-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/reports-tab.svg"
                    alt="complaints-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
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
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#15c472]',
                  ]"
                >
                  <img
                    src="/icons/join-tab.svg"
                    alt="consultant-tab"
                    class="w-6 h-6 sm:w-5 sm:h-5 bg-green-200 p-1 rounded-full"
                  />
                  <span>الانظمام كمستشار</span>
                </button>

                <!-- 18. تسجيل الخروج (في الأسفل باللون الأحمر) -->
                <div class="pt-2 mt-2 border-t border-gray-200">
                  <button
                    @click="handleLogout"
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
    <footerSection />

    <!-- Charge Wallet Modal -->
    <Teleport to="body">
      <div
        v-if="isChargeModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="charge-modal-title"
        @click.self="closeChargeModal"
      >
        <div
          class="w-full max-w-xl 2xl:max-w-xl xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-sm rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 text-right">
            <h2
              id="charge-modal-title"
              class="text-xl sm:text-2xl font-bold text-black"
            >
              الشحن
            </h2>
            <p class="text-sm sm:text-base text-gray-700 mt-1">اشحن محفظتك</p>
          </div>

          <!-- Content -->
          <div class="px-6 pb-6">
            <!-- Input Field -->
            <div class="mb-6">
              <input
                v-model="chargeAmount"
                type="number"
                placeholder="شحن المحفظة"
                class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-right text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            <!-- Charge Button -->
            <button
              type="button"
              @click="handleCharge"
              class="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300"
            >
              شحن
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Commission Payment Modal -->
    <Teleport to="body">
      <div
        v-if="isCommissionPaymentModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="commission-payment-modal-title"
        @click.self="closeCommissionPaymentModal"
      >
        <div
          class="w-full max-w-3xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <h2
              id="commission-payment-modal-title"
              class="text-xl font-bold text-black text-right"
            >
              تحديد طريقة الدفع
            </h2>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Payment Method Options -->
            <div class="space-y-4">
              <!-- Wallet Option -->
              <div
                @click="selectedCommissionPaymentMethod = 'wallet'"
                class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                :class="
                  selectedCommissionPaymentMethod === 'wallet'
                    ? 'bg-gray-50 border-2 border-[#15C472]'
                    : 'bg-gray-50 border-2 border-gray-200'
                "
              >
                <label
                  for="commission-wallet"
                  class="flex-1 flex items-center gap-2 justify-start cursor-pointer"
                >
                  <img
                    src="/icons/wallet-icon.svg"
                    alt="wallet"
                    class="w-8 h-8"
                  />
                  <span class="text-black font-medium text-right">المحفظة</span>
                </label>
                <input
                  type="radio"
                  id="commission-wallet"
                  v-model="selectedCommissionPaymentMethod"
                  value="wallet"
                  class="w-5 h-5 cursor-pointer accent-[#15C472]"
                />
              </div>

              <!-- Electronic Payment Option -->
              <div
                @click="selectedCommissionPaymentMethod = 'electronic'"
                class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                :class="
                  selectedCommissionPaymentMethod === 'electronic'
                    ? 'bg-gray-50 border-2 border-[#15C472]'
                    : 'bg-gray-50 border-2 border-gray-200'
                "
              >
                <label
                  for="commission-electronic"
                  class="flex-1 flex items-center justify-start gap-2 cursor-pointer"
                >
                  <img
                    src="/icons/epay-icon.svg"
                    alt="electronic payment"
                    class="w-8 h-8"
                  />
                  <span class="text-black font-medium text-right"
                    >دفع الكتروني</span
                  >
                </label>
                <input
                  type="radio"
                  id="commission-electronic"
                  v-model="selectedCommissionPaymentMethod"
                  value="electronic"
                  class="w-5 h-5 cursor-pointer accent-[#15C472]"
                />
              </div>
            </div>
          </div>

          <!-- Footer with confirm button -->
          <div class="px-6 pb-6">
            <button
              type="button"
              class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
              @click="handleCommissionPayment"
            >
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  onMounted,
} from "vue";
import navHeader from "~/components/navHeader.vue";
import footerSection from "~/components/footerSection.vue";
import Paginator from "primevue/paginator";
import { useToast } from "primevue/usetoast";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

const toast = useToast();

const activeTab = ref("profile");
const isMobileMenuOpen = ref(false);
const isChargeModalOpen = ref(false);
const chargeAmount = ref("");
const commissionAmount = ref("");

// Commission Payment Modal State
const isCommissionPaymentModalOpen = ref(false);
const selectedCommissionPaymentMethod = ref("wallet");

// FAQ State
const openFaqIndex = ref(null);
const faqPerPage = ref(4); // Items per page
const faqFirst = ref(0); // First item index

// FAQ Data
const faqs = ref([
  {
    id: 1,
    question: "ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره ؟",
    answer:
      "الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة. الثروة السمكية تعتبر من أهم الموارد الطبيعية التي تساهم في تحقيق الأمن الغذائي.",
  },
  {
    id: 2,
    question: "ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره ؟",
    answer:
      "الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة. الثروة السمكية تعتبر من أهم الموارد الطبيعية التي تساهم في تحقيق الأمن الغذائي.",
  },
  {
    id: 3,
    question: "ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره ؟",
    answer:
      "الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة. الثروة السمكية تعتبر من أهم الموارد الطبيعية التي تساهم في تحقيق الأمن الغذائي.",
  },
  {
    id: 4,
    question: "ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره ؟",
    answer:
      "الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة الثروة السمكية وكيفية انشاء مزرعة سمكية كبيرة. الثروة السمكية تعتبر من أهم الموارد الطبيعية التي تساهم في تحقيق الأمن الغذائي.",
  },
  {
    id: 5,
    question: "كيف يمكنني التسجيل في المنصة؟",
    answer:
      "يمكنك التسجيل في المنصة من خلال الضغط على زر التسجيل وإدخال البيانات المطلوبة مثل الاسم والبريد الإلكتروني ورقم الجوال.",
  },
  {
    id: 6,
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "المنصة تدعم طريقتين للدفع: الدفع من خلال المحفظة الإلكترونية والدفع الإلكتروني عبر البطاقات الائتمانية.",
  },
  {
    id: 7,
    question: "كيف يمكنني التواصل مع الدعم الفني؟",
    answer:
      "يمكنك التواصل مع الدعم الفني من خلال صفحة تواصل معنا أو عبر البريد الإلكتروني أو رقم الهاتف المخصص للدعم.",
  },
  {
    id: 8,
    question: "ما هي سياسة الإرجاع والاستبدال؟",
    answer:
      "يمكنك إرجاع أو استبدال المنتجات خلال 7 أيام من تاريخ الشراء بشرط أن يكون المنتج في حالته الأصلية.",
  },
  {
    id: 9,
    question: "كيف يمكنني تحديث بياناتي الشخصية؟",
    answer:
      "يمكنك تحديث بياناتك الشخصية من خلال صفحة الملف الشخصي حيث يمكنك تعديل جميع المعلومات الخاصة بك.",
  },
  {
    id: 10,
    question: "ما هي شروط استخدام المنصة؟",
    answer:
      "شروط استخدام المنصة متاحة في صفحة الشروط والأحكام ويمكنك الاطلاع عليها في أي وقت.",
  },
  {
    id: 11,
    question: "كيف يمكنني إضافة إعلان جديد؟",
    answer:
      "يمكنك إضافة إعلان جديد من خلال صفحة إعلاناتي والضغط على زر إضافة إعلان جديد ثم ملء البيانات المطلوبة.",
  },
  {
    id: 12,
    question: "ما هي رسوم المنصة؟",
    answer:
      "رسوم المنصة تختلف حسب نوع الخدمة والاشتراك. يمكنك الاطلاع على تفاصيل الرسوم في صفحة حساب عمولة التطبيق.",
  },
]);

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

// Reviews Data
const reviews = ref([
  {
    id: 1,
    name: "بهاء العثمان",
    rating: 4,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور",
  },
  {
    id: 2,
    name: "بهاء العثمان",
    rating: 4,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور",
  },
  {
    id: 3,
    name: "محمد أحمد",
    rating: 5,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي",
  },
  {
    id: 4,
    name: "سارة علي",
    rating: 3,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر",
  },
  {
    id: 5,
    name: "عبدالله خالد",
    rating: 4,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي",
  },
  {
    id: 6,
    name: "فاطمة محمد",
    rating: 5,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور",
  },
  {
    id: 7,
    name: "خالد سعيد",
    rating: 4,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي القياسي في الصناعة",
  },
  {
    id: 8,
    name: "نورا حسن",
    rating: 3,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر",
  },
  {
    id: 9,
    name: "يوسف مالك",
    rating: 5,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر. لوريم إيبسوم كان النص الوهمي",
  },
  {
    id: 10,
    name: "ليلى أحمد",
    rating: 4,
    text: "لوريم إيبسوم هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور",
  },
]);

// Total reviews count
const totalReviews = computed(() => reviews.value.length);

// Paginated reviews
const paginatedReviews = computed(() => {
  const start = reviewsFirst.value;
  const end = start + reviewsPerPage.value;
  return reviews.value.slice(start, end);
});

// Pagination handler
const onReviewsPageChange = (event) => {
  reviewsFirst.value = event.first;
  reviewsPerPage.value = event.rows;
  // Scroll to top when page changes
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Following Pagination State
const followingPerPage = ref(5); // Items per page
const followingFirst = ref(0); // First item index

// Following Users Data
const followingUsers = ref([
  {
    id: 1,
    name: "خالد ال مبشر",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 2,
    name: "خالد ال مبشر",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 3,
    name: "خالد ال مبشر",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 4,
    name: "خالد ال مبشر",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 5,
    name: "محمد أحمد",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 6,
    name: "سارة علي",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 7,
    name: "عبدالله خالد",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 8,
    name: "فاطمة محمد",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 9,
    name: "يوسف مالك",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 10,
    name: "ليلى أحمد",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 11,
    name: "نورا حسن",
    avatar: "/images/following-avatar2.svg",
  },
  {
    id: 12,
    name: "أحمد سعيد",
    avatar: "/images/following-avatar2.svg",
  },
]);

// Total following count
const totalFollowing = computed(() => followingUsers.value.length);

// Paginated following users
const paginatedFollowing = computed(() => {
  const start = followingFirst.value;
  const end = start + followingPerPage.value;
  return followingUsers.value.slice(start, end);
});

// Pagination handler
const onFollowingPageChange = (event) => {
  followingFirst.value = event.first;
  followingPerPage.value = event.rows;
  // Scroll to top when page changes
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Unfollow handler
const handleUnfollow = (userId) => {
  if (confirm("هل أنت متأكد من إلغاء المتابعة؟")) {
    const index = followingUsers.value.findIndex((user) => user.id === userId);
    if (index !== -1) {
      followingUsers.value.splice(index, 1);
      // Adjust pagination if needed
      if (followingFirst.value >= followingUsers.value.length) {
        followingFirst.value = Math.max(
          0,
          followingFirst.value - followingPerPage.value
        );
      }
    }
  }
};

const setActiveTab = (tab) => {
  activeTab.value = tab;
  // Close mobile menu on small screens after selecting a tab
  if (window.innerWidth < 1024) {
    isMobileMenuOpen.value = false;
  }
};

const form = reactive({
  clientName: "",
  mobileNumber: "",
  email: "",
  city: "",
  location: "",
});

const contactForm = reactive({
  messageTitle: "",
  messageText: "",
});

const tabTitles = {
  profile: "الملف الشخصي",
  settings: "الاعدادات",
  favorites: "المفضلة",
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
};

const getTabTitle = () => {
  return tabTitles[activeTab.value] || "الملف الشخصي";
};

const handleSubmit = () => {
  console.log("Form submitted:", form);
  // Add your form submission logic here
};

const handleContactUsSubmit = () => {
  if (!contactForm.messageTitle.trim() || !contactForm.messageText.trim()) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول",
      life: 3000,
    });
    return;
  }
  console.log("Contact form submitted:", contactForm);
  // Add your contact form submission logic here
  // Reset form after successful submission
  contactForm.messageTitle = "";
  contactForm.messageText = "";
  // Show success message
  toast.add({
    severity: "success",
    summary: "نجح",
    detail: "تم إرسال الرسالة بنجاح",
    life: 3000,
  });
};

const handleDeleteAccount = () => {
  if (confirm("هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.")) {
    console.log("Account deletion requested");
    // Add your account deletion logic here
  }
};

const handleLogout = () => {
  if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
    console.log("Logout requested");
    // Add your logout logic here
    // Example: router.push("/login");
  }
};

const openChargeModal = () => {
  isChargeModalOpen.value = true;
};

const closeChargeModal = () => {
  isChargeModalOpen.value = false;
  chargeAmount.value = "";
};

const handleCharge = () => {
  if (!chargeAmount.value || parseFloat(chargeAmount.value) <= 0) {
    // You can add validation feedback here
    return;
  }
  console.log("Charging wallet with amount:", chargeAmount.value);
  // Add your charge logic here
  closeChargeModal();
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

const closeCommissionPaymentModal = () => {
  isCommissionPaymentModalOpen.value = false;
  // Reset payment method selection when closing
  selectedCommissionPaymentMethod.value = "wallet";
};

const handleCommissionPayment = () => {
  const amount = commissionAmount.value || "60";
  console.log("Processing commission payment with amount:", amount);
  console.log("Selected payment method:", selectedCommissionPaymentMethod.value);
  // Add your payment processing logic here
  // After successful payment, close the modal
  closeCommissionPaymentModal();
  // You might want to show a success message or navigate to a success page
};

// Prevent body scroll when modal is open (client-side only)
const updateBodyOverflow = (isOpen) => {
  if (process.client && typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
};

watch(
  () => isChargeModalOpen.value,
  (isOpen) => {
    updateBodyOverflow(isOpen);
  },
  { immediate: true }
);

onMounted(() => {
  if (isChargeModalOpen.value) {
    updateBodyOverflow(true);
  }
});

onBeforeUnmount(() => {
  updateBodyOverflow(false);
});

// Commission Payment Modal - Prevent body scroll when modal is open
const updateCommissionPaymentModalBodyOverflow = (isOpen) => {
  if (process.client && typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
};

watch(
  () => isCommissionPaymentModalOpen.value,
  (isOpen) => {
    updateCommissionPaymentModalBodyOverflow(isOpen);
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
  padding-right: 2.5rem;
}

/* Hide scrollbar but keep functionality */
.custom-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
