<template>
  <footer
    class="w-full min-h-[50vh] bg-gradient-to-l from-[#0A717E] to-[#15C472] py-16 px-6 md:px-12 flex items-center justify-center"
  >
    <div
      class="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-12"
    >
      <!-- Logo + About -->
      <div class="flex flex-col gap-6 w-full md:w-auto">
        <NuxtLink to="/" class="inline-block">
          <img
            src="/images/footer-logo.png"
            alt="Logo"
            class="bg-white rounded-lg p-2 w-40"
          />
        </NuxtLink>

        <p class="text-white leading-relaxed">
          هذا النص يمكن استبداله بنص<br />
          آخر في نفس المساحة
        </p>
      </div>

      <!-- Links Groups -->
      <div
        v-for="(group, index) in linksGroups"
        :key="index"
        class="w-full md:w-auto"
      >
        <ul class="text-white space-y-4 text-lg font-light">
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
      <div class="flex flex-col gap-6 w-full md:w-auto">
        <NuxtLink
          to="#"
          class="cursor-pointer w-40 hover:opacity-80 transition"
        >
          <img src="/images/appstore.svg" alt="App Store" />
        </NuxtLink>

        <NuxtLink
          to="#"
          class="cursor-pointer w-40 hover:opacity-80 transition"
        >
          <img src="/images/googleplay.png" alt="Google Play" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
const linksGroups = [
  [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/aboutUs" },
    { name: "الخدمات", path: "/services" },
    { name: "تواصل معنا", path: "/ContactUs" },
  ],
  [
    { name: "الشروط والأحكام", path: "/terms" },
    { name: "الاسئلة المتكررة", path: "/faq" },
    { name: " سياسة الاستخدام", path: "/privacy" },
    { name: "عن المنصة ", path: "/support" },
  ],
];
</script>

<style scoped></style>
