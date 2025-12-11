<template>
  <div>
    <main class="p-3 sm:p-6 md:p-10 mx-2 sm:mx-4 md:mx-15">
      <!-- Breadcrumb -->
      <div class="w-full flex items-center justify-start gap-2 mb-4 sm:mb-6">
        <div
          class="w-full bg-white border border-gray-200 rounded-xl px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2"
        >
          <NuxtLink
            to="/my-consultation"
            class="font-medium text-gray-700 hover:text-[#15C472] text-sm sm:text-base"
          >
            استشاراتي
          </NuxtLink>
          <img
            src="/icons/arrow-route.svg"
            alt="arrow-route"
            class="w-3 h-3 sm:w-4 sm:h-4"
          />
          <NuxtLink
            :to="`/my-consultation?tab=${tabParam}`"
            class="font-medium text-gray-700 hover:text-[#15C472] text-sm sm:text-base"
          >
            {{ tabLabel }}
          </NuxtLink>
          <img
            src="/icons/arrow-route.svg"
            alt="arrow-route"
            class="w-3 h-3 sm:w-4 sm:h-4"
          />
          <span class="text-black font-semibold text-sm sm:text-base"
            >رقم الطلب</span
          >
        </div>
      </div>

      <!-- Order Detail Content -->
      <section v-if="!isLoadingOrder && orderData" class="mb-4 sm:mb-6">
        <div class="rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <!-- Content for New Tab (جديدة) -->
          <template v-if="tabParam === 'new'">
            <!-- Video Call Interface -->
            <div class="mb-6 rounded-xl p-4 sm:p-6">
              <div class="relative w-full rounded-lg overflow-hidden">
                <section
                  class="bg-white rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-6 overflow-hidden"
                >
                  <div
                    class="relative w-full h-[200px] sm:h-[250px] md:h-[30vw] min-h-[200px] rounded-lg"
                  >
                    <img
                      src="/images/product-banner.png"
                      alt="product-banner"
                      class="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </section>
              </div>
            </div>

            <!-- Order Details Section -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6"
            >
              <div class="flex items-center justify-between">
                <!-- Right Column - Labels -->
                <div class="space-y-4">
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >رقم الطلب</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >الحالة</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >القسم</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >اسم الدورة</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >موقع الانعقاد</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black-600 text-md font-medium"
                      >سعر الدورة</span
                    >
                  </div>
                </div>

                <!-- Left Column - Values -->
                <div class="space-y-4">
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold"
                      >#{{ orderData.orderNumber }}</span
                    >
                  </div>
                  <div class="flex flex-col gap-1">
                    <span
                      class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                      :class="getStatusClass(orderData.status)"
                    >
                      {{ orderData.status }}
                    </span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{
                      orderData.department
                    }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{
                      orderData.courseName || "دورة الاستزراع المائي"
                    }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-black text-sm font-semibold">{{
                      orderData.location
                    }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span
                      class="text-black text-sm font-semibold flex items-center gap-1"
                    >
                      {{ orderData.price }}
                      <img
                        src="/icons/green-currency.svg"
                        alt="currency"
                        class="w-4 h-4"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cancel Order / Pay Button -->
            <div class="w-full">
              <button
                v-if="!isOrderCancelled"
                @click="cancelOrder"
                class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                الغاء الطلب
              </button>
              <button
                v-else
                @click="openPaymentModal"
                class="w-full bg-linear-to-r from-[#0A717E] to-[#15C472] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                دفع
              </button>
            </div>
          </template>

          <!-- Content for Current Tab (حالية) -->
          <template v-else-if="tabParam === 'current'">
            <div class="gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div class="mb-6 rounded-xl p-4 sm:p-6">
                <div class="relative w-full rounded-lg overflow-hidden">
                  <section
                    class="bg-white rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-6 overflow-hidden"
                  >
                    <div
                      class="relative w-full h-[200px] sm:h-[250px] md:h-[30vw] min-h-[200px] rounded-lg"
                    >
                      <img
                        src="/images/product-banner.png"
                        alt="product-banner"
                        class="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <!-- Order Details Section -->
              <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6"
              >
                <div class="flex items-center justify-between">
                  <!-- Right Column - Labels -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >رقم الطلب</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >الحالة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >القسم</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >اسم الدورة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >موقع الانعقاد</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >سعر الدورة</span
                      >
                    </div>
                  </div>

                  <!-- Left Column - Values -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold"
                        >#{{ orderData.orderNumber }}</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                        :class="getStatusClass(orderData.status)"
                      >
                        {{ orderData.status }}
                      </span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.department
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.courseName || "دورة الاستزراع المائي"
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.location
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="text-black text-sm font-semibold flex items-center gap-1"
                      >
                        {{ orderData.price }}
                        <img
                          src="/icons/green-currency.svg"
                          alt="currency"
                          class="w-4 h-4"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Content for Finished Tab (منتهية) -->
          <template v-else-if="tabParam === 'finished'">
            <div class="gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div class="mb-6 rounded-xl p-4 sm:p-6">
                <div class="relative w-full rounded-lg overflow-hidden">
                  <section
                    class="bg-white rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-6 overflow-hidden"
                  >
                    <div
                      class="relative w-full h-[200px] sm:h-[250px] md:h-[30vw] min-h-[200px] rounded-lg"
                    >
                      <img
                        src="/images/product-banner.png"
                        alt="product-banner"
                        class="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <!-- Order Details Section -->
              <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6"
              >
                <div class="flex items-center justify-between">
                  <!-- Right Column - Labels -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >رقم الطلب</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >الحالة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >القسم</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >اسم الدورة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >موقع الانعقاد</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >سعر الدورة</span
                      >
                    </div>
                  </div>

                  <!-- Left Column - Values -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold"
                        >#{{ orderData.orderNumber }}</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                        :class="getStatusClass(orderData.status)"
                      >
                        {{ orderData.status }}
                      </span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.department
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.courseName || "دورة الاستزراع المائي"
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.location
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="text-black text-sm font-semibold flex items-center gap-1"
                      >
                        {{ orderData.price }}
                        <img
                          src="/icons/green-currency.svg"
                          alt="currency"
                          class="w-4 h-4"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Rating Section -->
              <div class="w-full mt-4 sm:mt-6">
                <!-- Rating Button (shown when not rated) -->
                <button
                  v-if="!hasRating"
                  @click="openRatingModal"
                  class="w-full bg-linear-to-r from-[#0A717E] to-[#15C472] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  تقييم
                </button>

                <!-- Rating Display (shown when rated) -->
                <div
                  v-else
                  class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6"
                >
                  <h2 class="text-lg font-bold text-black mb-4">تقييم الخدمة</h2>
                  <div class="flex items-center gap-6 mb-4">
                    <span class="text-gray-600 text-sm mr-2">اسم المستخدم</span>
                    <div class="flex items-center gap-1">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="text-2xl"
                        :class="
                          star <= userRating.stars
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        "
                      >
                        ★
                      </span>
                      
                    </div>
                    <span class="text-gray-600 text-sm">{{ userRating.stars }}.0</span>
                  </div>
                  <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {{ userRating.comment }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <!-- Content for Canceled Tab (ملغية) -->
          <template v-else-if="tabParam === 'canceled'">
            <div
              class=" gap-4 sm:gap-6 mb-4 sm:mb-6"
            >
              
            <div class="mb-6 rounded-xl p-4 sm:p-6">
                <div class="relative w-full rounded-lg overflow-hidden">
                  <section
                    class="bg-white rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-6 overflow-hidden"
                  >
                    <div
                      class="relative w-full h-[200px] sm:h-[250px] md:h-[30vw] min-h-[200px] rounded-lg"
                    >
                      <img
                        src="/images/product-banner.png"
                        alt="product-banner"
                        class="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <!-- Order Details Section -->
              <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6"
              >
                <div class="flex items-center justify-between">
                  <!-- Right Column - Labels -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >رقم الطلب</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >الحالة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >القسم</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >اسم الدورة</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >موقع الانعقاد</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black-600 text-md font-medium"
                        >سعر الدورة</span
                      >
                    </div>
                  </div>

                  <!-- Left Column - Values -->
                  <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold"
                        >#{{ orderData.orderNumber }}</span
                      >
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                        :class="getStatusClass(orderData.status)"
                      >
                        {{ orderData.status }}
                      </span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.department
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.courseName || "دورة الاستزراع المائي"
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-black text-sm font-semibold">{{
                        orderData.location
                      }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                      <span
                        class="text-black text-sm font-semibold flex items-center gap-1"
                      >
                        {{ orderData.price }}
                        <img
                          src="/icons/green-currency.svg"
                          alt="currency"
                          class="w-4 h-4"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      

            <!-- Order Description -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6"
            >
              <h2 class="text-lg font-bold text-black mb-4">وصف الطلب</h2>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                {{ orderData.description }}
              </p>
            </div>
          </template>
        </div>
      </section>

      <!-- Loading Skeleton -->
      <section v-else class="mb-4 sm:mb-6">
        <div class="rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 bg-white border border-gray-200 animate-pulse">
          <div class="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    </main>

    <!-- Payment Modal -->
    <Teleport to="body">
      <div
        v-if="isPaymentModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        @click.self="closePaymentModal"
      >
        <div
          class="w-full max-w-3xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <h2
              id="payment-modal-title"
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
                @click="selectedPaymentMethod = 'wallet'"
                class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                :class="
                  selectedPaymentMethod === 'wallet'
                    ? 'bg-gray-50 border-2 border-[#15C472]'
                    : 'bg-gray-50 border-2 border-gray-200'
                "
              >
                <label
                  for="wallet"
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
                  id="wallet"
                  v-model="selectedPaymentMethod"
                  value="wallet"
                  class="w-5 h-5 cursor-pointer accent-[#15C472]"
                />
              </div>

              <!-- Electronic Payment Option -->
              <div
                @click="selectedPaymentMethod = 'electronic'"
                class="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                :class="
                  selectedPaymentMethod === 'electronic'
                    ? 'bg-gray-50 border-2 border-[#15C472]'
                    : 'bg-gray-50 border-2 border-gray-200'
                "
              >
                <label
                  for="electronic"
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
                  id="electronic"
                  v-model="selectedPaymentMethod"
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
              class="w-full bg-linear-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
              @click="handlePayment"
            >
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </Teleport>




    <!-- Rating Modal -->
    <Teleport to="body">
      <div
        v-if="isRatingModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-modal-title"
        @click.self="closeRatingModal"
      >
        <div
          class="w-full max-w-2xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden"
        >
     

          <!-- Content -->
          <div class="p-6">
            <!-- Star Rating -->
            <div class="mb-6 flex items-center justify-center">
             
              <div class="flex items-center gap-2 justify-end">
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="selectedStars = star"
                  class="text-3xl hover:scale-110 transition-transform cursor-pointer"
                  :class="
                    star <= selectedStars
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                >
                  ★
                </button>
                <!-- <span class="text-gray-600 text-sm mr-2"
                  >{{ selectedStars }}.0</span 
                 > -->
              </div>
            </div>

            <!-- Rating Comment -->
            <div class="mb-6">
           
              <input
                id="rating-comment"
                v-model="ratingComment"
                placeholder="  اكتب تقييمك"
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#15C472] focus:border-transparent"
              ></input>
            </div>
          </div>

          <!-- Footer with buttons -->
          <div class="px-6 pb-6 flex gap-3">
            <!-- <button
              type="button"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              @click="closeRatingModal"
            >
              إلغاء
            </button> -->
            <button
              type="button"
              class="flex-1 bg-linear-to-r from-[#0A717E] to-[#15C472] text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-all duration-200"
              :disabled="isSubmittingRating"
              :class="isSubmittingRating ? 'opacity-75 cursor-not-allowed' : ''"
              @click="submitRating"
            >
              {{ isSubmittingRating ? "جاري التقييم..." : "تقييم" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "#imports";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const orderId = route.params.id;
const tabParam = route.params.tab || "new";

// Course ID for rating API - fallback to 2 if route param is not numeric
const courseId = computed(() => {
  const parsedId = Number(route.params.id);
  return Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 2;
});

// Tab labels mapping
const tabLabels = {
  new: "جديدة",
  current: "حالية",
  finished: "منتهية",
  canceled: "ملغية",
};

const tabLabel = computed(() => tabLabels[tabParam] || "جديدة");

// Get order data using composable
// TODO: When API is ready, make this async:
// const { getOrderById } = useOrders();
// const orderData = ref(await getOrderById(orderId, tabParam));
const { getOrderById } = useOrders();
const fallbackOrderData = getOrderById(orderId, tabParam);
const orderData = ref(null);
const isLoadingOrder = ref(false);
const orderError = ref(null);

const buildAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  let token = null;
  try {
    const userStore = useState("auth.user");
    token = userStore?.value?.token || userStore?.value?.access_token || null;
  } catch (e) {
    // ignore if store not available
  }

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

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const fetchCourseOrder = async () => {
  isLoadingOrder.value = true;
  orderError.value = null;

  try {
    const response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/course-orders/${courseId.value}`,
      {
        method: "GET",
        headers: buildAuthHeaders(),
      }
    );

    if (response?.key === "success" && response?.data) {
      const data = response.data;
      orderData.value = {
        orderNumber: data.order_number ?? data.id ?? fallbackOrderData.orderNumber,
        status: data.status ?? data.state ?? fallbackOrderData.status ?? "معلق",
        department:
          data.department ??
          data.department_name ??
          data.category ??
          fallbackOrderData.department,
        courseName:
          data.course?.title ??
          data.course_name ??
          data.title ??
          fallbackOrderData.courseName,
        location:
          data.location ??
          data.city ??
          data.course?.location ??
          fallbackOrderData.location,
        price:
          data.price ??
          data.cost ??
          data.amount ??
          data.total ??
          fallbackOrderData.price,
      };
    } else {
      throw new Error(response?.msg || "فشل في جلب بيانات الطلب");
    }
  } catch (err) {
    console.error("Error fetching course order:", err);
    orderError.value =
      err?.data?.message ||
      err?.message ||
      err?.data?.msg ||
      "حدث خطأ أثناء تحميل الطلب. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: orderError.value,
      life: 3000,
    });
    orderData.value = fallbackOrderData;
  } finally {
    isLoadingOrder.value = false;
  }
};

function getStatusClass(status) {
  const statusClasses = {
    معلق: "bg-yellow-100 text-yellow-800",
    "تم القبول": "bg-green-100 text-green-800",
    منتهي: "bg-blue-100 text-blue-800",
    ملغي: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
}

// Order cancellation state
const isOrderCancelled = ref(false);

// Payment modal state
const isPaymentModalOpen = ref(false);
const selectedPaymentMethod = ref("wallet");

// Rating modal state
const isRatingModalOpen = ref(false);
const selectedStars = ref(0);
const ratingComment = ref("");
const hasRating = ref(false);
const userRating = ref({
  stars: 0,
  comment: "",
});
const isSubmittingRating = ref(false);

// Cancel order function
const cancelOrder = () => {
  // Add your cancel order logic here
  // Handle order cancellation
  console.log("Order cancelled:", orderId);
  // Change button to payment button
  isOrderCancelled.value = true;
  // You can navigate back or show a success message
};

// Payment modal functions
const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
  // Reset payment method selection when closing
  selectedPaymentMethod.value = "wallet";
};

const handlePayment = () => {
  // Add your payment logic here
  console.log("Processing payment for order:", orderId);
  console.log("Selected payment method:", selectedPaymentMethod.value);
  // After successful payment, close the modal and reset button to red
  closePaymentModal();
  isOrderCancelled.value = false;
  // You might want to show a success message or navigate to a success page
};

// Rating modal functions
const openRatingModal = () => {
  isRatingModalOpen.value = true;
  selectedStars.value = 0;
  ratingComment.value = "";
};

const closeRatingModal = () => {
  isRatingModalOpen.value = false;
  selectedStars.value = 0;
  ratingComment.value = "";
};

const submitRating = async () => {
  if (selectedStars.value === 0 || !ratingComment.value.trim()) {
    // You can add validation feedback here
    toast.add({
      severity: "warn",
      summary: "تنبيه",
      detail: "يرجى اختيار التقييم وكتابة التعليق",
      life: 3000,
    });
    return;
  }

  isSubmittingRating.value = true;

  try {
    const response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/courses/${courseId.value}/rate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          rate: selectedStars.value,
          comment: ratingComment.value,
        },
      }
    );

    if (response?.key === "success") {
      userRating.value = {
        stars: selectedStars.value,
        comment: ratingComment.value,
      };
      hasRating.value = true;
      toast.add({
        severity: "success",
        summary: "تم",
        detail: "تم إرسال التقييم بنجاح",
        life: 3000,
      });
      closeRatingModal();
    } else {
      throw new Error(response?.msg || "فشل في إرسال التقييم");
    }
  } catch (err) {
    console.error("Error submitting rating:", err);
    const errorMessage =
      err?.data?.message ||
      err?.message ||
      err?.data?.msg ||
      "حدث خطأ أثناء إرسال التقييم. الرجاء المحاولة مرة أخرى.";
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    isSubmittingRating.value = false;
  }
};

// Prevent body scroll when modal is open (client-side only)
const updateBodyOverflow = (isOpen) => {
  if (process.client && typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
};

// Watch for payment modal
watch(
  () => isPaymentModalOpen.value,
  (isOpen) => {
    updateBodyOverflow(isOpen || isRatingModalOpen.value);
  },
  { immediate: true }
);

// Watch for rating modal
watch(
  () => isRatingModalOpen.value,
  (isOpen) => {
    updateBodyOverflow(isOpen || isPaymentModalOpen.value);
  },
  { immediate: true }
);

onMounted(() => {
  fetchCourseOrder();
  if (isPaymentModalOpen.value || isRatingModalOpen.value) {
    updateBodyOverflow(true);
  }
});

onBeforeUnmount(() => {
  updateBodyOverflow(false);
});
</script>

<style scoped>
main {
  min-height: 60vh;
  background: transparent;
}

/* Custom radio button styling */
input[type="radio"] {
  accent-color: #15c472;
}

input[type="radio"]:checked {
  background-color: #15c472;
  border-color: #15c472;
}
</style>
