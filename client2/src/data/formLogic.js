import { ValidationCreateBeat } from "@/components";
import { ValidationCreateReview } from "@/components";
import { ValidationCreateUser } from "@/components";
import { useMemo } from "react";
import { debounce } from "lodash";

export const handleInputChange = (
  e,
  fieldsToValidate,
  setFieldsToValidate,
  form,
  setForm
) => {


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
  setSelected(e);
  setForm({ ...prevForm, genre: e });
};

export const validateForm = (form, fieldsToValidate, validateMode, mode) => {
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

  //e.preventDefault();
  const formErrors =
    props.validateMode === "beat"
      ? ValidationCreateBeat(props.form, "*", props.mode)
      : props.validateMode === "review"
      ? ValidationCreateReview(props.form, "*")
      : props.validateMode === "user"
      ? ValidationCreateUser(props.form, "*")
      : null;


  if (Object.keys(formErrors).length === 0) {
   
    await props.dispatch(props.actionToDispatch(props.form));
    
    props.formRef.reset();
  } else {
    props.setErrors(formErrors);
    throw new Error("Form Error");
  }
};
