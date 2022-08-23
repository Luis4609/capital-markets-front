import * as Yup from "yup";
import {
  validateInputDni,
  validateInputEmail,
  validateOnlyLetters,
  validatePassword,
} from "../utils/validateInput";

export const validationSchemaLogin = Yup.object().shape({
  mail: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test("Email", "accents not allowed", (value) => validateInputEmail(value)),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .test(
      "one-uppercase character special character and a number",
      "Password must contain at least one uppercase letter, one special character and one number",
      (value) => validatePassword(value)
    ),
});

// export const validationSchemaRegister = Yup.object().shape({
//   fullname: Yup.string()
//     .min(0)
//     .required("Full name is required")
//     .test("Only letters", "Only letters and big than 3 letter", (value) =>
//       validateOnlyLetters(value)
//     ),
//   username: Yup.string()
//     .required("User name is required")
//     .test("Only letters", "Only letters and big than 3 letter", (value) =>
//       validateOnlyLetters(value)
//     ),
//   mail: Yup.string()
//     .email("Email is invalid")
//     .required("Email is required")
//     .test("Email", "accents not allowed", (value) => validateInputEmail(value)),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required")
//     .test(
//       "one-uppercase character special character and a number",
//       "Password must contain at least one uppercase letter, one special character and one number",
//       (value) => validatePassword(value)
//     ),
//   confirmPassword: Yup.string().oneOf(
//     [Yup.ref("password"), null],
//     "Passwords must match"
//   ),
//   // acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
// });

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .min(0)
    .required("Full name is required")
    .test("Only letters", "Only letters and big than 3 letter", (value) =>
      validateOnlyLetters(value)
    ),
  surname: Yup.string()
    .required("User name is required")
    .test("Only letters", "Only letters and big than 3 letter", (value) =>
      validateOnlyLetters(value)
    ),
  dni: Yup.string()
    .required("DNI is required")
    .test("Only letters", "Eight numbers plus a letter", (value) =>
      validateInputDni(value)
    ),
  mail: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test("Email", "accents not allowed", (value) => validateInputEmail(value)),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .test(
      "one-uppercase character special character and a number",
      "Password must contain at least one uppercase letter, one special character and one number",
      (value) => validatePassword(value)
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});
