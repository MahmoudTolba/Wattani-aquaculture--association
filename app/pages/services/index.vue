<template>
  <div>
    <main class="p-3 sm:p-6 md:p-10 mx-2 sm:mx-4 md:mx-15">
      <!-- Navigation Tabs -->
      <section class="mb-6">
        <div class="flex items-center gap-6 sm:gap-8 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="pb-3 px-2 font-medium text-base sm:text-lg transition-colors relative tab-button"
            :class="{ active: activeTab === tab.key }"
            type="button"
            @click="setActiveTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>
      </section>

      <!-- Filter Bar -->
      <section class="mb-6">
        <div class="flex items-center justify-start gap-4 flex-wrap">
          <!-- Right side: Region Selector -->
          <div class="flex items-center gap-4">
            <button
              class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#15C472] hover:bg-gray-50 transition-colors"
              @click="openRegionsModal"
            >
              <img
                src="/icons/filter-arrow.svg"
                alt="filter-arrow"
                class="w-4 h-4"
              />
              <span>كل المناطق</span>
            </button>

            <!-- Filter Button -->
            <button
              class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#15C472] hover:bg-gray-50 transition-colors"
              @click="openFilterModal"
            >
              <img
                src="/icons/filter-icon.svg"
                alt="filter-icon"
                class="w-4 h-4"
              />
              <span>تصفية</span>
            </button>
          </div>

          <!-- Left side: Map and Grid Icons -->
          <div class="flex items-center gap-3">
            <!-- Map Pin Icon -->
            <button
              class="p-2 text-gray-600 hover:text-[#15C472] transition-colors cursor-pointer"
              aria-label="عرض الخريطة"
              @click="openMapModal"
            >
              <img src="/icons/map-icon.svg" alt="map-icon" class="w-6 h-6" />
            </button>

            <!-- Grid/List Toggle Icon -->
            <button
              class="p-2 text-gray-600 hover:text-[#15C472] transition-colors"
              :aria-label="viewMode === 'grid' ? 'عرض القائمة' : 'عرض الشبكة'"
              @click="toggleViewMode"
            >
              <!-- Grid Icon (shown when in list view) -->
              <img
                v-if="viewMode === 'list'"
                src="/icons/layout-icon.svg"
                alt="grid-icon"
                class="w-5 h-5"
              />
              <!-- List Icon (shown when in grid view) -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Products Grid/List -->
      <section class="mb-4 sm:mb-6">
        <!-- Loading State for Experts -->
        <div
          v-if="activeTab === 'experts' && isLoadingExperts"
          class="flex items-center justify-center py-12"
        >
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#15C472] border-t-transparent mb-4"></div>
            <p class="text-gray-600 text-sm sm:text-base">جاري تحميل الخبراء...</p>
          </div>
        </div>

        <!-- Error State for Experts -->
        <div
          v-else-if="activeTab === 'experts' && expertsError"
          class="flex items-center justify-center py-12"
        >
          <div class="text-center max-w-md mx-auto px-4">
            <p class="text-red-600 text-sm sm:text-base mb-4">{{ expertsError }}</p>
            <button
              @click="fetchConsultants"
              class="px-4 py-2 bg-[#15C472] text-white rounded-lg hover:bg-[#12a866] transition-colors text-sm sm:text-base"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>

        <!-- Grid View -->
        <div
          v-if="viewMode === 'grid' && !(activeTab === 'experts' && isLoadingExperts) && !(activeTab === 'experts' && expertsError)"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <article
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            @click="goToProduct(product)"
          >
            <!-- Product Image -->
            <div class="relative">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-40 sm:h-48 object-cover"
              />
              <!-- Favorite Icon -->
              <button
                class="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                @click.stop="toggleFav(product)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  :class="
                    product.isFav
                      ? 'text-[#15C472] fill-current'
                      : 'text-gray-400'
                  "
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z"
                  />
                </svg>
              </button>
            </div>

            <!-- Product Content -->
            <div class="p-3 sm:p-4">
              <div class="flex items-center justify-between mb-2">
                <!-- Product Title -->
                <h3 class="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 flex-1 pr-2">
                  {{ product.title }}
                </h3>
                <!-- Rating -->
                <div class="flex items-center gap-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-xs sm:text-sm font-bold text-gray-600">{{
                    product.rating
                  }}</span>
                </div>
              </div>
              <!-- Price -->
              <div
                class="text-base sm:text-lg font-bold text-[#15C472] mb-2 flex items-center gap-1"
              >
                <span>{{ product.price }}</span>
                <img
                  src="/icons/green-currency.svg"
                  alt="currency"
                  class="w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>

              <!-- Location and Time -->
              <div class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-wrap">
                <img
                  src="/icons/location.svg"
                  alt="location"
                  class="w-3 h-3 sm:w-4 sm:h-4 text-[#15C472] flex-shrink-0"
                />
                <span class="truncate">{{ product.location }}</span>
                <img
                  src="/icons/clock.svg"
                  alt="time"
                  class="w-3 h-3 sm:w-4 sm:h-4 text-[#15C472] ml-1 sm:ml-2 flex-shrink-0"
                />
                <span>{{ product.timeAgo }}</span>
              </div>

              <!-- Seller Info -->
              <div class="flex items-center gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                <!-- Seller Avatar and Name -->
                <div class="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <img
                    :src="product.owner.avatar"
                    :alt="product.owner.name"
                    class="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <span class="text-xs sm:text-sm text-gray-700 truncate">{{
                    product.owner.name
                  }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- List View -->
        <div
          v-if="viewMode === 'list' && !(activeTab === 'experts' && isLoadingExperts) && !(activeTab === 'experts' && expertsError)"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6"
        >
          <article
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col sm:flex-row"
            @click="goToProduct(product)"
          >
            <!-- Product Image -->
            <div class="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto sm:flex-shrink-0 rounded-lg sm:rounded-none overflow-hidden">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover"
              />
              <!-- Favorite Icon -->
              <button
                class="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors z-10"
                @click.stop="toggleFav(product)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  :class="
                    product.isFav
                      ? 'text-[#15C472] fill-current'
                      : 'text-gray-400'
                  "
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z"
                  />
                </svg>
              </button>
            </div>
            <!-- Product Content -->
            <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
              <!-- Top Section: Price and Title -->
              <div class="mb-2 sm:mb-0">
                <!-- Price -->
                <div
                  class="text-base sm:text-lg font-bold text-[#15C472] mb-2 flex items-center gap-1"
                >
                  <span>{{ product.price }}</span>
                  <img
                    src="/icons/green-currency.svg"
                    alt="currency"
                    class="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
                <!-- Product Title -->
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {{ product.title }}
                </h3>
              </div>

              <!-- Middle Section: Location and Time -->
              <div class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-wrap">
                <img
                  src="/icons/location.svg"
                  alt="location"
                  class="w-3 h-3 sm:w-4 sm:h-4 text-[#15C472] flex-shrink-0"
                />
                <span class="truncate">{{ product.location }}</span>
                <img
                  src="/icons/clock.svg"
                  alt="time"
                  class="w-3 h-3 sm:w-4 sm:h-4 text-[#15C472] ml-1 sm:ml-2 flex-shrink-0"
                />
                <span>{{ product.timeAgo }}</span>
              </div>

              <!-- Bottom Section: Seller Info with Rating -->
              <div class="flex items-center gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                <!-- Rating -->
                <div class="flex items-center gap-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-xs sm:text-sm font-bold text-gray-600">{{
                    product.rating
                  }}</span>
                </div>
                <!-- Seller Avatar and Name -->
                <div class="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <img
                    :src="product.owner.avatar"
                    :alt="product.owner.name"
                    class="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <span class="text-xs sm:text-sm text-gray-700 truncate">{{
                    product.owner.name
                  }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div
          v-if="!isLoadingExperts && !expertsError && activeTab === 'experts' && paginatedProducts.length === 0"
          class="flex items-center justify-center py-12"
        >
          <div class="text-center">
            <p class="text-gray-600 text-sm sm:text-base">لا توجد خبراء متاحين حالياً</p>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <section
        v-if="!(activeTab === 'experts' && isLoadingExperts) && !(activeTab === 'experts' && expertsError)"
        class="mb-4 sm:mb-6 flex justify-center"
      >
        <Paginator
          :rows="rows"
          :total-records="totalProducts"
          :first="first"
          @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          class="p-paginator"
        />
      </section>
    </main>

    <!-- Map Modal -->
    <LocationModal
      v-model="isMapModalOpen"
      @confirm="handleLocationConfirm"
    />

    <!-- Regions Filter Modal -->
    <Teleport to="body">
      <div
        v-if="isRegionsModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="regions-modal-title"
        @click.self="closeRegionsModal"
      >
        <div
          class="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-modal-fade"
        >
          <!-- Title -->
          <div class="px-6 py-4 border-b border-gray-200">
            <h2
              id="regions-modal-title"
              class="text-xl font-bold text-black text-right"
            >
              المناطق
            </h2>
          </div>

          <!-- Regions List -->
          <div class="px-6 py-4 max-h-96 overflow-y-auto">
            <div
              v-for="(region, index) in regions"
              :key="index"
              class="flex items-center justify-start gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
              @click="toggleRegion(index)"
            >
              <div
                class="w-5 h-5 border-2 rounded transition-all"
                :class="
                  region.selected
                    ? 'bg-[#15C472] border-[#15C472]'
                    : 'border-[#15C472] bg-white'
                "
              >
                <svg
                  v-if="region.selected"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="text-base text-gray-900 font-medium">{{
                region.name
              }}</span>
            </div>
          </div>

          <!-- Filter Button -->
          <div class="px-6 pb-6 pt-4">
            <button
              type="button"
              class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
              @click="applyRegionFilter"
            >
              تصفية
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Filter Modal -->
    <Teleport to="body">
      <div
        v-if="isFilterModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        @click.self="closeFilterModal"
      >
        <div
          class="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-modal-fade"
        >
          <!-- Form Content -->
          <div class="px-6 py-6">
            <!-- Price Section -->
            <div class="mb-5">
              <label class="block text-right mb-2 font-bold text-black">
                السعر <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="filterForm.price"
                  class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-right text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">الاعلي سعر</option>
                  <option value="high">الاعلي سعر</option>
                  <option value="low">الاقل سعر</option>
                </select>
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Rating Section -->
            <div class="mb-5">
              <label class="block text-right mb-2 font-bold text-black">
                التقييم <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="filterForm.rating"
                  class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-right text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">الاعلي تقييم</option>
                  <option value="high">الاعلي تقييم</option>
                  <option value="low">الاقل تقييم</option>
                </select>
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- City Section -->
            <div class="mb-5">
              <label class="block text-right mb-2 font-bold text-black">
                المدينة <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="filterForm.city"
                  class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-right text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">الرياض</option>
                  <option value="riyadh">الرياض</option>
                  <option value="jeddah">جدة</option>
                  <option value="dammam">الدمام</option>
                </select>
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Nearest Section -->
            <div class="mb-5">
              <label class="block text-right mb-2 font-bold text-black">
                الاقرب <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="filterForm.nearest"
                  type="text"
                  placeholder="تحديد الموقع"
                  class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-right text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent bg-white"
                />
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Latest Section -->
            <div class="mb-6">
              <label
                class="flex items-center justify-start gap-3 cursor-pointer"
              >
                <div
                  class="w-5 h-5 border-2 rounded transition-all"
                  :class="
                    filterForm.latest
                      ? 'bg-[#15C472] border-[#15C472]'
                      : 'border-gray-300 bg-white'
                  "
                  @click="filterForm.latest = !filterForm.latest"
                >
                  <svg
                    v-if="filterForm.latest"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-full h-full text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="text-base font-bold text-black">الاحدث</span>
              </label>
            </div>

            <!-- Filter Button -->
            <button
              type="button"
              class="w-full bg-gradient-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
              @click="applyFilter"
            >
              تصفية
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useRoute } from "#imports";
import LocationModal from "~/components/modals/LocationModal.vue";
import { useAuth } from "~/composables/useAuth";
import Paginator from "primevue/paginator";

