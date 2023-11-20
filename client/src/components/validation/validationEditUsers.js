const ValidationEditUsers = (form, fieldsToValidate) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
  const error = {}
  const regexImage = /\.jpg$|\.png$/i
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (fieldsToValidate === '*') {
    fieldsToValidate = Object.keys(form)
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case 'username':
        if (form.username.length < 2) error.username = 'You must enter a username minimo 2'
        else if (form.username.length > 30) error.username = 'The username must have a maximum of 30 characters'
        break

      case 'email':
        if (form.email.length < 1) error.email = 'You must enter an email'
        else if (!emailRegex.test(form.email)) error.email = 'You must enter a valid email'
        break

      case 'firstName':
        if (form.firstName.length < 1) error.firstName = 'You must enter a first name'
        else if (form.firstName.length > 50) error.firstName = 'The first name must have a maximum of 50 characters'
        break

      case 'lastName':
        if (form.lastName.length < 1) error.lastName = 'You must enter a last name'
        else if (form.lastName.length > 50) error.lastName = 'The last name must have a maximum of 50 characters'
        break

      case 'password':
        if (form.password.length < 1) error.password = 'You must enter a password'
        else if (form.password.length < 8) error.password = 'The password must have a minimum of 8 characters'
        break

      case 'image':
        if (form.image.size > MAX_FILE_SIZE) {
          error.image = 'The size of the image is too large. Maximum allowed size is 10 MB.'
        }
        if (!regexImage.test(form.image.name)) error.image = 'You must upload a jpg or png file'
        break

      case 'isSeller':
        if (form.isSeller === undefined || form.isSeller === null || form.isSeller === '') {
          error.isSeller = 'You must select if you are a seller or not'
        }
        break
      case 'softDelete':
        // debe ser true o false
        if (form.softDelete !== true || form.softDelete !== false) {
          error.softDelete = 'You must select if you want to delete the user or not'
        }
        break

      default:
        break
    }
  })

  return error
}

export default ValidationEditUsers
