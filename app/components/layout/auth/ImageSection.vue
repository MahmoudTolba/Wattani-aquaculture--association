<template>
  <div class="image-slog">
    <div class="content">
      <div class="text">
        <p class="welcome" v-if="!route.meta.noSlogWelcome">
          {{ t("auth.welcome_to_rita") }}
        </p>

        <h2
          class="title"
          v-if="route.meta.slogan?.title"
          v-html="t(route.meta.slogan?.title)"
        />

        <h3
          class="subtitle"
          v-if="route.meta.slogan?.subtitle"
          v-html="t(route.meta.slogan?.subtitle)"
        />
      </div>

      <img
        v-if="route.meta.slogan?.image"
        :src="route.meta.slogan?.image"
        alt="Login Banner"
      />
    </div>
  </div>
</template>
<script setup>
// ===================================== imports
// i18n
const { t } = useI18n();

// route
const route = useRoute();

// ===================================== data
</script>

<style scoped>
@import "tailwindcss";
@import "tailwindcss-primeui";

.image-slog {
  .content {
    @apply overflow-hidden rounded-2xl md:max-w-[95%] md:ms-auto md:mx-0 mx-auto lg:block hidden aspect-[1/1.1] sticky top-5 before:content-[''] before:absolute before:inset-0 before:bg-black/50 before:z-1;
    .text {
      @apply absolute inset-x-0 bottom-1/12 z-2 px-5 text-white;

      .welcome {
        @apply text-lg font-normal mb-2;
      }

      .title {
        @apply text-3xl font-light leading-snug mb-3;
      }

      .subtitle {
        @apply text-2xl font-normal;
      }
    }

    img {
      @apply w-full h-full object-cover object-center;
    }
  }
}
</style>
