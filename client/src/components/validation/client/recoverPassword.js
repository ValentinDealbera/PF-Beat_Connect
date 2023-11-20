import i18next from 'i18next'

export function validationRecoverPassword(form, fieldsToValidate) {
  const error = {}
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (fieldsToValidate === '*') {
    // pasamos de obje ct a array
    fieldsToValidate = Object.keys(form)
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case 'newPassword':
        if (!regexPassword.test(form.newPassword)) {
          if (i18next?.language == 'en') {
            error.newPassword =
              'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character; in addition to a minimum of 8 characters.'
          } else {
            error.newPassword =
              'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial; además de un mínimo de 8 caracteres'
          }
        }
        break
      case 'repeatNewPassword':
        if (form.newPassword !== form.repeatNewPassword) {
          if (i18next?.language == 'en') {
            error.repeatNewPassword = 'Passwords must match'
          } else {
            error.repeatNewPassword = 'Las contraseñas deben ser iguales'
          }
        }
        break

      default:
        break
    }
  })

  return error
}
