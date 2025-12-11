<template>
  <footer
    class="w-full min-h-[50vh] bg-gradient-to-l from-[#0A717E] to-[#15C472] py-8 md:py-16 px-4 sm:px-6 md:px-12 flex items-center justify-center"
  >
    <div
      class="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12"
    >
      <!-- Logo + About -->
      <div class="flex flex-col gap-4 md:gap-6">
        <NuxtLink to="/" class="inline-block">
          <img
            src="/images/footer-logo.png"
            alt="Logo"
            class="bg-white rounded-lg p-2 w-32 md:w-40 mx-auto sm:mx-0"
          />
        </NuxtLink>

        <p
          class="text-white leading-relaxed text-center sm:text-right text-sm md:text-base"
        >
          هذا النص يمكن استبداله بنص<br />
          آخر في نفس المساحة
        </p>
      </div>

      <!-- Links Groups -->
      <div
        v-for="(group, index) in linksGroups"
        :key="index"
        class="text-center sm:text-right"
      >
        <ul
          class="text-white space-y-3 md:space-y-4 text-base md:text-lg font-light"
        >
          <li
            v-for="(item, i) in group"
            :key="i"
            class="hover:text-gray-200 transition"
          >
            <NuxtLink :to="item.path" class="block">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- App Store Buttons -->
      <div class="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
        <NuxtLink
          to="#"
          class="cursor-pointer w-36 md:w-40 hover:opacity-80 transition"
        >
          <img src="/images/appstore.svg" alt="App Store" class="w-full" />
        </NuxtLink>

        <NuxtLink
          to="#"
          class="cursor-pointer w-36 md:w-40 hover:opacity-80 transition"
        >
          <img src="/images/googleplay.png" alt="Google Play" class="w-full" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n();
const linksGroups = [
  [
    { name: t("footer.home"), path: "/" },
    { name: t("footer.about-us"), path: "/aboutUs" },
    { name: t("footer.services"), path: "/services" },
    { name: t("footer.contact-us"), path: "/ContactUs" },
  ],
  [
    { name: t("footer.terms"), path: "/terms" },
    { name: t("footer.faq"), path: "/faq" },
    { name: t("footer.privacy"), path: "/privacy" },
    { name: t("footer.support"), path: "/support" },
  ],
];
</script>
