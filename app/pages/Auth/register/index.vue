<template>
  <section class="auth-section chooset-types max-w-2xl mx-auto">
    <p class="welcome">
      {{ t("auth.register.welcome_to_rita") }}
      <img src="/images/body-weight.svg" alt="Body Weight" class="icon" />
    </p>
    <h2 class="title" v-html="t('auth.register.choose_type.title')" />
    <h3 class="subtitle" v-html="t('auth.register.choose_type.subtitle')" />

    <div class="types-wrapper">
      <NuxtLink
        v-for="type in PROVIDER_TYPES"
        :key="type.id"
        class="type-card group"
        :to="{ name: 'auth-register-slug', params: { slug: type.slug } }"
      >
        <div class="icon"><img :src="type.icon" :alt="type.label" /></div>

        <h5 class="label">
          {{ t(type.label) }}
        </h5>
      </NuxtLink>
    </div>

    <div class="redirect-sentence">
      <p>
        {{ t("auth.register.redirect_sentence.text") }}
      </p>

      <NuxtLink :to="{ name: 'auth-login' }" class="link">
        {{ t("auth.register.redirect_sentence.link") }}
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
// ===================================== imports
import { PROVIDER_TYPES } from "~/types/provider";

// i18n
const { t } = useI18n();

// ===================================== meta
definePageMeta({
  layout: "auth",
  title: "auth.register.title",
  slogan: {
    title: "auth.register.slogan.title",
    subtitle: "auth.register.slogan.subtitle",
    image: "/images/login-panner.png",
  },
});
</script>

<style></style>
