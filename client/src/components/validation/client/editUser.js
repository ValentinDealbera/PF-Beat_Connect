export function validationEditUser(form, fieldsToValidate) {
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
          form.username.length > 20 ||
          !form.username
        )
          error.username =
            "Your username must have between one and twenty characters.";

        break;

      case "firstName":
        if (
          form.firstName.length < 1 ||
          form.firstName.length > 50 ||
          !form.firstName
        )
          error.firstName = "Your name must have between 1 and 50 characters.";

        break;

      case "bio":
        if ((form.bio.length < 1 || form.bio.length > 50) && form.bio)
          error.bio = "Your Bio phrase must have between 1 and 50 characters.";

        break;

      // Validar tamaño de imagen
      case "image":
        console.log("soy image", form.image.name);
        if (form.image) {
          if (form.image.size > MAX_FILE_SIZE) {
            error.image =
              "The size of the image is too large. Maximum allowed size is 10 MB.";
          }
          if (!regexImage.test(form.image.name)) {
            error.image = "You must upload a jpg or png file";
          }
        }
        break;

      case "backImage":
        console.log("soy backImage", form.backImage.name);
        if (form.backImage) {
          if (form.backImage.size > MAX_FILE_SIZE) {
            error.backImage =
              "The size of the backImage is too large. Maximum allowed size is 10 MB.";
          }
          if (!regexImage.test(form.backImage.name)) {
            error.backImage = "You must upload a jpg or png file";
          }
        }
        break;

      case "lastName":
        if (
          form.lastName.length < 1 ||
          form.lastName.length > 50 ||
          !form.lastName
        )
          error.lastName =
            "Your lastname must have between 1 and 50 characters.";

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
