import validator from "email-validator";

export const validateEmail = (email) => {
  email = email.trim();
  if (!email) return { valid: false, reason: "This field can not be blank" };
  if (!validator.validate(email))
    return { valid: false, reason: "Please input valid email" };
  return { valid: true, reason: "Success" };
};
