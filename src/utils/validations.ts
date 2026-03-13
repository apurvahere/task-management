import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const TaskValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .max(200, "Description too long")
    .required("Description is required"),

  status: Yup.string().required("Status is required"),
});
