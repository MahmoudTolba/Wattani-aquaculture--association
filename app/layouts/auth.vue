<template>
  <main class="auth-layout-content">
    <div class="content-wrapper">
      <div class="page-content">
        <LayoutAuthNavbar />

        <div class="content">
          <slot />
        </div>
      </div>
    </div>

    <LayoutAuthImageSection />
  </main>
</template>

<script setup>
// ===================================== imports
// i18n
const { t } = useI18n();
</script>
