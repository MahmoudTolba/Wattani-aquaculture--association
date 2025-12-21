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
    notifications: {
      data: Notification[];
      pagination?: {
        total_items: number;
        count_items: number;
        per_page: number;
        total_pages: number;
        current_page: number;
        next_page_url: string;
        perv_page_url: string;
      };
    };
    unread_count?: number;
  };
}

interface NotificationsCountResponse {
  key: string;
  msg: string;
  data: {
    unread_count?: number;
    total_count?: number;
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
    "X-API-KEY": "5f43766dcd92b8c3e7639d2a8791063c",
  };

  let token: string | null = null;

  if (typeof window !== "undefined") {
    try {
      // Try multiple sources for token (like useAdverts.ts does)
      const userStore = useUserStore();
      const authStore = useAuthStore();
      
      console.log('Token sources check:', {
        userStoreToken: userStore.token ? 'exists' : 'missing',
        authStoreAuthUserToken: authStore.authUser?.token ? 'exists' : 'missing',
        authStoreToken: authStore.token ? 'exists' : 'missing',
      });
      
      token = userStore.token || authStore.authUser?.token || authStore.token;
      
      // Fallback to localStorage
      if (!token) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
          console.log('Token from localStorage:', token ? 'exists' : 'missing');
        } else {
          console.log('No user data in localStorage');
        }
      } else {
        console.log('Token found from store');
      }
    } catch (e) {
      console.error("Error getting token:", e);
    }
  }

  if (!token) {
    console.error('No authentication token found. User needs to login.');
    const unauthError: any = new Error("unauthenticated");
    unauthError.data = {
      key: "unauthenticated",
      msg: "يرجى اعادة تسجيل الدخول",
    };
    throw unauthError;
  }

  console.log('Token found, length:', token.length);

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

  const fetchNotifications = async (page: number = 1, perPage: number = 20) => {
    try {
      const headers = buildAuthHeaders();
      console.log('Fetching notifications with headers:', { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : 'missing' });
      const response = await $fetch<NotificationsResponse>(
        'https://backend.wattani-sa.com/api/v1/notifications',
        {
          method: 'GET',
          headers: headers,
          query: {
            page,
            per_page: perPage,
          },
        }
      );

      console.log('Notifications API Response:', response);
      console.log('Response key:', response?.key);
      console.log('Response data:', response?.data);
      console.log('Response notifications:', response?.data?.notifications);

      // Check for unauthenticated response
      if (response && response.key === 'unauthenticated') {
        console.error('Notifications API returned unauthenticated:', response);
        const unauthError: any = new Error('unauthenticated');
        unauthError.data = {
          key: 'unauthenticated',
          msg: response.msg || 'يرجى اعادة تسجيل الدخول',
        };
        throw unauthError;
      }

      if (response && response.key === 'success') {
        // Check if data exists
        if (!response.data) {
          console.warn('Notifications API returned success but no data:', response);
          // Return empty structure
          return {
            notifications: { data: [], pagination: null },
            unread_count: 0
          };
        }
        
        // Check if notifications data exists
        if (!response.data.notifications) {
          console.warn('Notifications API returned success but no notifications:', response);
          return {
            notifications: { data: [], pagination: null },
            unread_count: response.data.unread_count || 0
          };
        }
        
        return response.data;
      } else {
        console.warn('Notifications API returned non-success response:', response);
        throw new Error(response?.msg || 'فشل في تحميل الإشعارات');
      }
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      console.error('Error details:', {
        message: err?.message,
        data: err?.data,
        status: err?.status,
        statusCode: err?.statusCode,
        response: err?.response,
      });
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

      // Check for unauthenticated response
      if (response && (response as any).key === 'unauthenticated') {
        console.error('Mark as read API returned unauthenticated:', response);
        const unauthError: any = new Error('unauthenticated');
        unauthError.data = {
          key: 'unauthenticated',
          msg: (response as any).msg || 'يرجى اعادة تسجيل الدخول',
        };
        throw unauthError;
      }

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

        // Check for exception response (e.g., method not allowed)
        if (response && (response as any).key === 'exception') {
          console.error('Delete notification API returned exception:', response);
          const exceptionError: any = new Error((response as any).msg || 'حدث خطأ أثناء حذف الإشعار');
          exceptionError.data = {
            key: 'exception',
            msg: (response as any).msg || 'حدث خطأ أثناء حذف الإشعار',
          };
          throw exceptionError;
        }

        // Check for unauthenticated response
        if (response && (response as any).key === 'unauthenticated') {
          console.error('Delete notification API returned unauthenticated:', response);
          const unauthError: any = new Error('unauthenticated');
          unauthError.data = {
            key: 'unauthenticated',
            msg: (response as any).msg || 'يرجى اعادة تسجيل الدخول',
          };
          throw unauthError;
        }

        return response;
      } catch (primaryErr: any) {
        // If it's an unauthenticated or exception error, don't try fallback
        if (primaryErr?.data?.key === 'unauthenticated' || 
            primaryErr?.data?.key === 'exception' ||
            (primaryErr?.response && ((primaryErr.response as any).key === 'unauthenticated' || (primaryErr.response as any).key === 'exception'))) {
          throw primaryErr;
        }
        
        // Check if it's a method not allowed error (405)
        if (primaryErr?.statusCode === 405 || primaryErr?.status === 405) {
          console.warn("Primary delete route returned 405, trying legacy route");
        } else {
          console.warn("Primary delete route failed, trying legacy route", primaryErr);
        }
        
        // Fallback to legacy route if the primary one fails (e.g., 404/405)
        const response = await $fetch(
          `https://backend.wattani-sa.com/api/v1/notifications/${notificationId}`,
          {
            method: 'DELETE',
            headers: headers,
          }
        );

        // Check for exception response in fallback
        if (response && (response as any).key === 'exception') {
          console.error('Delete notification (fallback) API returned exception:', response);
          const exceptionError: any = new Error((response as any).msg || 'حدث خطأ أثناء حذف الإشعار');
          exceptionError.data = {
            key: 'exception',
            msg: (response as any).msg || 'حدث خطأ أثناء حذف الإشعار',
          };
          throw exceptionError;
        }

        // Check for unauthenticated response in fallback
        if (response && (response as any).key === 'unauthenticated') {
          console.error('Delete notification (fallback) API returned unauthenticated:', response);
          const unauthError: any = new Error('unauthenticated');
          unauthError.data = {
            key: 'unauthenticated',
            msg: (response as any).msg || 'يرجى اعادة تسجيل الدخول',
          };
          throw unauthError;
        }

        return response;
      }

    } catch (err: any) {
      console.error('Error deleting notification:', err);
      console.error('Error details:', {
        message: err?.message,
        data: err?.data,
        status: err?.status,
        statusCode: err?.statusCode,
        response: err?.response,
      });
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

      // Check for exception response (e.g., method not allowed)
      if (response && (response as any).key === 'exception') {
        console.error('Delete all notifications API returned exception:', response);
        const exceptionError: any = new Error((response as any).msg || 'حدث خطأ أثناء حذف جميع الإشعارات');
        exceptionError.data = {
          key: 'exception',
          msg: (response as any).msg || 'حدث خطأ أثناء حذف جميع الإشعارات',
        };
        throw exceptionError;
      }

      // Check for unauthenticated response
      if (response && (response as any).key === 'unauthenticated') {
        console.error('Delete all notifications API returned unauthenticated:', response);
        const unauthError: any = new Error('unauthenticated');
        unauthError.data = {
          key: 'unauthenticated',
          msg: (response as any).msg || 'يرجى اعادة تسجيل الدخول',
        };
        throw unauthError;
      }

      return response;
    } catch (err: any) {
      console.error('Error deleting all notifications:', err);
      console.error('Error details:', {
        message: err?.message,
        data: err?.data,
        status: err?.status,
        statusCode: err?.statusCode,
        response: err?.response,
      });
      throw err;
    }
  };

  const fetchNotificationsCount = async () => {
    try {
      const headers = buildAuthHeaders();
      console.log('Fetching notifications count with headers:', { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : 'missing' });
      const response = await $fetch<NotificationsCountResponse>(
        'https://backend.wattani-sa.com/api/v1/count-notifications',
        {
          method: 'GET',
          headers: headers,
        }
      );

      console.log('Notifications Count API Response:', response);
      console.log('Response key:', response?.key);
      console.log('Response data:', response?.data);

      // Check for unauthenticated response
      if (response && response.key === 'unauthenticated') {
        console.error('Notifications Count API returned unauthenticated:', response);
        const unauthError: any = new Error('unauthenticated');
        unauthError.data = {
          key: 'unauthenticated',
          msg: response.msg || 'يرجى اعادة تسجيل الدخول',
        };
        throw unauthError;
      }

      if (response && response.key === 'success') {
        // Check if data exists
        if (!response.data) {
          console.warn('Notifications Count API returned success but no data:', response);
          // Return default count structure
          return {
            unread_count: 0,
            total_count: 0
          };
        }
        
        return response.data;
      } else {
        console.warn('Notifications Count API returned non-success response:', response);
        throw new Error(response?.msg || 'فشل في جلب عدد الإشعارات');
      }
    } catch (err: any) {
      console.error('Error fetching notifications count:', err);
      console.error('Error details:', {
        message: err?.message,
        data: err?.data,
        status: err?.status,
        statusCode: err?.statusCode,
        response: err?.response,
      });
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

