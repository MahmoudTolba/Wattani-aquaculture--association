<template>
  <div class="parent">
    <div>
      <section class="mt-10 mx-6 p-6 md:p-10">
        <div class="flex flex-col items-start gap-2">
          <h1 class="text-2xl md:text-[28px] font-semibold text-gray-900">
            اضافة اعلان
          </h1>
        </div>

        <form class="mt-10 space-y-8" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              تحديد القسم
              <span class="text-red-500 ms-1">*</span>
            </div>
            <select
              v-model="form.department"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              <option value="" disabled>اختر القسم</option>
              <option
                v-for="option in departments"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
                اسم الاعلان باللغة العربية
                <span class="text-red-500 ms-1">*</span>
              </div>
              <input
                v-model="form.titleAr"
                type="text"
                placeholder="اسم الاعلان باللغة العربية"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              />
            </div>

            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
                اسم الاعلان باللغة الإنجليزية
                <span class="text-red-500 ms-1">*</span>
              </div>
              <input
                v-model="form.titleEn"
                type="text"
                placeholder="اسم الاعلان باللغة الإنجليزية"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              تحديد تكلفة الاعلان
              <span class="text-red-500 ms-1">*</span>
            </div>
            <input
              v-model="form.titleAr"
              type="text"
              placeholder="اسم الاعلان باللغة العربية"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            />
          </div>

          <div class="grid grid-cols-1">
            <div class="space-y-2">
              <div
                class="flex items-center justify-start text-sm font-medium text-gray-800"
              >
                المدينة
                <span class="text-red-500 ms-1">*</span>
              </div>
              <select
                v-model="form.city"
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                required
              >
                <option value="" disabled>اختر المدينة</option>
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
              تحديد الموقع
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
                placeholder="تحديد الموقع"
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
              نص الاعلان باللغة العربية
              <span class="text-red-500 ms-1">*</span>
            </div>
            <textarea
              v-model="form.descriptionAr"
              rows="5"
              placeholder="وصف"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            ></textarea>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              نص الاعلان باللغة الإنجليزية
              <span class="text-red-500 ms-1">*</span>
            </div>
            <textarea
              v-model="form.descriptionEn"
              rows="5"
              placeholder="وصف"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              required
            ></textarea>
          </div>

          <div class="space-y-3">
            <div
              class="flex items-center justify-start text-sm font-medium text-gray-800"
            >
              ارفاق صور للاعلان
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
              ارفاق صور
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
              class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102"
            >
              اضافة
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="isLocationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div class="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div class="flex items-center justify-between">
          <h2
            id="location-modal-title"
            class="text-lg font-semibold text-gray-900"
          >
            تحديد الموقع
          </h2>
          <button
            type="button"
            class="text-gray-500 transition hover:text-gray-700"
            @click="closeLocationModal"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          يمكن ربط هذه النافذة بخريطة أو محدد موقع لاحقًا. استخدم الأزرار
          بالأسفل لحفظ الإحداثيات.
        </p>
        <div
          class="mt-6 h-52 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm"
        >
          مساحة محتوى الخريطة / اختيار الموقع
        </div>
        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            @click="closeLocationModal"
          >
            إلغاء
          </button>
          <button
            type="button"
            class="rounded-xl bg-linear-to-l from-teal-500 to-teal-600 px-5 py-2 text-sm font-semibold text-white shadow hover:from-teal-600 hover:to-teal-700"
            @click="confirmLocation"
          >
            حفظ الموقع
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const departments = [
  { label: "العميل", value: "client" },
  { label: "المشاريع", value: "projects" },
  { label: "الخدمات", value: "services" },
];

const cities = [
  { label: "الرياض", value: "riyadh" },
  { label: "جدة", value: "jeddah" },
  { label: "الدمام", value: "dammam" },
];

const form = reactive({
  department: "",
  titleAr: "",
  titleEn: "",
  cost: "",
  city: "",
  location: "",
  descriptionAr: "",
  descriptionEn: "",
  adImage: null,
  galleryImages: [],
});

const isLocationModalOpen = ref(false);

const openLocationModal = () => {
  isLocationModalOpen.value = true;
};

const closeLocationModal = () => {
  isLocationModalOpen.value = false;
};

const confirmLocation = () => {
  // Placeholder: integrate real selection logic later
  isLocationModalOpen.value = false;
};

const adImagePreview = ref("");
const galleryPreviews = ref([]);

const revokePreview = (url) => {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
};

const handleAdImageChange = (event) => {
  const [file] = event.target.files || [];
  form.adImage = file || null;
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
  form.galleryImages = files;
  galleryPreviews.value.forEach(revokePreview);
  galleryPreviews.value = files.map((file) => URL.createObjectURL(file));
};

const adImageLabel = computed(() => {
  if (form.adImage?.name) return form.adImage.name;
  return "إرفاق صورة";
});

const galleryImagesLabel = computed(() => {
  if (form.galleryImages.length) {
    return `${form.galleryImages.length} / 5 صور مرفوعة`;
  }
  return "إرفاق صورة";
});

const handleSubmit = () => {
  console.log("Create Ads form submitted", { ...form });
};
</script>

<style scoped></style>