const route = useRoute();
const { user } = useAuth();

// Navigation Tabs
const tabs = [
  { key: "home", label: "الرئيسية" },
  { key: "benefits", label: "منافع الوطني" },
  { key: "experts", label: "خبراء وطني" },
  { key: "courses", label: "دورات وطني" },
];

// Active Tab
const activeTab = ref(route.query.tab || "home");

// View Mode (grid or list)
const viewMode = ref("grid");

// Watch for route changes
watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab) {
      activeTab.value = newTab;
    } else {
      activeTab.value = "home";
    }
  }
);

// Get user's geolocation
const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!process.client || !navigator.geolocation) {
      // Use default location if geolocation is not available
      resolve({ lat: 26.2372, lng: 50.1321 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Use default location on error
        resolve({ lat: 26.2372, lng: 50.1321 });
      },
      { timeout: 5000 }
    );
  });
};

// Fetch consultants from API
const fetchConsultants = async () => {
  if (activeTab.value !== "experts") return;

  isLoadingExperts.value = true;
  expertsError.value = null;

  try {
    // Get user location
    const location = await getUserLocation();
    userLocation.value = location;

    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };

    // Try to get token if available (for API token auth)
    let token = user.value?.token || user.value?.access_token;
    if (!token && process.client) {
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

    // Add Authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Make API call
    const response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/consultants?nearest=1&lat=${location.lat}&lng=${location.lng}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    // Check if response indicates success
    if (response && response.key === "success" && response.data) {
      // Transform API response to match product structure
      const consultants = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      productsByTab.experts = consultants.map((consultant, index) => ({
        id: consultant.id || `consultant-${index}`,
        title: consultant.name || consultant.title || "استشارة تربية أسماك",
        price: consultant.consultation_cost || consultant.price || "200",
        rating: consultant.rating || consultant.rate || "4.5",
        image:
          consultant.image ||
          consultant.avatar ||
          consultant.photo ||
          "/images/card-user2.png",
        location: consultant.location || consultant.city || "مدينة الرياض",
        timeAgo: consultant.created_at
          ? getTimeAgo(consultant.created_at)
          : "منذ ٦ ساعات",
        owner: {
          name: consultant.name || consultant.user?.name || "مستشار",
          avatar:
            consultant.avatar ||
            consultant.user?.avatar ||
            consultant.image ||
            "/images/card-user.jpg",
        },
        isFav: false,
        consultant: consultant, // Store full consultant data
      }));

      // If no consultants returned, use default data
      if (productsByTab.experts.length === 0) {
        productsByTab.experts = createProducts(
          "استشارة تربية أسماك",
          "200",
          "/images/card-user2.png"
        );
      }
    } else {
      throw new Error(response?.msg || "فشل في تحميل الخبراء");
    }
  } catch (error) {
    console.error("Error fetching consultants:", error);
    expertsError.value =
      error?.data?.message ||
      error?.data?.msg ||
      error?.message ||
      "حدث خطأ أثناء تحميل الخبراء. الرجاء المحاولة مرة أخرى.";

    // Use default data on error
    productsByTab.experts = createProducts(
      "استشارة تربية أسماك",
      "200",
      "/images/card-user2.png"
    );
  } finally {
    isLoadingExperts.value = false;
  }
};

