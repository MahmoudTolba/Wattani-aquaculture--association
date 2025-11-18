// composables/useValidation.ts
import { string, number, boolean, array, ref, object, mixed } from "yup";

export const useValidation = () => {
  const { t } = useI18n();

  const validation = {
    // name
    name: ({ key = "name", min = 2, max = 250 }) =>
      string()
        .trim()
        // .min(min, t(`inputs.${key}.min_error`))
        // .max(max, t(`inputs.${key}.max_error`))
        .required(t(`inputs.${key}.required`)),

    // files
    files: ({ key = "files", min = 1, single = false }) =>
      single
        ? mixed()
            .test(
              "is-object-or-filelist",
              t(`inputs.${key}.required`),
              (value) => {
                if (!value) return false;
                return typeof value === "object" || value instanceof FileList;
              }
            )
            .required(t(`inputs.${key}.required`))
        : array()
            .of(string())
            .required(t(`inputs.${key}.required`))
            .min(min, t(`inputs.${key}.min_error`)),

    // nubmer_type
    number_type: (key = "", max = 1000) =>
      number()
        .required(t(`inputs.${key}.required`))
        .positive(t(`inputs.positive_number`))
        .integer(t(`inputs.validation.number_type_error`))
        .max(max, t(`inputs.${key}.max_error`))
        .typeError(t(`inputs.validation.number_type_error`)),

    // phone
    phone: ({ length = 10 }) =>
      string()
        .trim()
        .matches(
          new RegExp(`^[0-9]{${length}}$`),
          t(`inputs.validation.phone_invalid`, { length })
        )
        .required(t(`inputs.validation.phone_invalid`, { length })),

    // email
    email: () =>
      string()
        .trim()
        .email(t("inputs.email.invalid") + "email@example.com")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          t("inputs.email.invalid") + "email@example.com"
        )
        .required(t("inputs.email.required")),

    email_optional: () =>
      string()
        .trim()
        .nullable()
        .optional()
        .test(
          "is-valid-email",
          t("inputs.email.invalid") + "email@example.com",
          (value) => {
            if (!value) return true;
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          }
        ),

    // password
    password: () =>
      string()
        .trim()
        .required(
          t("validation.password", { field: t("inputs.password.label") })
        ),

    // current_password
    current_password: () =>
      string().trim().required(t("inputs.current_password.required")),

    // password confirmation
    password_confirmation: () =>
      string()
        .trim()
        .oneOf(
          [ref("password"), null],
          t("inputs.password_confirmation.mismatch")
        )
        .required(t("inputs.password_confirmation.required")),

    // new password
    new_password: () =>
      string().trim().required(t("inputs.new_password.required")),

    // new password confirmation
    new_password_confirmation: () =>
      string()
        .trim()
        .oneOf(
          [ref("password"), null],
          t("inputs.new_password_confirmation.mismatch")
        )
        .required(t("inputs.new_password_confirmation.required")),

    // select_option
    select_option: (key = "") =>
      number()
        .required(t(`inputs.${key}.required`))
        .typeError(t(`inputs.${key}.required`)),

    // checkbox
    checkbox: (key = "") =>
      boolean()
        .oneOf([true], t(`inputs.${key}.required`))
        .required(t(`inputs.${key}.required`)),

    // words_count
    words_count: ({ key = null, min = 2, max = 100 }) =>
      string()
        .trim()
        .test("minWords", t(`inputs.${key || "name"}.min_error`), (val) => {
          if (!val) return true;
          const words = val.trim().split(/\s+/);
          return words.length >= min;
        })
        .test("maxWords", t(`inputs.${key || "name"}.max_error`), (val) => {
          if (!val) return true;
          const words = val.trim().split(/\s+/);
          return words.length <= max;
        })
        .required(t(`inputs.${key || "name"}.required`)),

    // url
    url: (key = "") =>
      string()
        .url(t(`inputs.${key}.invalid`))
        .test("not-only-space", t(`inputs.${key}.invalid`), (val) => {
          return !val || val.trim().length > 0;
        }),
  };

  return { validation };
};
