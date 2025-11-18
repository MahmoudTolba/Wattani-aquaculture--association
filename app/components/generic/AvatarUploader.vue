<template>
  <div class="w-fit" @click="fileInput?.click()">
    <div class="wrapper">
      <div class="image group">
        <span class="loading-icon" v-if="loading || currentProgress">
          <UIcon name="i-svg-spinners-90-ring" />
        </span>

        <span class="overlay" v-if="!readonly">
          <i class="pi pi-cloud-upload text-sm text-white"></i>
        </span>

        <img
          :src="fileUrl[0] || preloadedFiles[0]?.path || props.imagePlaceholder"
          alt="uploaded image"
        />

        <div class="content">
          <input
            ref="fileInput"
            type="file"
            :accept="accept"
            class="opacity-0 w-0 h-0"
            @change="handleSelected(fileInput, props.maxItems)"
          />
        </div>
      </div>

      <label :v-if="props.label" class="form-label">{{ props.label }}</label>
    </div>

    <span v-if="uploadErrorMessage" class="block text-error mt-2">
      {{ uploadErrorMessage }}
    </span>
  </div>
</template>

<script setup>
// ==================== imports

import "primeicons/primeicons.css";

const { t } = useI18n();
const emit = defineEmits(["update:modelValue", "delete"]);

// ==================== props
const props = defineProps({
  showOnly: Boolean,
  icon: { type: String, default: "i-solar-upload-minimalistic-outline" },
  deleteUrl: { type: String, default: "" },
  accept: { type: String, default: "image/*" },
  maxItems: { type: Number, default: 10 },
  input: { type: Object, default: () => {} },
  imagePlaceholder: {
    type: String,
    default: "/images/uploader-placeholder.webp",
  },
  label: { type: String },
  noDelete: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  modelValue: {
    type: [Array, Object, File, String, null],
    default: () => null,
  },
});

// ================================ data
// file input
const fileInput = ref(null);

// internal
const internalValue = ref(props.modelValue);

// has files
// const hasFiles = computed(
//   () => fileList.value.length || preloadedFiles.value.length
// );

// total files
const totalFiles = computed(
  () => fileList.value.length + preloadedFiles.value.length
);

// ================================ composable
const {
  preloadedFiles,
  fileList,
  fileUrl,
  loading,
  uploadErrorMessage,
  currentProgress,
  deletedArr,
  handlePreloaded,
  handleSelected,
  deleteItem,
  deleteAllItems,
} = useFileUploader(fileInput, true, props.accept);

// ================================ watch
// watch handle preloaded
watch(
  () => props.modelValue,
  async (val, old) => {
    internalValue.value = val;

    if (val && !old?.length) {
      await handlePreloaded(val);
    }
  }
);

// watch handle v-model
watch(
  () => fileList.value,
  () => {
    const value = fileList?.value[0] || null;

    emit("update:modelValue", value);
  },
  { deep: true, immediate: true }
);

// reset files
const resetFiles = async () => {
  await deleteAllItems(fileInput.value);
};

// ================================ lifecycle
// Cleanup blob URLs on unmount to prevent memory leaks
onBeforeUnmount(() => {
  fileUrl.value.forEach((url) => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
});

// ============ Expose
defineExpose({ handleSelected, handlePreloaded, resetFiles });
</script>

<style scoped>
@reference "tailwindcss";
@import "tailwindcss-primeui";

.wrapper {
  @apply flex items-center flex-wrap gap-2 cursor-pointer relative w-fit;

  .image {
    @apply relative overflow-hidden rounded-full size-16 shrink-0;

    .overlay {
      @apply absolute inset-0 z-1 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300;
    }

    img {
      @apply w-full h-full object-cover object-center;
    }

    .loading-icon {
      @apply absolute inset-0 flex items-center justify-center;
    }
  }

  .content {
    @apply grow space-y-2;
  }
}
</style>
