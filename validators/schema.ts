import * as Yup from "yup";
import {
  validateInputEmail,
  validateInputPhone,
  validateOnlyLetters,
  validatePassword,
} from "../utils/validateInput";

export const schema = Yup.object().shape({
  fullname: Yup.string()
    .min(0)
    .required("Full name is required")
    .test("Only letters", "Only letters and big than 3 letter", (value) =>
      validateOnlyLetters(value)
    ),
  username: Yup.string()
    .required("User name is required")
    .test("Only letters", "Only letters and big than 3 letter", (value) =>
      validateOnlyLetters(value)
    ),
  // phone: Yup.string()
  //   .required("Phone is required")
  //   .test("Phone", "Phone is not valid", (value) => validateInputPhone(value)),
  email: Yup.string()
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
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
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
