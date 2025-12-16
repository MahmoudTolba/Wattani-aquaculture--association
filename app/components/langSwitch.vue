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

<script setup>
const { locale, setLocale } = useI18n();

// toggle language function
const toggleLang = async () => {
  const newLang = locale.value === "ar" ? "en" : "ar";

  try {
    // Call the API to update the language preference
    await $fetch("https://backend.wattani-sa.com/api/v1/change-lang", {
      method: "PATCH",
      params: {
        lang: newLang,
        device_id: "123459", // You might want to make this dynamic
        device_type: "ios", // You might want to detect the actual device type
      },
    });

    // Only update the locale if the API call is successful
    setLocale(newLang);
  } catch (error) {
    console.error("Failed to update language:", error);
    // You might want to show an error message to the user here
  }
};
</script>

<style scoped></style>
