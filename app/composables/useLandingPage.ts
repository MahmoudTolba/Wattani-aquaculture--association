import { ref } from 'vue';

interface Slider {
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
  start_date: string;
  end_date: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  type: {
    id: number;
    name: string;
    title: string;
  };
}

interface LandingPageData {
  logo?: string;
  landing_page_image?: string;
  about?: {
    title: string;
    content: string;
  };
  platform_about?: {
    title: string;
    content: string;
  };
  landing_text?: {
    title: string;
    content: string;
  };
  app_links?: {
    app_store: string;
    google_play: string;
  };
  sliders?: Slider[];
  categories?: Category[];
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
      // Fetch from both endpoints and merge the data
      const [landingPageResponse, homeResponse] = await Promise.allSettled([
        $fetch<LandingPageResponse>(
          'https://backend.wattani-sa.com/api/v1/landing-page',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ),
        $fetch<LandingPageResponse>(
          'https://backend.wattani-sa.com/api/v1/home',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ),
      ]);

      // Merge data from both endpoints
      const mergedData: LandingPageData = {};

      // Get landing page data (about, platform_about, app_links, landing_text, landing_page_image, logo)
      if (landingPageResponse.status === 'fulfilled' && landingPageResponse.value?.key === 'success' && landingPageResponse.value.data) {
        Object.assign(mergedData, landingPageResponse.value.data);
      }

      // Get home data (sliders, categories)
      if (homeResponse.status === 'fulfilled' && homeResponse.value?.key === 'success' && homeResponse.value.data) {
        if (homeResponse.value.data.sliders) {
          mergedData.sliders = homeResponse.value.data.sliders;
        }
        if (homeResponse.value.data.categories) {
          mergedData.categories = homeResponse.value.data.categories;
        }
        // Also merge any other fields from home that might be useful
        if (homeResponse.value.data.platform_about) {
          mergedData.platform_about = homeResponse.value.data.platform_about;
        }
        if (homeResponse.value.data.app_links) {
          mergedData.app_links = homeResponse.value.data.app_links;
        }
      }

      // If we got data from at least one endpoint, use it
      if (Object.keys(mergedData).length > 0) {
        landingPageData.value = mergedData;
        return mergedData;
      } else {
        // If both failed, throw an error
        const landingError = landingPageResponse.status === 'rejected' ? landingPageResponse.reason : null;
        const homeError = homeResponse.status === 'rejected' ? homeResponse.reason : null;
        throw new Error('فشل في تحميل بيانات الصفحة الرئيسية');
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

