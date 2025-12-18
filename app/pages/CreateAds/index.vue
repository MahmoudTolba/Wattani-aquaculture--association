<template>
  <div class="parent">
    <div>
      <section class="mt-10 mx-6 p-6 md:p-10">
        <div class="flex flex-col items-start gap-2">
          <h1 class="text-2xl md:text-[28px] font-semibold text-gray-900">
            {{ isEditMode ? "تعديل الإعلان" : $t("create-ads.title") }}
          </h1>
        </div>

        <form class="mt-10 space-y-8" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.department") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <select
              v-model="form.categoryId"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              <option value="" disabled>{{ $t("create-ads.department_placeholder") }}</option>
              <option
                v-for="option in departments"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              تحديد القسم الفرعي
              <span class="text-red-500 ms-1">*</span>
            </div>
            <select
              v-model="form.subCategoryId"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
              :disabled="!form.categoryId || isLoadingSubCategories"
            >
              <option value="" disabled>
                {{ isLoadingSubCategories ? "جاري التحميل..." : (!form.categoryId ? "اختر القسم أولاً" : (subCategories.length ? "اختر القسم الفرعي" : "لا توجد أقسام فرعية")) }}
              </option>
              <option
                v-for="option in subCategories"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <p v-if="form.categoryId && !isLoadingSubCategories && !subCategories.length" class="text-xs text-red-500">
              لا توجد أقسام فرعية متاحة لهذا القسم. يرجى اختيار قسم آخر.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
              {{ $t("create-ads.title_ar") }}
                <span class="text-red-500 ms-1">*</span>
              </div>
              <input
                v-model="form.titleAr"
                type="text"
                :placeholder="$t('create-ads.title_ar_placeholder')"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              />
            </div>

            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
              {{ $t("create-ads.title_en") }}
                <span class="text-red-500 ms-1">*</span>
              </div>
              <input
                v-model="form.titleEn"
                type="text"
                :placeholder="$t('create-ads.title_en_placeholder')"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.cost") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <input
              v-model="form.price"
              type="text"
              :placeholder="$t('create-ads.cost_placeholder')"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            />
          </div>

          <div class="grid grid-cols-1">
            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
              {{ $t("create-ads.city") }}
                <span class="text-red-500 ms-1">*</span>
              </div>
              <select
                v-model="form.cityId"
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              >
                <option value="" disabled>{{ $t("create-ads.city_placeholder") }}</option>
                <option
                  v-for="option in cities"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.location") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <div class="relative">
              <span
                class="absolute inset-y-0 end-4 flex items-center text-sm text-gray-400"
                aria-hidden="true"
              >
                <img src="/icons/location-icon.svg" alt="location" class="" />
              </span>
              <input
                v-model="form.location"
                type="text"
                :placeholder="$t('create-ads.location_placeholder')"
                class="w-full rounded-xl border border-gray-200 pe-10 ps-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                readonly
                @click="openLocationModal"
                @keydown.enter.prevent="openLocationModal"
                role="button"
                :aria-expanded="isLocationModalOpen"
                aria-haspopup="dialog"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.description_ar") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <textarea
              v-model="form.descriptionAr"
              rows="5"
              :placeholder="$t('create-ads.description_ar_placeholder')"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            ></textarea>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.description_en") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <textarea
              v-model="form.descriptionEn"
              rows="5"
              :placeholder="$t('create-ads.description_en_placeholder')"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            ></textarea>
          </div>

          <div class="space-y-3">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.ad_image") }}
              <span class="text-red-500 ms-1">*</span>
            </div>
            <label
              class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200"
            >
              <input
                type="file"
                accept="image/*"
                class="sr-only"
                @change="handleAdImageChange"
              />
              <template v-if="adImagePreview">
                <img
                  :src="adImagePreview"
                  alt="ad preview"
                  class="h-24 w-24 rounded-xl object-cover"
                />
              </template>
              <template v-else>
                <span class="flex items-center justify-center text-5xl">
                  <img
                    src="/icons/upload-icon.svg"
                    alt="upload"
                    class="w-6 h-6"
                  />
                </span>
                <span class="mt-3 text-sm font-medium text-gray-600">
                  {{ adImageLabel }}
                </span>
              </template>
            </label>
          </div>

          <div class="space-y-3">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              {{ $t("create-ads.gallery_images") }}
              <span class="text-xs text-gray-500 ms-2">(يحد اقصي 5 صور)</span>
            </div>
            <label
              class="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-4 text-gray-500 cursor-pointer transition hover:border-primary-200"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                class="sr-only"
                @change="handleGalleryImagesChange"
              />
              <template v-if="galleryPreviews.length">
                <div class="flex gap-2 overflow-hidden">
                  <img
                    v-for="(preview, index) in galleryPreviews"
                    :key="`preview-${index}`"
                    :src="preview"
                    alt="gallery preview"
                    class="h-16 w-16 rounded-lg object-cover"
                  />
                </div>
              </template>
              <template v-else>
                <span class="flex items-center justify-center text-2xl">
                  <img
                    src="/icons/upload-icon.svg"
                    alt="upload"
                    class="h-6 w-6"
                  />
                </span>
                <span class="mt-3 text-sm font-medium text-gray-600">
                  {{ galleryImagesLabel }}
                </span>
              </template>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="w-full">
            <button
              type="submit"
              :disabled="isLoading || isAdvertLoading"
              class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading || isAdvertLoading ? "جاري الإرسال..." : (isEditMode ? "تحديث الإعلان" : $t("create-ads.submit")) }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>

  <LocationModal
    v-model="isLocationModalOpen"
    @confirm="handleLocationConfirm"
  />
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import LocationModal from "~/components/modals/LocationModal.vue";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/user";
import { useAuthStore } from "~/stores/authUserStore";
import { useMyAds } from "~/composables/useMyAds";
import { useAuth } from "~/composables/useAuth";
import { useAdverts } from "~/composables/useAdverts";

