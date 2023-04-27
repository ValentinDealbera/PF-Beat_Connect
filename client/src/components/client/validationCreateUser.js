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
        if (form.username.length < 1 || form.username.length > 50 || !form.username)
          error.username =
            "The name of your beat must have between one and 50 characters.";

        break;

      case "firstName":
        if (form.firstName.length < 1 || form.firstName.length > 50 || !form.firstName)
          error.firstName =
            "The name of your beat must have between one and 50 characters.";

        break;

        case "bio":
        if (form.bio && (form.bio.length < 1 || form.bio.length > 50))
          error.bio =
            "Your bio phrase must have between one and 50 characters.";

        break;

      // Validar tamaño de imagen
      // case "image":
      //   console.log("soy image", form.image.name);
      //   if (form.image.size > MAX_FILE_SIZE)
      //     error.image =
      //       "The size of the image is too large. Maximum allowed size is 10 MB.";
      //   if (!regexImage.test(form.image.name))
      //     error.image = "You must upload a jpg or png file";
      //   break;

      case "lastName":
        if (form.lastName.length < 1 || form.lastName.length > 50 || !form.lastName)
          error.lastName =
            "The last name of your beat must have between one and 50 characters.";

        break;

      case "password":
        if (form.password && !regexPassword.test(form.password))
          error.password =
            "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        break;

      case "email":
        if (!regexEmail.test(form.email))
          error.email = "Please enter a valid email address.";
        break;

      default:
        break;
    }
  });

  return error;
}
