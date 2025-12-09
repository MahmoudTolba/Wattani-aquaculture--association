<template>
  <div>
    <div class="mt-8">
      <div>
        <div class="privacy-policy">
          <div class="container">
            <!-- Loading State -->
            <div v-if="isLoading" class="policy-content bg-white p-6 rounded-md shadow-md">
              <div class="flex items-center justify-center min-h-[400px]">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a9687] mb-4"></div>
                  <p class="text-gray-600">جاري التحميل...</p>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="policy-content bg-white p-6 rounded-md shadow-md">
              <div class="text-center py-8">
                <p class="text-red-600 mb-4">{{ error }}</p>
                <button
                  @click="fetchSupportContent"
                  class="px-6 py-2 bg-[#0a9687] text-white rounded-md hover:bg-[#088a7b] transition"
                >
                  إعادة المحاولة
                </button>
              </div>
            </div>

            <!-- Content -->
            <div v-else-if="supportData" class="policy-content bg-white p-6 rounded-md shadow-md">
              <h1 class="text-center mb-6 text-3xl font-bold text-gray-800">
                عن المنصة
              </h1>
              <p class="mb-4 text-right leading-[44px] text-gray-700">
                {{ supportData }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive state
const isLoading = ref(false);
const error = ref(null);
const supportData = ref(null);

// Fetch support content from API
const fetchSupportContent = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await $fetch('https://backend.wattani-sa.com/api/v1/about', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // API response structure: { key: "success", msg: "...", data: "..." }
    if (response && response.key === 'success' && response.data) {
      supportData.value = response.data;
    } else {
      throw new Error(response?.msg || 'فشل في تحميل المحتوى');
    }
  } catch (err) {
    console.error('Error fetching support content:', err);
    error.value = err?.data?.message || err?.message || err?.data?.msg || 'حدث خطأ أثناء تحميل المحتوى. الرجاء المحاولة مرة أخرى.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch content on component mount
onMounted(() => {
  fetchSupportContent();
});
</script>

<style scoped>
.privacy-policy {
  direction: rtl;
  min-height: calc(100vh - 150px);
  padding: 2rem 0;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.policy-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

h1 {
  color: #1a365d;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 1rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .policy-content {
    padding: 1.5rem;
  }
}
</style>
