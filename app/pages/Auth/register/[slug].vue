<template>
  <section class="auth-section">
    <p class="welcome">
      {{ t("auth.register.welcome_to_rita") }}
      <img src="/images/body-weight.svg" alt="Body Weight" class="icon" />
    </p>
    <h2 class="title" v-html="t('auth.register.subtitle')"></h2>

    <AuthRegisterMainInfo />

    <Form
      :initialValues="state"
      :resolver="yupResolver(registerSchema)"
      @submit="onSubmit"
      class="flex flex-col gap-4 sm:max-w-lg mx-auto"
    >
      <!-- Common Fields -->
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

      <FormField v-slot="$field" name="firstname" class="flex flex-col gap-1">
        <label for="firstname" class="form-label">{{
          t("inputs.firstname.label")
        }}</label>
        <InputText
          v-model="state.firstname"
          id="firstname"
          :placeholder="t('inputs.firstname.placeholder')"
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

      <FormField v-slot="$field" name="lastname" class="flex flex-col gap-1">
        <label for="lastname" class="form-label">{{
          t("inputs.lastname.label")
        }}</label>
        <InputText
          v-model="state.lastname"
          id="lastname"
          :placeholder="t('inputs.lastname.placeholder')"
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
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Hospital / Medical Center Specific Fields -->
      <template v-if="selectedProviderType?.id === 1">
        <FormField
          v-slot="$field"
          name="hospitalName"
          class="flex flex-col gap-1"
        >
          <label for="hospitalName" class="form-label">{{
            t("inputs.hospital_name.label")
          }}</label>
          <InputText
            v-model="state.hospitalName"
            id="hospitalName"
            :placeholder="t('inputs.hospital_name.placeholder')"
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
          name="licenseNumber"
          class="flex flex-col gap-1"
        >
          <label for="licenseNumber" class="form-label">{{
            t("inputs.license_number.label")
          }}</label>
          <InputText
            v-model="state.licenseNumber"
            id="licenseNumber"
            :placeholder="t('inputs.license_number.placeholder')"
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

        <FormField v-slot="$field" name="address" class="flex flex-col gap-1">
          <label for="address" class="form-label">{{
            t("inputs.address.label")
          }}</label>
          <Textarea
            v-model="state.address"
            id="address"
            :placeholder="t('inputs.address.placeholder')"
            rows="3"
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
      </template>

      <!-- Individual Expert Specific Fields -->
      <template v-if="selectedProviderType?.id === 2">
        <FormField
          v-slot="$field"
          name="specialization"
          class="flex flex-col gap-1"
        >
          <label for="specialization" class="form-label">{{
            t("inputs.specialization.label")
          }}</label>
          <InputText
            v-model="state.specialization"
            id="specialization"
            :placeholder="t('inputs.specialization.placeholder')"
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
          name="certificationNumber"
          class="flex flex-col gap-1"
        >
          <label for="certificationNumber" class="form-label">{{
            t("inputs.certification_number.label")
          }}</label>
          <InputText
            v-model="state.certificationNumber"
            id="certificationNumber"
            :placeholder="t('inputs.certification_number.placeholder')"
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
          name="yearsOfExperience"
          class="flex flex-col gap-1"
        >
          <label for="yearsOfExperience" class="form-label">{{
            t("inputs.years_of_experience.label")
          }}</label>
          <InputNumber
            v-model="state.yearsOfExperience"
            id="yearsOfExperience"
            :placeholder="t('inputs.years_of_experience.placeholder')"
            :min="0"
            :max="50"
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
      </template>

      <!-- Distributors Sector Specific Fields -->
      <template v-if="selectedProviderType?.id === 3">
        <FormField
          v-slot="$field"
          name="companyName"
          class="flex flex-col gap-1"
        >
          <label for="companyName" class="form-label">{{
            t("inputs.company_name.label")
          }}</label>
          <InputText
            v-model="state.companyName"
            id="companyName"
            :placeholder="t('inputs.company_name.placeholder')"
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

        <FormField v-slot="$field" name="taxId" class="flex flex-col gap-1">
          <label for="taxId" class="form-label">{{
            t("inputs.tax_id.label")
          }}</label>
          <InputText
            v-model="state.taxId"
            id="taxId"
            :placeholder="t('inputs.tax_id.placeholder')"
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
          name="commercialRegistration"
          class="flex flex-col gap-1"
        >
          <label for="commercialRegistration" class="form-label">{{
            t("inputs.commercial_registration.label")
          }}</label>
          <InputText
            v-model="state.commercialRegistration"
            id="commercialRegistration"
            :placeholder="t('inputs.commercial_registration.placeholder')"
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
      </template>

      <Button type="submit" class="mt-2">
        <div>{{ t("auth.register.title") }}</div>
        <img
          src="/icons/arrow-right.svg"
          alt="submit"
          class="icon rtl-revert"
        />
      </Button>
    </Form>

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
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { string, object, number } from "yup";
import {
  ProviderType,
  PROVIDER_TYPES,
  type ProviderTypeInfo,
} from "~/types/provider";
const { validation } = useValidation();