// Helper function to calculate time ago
const getTimeAgo = (dateString) => {
  if (!dateString) return "منذ ٦ ساعات";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "منذ أقل من ساعة";
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `منذ ${diffInWeeks} أسبوع`;
  } catch (e) {
    return "منذ ٦ ساعات";
  }
};

// Set active tab method
const setActiveTab = async (key) => {
  activeTab.value = key;
  // Reset pagination when switching tabs
  first.value = 0;
  // Update URL without navigation
  navigateTo(
    {
      path: "/services",
      query: key !== "home" ? { tab: key } : {},
    },
    { replace: true }
  );

  // Fetch consultants when expert tab is selected
  if (key === "experts") {
    await fetchConsultants();
  }
};

// Pagination State
const rows = ref(12); // Items per page
const first = ref(0); // First item index

// Products Data
const createProducts = (title, price, image = "/images/card-img.jpg") => {
  return Array.from({ length: 20 }).map((_, index) => ({
    id: `${title.replace(/\s+/g, "-")}-${index}`,
    title,
    price,
    rating: "4.5",
    image,
    location: "مدينة الرياض",
    timeAgo: index === 1 ? "منذ 7 ساعات" : "منذ ٦ ساعات",
    owner: {
      name: "عبد العزيز الجبيري",
      avatar: "/images/card-user.jpg",
    },
    isFav: true,
  }));
};

