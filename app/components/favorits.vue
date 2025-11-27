<template>
  <section class="favorites-section p-10 m-10">
    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-button"
        :class="{ active: activeTab === tab.key }"
        type="button"
        @click="setActiveTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Cards -->
    <div class="cards-grid">
      <article
        v-for="listing in currentListings"
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

          <div class="card__price">
            {{ listing.price }}
          </div>

          <div class="card__meta">
            <span>{{ listing.location }}</span>
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
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "#imports";

/* Tabs */
const tabs = [
  { key: "home", label: "الرئيسية" },
  { key: "benefits", label: "منافع الوطني" },
  { key: "experts", label: "خبراء وطني" },
  { key: "courses", label: "دورات وطني" },
];

/* State */
const activeTab = ref(tabs[0].key);

/* Router */
const router = useRouter();

/* Listings (mock data) */
const listingsByTab = {
  home: createListings("سنارة سمك كبيرة", "50 ر.س"),
  benefits: createListings("شبكة صيد احترافية", "120 ر.س"),
  experts: createListings("استشارة تربية أسماك", "200 ر.س"),
  courses: createListings("دورة إدارة المزارع", "350 ر.س"),
};

const currentListings = computed(
  () => listingsByTab[activeTab.value] ?? []
);

/* Methods */
function setActiveTab(key) {
  activeTab.value = key;
}

function goToDetails(listing) {
  // navigate to product page and pass the current tab in query for breadcrumb
  router.push({
    path: `/product/${encodeURIComponent(listing.id)}`,
    query: {
      from: activeTab.value,
    },
  });
}

function toggleFav(listing) {
  // placeholder: هنا تضع منطق الحفظ (API أو تغيير حالة محلية)
  console.log("toggle fav", listing.id);
}

/* Mock Data Generator */
function createListings(title, price) {
  return Array.from({ length: 4 }).map((_, index) => ({
    id: `${title.replace(/\s+/g, "-")}-${index}`,
    title,
    price,
    rating: "4.5",
    image: "/images/card-img.jpg",
    location: "مدينة الرياض",
    timeAgo: "منذ ٦ ساعات",
    owner: {
      name: "محمود عبد العزيز",
      avatar: "/images/card-user.jpg",
    },
  }));
}
</script>

<style scoped>
.favorites-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tab-button {
  font-weight: 600;
  font-size: 1rem;
  padding-bottom: 0.75rem;
  border: none;
  background: none;
  color: #6b7280;
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tab-button::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  border-radius: 100px;
  background: transparent;
  transition: background 0.2s ease;
}

.tab-button.active {
  color: #15c472;
}

.tab-button.active::after {
  background: #15c472;
}

.tab-button:hover {
  color: #15c472;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
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
  min-height: 320px;
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
  height: 170px;
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
}

.card__owner img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 640px) {
  .tabs {
    justify-content: center;
  }

  .tab-button {
    font-size: 0.95rem;
  }

  .favorites-section {
    padding: 1.25rem;
    margin: 1.25rem;
  }
}
</style>
