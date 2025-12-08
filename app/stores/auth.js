import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // logged-in user
    mockUsers: [], // mock registered users
  }),

  actions: {
    // Register user (mock)
    registerUser(data) {
      this.mockUsers.push(data);
    },

    // Login (mock)
    login(phone, password) {
      const user = this.mockUsers.find(
        (u) => u.phone === phone && u.password === password
      );

      if (!user) return false;

      this.user = { ...user }; // copy data
      return true;
    },

    // Update settings
    updateUser(newData) {
      this.user = { ...this.user, ...newData };
    },

    // Logout
    logout() {
      this.user = null;
    },
  },

  persist: true, // keep user logged in on refresh
});
