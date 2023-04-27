import { FormColumn, FormContainer, FormRow, Input } from "@/components";
import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClient } from "@/redux/slices/client/authSession";
import { useRouter } from "next/router";
import { validationEditPassword } from "@/components/validation/client/editPassword";
export default function EditPasswordForm(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});

  // const defaultValues =
  //   useSelector((state) => state.client.authSession.session.current) || {};
  // const id = useSelector(
  //   (state) => state.client.authSession.session.current._id
  // );

  // const mode = props.mode;

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInput = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    const { name } = e.target;
    if (!fieldsToValidate.includes(name)) {
      setFieldsToValidate([...fieldsToValidate, name]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formErrors = validationEditPassword(form, "*");
      if (Object.keys(formErrors).length === 0) {
        console.log("DESPACHADO", form);
        await dispatch(editClient(form));
        formRef.current.reset();
        // router.push("/client");
      } else {
        setErrors(formErrors);
        console.log("form Error", formErrors);
        throw new Error("Form Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("form", form);
    setErrors(validationEditPassword(form, fieldsToValidate, validateMode));
    console.log("error", error);
  }, [form, fieldsToValidate]);

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <FormContainer>
        <FormRow>
          <FormColumn className="w-full">
            <Input
              id="oldPassword"
              name="oldPassword"
              label="Contraseña anterior"
              placeholder="Contraseña anterior"
              type="password"
              onChange={handleInput}
              error={error.oldPassword}
            />
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              id="newPassword"
              name="newPassword"
              label="Nueva contraseña"
              placeholder="Nueva contraseña"
              type="password"
              onChange={handleInput}
              error={error.newPassword}
            />
          </FormColumn>
        </FormRow>
        <button
          type="submit"
          className="background-primary-red-700 color-neutral-white w-max rounded-full px-5 py-3 text-sm font-semibold"
        >
          Guardar
        </button>
      </FormContainer>
    </form>
  );
}
