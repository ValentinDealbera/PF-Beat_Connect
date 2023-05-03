import i18next from 'i18next';

export function ValidationCreateUser(form, fieldsToValidate) {
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
      case "username":
        if (
          form.username.length < 1 ||
          form.username.length > 50 ||
          !form.username
        ){
          if (i18next?.language == "en") {
            error.username = "Your username must have between one and 50 characters.";
          } else {
            error.username = "Tu nombre de usuario debe tener entre uno y 50 caracteres.";
          }
        };
        break;

      case "firstName":
        if (
          form.firstName.length < 1 ||
          form.firstName.length > 50 ||
          !form.firstName
        ){
          if (i18next?.language == "en") {
            error.firstName = "Your firstname must have between one and 50 characters.";
          } else {
            error.firstName = "Tu nombre debe tener entre uno y 50 caracteres.";
          }
        };
        break;

      case "bio":
        if (form.bio && (form.bio.length < 1 || form.bio.length > 50))
        {
          if (i18next?.language == "en") {
            error.bio = "Your bio phrase must have between one and 50 characters.";
          } else {
            error.bio = "Tu biografía debe tener entre uno y 50 caracteres.";
          }
        };
        break;

      case "image":
        console.log("soy image", form.image.name);
        if (form.image) {
          if (form.image.size > MAX_FILE_SIZE) {
            if (i18next?.language == "en") {
              error.image = "The size of the image is too large. Maximum allowed size is 10 MB.";
            } else {
              error.image = "El tamaño de la imagen es demasiado grande. El tamaño máximo permitido es de 10 MB.";
            }
          };
          if (!regexImage.test(form.image.name)) {
            if (i18next?.language == "en") {
              error.image = "You must upload a jpg or png file";
            } else {
              error.image = "Debes subir un archivo jpg o png";
            }
          };
        };
        break;

      case "backImage":
        console.log("soy backImage", form.backImage.name);
        if (form.backImage) {
          if (form.backImage.size > MAX_FILE_SIZE) {
            if (i18next?.language == "en") {
              error.backImage = "The size of the backImage is too large. Maximum allowed size is 10 MB.";
            } else {
              error.backImage = "El tamaño de la imagen de fondo es demasiado grande. El tamaño máximo permitido es de 10 MB.";
            }
          };
          if (!regexImage.test(form.backImage.name)) {
            if (i18next?.language == "en") {
              error.backImage = "You must upload a jpg or png file";
            } else {
              error.backImage = "Debes subir un archivo jpg o png";
            }
          };
        };
        break;

      case "lastName":
        if (
          form.lastName.length < 1 ||
          form.lastName.length > 50 ||
          !form.lastName
        ) {
          if (i18next?.language == "en") {
            error.lastName = "The last name must have between one and 50 characters.";
          } else {
            error.lastName = "El apellido debe tener entre uno y 50 caracteres.";
          }
        };
        break;

      case "password":
        if (form.password && !regexPassword.test(form.password))
        {
          if (i18next?.language == "en") {
            error.password = "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
          } else {
            error.password = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
          }
        };
        break;

      case "email":
        if (!regexEmail.test(form.email))
        {
          if (i18next?.language == "en") {
            error.email = "Please enter a valid email address.";
          } else {
            error.email = "Por favor ingresa una dirección de correo electrónico válida.";
          }
        };
        break;

      default:
        break;
    }
  });

  return error;
}