export function ValidationCreateReview(form, fieldsToValidate) {
  let error = {};

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  console.log("fieldsToValidate", fieldsToValidate, form);

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "createdBy":
        if (!form.createdBy || form.createdBy === "") {
          error.createdBy = "You must enter a id";
        }

        break;

      case "rating":
        if (!form.rating || form.rating === "") {
          error.rating = "You must enter a rating";
        }

        break;

      case "comment":
        if (!form.comment || form.comment === "") {
          error.comment = "You must enter a comment";
        }

        break;

      case "title":
        if (!form.title || form.title === "") {
          error.title = "You must enter a title";
        }

        break;

      case "beat":
        if (!form.beat || form.beat === "") {
          error.beat = "You must enter a beat";
        }

        break;

      default:
        break;
    }
  });

  return error;
}