const toast = useToast();
const userStore = useUserStore();
const authStore = useAuthStore();
const { addAd, updateAd } = useMyAds();
const { user } = useAuth();
const {
  getAdvert,
  createAdvert,
  updateAdvert,
  deleteAdvert,
  isLoading: isAdvertLoading,
} = useAdverts();

// Get route to check if we're editing
const route = useRoute();
const router = useRouter();
const isEditMode = computed(() => !!route.query.id);
const advertId = computed(() => route.query.id ? Number(route.query.id) : null);

// Categories/Departments - IMPORTANT: Update these with actual numeric IDs from your database
// The API expects category_id to exist in the categories table
// You can find the correct IDs by checking your database or API response
const departments = ref([
  { label: "العميل", value: "1" }, // TODO: Replace with actual category ID
  { label: "المشاريع", value: "2" }, // TODO: Replace with actual category ID
  { label: "الخدمات", value: "3" }, // TODO: Replace with actual category ID
]);

// Cities - IMPORTANT: Update these with actual numeric IDs from your database
// The API expects city_id to exist in the regions table (based on validation: exists:regions,id)
const cities = ref([
  { label: "الرياض", value: "48" }, // Example: Using 48 as shown in API example
  { label: "جدة", value: "2" }, // TODO: Replace with actual region/city ID
  { label: "الدمام", value: "3" }, // TODO: Replace with actual region/city ID
]);

// Sub-categories - Update these with actual numeric IDs from your database
// You can make this dynamic based on selected category
const subCategories = ref([]);
const isLoadingSubCategories = ref(false);

// Fetch categories from API (if endpoint exists)
const fetchCategories = async () => {
  try {
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
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

    // Try to fetch categories from API
    // Update the endpoint if your API has a categories endpoint
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/categories",
      {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    ).catch(() => null);

    if (response && response.key === "success" && response.data) {
      const categories = Array.isArray(response.data) ? response.data : [];
      console.log("Categories response:", categories);
      departments.value = categories.map((cat) => ({
        label: cat.name_ar || cat.name || cat.title_ar || cat.title,
        value: cat.id?.toString() || cat.category_id?.toString(),
      }));
    }
  } catch (error) {
    console.log("Categories endpoint not available, using default values");
  }
};

// Fetch cities from API (if endpoint exists)
const fetchCities = async () => {
  try {
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
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

    // Try to fetch cities from API
    // Update the endpoint if your API has a cities endpoint
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/cities",
      {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    ).catch(() => null);

    if (response && response.key === "success" && response.data) {
      const citiesData = Array.isArray(response.data) ? response.data : [];
      cities.value = citiesData.map((city) => ({
        label: city.name_ar || city.name || city.title_ar || city.title,
        value: city.id?.toString() || city.city_id?.toString(),
      }));
    }
  } catch (error) {
    console.log("Cities endpoint not available, using default values");
  }
};

