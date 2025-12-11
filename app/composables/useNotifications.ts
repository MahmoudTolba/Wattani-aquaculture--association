interface NotificationType {
  id: string;
  name: string;
  title: string;
}

interface NotificationTypesResponse {
  key: string;
  msg: string;
  data: {
    types: NotificationType[];
  };
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  read_at?: string;
  data?: any;
}

interface NotificationsResponse {
  key: string;
  msg: string;
  data: {
    notifications: Notification[];
    unread_count?: number;
  };
}

const notificationTypes = ref<NotificationType[]>([]);
const isLoadingTypes = ref(false);
const typesError = ref<string | null>(null);

const buildAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  let token: string | null = null;

  if (typeof window !== "undefined") {
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

  if (!token) {
    const unauthError: any = new Error("unauthenticated");
    unauthError.data = {
      key: "unauthenticated",
      msg: "يرجى اعادة تسجيل الدخول",
    };
    throw unauthError;
  }

  headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const useNotifications = () => {
  const fetchNotificationTypes = async () => {
    // Return cached data if already loaded
    if (notificationTypes.value.length > 0) {
      return notificationTypes.value;
    }

    isLoadingTypes.value = true;
    typesError.value = null;

    try {
      const response = await $fetch<NotificationTypesResponse>(
        'https://backend.wattani-sa.com/api/v1/notification-types',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.key === 'success' && response.data?.types) {
        notificationTypes.value = response.data.types;
        return response.data.types;
      } else {
        throw new Error(response?.msg || 'فشل في تحميل أنواع الإشعارات');
      }
    } catch (err: any) {
      console.error('Error fetching notification types:', err);
      typesError.value =
        err?.data?.message ||
        err?.message ||
        err?.data?.msg ||
        'حدث خطأ أثناء تحميل أنواع الإشعارات.';
      throw err;
    } finally {
      isLoadingTypes.value = false;
    }
  };

  const fetchNotifications = async () => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<NotificationsResponse>(
        'https://backend.wattani-sa.com/api/v1/notifications',
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في تحميل الإشعارات');
      }
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      throw err;
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch(
        `https://backend.wattani-sa.com/api/v1/notifications/${notificationId}/read`,
        {
          method: 'POST',
          headers: headers,
        }
      );

      return response;
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const headers = buildAuthHeaders();
      // Preferred route (per backend error message)
      try {
        const response = await $fetch(
          `https://backend.wattani-sa.com/api/v1/delete-notification/${notificationId}`,
          {
            method: 'DELETE',
            headers: headers,
          }
        );
        return response;
      } catch (primaryErr: any) {
        // Fallback to legacy route if the primary one fails (e.g., 404/405)
        console.warn("Primary delete route failed, trying legacy route", primaryErr);
        const response = await $fetch(
          `https://backend.wattani-sa.com/api/v1/notifications/${notificationId}`,
          {
            method: 'DELETE',
            headers: headers,
          }
        );
        return response;
      }

    } catch (err: any) {
      console.error('Error deleting notification:', err);
      throw err;
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch(
        'https://backend.wattani-sa.com/api/v1/notifications/delete-all',
        {
          method: 'DELETE',
          headers: headers,
        }
      );

      return response;
    } catch (err: any) {
      console.error('Error deleting all notifications:', err);
      throw err;
    }
  };

  const fetchNotificationsCount = async () => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch(
        'https://backend.wattani-sa.com/api/v1/count-notifications',
        {
          method: 'GET',
          headers: headers,
        }
      );
      return response;
    } catch (err: any) {
      console.error('Error fetching notifications count:', err);
      throw err;
    }
  };

  return {
    notificationTypes,
    isLoadingTypes,
    typesError,
    fetchNotificationTypes,
    fetchNotifications,
    markAsRead,
    deleteNotification,
    deleteAllNotifications,
    fetchNotificationsCount,
  };
};

