import i18next from 'i18next';

export function ValidationCreateReview(form, fieldsToValidate) {
  let error = {};

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "createdBy":
        if (!form.createdBy || form.createdBy === ""){
          if (i18next?.language == "en") {
            error.createdBy = "You must enter a id";
          } else {
            error.createdBy = "Debes ingresar un ID";
          }
        };
        break;

      case "rating":
        if (!form.rating || form.rating === "") {
          if (i18next?.language == "en") {
            error.rating = "You must enter a rating";
          } else {
            error.rating = "Debes ingresar una calificación";
          }
        };
        if (form.rating > 5) {
          if (i18next?.language == "en") {
            error.rating = "You must select a number between one and five";
          } else {
            error.rating = "Debes seleccionar un número entre uno y cinco";
          }
        };
        break;

      case "comment":
        if (!form.comment || form.comment === "") {
          if (i18next?.language == "en") {
            error.comment = "You must enter a comment";
          } else {
            error.comment = "Debes ingresar un comentario";
          }
        };
        break;

      case "title":
        if (!form.title || form.title === "") {
          if (i18next?.language == "en") {
            error.title = "You must enter a title";
          } else {
            error.title = "Debes ingresar un título";
          }
        };
        break;

      case "beat":
        if (!form.beat || form.beat === "") {
          if (i18next?.language == "en") {
            error.beat = "You must enter a beat";
          } else {
            error.beat = "Debes ingresar un beat";
          }
        };
        break;

      default:
        break;
    }
  });

  return error;
}