// Fetch sub-categories from API based on selected category
const fetchSubCategories = async (categoryId) => {
  if (!categoryId) {
    subCategories.value = [];
    form.subCategoryId = "";
    isLoadingSubCategories.value = false;
    return;
  }

  isLoadingSubCategories.value = true;
  form.subCategoryId = ""; // Reset selection when category changes

  try {
    let token =
      userStore.token || authStore.authUser?.token || authStore.token;

    if (!token && import.meta.client) {
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

    // Try to fetch sub-categories from API based on category_id
    // Option 1: Query parameter
    console.log("Fetching sub-categories for category:", categoryId);
    let response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/sub-categories?category_id=${categoryId}`,
      {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    ).catch((error) => {
      console.error("Sub-categories API error (endpoint 1):", error);
      return null;
    });

    console.log("Sub-categories response (endpoint 1):", response);

    // Option 2: Alternative endpoint structure if first one fails
    if (!response || response.key !== "success") {
      console.log("Trying alternative endpoint...");
      response = await $fetch(
        `https://backend.wattani-sa.com/api/v1/categories/${categoryId}/sub-categories`,
        {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      ).catch((error) => {
        console.error("Sub-categories API error (endpoint 2):", error);
        return null;
      });
      console.log("Sub-categories response (endpoint 2):", response);
    }

    if (response && response.key === "success" && response.data) {
      const subCats = Array.isArray(response.data) ? response.data : [];
      subCategories.value = subCats.map((subCat) => ({
        label: subCat.name_ar || subCat.name || subCat.title_ar || subCat.title,
        value: subCat.id?.toString() || subCat.sub_category_id?.toString() || subCat.category_id?.toString(),
      }));
      
      if (subCats.length === 0) {
        console.warn("No sub-categories found for category:", categoryId);
        // If no sub-categories exist, use the category itself as sub-category
        // This handles cases where API requires sub_category_id but category has no sub-categories
        subCategories.value = [{
          label: "نفس القسم",
          value: categoryId.toString()
        }];
      }
    } else {
      // If API doesn't return sub-categories, use category as sub-category
      console.warn("Failed to fetch sub-categories. Response:", response);
      // Use the category itself as sub-category if API fails or returns no data
      subCategories.value = [{
        label: "نفس القسم",
        value: categoryId.toString()
      }];
    }
  } catch (error) {
    console.error("Sub-categories endpoint error:", error);
    // Clear sub-categories if API fails
    subCategories.value = [];
  } finally {
    isLoadingSubCategories.value = false;
  }
};

const form = reactive({
  categoryId: "", // category_id
  subCategoryId: "", // sub_category_id (optional)
  titleAr: "", // name[ar]
  titleEn: "", // name[en]
  price: "", // price
  cityId: "", // city_id
  countryCode: "966", // country_code (default Saudi Arabia)
  location: "",
  locationData: null, // Store full location data with lat/lng
  mapDesc: "0", // map_desc (0 or 1)
  descriptionAr: "", // description[ar]
  descriptionEn: "", // description[en]
  image: null, // image (main image)
  attachments: [], // attachments[] (gallery images)
});

// Watch for category changes to fetch sub-categories dynamically
watch(
  () => form.categoryId,
  (newCategoryId) => {
    if (newCategoryId) {
      fetchSubCategories(newCategoryId);
    } else {
      subCategories.value = [];
      form.subCategoryId = "";
    }
  }
);

