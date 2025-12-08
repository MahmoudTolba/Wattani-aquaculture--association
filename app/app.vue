<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>

      <!-- i18n SEO -->
      <template v-for="link in head.link" :key="link.id">
        <Link v-bind="link" />
      </template>

      <template v-for="meta in head.meta" :key="meta.id">
        <Meta v-bind="meta" />
      </template>
    </Head>

    <Body class="bg-[#ffffff]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Toast />
    </Body>
  </Html>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

// locale head
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// dynamic page title
const title = computed(() => {
  return t(route.meta.title ?? "") + " - " + t("site.title");
});
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.layout-content {
  @apply flex flex-col min-h-screen;

  main {
    @apply flex-1;
  }
}

body {
  font-family: "GE SS Two", sans-serif;
}
/* Gradient Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(270deg, #15c472 0.05%, #0a717e 99.95%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(270deg, #12ad65 0.05%, #085e68 99.95%);
}

html {
  scrollbar-width: thin;
  scrollbar-color: #15c472 #f1f1f1;
}
</style>
