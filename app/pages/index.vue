<template>
  <div>
    <navHeader />
    <SwiperSection class="mt-10" />
    <AboutUs class="mb-8" />
    <MobileSection class="mb-15" />
    <ContactUs class="mb-15" />
  </div>
</template>

<script setup>
import navHeader from "~/components/navHeader.vue";
import SwiperSection from "~/components/swiperSection.vue";
import AboutUs from "~/components/aboutUs.vue";
import MobileSection from "~/components/mobileSection.vue";
import ContactUs from "~/components/ContactUs.vue";
</script>

<style lang="scss" scoped></style>
