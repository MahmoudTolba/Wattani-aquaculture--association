import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup.string().required("Phone is required"),
  password: yup.string().required("Password is required"),
});