const productsByTab = reactive({
  home: createProducts("سنارة سمك كبيرة", "50"),
  benefits: createProducts("شبكة صيد احترافية", "120"),
  experts: [],
  courses: createProducts("دورة إدارة المزارع", "350"),
});

// Loading and error states for experts
const isLoadingExperts = ref(false);
const expertsError = ref(null);
const userLocation = ref({ lat: 26.2372, lng: 50.1321 }); // Default location (Dammam, Saudi Arabia)

const currentProducts = computed(() => {
  return productsByTab[activeTab.value] || productsByTab.home;
});

// Total products count
const totalProducts = computed(() => {
  return currentProducts.value.length;
});

// Paginated products
const paginatedProducts = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return currentProducts.value.slice(start, end);
});

// Pagination handler
const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
  // Scroll to top of products section
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Methods
const goToProduct = (product) => {
  navigateTo({
    path: `/product/${product.id}`,
    query: {
      from: activeTab.value,
    },
  });
};

const toggleFav = (product) => {
  product.isFav = !product.isFav;
};

// Regions Modal State
const isRegionsModalOpen = ref(false);

// Regions Data
const regions = ref([
  { name: "المنطقة الاولي", selected: false },
  { name: "المنطقة الثانية", selected: false },
  { name: "المنطقة الثالثة", selected: false },
  { name: "المنطقة الرابعة", selected: false },
  { name: "المنطقة الخامسة", selected: false },
  { name: "المنطقة السادسة", selected: false },
  { name: "المنطقة السابعة", selected: false },
]);

