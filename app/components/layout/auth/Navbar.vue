<template>
  <nav class="navbar">
    <img src="/images/logo.png" alt="Logo" class="logo" />

    <LayoutAuthLang />
  </nav>
</template>

<script lang="ts" setup></script>

<style scoped>
@import "tailwindcss";
@import "tailwindcss-primeui";

.navbar {
  @apply flex items-center justify-between py-2.5 bg-white sticky top-5 z-50  after:content-[''] after:absolute after:bottom-full after:inset-x-0 after:h-5 after:bg-white;

  .logo {
    @apply size-12;
  }
}
</style>
