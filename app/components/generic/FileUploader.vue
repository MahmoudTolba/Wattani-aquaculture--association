<template>
  <div>
    <div class="wrapper">
      <div
        v-if="!disabled"
        class="placeholder"
        :class="{
          'opacity-50 pointer-events-none':
            (hasFiles && totalFiles >= props.maxItems) || readonly,
          'with-drag-area': props.withDragArea,
        }"
      >
        <UInput
          ref="fileInput"
          type="file"
          :accept="accept"
          :ui="inputUi"
          :multiple="!props.single"
          @change="handleSelected(fileInput, props.maxItems)"
        />

        <template v-if="props.input">
          <UInput
            trailing-icon="i-vuesax-linear-link"
            :placeholder="t(props.input.placeholder)"
            :value="
              hasFiles && !props.single
                ? `${totalFiles} / ${props.maxItems} ${t('uploaded_files')}`
                : null
            "
            readonly
          />
        </template>

        <div class="area-content" v-if="props.withDragArea">
          <UIcon :name="props.areaIcon" class="size-6 shrink-0" />

          <p class="label" v-html="t(props.areaLabel)"></p>
        </div>

        <span v-if="uploadErrorMessage" class="block text-error mt-2">
          {{ uploadErrorMessage }}
        </span>

        <span
          v-if="currentProgress"
          class="loading"
          :class="`h-[${currentProgress}%]`"
        />
      </div>

      <template v-if="hasFiles && !loading">
        <template v-if="preloadedFiles.length">
          <div class="flex items-center gap-4 flex-wrap mt-4">
            <div
              v-for="(file, i) in preloadedFiles"
              :key="file.name"
              class="item"
            >
              <div v-if="file.type?.startsWith('video/')" class="video-wrapper">
                <video class="video" controls>
                  <source :src="file.path" :type="file.type" />
                  Your browser does not support the video tag.
                </video>

                <UButton
                  v-if="!noDelete && !readonly && !disabled"
                  icon="i-vuesax-linear-trash-red"
                  size="sm"
                  square
                  color="white"
                  type="button"
                  class="absolute top-1 end-2 rounded-full"
                  @click="
                    () => {
                      deleteItem(i, file.name, true);
                      emit('delete', deletedArr);
                    }
                  "
                />
              </div>

              <span v-else class="rounded-xl w-full h-full flex relative">
                <UAvatar
                  :icon
                  :src="
                    file.type?.startsWith('image/')
                      ? file.path
                      : '/icons/file.webp'
                  "
                  class="w-full h-full"
                  :ui="{
                    root: 'rounded-lg',
                    image: 'rounded-lg w-full h-full object-cover',
                  }"
                />

                <UButton
                  v-if="!noDelete && !readonly && !disabled"
                  icon="i-vuesax-linear-trash-red"
                  size="sm"
                  square
                  color="white"
                  type="button"
                  class="absolute top-1 end-2 rounded-full"
                  @click="
                    () => {
                      deleteItem(i, file.name, true);
                      emit('delete', deletedArr);
                    }
                  "
                />
              </span>
            </div>
          </div>
        </template>

        <template v-if="fileList.length">
          <div class="flex items-center gap-4 flex-wrap mt-4">
            <div v-for="(file, i) in fileList" :key="file.name" class="item">
              <div v-if="file.type?.startsWith('video/')" class="video-wrapper">
                <video class="video" controls preload="metadata">
                  <source :src="fileUrl[i]" :type="file.type" />
                  Your browser does not support the video tag.
                </video>

                <UButton
                  v-if="!readonly"
                  icon="i-vuesax-linear-trash-red"
                  size="sm"
                  square
                  color="white"
                  type="button"
                  class="absolute top-1 end-2 rounded-full"
                  @click="deleteItem(i, file.name)"
                />
              </div>

              <span v-else class="rounded-xl relative w-full h-full flex">
                <UAvatar
                  :icon
                  :src="
                    file.type.startsWith('image/')
                      ? fileUrl[i]
                      : '/icons/file.webp'
                  "
                  class="w-full h-full"
                  :ui="{
                    root: 'rounded-lg',
                    image: 'rounded-lg w-full h-full object-cover',
                  }"
                />

                <UButton
                  v-if="!readonly"
                  icon="i-vuesax-linear-trash-red"
                  size="sm"
                  square
                  color="white"
                  type="button"
                  class="absolute top-1 end-2 rounded-full"
                  @click="deleteItem(i, file.name)"
                />
              </span>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div v-if="hasFiles && loading" class="flex-center-all min-h-24">
      <span
        class="text-2xl aspect-square w-12 bg-primary/20 flex-center-all rounded-lg"
      >
        <UIcon name="i-line-md-loading-loop" />
      </span>
    </div>
  </div>
</template>

<script setup>
// ==================== imports
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
  single: { type: Boolean, default: false },
  noDelete: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  modelValue: {
    type: [Array, Object, File, String, null],
    default: () => null,
  },
  withDragArea: {
    type: Boolean,
    default: false,
  },
  areaIcon: {
    type: String,
    default: "i-vuesax-linear-gallery-add",
  },
  areaLabel: {
    type: String,
    default: () => "",
  },
});

// ================================ data
// file input
const fileInput = ref(null);

// internal
const internalValue = ref(props.modelValue);

// has files
const hasFiles = computed(
  () => fileList.value.length || preloadedFiles.value.length
);

// input ui
const inputUi = {
  root: "!p-0 cursor-pointer file:cursor-pointer !w-full !h-full absolute inset-0 z-[1] opacity-0",
  base: "!p-0 cursor-pointer file:cursor-pointer !w-full !h-full absolute inset-0 z-[1] opacity-0",
};

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
} = useFileUploader(fileInput, props.single, props.accept);

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
    const value = props.single ? fileList?.value[0] || null : fileList.value;

    emit("update:modelValue", value);
  },
  { deep: true, immediate: true }
);

// watch preloaded files for deletion
watch(
  () => preloadedFiles.value.length,
  (newLength, oldLength) => {
    // Only emit when files are deleted (length decreased)
    if (oldLength !== undefined && newLength < oldLength) {
      if (props.single) {
        // In single mode, emit null if no files remain
        if (!preloadedFiles.value.length && !fileList.value.length) {
          emit("update:modelValue", null);
        }
      } else {
        // In multiple mode, emit empty array if no files remain
        if (!fileList.value.length) {
          emit("update:modelValue", []);
        }
      }
    }
  }
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
@import "@nuxt/ui";

.wrapper {
  .placeholder {
    @apply relative;

    &.with-drag-area {
      @apply aspect-16/3 border-2 border-dashed border-(--ui-text-dimmed) rounded-[20px] p-4 min-h-40 flex items-center justify-center w-full;

      .area-content {
        @apply flex items-center justify-center gap-3;

        .label {
          @apply font-medium text-base;
        }
      }
    }
  }

  .item {
    @apply flex items-center w-28 h-32 aspect-auto has-[.video-wrapper]:h-32 has-[.video-wrapper]:aspect-video has-[.video-wrapper]:rounded-xl has-[.video-wrapper]:w-fit;
  }

  .video-wrapper {
    @apply relative w-full h-full rounded-xl overflow-hidden;

    .video {
      @apply w-full h-full object-cover rounded-lg;
    }
  }
}
</style>
