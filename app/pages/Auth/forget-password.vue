<template>
  <section>
    <p class="welcome">
      {{ t("auth.login.welcome_back") }}
      <img src="/images/body-weight.svg" alt="Body Weight" class="icon" />
    </p>
    <h2 class="title" v-html="t('auth.login.subtitle')"></h2>

    <Form
      :initialValues="state"
      :resolver="yupResolver(loginSchema)"
      @submit="onSubmit"
      class="flex flex-col gap-4 sm:max-w-lg mx-auto"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <label for="email" class="form-label">{{
          t("inputs.email.label")
        }}</label>
        <InputText
          v-model="state.email"
          id="email"
          :placeholder="t('inputs.email.placeholder')"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField
        v-slot="$field"
        name="password"
        initialValue=""
        class="flex flex-col gap-1"
      >
        <label for="password" class="form-label">{{
          t("inputs.password.label")
        }}</label>
        <Password
          v-model="state.password"
          id="password"
          :placeholder="t('inputs.password.placeholder')"
          :feedback="false"
          toggleMask
          fluid
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <NuxtLink
        :to="{ name: 'auth-forget-password' }"
        class="text-xs text-amber-700 ms-auto"
      >
        {{ t("auth.forget_password.title") }}
      </NuxtLink>

      <Button type="submit" class="mt-2">
        <div>{{ t("auth.login.title") }}</div>
        <img
          src="/icons/arrow-right.svg"
          alt="submit"
          class="icon rtl-revert"
        />
      </Button>
    </Form>

    <div class="redirect-sentence">
      <p>
        {{ t("auth.forget_password.redirect_sentence") }}
      </p>
      <NuxtLink :to="{ name: 'auth-login' }" class="link">
        {{ t("auth.forget_password.redirect_sentence.link") }}
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
// ===================================== imports
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { string, object } from "yup";
const { validation } = useValidation();

// i18n
const { t } = useI18n();

// ===================================== meta
definePageMeta({
  layout: "auth",
  title: "auth.login.title",
  slogan: {
    title: "auth.login.slogan.title",
    subtitle: "auth.login.slogan.subtitle",
    image: "/images/login-panner.png",
  },
});

// ===================================== data
const state = ref({
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  details: "",
});

const loginSchema = object({
  email: validation.email(),

  firstname: string().required(
    t("validation.required_with_label", {
      field: t("validation.firstname"),
    })
  ),
  lastname: string().required("validation.required_with_label", {
    field: "Last Name",
  }),
  password: validation.password(),
});
</script>

<style></style>
