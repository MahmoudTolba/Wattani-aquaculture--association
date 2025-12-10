<template>
  <div dir="rtl">
    <!-- start of notification content -->
    <div class="notifications-container p-10 mx-10 bg-white font-sans">
      <div class="header flex justify-between items-center mb-5">
        <h1 class="title text-xl">الإشعارات</h1>
        <button
          class="delete-all-btn bg-transparent border-none text-red-500 text-base cursor-pointer flex items-center gap-[5px]"
          @click="showDeleteConfirm = true"
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
      <Dialog
        v-model:visible="showDeleteConfirm"
        modal
        :dismissableMask="true"
        :showHeader="false"
        class="delete-confirm-dialog"
      >
        <div class="flex flex-col items-center text-center gap-6">
          <img src="/icons/delete-modal.svg" alt="delete" class="w-24 h-24" />
          <div class="space-y-2">
            <p class="text-xl font-semibold text-gray-900">
              حذف الاشعارات
            </p>
            <p class="text-gray-500 text-base">هل انت متأكد من حذف الاشعارات</p>
          </div>
          <div class="flex flex-col sm:flex-row-reverse gap-4 w-full mt-6">
            <button
              class=" bg-[#D92D20] text-white py-4 px-8 rounded-lg shadow-sm hover:bg-[#b22319] transition font-medium"
              @click="confirmDeleteAll"
            >
              تأكيد حذف الاشعارات
            </button>
            <button
              class="bg-gradient-to-r from-[#00a859] to-[#15c472] text-white py-4 px-8 rounded-lg shadow-sm hover:opacity-90 transition font-medium"
              @click="showDeleteConfirm = false"
            >
              الرجوع الي صفحتي
            </button>
          </div>
        </div>
      </Dialog>
    </div>
    <!-- end of notification content -->
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Paginator from "primevue/paginator";
import { useNotificationsStore } from "~/stores/notifications";

const notificationsStore = useNotificationsStore();

const notifications = computed(() => notificationsStore.notifications);
const rows = ref(5);
const first = ref(0);
const showDeleteConfirm = ref(false);

const visibleNotifications = computed(() =>
  notifications.value
    .map((text, originalIndex) => ({ text, originalIndex }))
    .slice(first.value, first.value + rows.value)
);

const deleteSingle = (index) => {
  notificationsStore.deleteSingle(index);
};

const deleteAll = () => {
  notificationsStore.deleteAll();
};

const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
};

const confirmDeleteAll = () => {
  deleteAll();
  showDeleteConfirm.value = false;
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

<style scoped>
:global(.delete-confirm-dialog .p-dialog) {
  width: min(1000px, 90vw);
  max-width: 1000px;
  border-radius: 18px;
}

:global(.delete-confirm-dialog .p-dialog-content) {
  padding: 5rem 5rem;
}

@media (max-width: 640px) {
  :global(.delete-confirm-dialog .p-dialog) {
    width: 95vw;
  }
  
  :global(.delete-confirm-dialog .p-dialog-content) {
    padding: 2.5rem 1.5rem;
  }
}
</style>
