<template>
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
          @click="$emit('tab-change', 'profile')"
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
          @click="$emit('tab-change', 'settings')"
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

        <!-- 4. المحفظة -->
        <button
          @click="$emit('tab-change', 'wallet')"
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
          @click="$emit('tab-change', 'my-ads')"
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
          @click="$emit('tab-change', 'ratings')"
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
          @click="$emit('tab-change', 'following')"
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
          @click="$emit('tab-change', 'commission')"
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
          @click="$emit('tab-change', 'packages')"
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
          @click="$emit('tab-change', 'subscription')"
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
          @click="$emit('tab-change', 'contact-us')"
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
          @click="$emit('tab-change', 'about-us')"
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
          @click="$emit('tab-change', 'faq')"
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
          @click="$emit('tab-change', 'privacy')"
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
          @click="$emit('tab-change', 'terms')"
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
          @click="$emit('tab-change', 'complaints')"
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
          @click="$emit('tab-change', 'join-consultant')"
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
            @click="$emit('logout')"
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
</template>

<script setup lang="ts">
defineProps<{
  activeTab: string;
  isMobileMenuOpen: boolean;
}>();

defineEmits<{
  'tab-change': [tab: string];
  logout: [];
}>();
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>


