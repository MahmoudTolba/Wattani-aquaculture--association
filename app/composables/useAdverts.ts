// Composable for advert operations
import { ref } from 'vue';

interface ApiResponse<T = any> {
  key: string;
  msg: string;
  data?: T;
}

interface Advert {
  id: number;
  name?: string;
  name_ar?: string;
  name_en?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  price: number;
  lat?: string;
  lng?: string;
  map_desc?: string;
  city_id?: number;
  category_id?: number;
  sub_category_id?: number;
  user_id?: number;
  image?: string;
  attachment?: string;
  attachments?: Array<{ id: number; url: string }>;
  user?: any;
  category?: any;
  sub_category?: any;
  city?: any;
  average_rating?: number;
  ratings_count?: number;
  favorite?: boolean;
  follow?: boolean;
  isSpecial?: boolean;
  phone_show?: boolean;
  country_code?: string;
  date?: string;
  status?: boolean;
  package_name?: string | null;
  similarAdvert?: any[];
  comments?: any[];
}

interface PaginationData {
  total_items: number;
  count_items: number;
  per_page: number;
  total_pages: number;
  current_page: number;
  next_page_url: string | null;
  perv_page_url: string | null;
}

interface AdvertsListResponse {
  pagination: PaginationData;
  data: Advert[];
}

interface Rating {
  id: number;
  user_id: number;
  advert_id: number;
  rate: number;
  comment?: string;
  created_at?: string;
  user?: any;
}

interface RatingsResponse {
  pagination: PaginationData;
  data: Rating[];
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
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
const buildAuthHeaders = (includeContentType: boolean = true): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const useAdverts = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Get user's adverts
  const getMyAdverts = async (): Promise<Advert[]> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse<Advert[]>>(
        'https://backend.wattani-sa.com/api/v1/my-adverts',
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        const adverts = Array.isArray(response.data) ? response.data : [];
        return adverts;
      } else {
        throw new Error(response?.msg || 'فشل في جلب الإعلانات');
      }
    } catch (err: any) {
      console.error('Error fetching my adverts:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء جلب الإعلانات';
      
      if (err?.data?.key === 'unauthenticated') {
        error.value = 'يرجى إعادة تسجيل الدخول';
      }
      
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Get single advert by ID
  const getAdvert = async (advertId: number): Promise<Advert> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse<Advert>>(
        `https://backend.wattani-sa.com/api/v1/advert/${advertId}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في جلب الإعلان');
      }
    } catch (err: any) {
      console.error('Error fetching advert:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء جلب الإعلان';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Create new advert
  const createAdvert = async (formData: FormData): Promise<Advert> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Don't set Content-Type for FormData, browser will set it with boundary
      
      const response = await $fetch<ApiResponse<Advert>>(
        'https://backend.wattani-sa.com/api/v1/advert/store',
        {
          method: 'POST',
          headers,
          body: formData,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في إنشاء الإعلان');
      }
    } catch (err: any) {
      console.error('Error creating advert:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء إنشاء الإعلان';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Update advert
  const updateAdvert = async (advertId: number, formData: FormData): Promise<Advert> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Add _method=put to formData if not already present
      if (!formData.has('_method')) {
        formData.append('_method', 'put');
      }
      
      const response = await $fetch<ApiResponse<Advert>>(
        `https://backend.wattani-sa.com/api/v1/update-advert/${advertId}?_method=put`,
        {
          method: 'PUT',
          headers,
          body: formData,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في تحديث الإعلان');
      }
    } catch (err: any) {
      console.error('Error updating advert:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء تحديث الإعلان';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Delete advert
  const deleteAdvert = async (advertId: number): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse>(
        `https://backend.wattani-sa.com/api/v1/delete-advert/${advertId}`,
        {
          method: 'DELETE',
          headers,
        }
      );

      if (response && response.key === 'success') {
        return;
      } else {
        throw new Error(response?.msg || 'فشل في حذف الإعلان');
      }
    } catch (err: any) {
      console.error('Error deleting advert:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء حذف الإعلان';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Get advert ratings
  const getAdvertRatings = async (advertId: number, page: number = 1, perPage: number = 15): Promise<RatingsResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse<RatingsResponse>>(
        `https://backend.wattani-sa.com/api/v1/advert/${advertId}/rates?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في جلب التقييمات');
      }
    } catch (err: any) {
      console.error('Error fetching ratings:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء جلب التقييمات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Search adverts
  const searchAdverts = async (
    params: {
      sub_category_id?: number;
      category_id?: number;
      city_id?: number;
      search?: string;
      page?: number;
      per_page?: number;
    } = {}
  ): Promise<AdvertsListResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const queryParams = new URLSearchParams();
      
      if (params.sub_category_id) queryParams.append('sub_category_id', params.sub_category_id.toString());
      if (params.category_id) queryParams.append('category_id', params.category_id.toString());
      if (params.city_id) queryParams.append('city_id', params.city_id.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.per_page) queryParams.append('per_page', params.per_page.toString());
      
      const queryString = queryParams.toString();
      const url = `https://backend.wattani-sa.com/api/v1/adverts/search${queryString ? `?${queryString}` : ''}`;
      
      const response = await $fetch<ApiResponse<AdvertsListResponse>>(
        url,
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في البحث عن الإعلانات');
      }
    } catch (err: any) {
      console.error('Error searching adverts:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء البحث عن الإعلانات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Get adverts by category
  const getAdvertsByCategory = async (
    categoryId: number,
    page: number = 1,
    perPage: number = 15
  ): Promise<AdvertsListResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse<AdvertsListResponse>>(
        `https://backend.wattani-sa.com/api/v1/adverts/by/category/${categoryId}?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في جلب الإعلانات');
      }
    } catch (err: any) {
      console.error('Error fetching adverts by category:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء جلب الإعلانات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Get adverts by subcategory
  const getAdvertsBySubcategory = async (
    subcategoryId: number,
    page: number = 1,
    perPage: number = 15
  ): Promise<AdvertsListResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ApiResponse<AdvertsListResponse>>(
        `https://backend.wattani-sa.com/api/v1/adverts/by/subcategory/${subcategoryId}?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في جلب الإعلانات');
      }
    } catch (err: any) {
      console.error('Error fetching adverts by subcategory:', err);
      error.value = err?.data?.msg || err?.message || 'حدث خطأ أثناء جلب الإعلانات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    getMyAdverts,
    getAdvert,
    createAdvert,
    updateAdvert,
    deleteAdvert,
    getAdvertRatings,
    searchAdverts,
    getAdvertsByCategory,
    getAdvertsBySubcategory,
  };
};

