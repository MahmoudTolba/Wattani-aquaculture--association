<template>
  <div>
    <main class="p-3 sm:p-6 md:p-10 mx-2 sm:mx-4 md:mx-15">
      <!-- Navigation Tabs -->
      <section class="mb-4 sm:mb-6">
        <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 flex-wrap">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-12 font-medium text-sm sm:text-base md:text-lg lg:text-xl transition-colors relative tab-button"
            :class="{ active: activeTab === tab.key }"
            type="button"
            @click="setActiveTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>
      </section>

      <!-- Orders Grid -->
      <section class="mb-4 sm:mb-6">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <article
            v-for="order in paginatedOrders"
            :key="order.id"
            class="bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            @click="goToOrderDetail(order)"
          >
            <div class="p-3 sm:p-4 flex gap-3 sm:gap-4">
              <!-- Left side: Order Info -->
              <div class="flex-1 min-w-0">
                <!-- Price Badge -->
                <div class="mb-2 sm:mb-3">
                  <div
                    class="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#00a859] to-[#15c472] text-white text-xs sm:text-sm font-semibold"
                  >
                    <img
                      src="/icons/green-currency.svg"
                      alt="currency"
                      class="w-3 h-3"
                    />
                    <span>{{ order.price }}</span>
                  </div>
                </div>

                <!-- Order Number -->
                <div class="mb-1 sm:mb-2">
                  <p class="text-sm sm:text-base font-bold text-black">
                    رقم الطلب : {{ order.orderNumber }}
                  </p>
                </div>

                <!-- Order Status -->
                <div class="mb-1 sm:mb-2">
                  <p class="text-xs sm:text-sm text-gray-600">
                    حالة الطلب : {{ order.status }}
                  </p>
                </div>

                <!-- Department -->
                <div>
                  <p class="text-xs sm:text-sm text-gray-600">{{ order.department }}</p>
                </div>
              </div>

              <!-- Right side: Image -->
              <div class="shrink-0">
                <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden">
                  <img
                    :src="order.image"
                    :alt="order.orderNumber"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div
          v-if="paginatedOrders.length === 0"
          class="text-center py-12 text-gray-500"
        >
          <p class="text-lg">لا توجد طلبات في هذا القسم</p>
        </div>
      </section>

      <!-- Pagination -->
      <section class="mb-4 sm:mb-6 flex justify-center overflow-x-auto">
        <Paginator
          v-if="totalOrders > rows"
          :rows="rows"
          :total-records="totalOrders"
          :first="first"
          @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          class="p-paginator"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "#imports";
import Paginator from "primevue/paginator";

const router = useRouter();

// Navigation Tabs
const tabs = [
  { key: "new", label: "جديدة" },
  { key: "current", label: "حالية" },
  { key: "finished", label: "منتهية" },
  { key: "canceled", label: "ملغية" },
];

// Active Tab
const activeTab = ref("new");

// Set active tab method
const setActiveTab = (key) => {
  activeTab.value = key;
  // Reset pagination when switching tabs
  first.value = 0;
};

// Pagination State
const rows = ref(9); // Items per page
const first = ref(0); // First item index

// Orders Data - using composable
// TODO: When API is ready, make this async and use await
// Example: const ordersByTab = await createOrdersData("معلق", "new", 15)
const { createOrders: createOrdersData } = useOrders();

const ordersByTab = {
  new: createOrdersData("معلق", "new", 15),
  current: createOrdersData("تم القبول", "current", 12),
  finished: createOrdersData("منتهي", "finished", 8),
  canceled: createOrdersData("ملغي", "canceled", 5),
};

const currentOrders = computed(() => {
  return ordersByTab[activeTab.value] || ordersByTab.new;
});

// Total orders count
const totalOrders = computed(() => {
  return currentOrders.value.length;
});

// Paginated orders
const paginatedOrders = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return currentOrders.value.slice(start, end);
});

// Pagination handler
const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
};

// Navigate to order detail page
const goToOrderDetail = (order) => {
  router.push({
    path: `/my-consultation/${activeTab.value}/${order.id}`,
  });
};
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
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

@media (min-width: 640px) {
  .tab-button {
    padding: 0.75rem 1.5rem;
    min-height: 3rem;
  }
}

@media (min-width: 768px) {
  .tab-button {
    padding: 1rem 2rem;
    min-height: 3.5rem;
  }
}

.tab-button.active {
  color: white;
  background: linear-gradient(to right, #00a859, #15c472);
  border-color: transparent;
}

.tab-button:not(.active):hover {
  color: #15c472;
  border-color: #15c472;
}

/* PrimeVue Paginator Custom Styles */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  height: 2rem;
  min-width: 2rem;
  border-radius: 0.5rem;
  margin: 0 0.125rem;
  color: #6b7280;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  :deep(.p-paginator .p-paginator-pages .p-paginator-page) {
    height: 2.5rem;
    min-width: 2.5rem;
    margin: 0 0.25rem;
    font-size: 1rem;
  }
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
  min-width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin: 0 0.125rem;
  color: #6b7280;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  :deep(.p-paginator .p-paginator-prev, .p-paginator .p-paginator-next) {
    min-width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.25rem;
    font-size: 1rem;
  }
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
</style>

