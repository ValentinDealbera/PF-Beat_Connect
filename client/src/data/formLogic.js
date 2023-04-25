import { ValidationCreateBeat } from "@/components/client/validationCreateBeat";
import { ValidationCreateReview } from "@/components/client/validationCreateReview";
import { ValidationCreateUser } from "@/components/client/validationCreateUser";
import { useMemo } from "react";
import { debounce } from "lodash";

export const handleInputChange = (
  e,
  fieldsToValidate,
  setFieldsToValidate,
  form,
  setForm
) => {
  console.log("change", setForm, form);

  if (e.target.type === "file") {
    setForm({
      ...form,
      [e.target.name]: e.target.files[0],
    });
  } else {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  }

  const { name } = e.target;
  if (!fieldsToValidate.includes(name)) {
    setFieldsToValidate([...fieldsToValidate, name]);
  }
};

export const handleSelectChange = (e, setSelected, setForm, prevForm) => {
  console.log("handleSelectChange", e);
  setSelected(e);
  setForm({ ...prevForm, genre: e });
};

export const validateForm = (form, fieldsToValidate, validateMode, mode) => {
  console.log("validateForm", validateMode, mode);
  const errors =
    validateMode === "beat"
      ? ValidationCreateBeat(form, fieldsToValidate, mode)
      : validateMode === "review"
      ? ValidationCreateReview(form, fieldsToValidate)
      : validateMode === "user"
      ? ValidationCreateUser(form, fieldsToValidate)
      : null;
  return errors;
};

export const handleSubmit = async (props) => {
  console.log("handleSubmit", props);
  //e.preventDefault();
  const formErrors =
    props.validateMode === "beat"
      ? ValidationCreateBeat(props.form, "*", props.mode)
      : props.validateMode === "review"
      ? ValidationCreateReview(props.form, "*")
      : props.validateMode === "user"
      ? ValidationCreateUser(props.form, "*")
      : null;

  console.log("formErrors", props.validateMode);
  if (Object.keys(formErrors).length === 0) {
    console.log("DESPACHADO");
    await props.dispatch(props.actionToDispatch(props.form));
    
    props.formRef.reset();
  } else {
    props.setErrors(formErrors);
    console.log("form Error", formErrors, props.validateMode);
    throw new Error("Form Error");
  }
};
