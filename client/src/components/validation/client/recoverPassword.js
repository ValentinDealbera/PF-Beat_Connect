export function validationRecoverPassword(form, fieldsToValidate) {
  let error = {};
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "newPassword":
        if (!regexPassword.test(form.newPassword))
          error.newPassword =
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; ademas de  un mínimo de 8 caracteres";
        break;
      case "repeatNewPassword":
        if (form.newPassword !== form.repeatNewPassword)
          error.repeatNewPassword = "Las contraseñas deben ser iguales";
        break;

      default:
        break;
    }
  });

  return error;
}
