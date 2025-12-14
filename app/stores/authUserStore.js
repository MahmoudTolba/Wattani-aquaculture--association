import { defineStore } from "pinia";
import { ref } from "vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useAuthStore = defineStore(
  "auth",
  () => {
    const authUser = ref(null);
    const token = ref("");
    const routeFrom = ref("");
    const phone = ref("");
    const deviceId = ref(null);
    const contactInfo = ref({});

    const updateUserData = (data) => {
      authUser.value = data;
      if (data == null) {
        token.value = "";
        routeFrom.value = "";
      }
    };

    const setRouteFrom = (route) => {
      routeFrom.value = route;
    };
    const setPhone = (newPhone) => {
      phone.value = String(newPhone ?? "").trim();
    };
    const setDeviceId = (id) => {
      deviceId.value = id;
    };
    const setContactInfo = (info) => {
      contactInfo.value = info;
    };

    return {
      authUser,
      token,
      updateUserData,
      routeFrom,
      setRouteFrom,
      phone,
      setPhone,
      deviceId,
      setDeviceId,
      contactInfo,
      setContactInfo,
    };
  },
//   {
//     persist: {
//       storage: piniaPluginPersistedstate.cookies(),
//     },
//   }
);
