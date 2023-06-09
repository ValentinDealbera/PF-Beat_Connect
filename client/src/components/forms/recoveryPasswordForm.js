import { FormColumn, FormContainer, Input } from "@/components";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordRecovery } from "@/redux/slices/client/authSession";
import { useRouter } from "next/router";
import { validationRecoverPassword } from "@/components/validation/client/recoverPassword";
import { useTranslation } from "react-i18next";

export default function RecoveryPasswordForm(props) {
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const userEmail = router.query.email;

  const id = useSelector(
    (state) => state.client.authSession.session.current._id
  );

  const [form, setForm] = useState({
    newPassword: "",
    repeatNewPassword: "",
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
      const formErrors = validationRecoverPassword(form, "*");
      if (Object.keys(formErrors).length === 0) {


        dispatch(
          passwordRecovery({ newPassword: form.newPassword, email: userEmail })
        );
        formRef.current.reset();

        // router.push("/auth");
      } else {
        setErrors(formErrors);
   
        throw new Error("Form Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
 
    setErrors(validationRecoverPassword(form, fieldsToValidate, validateMode));

  }, [form, fieldsToValidate]);

  return (
    <form onSubmit={onSubmit} ref={formRef} className="flex flex-col">
      <FormContainer>
        <div className="flex flex-col gap-4">
          <FormColumn className="w-full">
            <Input
              id="newPassword"
              name="newPassword"
              label={t("recover.t6")}
              type="password"
              onChange={handleInput}
              error={error.newPassword}
            />
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              id="repeatNewPassword"
              name="repeatNewPassword"
              label={t("recover.t7")}
              type="password"
              onChange={handleInput}
              error={error.repeatNewPassword}
            />
          </FormColumn>
          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
          >
              {t("recover.t8")}
          </button>
          <div className="flex justify-center gap-4">
          <button
            onClick={() => i18n.changeLanguage("es")}
            className="background-primary-red-700 color-neutral-white border-radius-estilo1 text-base-semibold w-max px-3 py-2"
          >
            Español
          </button>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className="background-primary-red-700 color-neutral-white border-radius-estilo1 text-base-semibold w-max px-3 py-2"
          >
            English
          </button>
          </div>
        </div>
      </FormContainer>
    </form>
  );
}
