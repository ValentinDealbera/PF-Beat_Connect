export function validationEditPassword(form, fieldsToValidate) {
  let error = {};
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const regexImage = /\.jpg$|\.png$/i;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "oldPassword":
        if (!regexPassword.test(form.oldPassword))
          error.oldPassword =
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; ademas de  un mínimo de 8 caracteres";
        break;
      case "newPassword":
        if (!regexPassword.test(form.newPassword))
          error.newPassword =
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; ademas de  un mínimo de 8 caracteres";
        break;

      default:
        break;
    }
  });

  return error;
}
