<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div class="flex flex-col items-center">
        <img
          src="/images/logo.svg"
          alt="Logo"
          class="w-32 h-32 object-contain animate-pulse"
        />
        <div class="mt-4 text-primary-600 font-medium">Loading...</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const isLoading = ref(true);

onMounted(() => {
  // Hide loader after page is fully loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      isLoading.value = false;
    }, 500); // Add a small delay for smoother transition
  });
});

// Watch for route changes to show/hide loader
const route = useRoute();
const router = useRouter();

const start = () => {
  isLoading.value = true;
};

const finish = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

router.beforeEach((to, from, next) => {
  start();
  next();
});

router.afterEach(() => {
  finish();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