// Modal Methods
const openRegionsModal = () => {
  isRegionsModalOpen.value = true;
  // Prevent body scroll
  if (process.client) {
    document.body.style.overflow = "hidden";
  }
};

const closeRegionsModal = () => {
  isRegionsModalOpen.value = false;
  // Restore body scroll
  if (process.client) {
    document.body.style.overflow = "";
  }
};

const toggleRegion = (index) => {
  regions.value[index].selected = !regions.value[index].selected;
};

const applyRegionFilter = () => {
  // Here you can add logic to filter products by selected regions
  const selectedRegions = regions.value.filter((r) => r.selected);
  console.log("Selected regions:", selectedRegions);
  closeRegionsModal();
};

// Filter Modal State
const isFilterModalOpen = ref(false);

// Filter Form Data
const filterForm = ref({
  price: "",
  rating: "",
  city: "",
  nearest: "",
  latest: false,
});

// Filter Modal Methods
const openFilterModal = () => {
  isFilterModalOpen.value = true;
  // Prevent body scroll
  if (process.client) {
    document.body.style.overflow = "hidden";
  }
};

const closeFilterModal = () => {
  isFilterModalOpen.value = false;
  // Restore body scroll
  if (process.client) {
    document.body.style.overflow = "";
  }
};

const applyFilter = () => {
  // Here you can add logic to filter products based on filterForm values
  console.log("Filter applied:", filterForm.value);
  closeFilterModal();
};

// Toggle view mode between grid and list
const toggleViewMode = () => {
  viewMode.value = viewMode.value === "grid" ? "list" : "grid";
};

// Map Modal State
const isMapModalOpen = ref(false);

// Map Modal Methods
const openMapModal = () => {
  isMapModalOpen.value = true;
  // Prevent body scroll
  if (process.client) {
    document.body.style.overflow = "hidden";
  }
};

const closeMapModal = () => {
  isMapModalOpen.value = false;
  // Restore body scroll
  if (process.client) {
    document.body.style.overflow = "";
  }
};

const handleLocationConfirm = async (location) => {
  console.log("Location selected:", location);
  userLocation.value = {
    lat: location.lat,
    lng: location.lng,
  };
  // Refetch consultants with new location if expert tab is active
  if (activeTab.value === "experts") {
    await fetchConsultants();
  }
  closeMapModal();
};

// Watch for activeTab changes to fetch consultants
watch(
  () => activeTab.value,
  async (newTab) => {
    if (newTab === "experts" && productsByTab.experts.length === 0) {
      await fetchConsultants();
    }
  },
  { immediate: true }
);

// Fetch consultants on mount if expert tab is active
onMounted(async () => {
  if (activeTab.value === "experts") {
    await fetchConsultants();
  }
});
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}

/* Tabs */
.tab-button {
  font-weight: 600;
  border: none;
  background: none;
  color: #6b7280;
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tab-button::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  border-radius: 100px;
  background: transparent;
  transition: background 0.2s ease;
}

.tab-button.active {
  color: #15c472;
}

.tab-button.active::after {
  background: #15c472;
}

.tab-button:hover {
  color: #15c472;
}

/* PrimeVue Paginator Custom Styles */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  color: #6b7280;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background: #f3f4f6;
  border-color: #15c472;
  color: #15c472;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #15c472;
  border-color: #15c472;
  color: white;
}

:deep(.p-paginator .p-paginator-prev, .p-paginator .p-paginator-next) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  color: #6b7280;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

:deep(
    .p-paginator .p-paginator-prev:hover,
    .p-paginator .p-paginator-next:hover
  ) {
  background: #f3f4f6;
  border-color: #15c472;
  color: #15c472;
}

:deep(
    .p-paginator .p-paginator-prev:disabled,
    .p-paginator .p-paginator-next:disabled
  ) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal Animation */
@keyframes modal-fade {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-modal-fade {
  animation: modal-fade 0.3s ease-out;
}

/* Line clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
