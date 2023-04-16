export function validate(input) {
    let errors = {};
    if (input.name) {
      errors.name = "El nombre solo puede contener letras!";
    }
     return errors;
  }