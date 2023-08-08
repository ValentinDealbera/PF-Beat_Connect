import i18next from 'i18next';

export function validationEditPassword(form, fieldsToValidate) {
  
  let error = {};
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  // oldRegisteredPassword = getState().client.authSession.session.CONTRASEÑA

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "oldPassword":
        if (!regexPassword.test(form.oldPassword)) {
          if (i18next?.language == "en") {
            error.oldPassword = "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character; in addition to a minimum of 8 characters.";
          } else {
            error.oldPassword = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; además de un mínimo de 8 caracteres";
          }
        } //  else if (form.oldPassword !== /* CONTRASEÑA */ 1) {
        // //   error.oldPassword =
        //     "Esta contraseña no coincide con tu contraseña actual";
        // }
        break;
      case "newPassword":
        if (!regexPassword.test(form.newPassword)){
        if (i18next?.language == "en") {
          error.newPassword = "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character; in addition to a minimum of 8 characters.";
        } else {
          error.newPassword = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; además de un mínimo de 8 caracteres";
        }
      }
        // else if (form.oldPassword === form.newPassword) {
        //   error.newPassword =
        //     "Tu nueva contraseña debe ser distinta a la actual";
        // }
        break;

      default:
        break;
    }
  });

  return error;
}