// i18n
const { t } = useI18n();

// route
const route = useRoute();

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

// ===================================== data
const state = ref({
  providerType: null as number | null,
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  // Hospital / Medical Center fields
  hospitalName: "",
  licenseNumber: "",
  address: "",
  // Individual Expert fields
  specialization: "",
  certificationNumber: "",
  yearsOfExperience: null as number | null,
  // Distributors Sector fields
  companyName: "",
  taxId: "",
  commercialRegistration: "",
});

// Dynamic schema based on provider type
const registerSchema = computed(() => {
  const baseSchema: any = {
    providerType: validation.select_option("provider_type"),
    email: validation.email(),
    firstname: string().required(
      t("validation.required_with_label", {
        field: t("inputs.firstname.label"),
      })
    ),
    lastname: string().required(
      t("validation.required_with_label", {
        field: t("inputs.lastname.label"),
      })
    ),
    password: validation.password(),
  };

  // Add provider-specific validations
  if (state.value.providerType === 1) {
    // Hospital / Medical Center
    baseSchema.hospitalName = string().required(
      t("validation.required_with_label", {
        field: t("inputs.hospital_name.label"),
      })
    );
    baseSchema.licenseNumber = string().required(
      t("validation.required_with_label", {
        field: t("inputs.license_number.label"),
      })
    );
    baseSchema.address = string().required(
      t("validation.required_with_label", {
        field: t("inputs.address.label"),
      })
    );
  } else if (state.value.providerType === 2) {
    // Individual Expert
    baseSchema.specialization = string().required(
      t("validation.required_with_label", {
        field: t("inputs.specialization.label"),
      })
    );
    baseSchema.certificationNumber = string().required(
      t("validation.required_with_label", {
        field: t("inputs.certification_number.label"),
      })
    );
    baseSchema.yearsOfExperience = number()
      .required(
        t("validation.required_with_label", {
          field: t("inputs.years_of_experience.label"),
        })
      )
      .min(0)
      .max(50);
  } else if (state.value.providerType === 3) {
    // Distributors Sector
    baseSchema.companyName = string().required(
      t("validation.required_with_label", {
        field: t("inputs.company_name.label"),
      })
    );
    baseSchema.taxId = string().required(
      t("validation.required_with_label", {
        field: t("inputs.tax_id.label"),
      })
    );
    baseSchema.commercialRegistration = string().required(
      t("validation.required_with_label", {
        field: t("inputs.commercial_registration.label"),
      })
    );
  }

  return object(baseSchema);
});

// Helper function
function getProviderTypeById(id: number): ProviderTypeInfo | undefined {
  return Object.values(PROVIDER_TYPES).find((type) => type.id === id);
}

// Submit handler
function onSubmit(values: any) {
  console.log("Form submitted:", values);
  // Handle form submission here
}
</script>

<style></style>
