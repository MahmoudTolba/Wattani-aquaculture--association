import { defineStore } from "pinia";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  read_at?: string;
  data?: any;
}

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as Notification[],
    unreadCount: 0,
  }),
  getters: {
    hasNotifications: (state) => state.notifications.length > 0,
    unreadNotifications: (state) => 
      state.notifications.filter(n => !n.read_at),
    readNotifications: (state) => 
      state.notifications.filter(n => n.read_at),
  },
  actions: {
    setNotifications(notifications: Notification[], unreadCount?: number) {
      this.notifications = [...notifications];
      if (unreadCount !== undefined) {
        this.unreadCount = unreadCount;
      } else {
        this.unreadCount = notifications.filter(n => !n.read_at).length;
      }
    },
    addNotification(notification: Notification) {
      this.notifications.unshift(notification);
      if (!notification.read_at) {
        this.unreadCount++;
      }
    },
    markAsRead(notificationId: string) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification && !notification.read_at) {
        notification.read_at = new Date().toISOString();
        this.unreadCount = Math.max(0, this.unreadCount - 1);
      }
    },
    deleteById(notificationId: string) {
      const index = this.notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        const notification = this.notifications[index];
        if (!notification.read_at) {
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
        this.notifications.splice(index, 1);
      }
    },
    deleteAll() {
      this.notifications = [];
      this.unreadCount = 0;
    },
  },
  persist: true,
});

