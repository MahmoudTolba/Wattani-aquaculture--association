import { ref } from 'vue';

interface LandingPageData {
  logo: string;
  landing_page_image: string;
  about: {
    title: string;
    content: string;
  };
  platform_about: {
    title: string;
    content: string;
  };
  landing_text: {
    title: string;
    content: string;
  };
  app_links: {
    app_store: string;
    google_play: string;
  };
}

interface LandingPageResponse {
  key: string;
  msg: string;
  data: LandingPageData;
}

const landingPageData = ref<LandingPageData | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

export const useLandingPage = () => {
  const fetchLandingPageData = async () => {
    // Return cached data if already loaded
    if (landingPageData.value) {
      return landingPageData.value;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<LandingPageResponse>(
        'https://backend.wattani-sa.com/api/v1/landing-page',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.key === 'success' && response.data) {
        landingPageData.value = response.data;
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في تحميل بيانات الصفحة الرئيسية');
      }
    } catch (err: any) {
      console.error('Error fetching landing page data:', err);
      error.value =
        err?.data?.message ||
        err?.message ||
        err?.data?.msg ||
        'حدث خطأ أثناء تحميل بيانات الصفحة الرئيسية. الرجاء المحاولة مرة أخرى.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    landingPageData,
    isLoading,
    error,
    fetchLandingPageData,
  };
};

