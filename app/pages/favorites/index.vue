<template>
  <div>
    <Toast position="top-center" />
    <div class="min-h-screen p-10">
      <h1 class="text-3xl font-bold mb-8 text-gray-800" :class="isRTL ? 'text-right' : 'text-left'">
        {{ t('favorites.title') }}
      </h1>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        <p class="text-gray-500 mt-4">{{ t('favorites.loading') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="() => loadFavorites(1)"
          class="bg-gradient-to-r from-[#00a859] to-[#15c472] text-white py-2 px-6 rounded-lg hover:opacity-90 transition"
        >
          {{ t('favorites.retry') }}
        </button>
      </div>

      <!-- Cards Grid -->
      <div v-else>
        <div v-if="listings.length === 0" class="text-center py-12">
          <p class="text-gray-400 text-lg">{{ t('favorites.empty') }}</p>
        </div>
        
        <div v-else class="cards-grid mb-8">
        <article
          v-for="listing in paginatedListings"
          :key="listing.id"
          class="card cursor-pointer"
          @click="goToDetails(listing)"
        >
          <div class="card__image-wrapper">
            <img
              :src="listing.image"
              :alt="listing.title"
              class="card__image"
            />
            <button
              class="card__fav"
              type="button"
              :aria-label="t('favorites.save_ad')"
              @click.stop="toggleFav(listing)"
              :disabled="isToggling === (listing.id || listing.advert_id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="heart-icon"
                :class="listing.isFav ? 'text-[#15C472] fill-current' : 'text-gray-400'"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z"
                />
              </svg>
            </button>
          </div>

          <div class="card__content">
            <div class="card__rating flex items-center justify-between gap-2">
              <h3 class="card__title m-0">
                {{ listing.title }}
              </h3>
              <div class="flex items-center gap-1">
                <span class="card__rating-star">★</span>
                <span class="card__rating-value">
                  {{ listing.rating }}
                </span>
              </div>
            </div>

            <div class="card__price flex items-center gap-1">
              <span>{{ listing.price }}</span>
              <img
                src="/icons/green-currency.svg"
                alt="currency"
                class="w-4 h-4"
              />
            </div>

            <div class="card__meta">
              <span class="flex items-center gap-1">
                <span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                {{ listing.location }}
              </span>
              <span class="dot" />
              <span>{{ listing.timeAgo }}</span>
            </div>

            <div class="card__owner">
              <img
                :src="listing.owner.avatar"
                :alt="listing.owner.name"
              />
              <span>{{ listing.owner.name }}</span>
            </div>
          </div>
        </article>
        </div>

        <!-- Pagination -->
        <div v-if="totalListings > rows" class="flex justify-center">
          <Paginator
            :rows="rows"
            :totalRecords="totalListings"
            :first="(currentPage - 1) * rows"
            @page="onPageChange"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            class="p-paginator"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#imports";
import Paginator from "primevue/paginator";
import Toast from "primevue/toast";
import { useFavorites } from "~/composables/useFavorites";
import { useToast } from "primevue/usetoast";

const { t, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

const router = useRouter();
const { fetchFavorites, toggleFavorite } = useFavorites();
const toast = useToast();

// State
const listings = ref<any[]>([]);
const rows = ref(12); // Items per page
const currentPage = ref(1);
const totalListings = ref(0);
const pagination = ref<any>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const isToggling = ref<string | null>(null); // Track which item is being toggled

// Paginated listings
const paginatedListings = computed(() => listings.value);

// Load favorites from API
const loadFavorites = async (page: number = currentPage.value) => {
  isLoading.value = true;
  error.value = null;
  currentPage.value = page;

  try {
    const data = await fetchFavorites(page, rows.value);
    console.log("Favorites API Response:", data);
    
    // Handle different possible data structures
    let favoritesArray: any[] = [];
    const dataObj = data as any;
    
    if (dataObj.favorites) {
      if (Array.isArray(dataObj.favorites)) {
        favoritesArray = dataObj.favorites;
      } else if (dataObj.favorites.data && Array.isArray(dataObj.favorites.data)) {
        favoritesArray = dataObj.favorites.data;
        pagination.value = dataObj.favorites.pagination || null;
      }
    } else if (dataObj.adverts && Array.isArray(dataObj.adverts)) {
      favoritesArray = dataObj.adverts;
    } else if (dataObj.data && Array.isArray(dataObj.data)) {
      favoritesArray = dataObj.data;
    }
    
    // Map API data to component format
    listings.value = favoritesArray.map((item: any) => ({
      id: item.id || item.advert_id,
      title: item.title || item.name || t('favorites.fallbacks.title'),
      price: item.price || item.price_per_unit || '0',
      rating: item.rating || item.rate || "4.5",
      image: item.image || item.photo || item.thumbnail || "/images/card-img.jpg",
      location: item.location || item.city || item.address || t('favorites.fallbacks.location'),
      timeAgo: item.created_at ? formatTimeAgo(item.created_at) : t('favorites.fallbacks.time'),
      owner: {
        name: item.owner?.name || item.user?.name || item.seller?.name || t('favorites.fallbacks.user'),
        avatar: item.owner?.avatar || item.user?.avatar || item.seller?.avatar || "/images/card-user.jpg",
      },
      isFav: true, // All items in favorites are favorited
      ...item, // Keep original data
    }));
    
    pagination.value = pagination.value || dataObj.pagination || null;
    totalListings.value = pagination.value?.total_items || favoritesArray.length || listings.value.length;

    console.log("Loaded favorites count:", listings.value.length);
    console.log("Total records:", totalListings.value);
  } catch (err: any) {
    console.error("Error loading favorites:", err);
    const isUnauthenticated =
      err?.data?.key === "unauthenticated" ||
      err?.data?.msg?.includes("يرجى اعادة تسجيل الدخول") ||
      err?.data?.msg?.includes("Please login");
    
    error.value = isUnauthenticated
      ? t('favorites.errors.unauthenticated')
      : err?.data?.msg ||
        err?.message ||
        t('favorites.errors.load_error');
    
    toast.add({
      severity: "error",
      summary: t('favorites.toast.error'),
      detail: error.value,
      life: 3000,
    });

    if (isUnauthenticated) {
      setTimeout(() => {
        navigateTo("/login");
      }, 500);
    }
  } finally {
    isLoading.value = false;
  }
};

// Toggle favorite
const toggleFav = async (listing: any) => {
  const listingId = listing.id || listing.advert_id;
  if (!listingId) {
    toast.add({
      severity: "error",
      summary: t('favorites.toast.error'),
      detail: t('favorites.errors.ad_id_missing'),
      life: 3000,
    });
    return;
  }

  isToggling.value = listingId;
  
  try {
    await toggleFavorite(listingId);
    
    // Remove from favorites list (since it's now unfavorited)
    listings.value = listings.value.filter(item => (item.id || item.advert_id) !== listingId);
    totalListings.value = Math.max(0, totalListings.value - 1);
    
    toast.add({
      severity: "success",
      summary: t('favorites.toast.success'),
      detail: t('favorites.success.removed'),
      life: 2000,
    });
    
    // If current page is empty and not first page, go to previous page
    if (listings.value.length === 0 && currentPage.value > 1) {
      await loadFavorites(currentPage.value - 1);
    }
  } catch (err: any) {
    console.error("Error toggling favorite:", err);
    toast.add({
      severity: "error",
      summary: t('favorites.toast.error'),
      detail: err?.data?.msg || err?.message || t('favorites.errors.update_error'),
      life: 3000,
    });
  } finally {
    isToggling.value = null;
  }
};

// Format time ago
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return t('favorites.fallbacks.time');
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return t('notifications.date.now');
  if (diffMins < 60) return t('notifications.date.minutes_ago', { count: diffMins });
  if (diffHours < 24) return t('notifications.date.hours_ago', { count: diffHours });
  if (diffDays < 7) return t('notifications.date.days_ago', { count: diffDays });
  
  const localeCode = isRTL.value ? 'ar-SA' : 'en-US';
  return date.toLocaleDateString(localeCode, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Pagination handler
const onPageChange = async (event: any) => {
  rows.value = event.rows;
  const newPage = Math.floor(event.first / event.rows) + 1;
  await loadFavorites(newPage);
  // Scroll to top when page changes
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Methods
function goToDetails(listing: any) {
  router.push({
    path: `/product/${encodeURIComponent(listing.id || listing.advert_id)}`,
  });
}

// Load favorites on mount
onMounted(() => {
  loadFavorites(1);
});
</script>

<style scoped>
/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Card */
.card {
  border-radius: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: #fff;
  box-shadow: 0 10px 30px rgba(15, 146, 114, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(15, 146, 114, 0.12);
}

/* Image */
.card__image-wrapper {
  position: relative;
}

.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

/* Favorite button */
.card__fav {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #00a859;
  border: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.card__fav:active {
  transform: scale(0.96);
}

.heart-icon {
  width: 22px;
  height: 22px;
}

/* Content */
.card__content {
  padding: 1rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1 1 auto;
}

.card__rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #f59e0b;
}

.card__rating-star {
  font-size: 1.05rem;
  color: #fbbf24;
}

.card__rating-value {
  font-weight: 600;
  color: #6b7280;
}

.card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0.25rem 0;
}

.card__price {
  color: #15c472;
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d1d5db;
  display: inline-block;
}

.card__owner {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.card__owner img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

/* PrimeVue Paginator Custom Styles */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background: #f3f4f6;
  border-color: #15c472;
  color: #15c472;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #15c472;
  border-color: #15c472;
  color: #fff;
}

:deep(.p-paginator .p-paginator-first,
      .p-paginator .p-paginator-prev,
      .p-paginator .p-paginator-next,
      .p-paginator .p-paginator-last) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-first:hover,
      .p-paginator .p-paginator-prev:hover,
      .p-paginator .p-paginator-next:hover,
      .p-paginator .p-paginator-last:hover) {
  background: #f3f4f6;
  border-color: #15c472;
  color: #15c472;
}

:deep(.p-paginator .p-paginator-first.p-disabled,
      .p-paginator .p-paginator-prev.p-disabled,
      .p-paginator .p-paginator-next.p-disabled,
      .p-paginator .p-paginator-last.p-disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .min-h-screen {
    padding: 1.25rem;
  }
}
</style>