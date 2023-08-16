type handleChangeProps = {
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;
  setFormValues: (formValues: any) => void;
  setErrors: (errors: any) => void;
  validate: (value: string | File, type: string, fileType: string) => any;
};

export const changeManager = ({
  e,
  setFormValues,
  setErrors,
  validate,
}: handleChangeProps) => {
  const { name, value, type, files } = e.target as HTMLInputElement &
    HTMLTextAreaElement;

  const file = (e.target as HTMLInputElement) && files ? files[0] : "";
  const { field, error, isValid } = validate(
    type === "text" ||
      type === "password" ||
      type === "email" ||
      type === "textarea" ||
      type === "number" ||
      type === "date"
      ? value
      : file,
    name,
    type,
  );

  if (e.target.type === "file") {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: file,
    }));
  } else {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  if (!isValid) {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: error[name],
    }));
  } else {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: null,
    }));
  }
};

type handleSubmitProps = {
  e: React.FormEvent<HTMLFormElement>;
  formValues: any;
  setFormValues: (formValues: any) => void;
  errors: any;
  dispatch: any;
  actionToDispatch: any;
  formRef: React.RefObject<HTMLFormElement>;
};

//async
export const submitManager = async ({
  e,
  formValues,
  formRef,
  errors,
  dispatch,
  actionToDispatch,
  setFormValues,
}: handleSubmitProps) => {
  e.preventDefault();

  //si algun valor de form values es null, no se envia el formulario
  if (
    !Object.values(errors).every((error) => error === null) ||
    Object.keys(formValues).length <= 0 ||
    Object.values(formValues).some((value) => value === null)
  ) {
    console.log("errors", errors);
    throw new Error("Formulario invalido");
  }

  const resolve = await dispatch(actionToDispatch(formValues));
  if (resolve.error) {
    formRef.current?.reset();
  }
  //reset form
  //e.currentTarget.reset();
  setFormValues({});
  formRef.current?.reset();

  return resolve;
};