// Load advert data if in edit mode
const loadAdvertData = async () => {
  if (!isEditMode.value || !advertId.value) return;
  
  try {
    isLoading.value = true;
    const advert = await getAdvert(advertId.value);
    
    // Populate form with advert data
    form.categoryId = advert.category_id?.toString() || "";
    form.subCategoryId = advert.sub_category_id?.toString() || "";
    form.titleAr = advert.name_ar || advert.name || "";
    form.titleEn = advert.name_en || advert.name || "";
    form.price = advert.price?.toString() || "";
    form.cityId = advert.city_id?.toString() || advert.city?.id?.toString() || "";
    form.descriptionAr = advert.description_ar || advert.description || "";
    form.descriptionEn = advert.description_en || advert.description || "";
    
    // Set location data
    if (advert.lat && advert.lng) {
      form.locationData = {
        lat: parseFloat(advert.lat),
        lng: parseFloat(advert.lng),
        address: advert.map_desc || "",
      };
      form.location = advert.map_desc || `${advert.lat}, ${advert.lng}`;
    }
    
    // Set image previews
    if (advert.image) {
      adImagePreview.value = advert.image.startsWith('http') 
        ? advert.image 
        : `https://backend.wattani-sa.com${advert.image}`;
    }
    
    if (advert.attachments && advert.attachments.length > 0) {
      galleryPreviews.value = advert.attachments.map(att => 
        att.url.startsWith('http') ? att.url : `https://backend.wattani-sa.com${att.url}`
      );
    }
    
    // Fetch sub-categories for the selected category
    if (form.categoryId) {
      await fetchSubCategories(form.categoryId);
    }
  } catch (error) {
    console.error("Error loading advert data:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: error?.data?.msg || error?.message || "فشل في تحميل بيانات الإعلان",
      life: 5000,
    });
    // Navigate back if failed to load
    router.push('/CreateAds');
  } finally {
    isLoading.value = false;
  }
};

// Fetch data on component mount
onMounted(async () => {
  await fetchCategories();
  await fetchCities();
  
  // If in edit mode, load advert data
  if (isEditMode.value) {
    await loadAdvertData();
  } else if (form.categoryId) {
    // If a category is already selected, fetch its sub-categories
    await fetchSubCategories(form.categoryId);
  }
});

const isLoading = ref(false);

const isLocationModalOpen = ref(false);

const openLocationModal = () => {
  isLocationModalOpen.value = true;
};

const handleLocationConfirm = (locationData) => {
  if (locationData) {
    form.locationData = locationData;
    const address =
      locationData.address ||
      `${locationData.lat?.toFixed?.(5) || ""}, ${locationData.lng?.toFixed?.(5) || ""}`;
    form.location = address.trim();
  }
  isLocationModalOpen.value = false;
};

const adImagePreview = ref("");
const galleryPreviews = ref([]);

const revokePreview = (url) => {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
};

const handleAdImageChange = (event) => {
  const [file] = event.target.files || [];
  form.image = file || null;
  if (adImagePreview.value) {
    revokePreview(adImagePreview.value);
    adImagePreview.value = "";
  }
  if (file) {
    adImagePreview.value = URL.createObjectURL(file);
  }
};

const handleGalleryImagesChange = (event) => {
  const files = Array.from(event.target.files || []).slice(0, 5);
  form.attachments = files;
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = files.map((file) => URL.createObjectURL(file));
};

const adImageLabel = computed(() => {
  if (form.image?.name) return form.image.name;
  return "إرفاق صورة";
});

const galleryImagesLabel = computed(() => {
  if (form.attachments.length) {
    return `${form.attachments.length} / 5 صور مرفوعة`;
  }
  return "إرفاق صورة";
});

