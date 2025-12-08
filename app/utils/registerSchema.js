import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().required("Username is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().required("City is required"),
  location: yup.string().required("Location is required"),
  password: yup.string().min(6).required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Repeat the password"),
});
