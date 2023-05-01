export function ValidateRecoverMail(data) {
  let error = {};
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(data))
    error.email = "Please enter a valid email address.";

  return error;
}