const handleSubmit = async () => {
  // Validate required fields
  // For edit mode, image is not required if already exists
  if (
    !form.categoryId ||
    !form.subCategoryId ||
    !form.titleAr ||
    !form.titleEn ||
    !form.price ||
    !form.cityId ||
    !form.location ||
    !form.descriptionAr ||
    !form.descriptionEn ||
    (!form.image && !isEditMode.value)
  ) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول المطلوبة",
      life: 3000,
    });
    return;
  }

  // Validate that sub-category belongs to selected category
  if (form.subCategoryId && form.categoryId) {
    const selectedSubCat = subCategories.value.find(
      (subCat) => subCat.value === form.subCategoryId
    );
    if (!selectedSubCat) {
      toast.add({
        severity: "warn",
        summary: "تحذير",
        detail: "يرجى اختيار قسم فرعي صحيح ينتمي للقسم الرئيسي المختار",
        life: 3000,
      });
      return;
    }
  }

  // Validate that sub-categories are available
  if (!subCategories.value.length) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "لا توجد أقسام فرعية متاحة. يرجى اختيار قسم آخر أو الانتظار حتى يتم تحميل الأقسام الفرعية",
      life: 3000,
    });
    return;
  }

  // Validate location data
  if (!form.locationData || !form.locationData.lat || !form.locationData.lng) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى تحديد الموقع على الخريطة",
      life: 3000,
    });
    return;
  }

  isLoading.value = true;

  try {
    // Create FormData for file upload with correct API field names
    const formData = new FormData();
    formData.append("name[ar]", form.titleAr);
    formData.append("name[en]", form.titleEn);
    formData.append("category_id", form.categoryId);
    formData.append("sub_category_id", form.subCategoryId); // Required by API
    formData.append("price", form.price);
    formData.append("description[ar]", form.descriptionAr);
    formData.append("description[en]", form.descriptionEn);
    formData.append("country_code", form.countryCode);
    formData.append("city_id", form.cityId);
    formData.append("lat", form.locationData.lat.toString());
    formData.append("lng", form.locationData.lng.toString());
    formData.append("map_desc", form.locationData.address || form.mapDesc);
    
    // Main image - only append if it's a new file
    if (form.image && form.image instanceof File) {
      formData.append("image", form.image);
    }

    // Append gallery images as attachments[] array
    form.attachments.forEach((image) => {
      if (image instanceof File) {
        formData.append("attachments[]", image);
      }
    });

    let response;
    if (isEditMode.value && advertId.value) {
      // Update existing advert
      response = await updateAdvert(advertId.value, formData);
      
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: "تم تحديث الإعلان بنجاح",
        life: 3000,
      });

      // Update the ad in myAds list
      if (response?.id) {
        updateAd(response.id, {
          title: form.titleAr,
          price: form.price,
          location: form.location || form.locationData?.address || "موقع غير محدد",
        });
      }

      // Navigate to profile page
      await navigateTo('/profile?tab=my-ads');
    } else {
      // Create new advert
      response = await createAdvert(formData);
      
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: "تم إنشاء الإعلان بنجاح",
        life: 3000,
      });

      // Add the new ad to myAds list
      if (response?.id) {
        const newAd = {
          id: response.id,
          title: form.titleAr,
          image: response.image || adImagePreview.value || "/images/card-img.jpg",
          rating: response.average_rating || 0,
          price: form.price,
          location: form.location || form.locationData?.address || "موقع غير محدد",
          timeAgo: "الآن",
          seller: {
            name: user.value?.name || userStore.user?.name || "مستخدم",
            avatar: user.value?.avatar || userStore.user?.avatar || "/images/profile-avatar.png",
          },
        };
        
        // Add to shared myAds state
        addAd(newAd);
      }

      // Reset form
      resetForm();

      // Navigate to profile page to see the new ad
      await navigateTo('/profile?tab=my-ads');
    }
  } catch (error) {
    console.error(`Error ${isEditMode.value ? 'updating' : 'creating'} ad:`, error);
    
    // Extract error message from API response
    let errorMessage = `حدث خطأ أثناء ${isEditMode.value ? 'تحديث' : 'إنشاء'} الإعلان`;
    if (error?.data?.msg) {
      errorMessage = error.data.msg;
    } else if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    // Provide helpful message for category-related errors
    if (errorMessage.includes("القسم غير موجود") || errorMessage.includes("غير موجود")) {
      errorMessage = "القسم المختار غير موجود. يرجى التأكد من اختيار قسم صحيح من القائمة أو تحديث قائمة الأقسام من قاعدة البيانات.";
    } else if (errorMessage.includes("لا ينتمي") || errorMessage.includes("ينتمي")) {
      errorMessage = "القسم الفرعي المختار لا ينتمي للقسم الرئيسي. يرجى اختيار قسم فرعي صحيح أو ترك الحقل فارغاً إذا كان اختيارياً.";
    }
    
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail: errorMessage,
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

// Reset form function
const resetForm = () => {
  form.categoryId = "";
  form.subCategoryId = "";
  form.titleAr = "";
  form.titleEn = "";
  form.price = "";
  form.cityId = "";
  form.location = "";
  form.locationData = null;
  form.mapDesc = "0";
  form.descriptionAr = "";
  form.descriptionEn = "";
  form.image = null;
  form.attachments = [];

  // Clear previews
  if (adImagePreview.value && adImagePreview.value.startsWith('blob:')) {
    revokePreview(adImagePreview.value);
  }
  adImagePreview.value = "";
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = [];
};
</script>

<style scoped></style>
