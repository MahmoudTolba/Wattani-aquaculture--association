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
          v-if="totalRecords > 0"
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
          @click="() => loadNotifications(1)"
          class="bg-gradient-to-r from-[#00a859] to-[#15c472] text-white py-2 px-6 rounded-lg hover:opacity-90 transition"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Notifications List -->
      <div v-else>
        <!-- Debug Info (can be removed later) -->
        <div v-if="false" class="mb-4 p-4 bg-gray-100 rounded text-xs">
          <p><strong>Notifications loaded:</strong> {{ notifications.length }}</p>
          <p><strong>Total records:</strong> {{ totalRecords }}</p>
          <p><strong>Current page:</strong> {{ currentPage }}</p>
          <p><strong>Notification types:</strong> {{ notificationTypes?.length || 0 }}</p>
          <p><strong>First notification:</strong> {{ notifications[0] ? JSON.stringify(notifications[0], null, 2) : 'None' }}</p>
        </div>
        
        <ul
          class="notifications-list list-none p-0 m-0 space-y-3"
          v-if="visibleNotifications.length"
        >
          <li
            v-for="notification in visibleNotifications"
            :key="notification.id"
            class="notification-item bg-gray-50 rounded-lg p-4 flex items-center justify-between gap-4 transition-all hover:shadow-md"
          >
            <!-- Bell Icon on Right (RTL) -->
            <div class="flex-shrink-0">
              <img 
                src="/icons/bell-icon.svg" 
                alt="bell-icon" 
                class="w-5 h-5"
                :class="{ 'opacity-100': !notification.read_at, 'opacity-50': notification.read_at }"
              />
            </div>
            
            <!-- Notification Text in Middle -->
            <div class="flex-1 text-right">
              <p class="text-sm text-gray-800 font-medium">
                {{ getNotificationTitle(notification) }}
              </p>
            </div>
            
            <!-- Trash Icon on Left (RTL) -->
            <div class="flex-shrink-0">
              <button
                class="delete-single-btn bg-transparent border-none cursor-pointer p-0"
                @click="deleteSingle(notification.id)"
                :disabled="isDeleting"
                title="حذف الإشعار"
              >
                <img
                  src="/icons/trash-icon.svg"
                  alt="delete-icon"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-400 py-6">لا توجد إشعارات حاليا</p>
        
        <Paginator
          v-if="totalRecords > rows"
          :rows="rows"
          :totalRecords="totalRecords"
          :first="(currentPage - 1) * rows"
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
const { 
  fetchNotifications, 
  markAsRead, 
  deleteNotification, 
  deleteAllNotifications,
  fetchNotificationsCount,
  fetchNotificationTypes,
  notificationTypes
} = useNotifications();
const toast = useToast();

const notifications = ref<any[]>([]);
const rows = ref(20);
const currentPage = ref(1);
const totalRecords = ref(0);
const pagination = ref<any>(null);
const showDeleteConfirm = ref(false);
const isLoading = ref(false);
const isDeleting = ref(false);
const error = ref<string | null>(null);

const visibleNotifications = computed(() => notifications.value);

// Get notification title from type or fallback to message
const getNotificationTitle = (notification: any) => {
  // First check if notification has a direct title
  if (notification.title) {
    return notification.title;
  }
  
  // Try to find the type title from notification types
  if (notification.type && notificationTypes && notificationTypes.value && notificationTypes.value.length > 0) {
    const typeInfo = notificationTypes.value.find((t: any) => 
      t.id === notification.type || 
      t.name === notification.type ||
      t.id === notification.notification_type_id
    );
    if (typeInfo?.title) {
      return typeInfo.title;
    }
  }
  
  // Fallback to message or default
  return notification.message || notification.body || 'إشعار';
};

const loadNotifications = async (page: number = currentPage.value) => {
  isLoading.value = true;
  error.value = null;
  currentPage.value = page;

  try {
    // Fetch notifications with pagination
    const data = await fetchNotifications(page, rows.value);
    console.log("API Response Data:", data);
    console.log("Notifications Data:", data.notifications);
    console.log("Notifications Array:", data.notifications?.data);
    
    notifications.value = data.notifications?.data || [];
    pagination.value = data.notifications?.pagination || null;
    totalRecords.value = pagination.value?.total_items || notifications.value.length;

    console.log("Loaded notifications count:", notifications.value.length);
    console.log("Total records:", totalRecords.value);

    // Update store with current page notifications
    notificationsStore.setNotifications(
      notifications.value,
      data.unread_count
    );

    // Fetch unread count separately to ensure it's up to date
    await loadUnreadCount();
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

const loadUnreadCount = async () => {
  try {
    const countData = await fetchNotificationsCount();
    if (countData?.unread_count !== undefined) {
      notificationsStore.unreadCount = countData.unread_count;
    }
  } catch (err: any) {
    console.error("Error loading unread count:", err);
    // Don't show error toast for count, just log it
  }
};

const markNotificationAsRead = async (notificationId: string) => {
  try {
    await markAsRead(notificationId);
    notificationsStore.markAsRead(notificationId);
    
    // Update local notification state
    const notification = notifications.value.find(n => n.id === notificationId);
    if (notification) {
      notification.read_at = new Date().toISOString();
    }
    
    // Reload unread count
    await loadUnreadCount();
    
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
    
    // Remove from local notifications
    notifications.value = notifications.value.filter(n => n.id !== notificationId);
    totalRecords.value = Math.max(0, totalRecords.value - 1);
    
    // Reload unread count
    await loadUnreadCount();
    
    // If current page is empty and not first page, go to previous page
    if (notifications.value.length === 0 && currentPage.value > 1) {
      await loadNotifications(currentPage.value - 1);
    } else {
      // Reload current page to refresh data
      await loadNotifications(currentPage.value);
    }
    
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
    notifications.value = [];
    totalRecords.value = 0;
    currentPage.value = 1;
    showDeleteConfirm.value = false;
    
    // Reload unread count
    await loadUnreadCount();
    
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

const onPageChange = async (event: any) => {
  rows.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;
  await loadNotifications(newPage);
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

// Load notifications and notification types on mount
onMounted(async () => {
  await loadNotifications(1);
  // Load notification types for future use (filtering, etc.)
  try {
    await fetchNotificationTypes();
  } catch (err) {
    console.error("Error loading notification types:", err);
    // Don't show error, just log it
  }
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
