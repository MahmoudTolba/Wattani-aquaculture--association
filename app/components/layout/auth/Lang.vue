<template>
  <div class="relative inline-block text-left" :class="props.customClass">
    <!-- Trigger Button -->
    <button
      type="button"
      @click.stop="toggle()"
      class="flex-center gap-2 cursor-pointer"
      aria-haspopup="listbox"
      :aria-expanded="open ? 'true' : 'false'"
    >
      <img src="/images/lang.png" alt="lang" class="w-12 h-12" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      :class="locale === 'ar' ? 'right-0' : 'left-0'"
      class="absolute z-30 mt-2 w-72 origin-top-right rounded-sm bg-white p-2 shadow-xl ring-1 ring-black/5 focus:outline-none"
      @click.stop
    >
      <div class="px-2 py-1 text-xs font-medium text-gray-500">
        {{ t("common.choose_language") }}
      </div>
      <ul class="max-h-96 overflow-auto py-1" role="listbox">
        <li
          v-for="l in allLocales"
          :key="l.code"
          role="option"
          :aria-selected="l.code === locale"
          @click="onSelect(l.code)"
          class="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-gray-100"
          :class="l.code === locale ? 'bg-gray-100' : ''"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center gap-2">
              <img :src="flagEmoji(l.code)" alt="lang" class="w-10 h-10" />
              <span class="flex-1">{{ l.name }}</span>
            </div>
            <!-- <span v-if="l.code === locale" class="text-primary">✔</span> -->
            <img
              v-if="l.code === locale"
              src="/images/tick-02.png"
              alt="arrow"
              class="w-4 h-4"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { locale: currentLocale, locales, setLocale, t } = useI18n();

const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
});

const open = ref(false);
const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

const allLocales = computed(() => locales.value);
const locale = computed(() => currentLocale.value);

function onSelect(code) {
  if (code !== currentLocale.value) {
    setLocale(code);
  }
  close();
}

// Simple flag mapping using emoji to avoid external assets
function flagEmoji(code) {
  switch (code) {
    case "ar":
      return "images/arabic.svg"; // Arabic (Saudi Arabia)
    case "cs":
      return "images/czech.svg"; // Czech
    case "en":
      return "images/english.svg"; // English
    case "fr":
      return "images/french.svg"; // French
    case "de":
      return "images/german.svg"; // German
    case "fa":
      return "images/iranian.svg"; // Persian (Iran)
    case "hi":
      return "images/indian.svg"; // Hindi (India)
    case "ru":
      return "images/russian.svg"; // Russian
    case "es":
      return "images/spanish.svg"; // Spanish
    case "tr":
      return "images/turkish.svg"; // Turkish
    default:
      return "🌐";
  }
}

// Close when clicking outside
onMounted(() => {
  const handler = (e) => {
    // if clicked outside this component, close
    if (!e.target.closest) return;
    // Note: since this component is self-contained, relying on stopPropagation on menu
    if (open.value) close();
  };
  window.addEventListener("click", handler);
  onBeforeUnmount(() => window.removeEventListener("click", handler));
});
</script>

<style lang="scss" scoped></style>
