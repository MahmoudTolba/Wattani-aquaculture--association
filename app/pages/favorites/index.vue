<template>
  <div>
    <div class="min-h-screen p-10">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">المفضلة</h1>
      
      <!-- Cards Grid -->
      <div class="cards-grid mb-8">
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
              aria-label="حفظ الإعلان"
              @click.stop="toggleFav(listing)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="heart-icon"
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
      <div class="flex justify-center">
        <Paginator
          :rows="rows"
          :total-records="totalListings"
          :first="first"
          @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          class="p-paginator"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "#imports";
import Paginator from "primevue/paginator";

const router = useRouter();

// Pagination State
const rows = ref(12); // Items per page
const first = ref(0); // First item index

// Mock Data Generator
function createListings(title, price) {
  return Array.from({ length: 24 }).map((_, index) => ({
    id: `${title.replace(/\s+/g, "-")}-${index}`,
    title,
    price: `${price}`,
    rating: "4.5",
    image: "/images/card-img.jpg",
    location: "مدينة الرياض",
    timeAgo: index === 1 ? "منذ 7 ساعات" : "منذ ٦ ساعات",
    owner: {
      name: "محمود عبد العزيز",
      avatar: "/images/card-user.jpg",
    },
    isFav: true,
  }));
}

// All listings
const allListings = createListings("سنارة سمك كبيرة", "50");

// Total listings count
const totalListings = computed(() => allListings.length);

// Paginated listings
const paginatedListings = computed(() => {
  const end = first.value + rows.value;
  return allListings.slice(first.value, end);
});

// Pagination handler
const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
  // Scroll to top when page changes
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Methods
function goToDetails(listing) {
  router.push({
    path: `/product/${encodeURIComponent(listing.id)}`,
  });
}

function toggleFav(listing) {
  // Toggle favorite status
  listing.isFav = !listing.isFav;
  console.log("toggle fav", listing.id, listing.isFav);
}
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