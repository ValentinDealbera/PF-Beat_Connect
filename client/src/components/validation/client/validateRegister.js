import i18next from "i18next";

export function ValidateRegister(form, fieldsToValidate) {
  let error = {};
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "username":
        if (
          form.username.length < 1 ||
          form.username.length > 50 ||
          !form.username
        ) {
          if (i18next?.language == "en") {
            error.username =
              "Your user name must have between one and 50 characters.";
          } else {
            error.username =
              "Tu nombre de usuario debe contener entre 1 y 50 caracteres.";
          }
        }

        break;

      case "firstName":
        if (
          form.firstName.length < 1 ||
          form.firstName.length > 50 ||
          !form.firstName
        ) {
          if (i18next?.language == "en") {
            error.firstName =
              "Your firstname must have between one and 50 characters.";
          } else {
            error.firstName =
              "Tu nombre debe contener entre 1 y 50 caracteres.";
          }
        }

        break;

      case "lastName":
        if (
          form.lastName.length < 1 ||
          form.lastName.length > 50 ||
          !form.lastName
        ) {
          if (i18next?.language == "en") {
            error.lastName =
              "Your lastname must have between one and 50 characters.";
          } else {
            error.lastName =
              "Tu apellido debe contener entre 1 y 50 caracteres.";
          }
        }
        break;

      case "password":
        if (form.password && !regexPassword.test(form.password)) {
          if (i18next?.language == "en") {
            error.password =
              "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
          } else {
            error.password =
              "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.";
          }
        }

        break;

      case "email":
        if (!regexEmail.test(form.email)) {
          if (i18next?.language == "en") {
            error.email = "Please enter a valid email address.";
          } else {
            error.email = "Por favor ingresa un email válido";
          }
        }
        break;

      default:
        break;
    }
  });

  return error;
}
