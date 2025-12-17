interface FavoriteAdvert {
  id: string;
  title: string;
  price?: string;
  rating?: string;
  image?: string;
  location?: string;
  timeAgo?: string;
  owner?: {
    name: string;
    avatar: string;
  };
  isFav?: boolean;
  [key: string]: any;
}

interface FavoritesResponse {
  key: string;
  msg: string;
  data: {
    favorites?: {
      data: FavoriteAdvert[];
      pagination?: {
        total_items: number;
        count_items: number;
        per_page: number;
        total_pages: number;
        current_page: number;
        next_page_url: string;
        perv_page_url: string;
      };
    };
    adverts?: FavoriteAdvert[];
    data?: FavoriteAdvert[];
  };
}

interface ToggleFavoriteResponse {
  key: string;
  msg: string;
  data?: any;
}

const buildAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  let token: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || parsedUser?.access_token;
      }
    } catch (e) {
      console.error("Error getting token from localStorage:", e);
    }
  }

  if (!token) {
    const unauthError: any = new Error("unauthenticated");
    unauthError.data = {
      key: "unauthenticated",
      msg: "يرجى اعادة تسجيل الدخول",
    };
    throw unauthError;
  }

  headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const useFavorites = () => {
  const fetchFavorites = async (page: number = 1, perPage: number = 20) => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<FavoritesResponse>(
        'https://backend.wattani-sa.com/api/v1/favorites/advert',
        {
          method: 'GET',
          headers: headers,
          query: {
            page,
            per_page: perPage,
          },
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في تحميل المفضلة');
      }
    } catch (err: any) {
      console.error('Error fetching favorites:', err);
      throw err;
    }
  };

  const toggleFavorite = async (advertId: string | number) => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ToggleFavoriteResponse>(
        `https://backend.wattani-sa.com/api/v1/toggle-favorite/advert/${advertId}`,
        {
          method: 'POST',
          headers: headers,
        }
      );

      if (response && response.key === 'success') {
        return response;
      } else {
        throw new Error(response?.msg || 'فشل في تحديث المفضلة');
      }
    } catch (err: any) {
      console.error('Error toggling favorite:', err);
      throw err;
    }
  };

  return {
    fetchFavorites,
    toggleFavorite,
  };
};

