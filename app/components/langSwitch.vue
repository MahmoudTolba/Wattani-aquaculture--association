<template>
  <div>
    <button
      @click="toggleLang"
      class="flex items-center gap-3 rounded-xl border border-[#15c472] px-5 py-2 text-sm text-dark/70 cursor-pointer"
    >
      {{ locale === "ar" ? "EN" : "عربي" }}
      <img src="/icons/translate-icon.svg" class="w-5 h-5" alt="translate" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    
    let token = userStore.token || authStore.authUser?.token || authStore.token;
    
    if (!token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || parsedUser?.access_token;
      }
    }
    
    return token;
  } catch (e) {
    console.error('Error getting token:', e);
    return null;
  }
};

// Helper function to build auth headers
const buildAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': '5f43766dcd92b8c3e7639d2a8791063c',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// toggle language function
const toggleLang = async () => {
  const newLang = locale.value === "ar" ? "en" : "ar";

  // Always update the locale locally first (for better UX)
  setLocale(newLang);

  // Try to sync with backend if user is authenticated
  const token = getAuthToken();
  if (!token) {
    // User is not authenticated, just update locale locally
    console.log('User not authenticated, language changed locally only');
    return;
  }

  try {
    // Call the API to update the language preference on the server
    const headers = buildAuthHeaders();
    await $fetch("https://backend.wattani-sa.com/api/v1/change-lang", {
      method: "PATCH",
      headers: headers,
      params: {
        lang: newLang,
        device_id: "123459", // You might want to make this dynamic
        device_type: "ios", // You might want to detect the actual device type
      },
    });
    console.log('Language preference updated on server');
  } catch (error: any) {
    // Log error but don't prevent language change
    console.error("Failed to update language on server:", error);
    // The language has already been changed locally, so the user experience is not affected
  }
};
</script>

<style scoped></style>
