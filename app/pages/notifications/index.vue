<template>
  <div dir="rtl">
    <navHeader class="mb-10" />
    <!-- start of notification content -->
    <div class="notifications-container p-10 mx-10 bg-white font-sans">
      <div class="header flex justify-between items-center mb-5">
        <h1 class="title text-xl">الإشعارات</h1>
        <button
          class="delete-all-btn bg-transparent border-none text-red-500 text-base cursor-pointer flex items-center gap-[5px]"
          @click="deleteAll"
        >
          <img
            src="/icons/trash-icon.svg"
            alt="delete-icon"
            class="bg-[#D92D2026] p-2 rounded-md"
          />
          حذف الكل
        </button>
      </div>
      <ul
        class="notifications-list list-none p-0 m-0"
        v-if="visibleNotifications.length"
      >
        <li
          v-for="item in visibleNotifications"
          :key="item.originalIndex"
          class="notification-item flex justify-between items-center py-[15px] border-b border-gray-100"
        >
          <span
            class="notification-text text-teal-500 text-base flex-1 text-right pr-[10px]"
          >
            <img src="/icons/bell-icon.svg" alt="bell-icon" class="inline" />
            {{ item.text }}
          </span>
          <button
            class="delete-single-btn bg-transparent border-none text-red-500 text-lg cursor-pointer"
            @click="deleteSingle(item.originalIndex)"
          >
            <img
              src="/icons/trash-icon.svg"
              alt="delete-icon"
              class="bg-[#D92D2026] p-2 rounded-md"
            />
          </button>
        </li>
      </ul>
      <p v-else class="text-center text-gray-400 py-6">لا توجد إشعارات حاليا</p>
      <Paginator
        v-if="notifications.length > rows"
        :rows="rows"
        :totalRecords="notifications.length"
        :first="first"
        :rowsPerPageOptions="[5, 10, 20]"
        @page="onPageChange"
        class="mt-6"
      />
    </div>
    <!-- end of notification content -->
    <footerSection />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Paginator from "primevue/paginator";

const notifications = ref([
  " إشعار بتغيير حالة الدورة ",
  " إشعار بتغيير حالة الدورة ",
  " إشعار بتغيير حالة الدورة ",
  " إشعار بتغيير حالة الدورة ",
  " إشعار بتغيير حالة الدورة ",
  " إشعار بتغيير حالة الدورة ",
  "إشعار تجريبي السابع",
  "إشعار تجريبي الثامن",
]);

const rows = ref(5);
const first = ref(0);

const visibleNotifications = computed(() =>
  notifications.value
    .map((text, originalIndex) => ({ text, originalIndex }))
    .slice(first.value, first.value + rows.value)
);

const deleteSingle = (index) => {
  notifications.value.splice(index, 1);
};

const deleteAll = () => {
  notifications.value = [];
};

const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
};

watch(
  () => notifications.value.length,
  (newLength) => {
    if (newLength === 0) {
      first.value = 0;
      return;
    }

    if (first.value >= newLength) {
      const lastPageStart = Math.max(
        0,
        Math.floor((newLength - 1) / rows.value) * rows.value
      );
      first.value = lastPageStart;
    }
  }
);
</script>
