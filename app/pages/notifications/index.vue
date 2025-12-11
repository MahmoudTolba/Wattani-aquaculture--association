<template>
  <div dir="rtl">
    <Toast position="top-center" />
    <!-- start of notification content -->
    <div class="notifications-container p-10 mx-10 bg-white font-sans">
      <div class="header flex justify-between items-center mb-5">
        <h1 class="title text-xl">
          الإشعارات
          <span
            v-if="notificationsStore.unreadCount > 0"
            class="unread-badge inline-block bg-red-500 text-white text-sm px-2 py-1 rounded-full mr-2"
          >
            {{ notificationsStore.unreadCount }}
          </span>
        </h1>
        <button
          v-if="notifications.length > 0"
          class="delete-all-btn bg-transparent border-none text-red-500 text-base cursor-pointer flex items-center gap-[5px]"
          @click="showDeleteConfirm = true"
          :disabled="isDeleting"
        >
          <img
            src="/icons/trash-icon.svg"
            alt="delete-icon"
            class="bg-[#D92D2026] p-2 rounded-md"
          />
          حذف الكل
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        <p class="text-gray-500 mt-4">جاري تحميل الإشعارات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="loadNotifications"
          class="bg-gradient-to-r from-[#00a859] to-[#15c472] text-white py-2 px-6 rounded-lg hover:opacity-90 transition"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Notifications List -->
      <div v-else>
        <ul
          class="notifications-list list-none p-0 m-0"
          v-if="visibleNotifications.length"
        >
          <li
            v-for="notification in visibleNotifications"
            :key="notification.id"
            class="notification-item flex justify-between items-start py-4 border-b border-gray-100 transition-colors hover:bg-gray-50"
            :class="{ 'bg-blue-50': !notification.read_at }"
          >
            <div class="flex-1 pr-4">
              <div class="flex items-start gap-3">
                <img 
                  src="/icons/bell-icon.svg" 
                  alt="bell-icon" 
                  class="mt-1 flex-shrink-0"
                  :class="{ 'opacity-100': !notification.read_at, 'opacity-50': notification.read_at }"
                />
                <div class="flex-1">
                  <h3 
                    class="font-semibold text-base mb-1"
                    :class="{ 'text-teal-600': !notification.read_at, 'text-gray-600': notification.read_at }"
                  >
                    {{ notification.title }}
                  </h3>
                  <p 
                    class="text-sm mb-2"
                    :class="{ 'text-gray-700': !notification.read_at, 'text-gray-500': notification.read_at }"
                  >
                    {{ notification.message }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ formatDate(notification.created_at) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                v-if="!notification.read_at"
                @click="markNotificationAsRead(notification.id)"
                class="text-teal-500 text-sm px-3 py-1 rounded hover:bg-teal-50 transition"
                title="تحديد كمقروء"
              >
                ✓
              </button>
              <button
                class="delete-single-btn bg-transparent border-none text-red-500 text-lg cursor-pointer"
                @click="deleteSingle(notification.id)"
                :disabled="isDeleting"
              >
                <img
                  src="/icons/trash-icon.svg"
                  alt="delete-icon"
                  class="bg-[#D92D2026] p-2 rounded-md"
                />
              </button>
            </div>
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
            <p class="text-gray-500 text-base">هل انت متأكد من حذف جميع الاشعارات؟</p>
          </div>
          <div class="flex flex-col sm:flex-row-reverse gap-4 w-full mt-6">
            <button
              class="bg-[#D92D20] text-white py-4 px-8 rounded-lg shadow-sm hover:bg-[#b22319] transition font-medium disabled:opacity-50"
              @click="confirmDeleteAll"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'جاري الحذف...' : 'تأكيد حذف الاشعارات' }}
            </button>
            <button
              class="bg-gradient-to-r from-[#00a859] to-[#15c472] text-white py-4 px-8 rounded-lg shadow-sm hover:opacity-90 transition font-medium"
              @click="showDeleteConfirm = false"
              :disabled="isDeleting"
            >
              الرجوع
            </button>
          </div>
        </div>
      </Dialog>
    </div>
    <!-- end of notification content -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import Dialog from "primevue/dialog";
import Paginator from "primevue/paginator";
import Toast from "primevue/toast";
import { useNotificationsStore } from "~/stores/notifications";
import { useNotifications } from "~/composables/useNotifications";
import { useToast } from "primevue/usetoast";

const notificationsStore = useNotificationsStore() as any;
const { fetchNotifications, markAsRead, deleteNotification, deleteAllNotifications } = useNotifications();
const toast = useToast();

const notifications = computed(() => notificationsStore.notifications);
const rows = ref(5);
const first = ref(0);
const showDeleteConfirm = ref(false);
const isLoading = ref(false);
const isDeleting = ref(false);
const error = ref<string | null>(null);

const visibleNotifications = computed(() =>
  notifications.value.slice(first.value, first.value + rows.value)
);

const loadNotifications = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const data = await fetchNotifications();
    notificationsStore.setNotifications(
      data.notifications || [],
      data.unread_count
    );
  } catch (err: any) {
    console.error("Error loading notifications:", err);
    const isUnauthenticated =
      err?.data?.key === "unauthenticated" ||
      err?.data?.msg?.includes("يرجى اعادة تسجيل الدخول");
    error.value = isUnauthenticated
      ? "يرجى تسجيل الدخول لعرض الإشعارات"
      : err?.data?.msg ||
        err?.message ||
        "حدث خطأ أثناء تحميل الإشعارات. الرجاء المحاولة مرة أخرى.";
    
    // Show error toast
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error.value,
      life: 3000,
    });

    // Redirect to login if unauthenticated
    if (isUnauthenticated) {
      setTimeout(() => {
        navigateTo("/login");
      }, 500);
    }
  } finally {
    isLoading.value = false;
  }
};

const markNotificationAsRead = async (notificationId: string) => {
  try {
    await markAsRead(notificationId);
    notificationsStore.markAsRead(notificationId);
    
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: "تم تحديد الإشعار كمقروء",
      life: 2000,
    });
  } catch (err: any) {
    console.error("Error marking notification as read:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: "حدث خطأ أثناء تحديث الإشعار",
      life: 3000,
    });
  }
};

const deleteSingle = async (notificationId: string) => {
  try {
    isDeleting.value = true;
    await deleteNotification(notificationId);
    notificationsStore.deleteById(notificationId);
    
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: "تم حذف الإشعار بنجاح",
      life: 2000,
    });
  } catch (err: any) {
    console.error("Error deleting notification:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: "حدث خطأ أثناء حذف الإشعار",
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmDeleteAll = async () => {
  try {
    isDeleting.value = true;
    await deleteAllNotifications();
    notificationsStore.deleteAll();
    showDeleteConfirm.value = false;
    
    toast.add({
      severity: "success",
      summary: "نجح",
      detail: "تم حذف جميع الإشعارات بنجاح",
      life: 2000,
    });
  } catch (err: any) {
    console.error("Error deleting all notifications:", err);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: "حدث خطأ أثناء حذف الإشعارات",
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const onPageChange = (event: any) => {
  first.value = event.first;
  rows.value = event.rows;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "الآن";
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

// Load notifications on mount
onMounted(() => {
  loadNotifications();
});
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
