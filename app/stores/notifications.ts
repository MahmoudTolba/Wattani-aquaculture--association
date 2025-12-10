import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [
      " إشعار بتغيير حالة الدورة ",
      " إشعار بتغيير حالة الدورة ",
      " إشعار بتغيير حالة الدورة ",
      " إشعار بتغيير حالة الدورة ",
      " إشعار بتغيير حالة الدورة ",
      " إشعار بتغيير حالة الدورة ",
      "إشعار تجريبي السابع",
      "إشعار تجريبي الثامن",
    ] as string[],
  }),
  getters: {
    hasNotifications: (state) => state.notifications.length > 0,
  },
  actions: {
    setNotifications(list: string[]) {
      this.notifications = [...list];
    },
    addNotification(text: string) {
      this.notifications.unshift(text);
    },
    deleteSingle(index: number) {
      if (index >= 0 && index < this.notifications.length) {
        this.notifications.splice(index, 1);
      }
    },
    deleteAll() {
      this.notifications = [];
    },
  },
  persist: true,
});

