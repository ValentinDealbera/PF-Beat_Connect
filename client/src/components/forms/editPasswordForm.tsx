import { FormColumn, FormContainer, FormRow, Input } from "@/components";
import { useState, useRef, useEffect, useMemo } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { changePassword } from "@/redux/slices/client/authSession";
import { useRouter } from "next/navigation";
import { validationEditPassword } from "@/components/validation/client/editPassword";
import { useTranslation } from "react-i18next";

export default function EditPasswordForm() {
  const [t] = useTranslation("global");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]) as any;
  const [error, setErrors] = useState({}) as any;

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInput = (e: any) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    const { name } = e.target;
    if (!fieldsToValidate.includes(name)) {
      setFieldsToValidate([...fieldsToValidate, name]);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formErrors = validationEditPassword(form, "*");
      if (Object.keys(formErrors).length === 0) {
        await dispatch(changePassword(form));
        formRef.current.reset();
        router.push("/client");
      } else {
        setErrors(formErrors);

        throw new Error("Form Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setErrors(validationEditPassword(form, fieldsToValidate));
  }, [form, fieldsToValidate]);

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <FormContainer>
        <FormRow>
          <FormColumn className="w-full">
            <Input
              id="oldPassword"
              name="oldPassword"
              label={t("editPassword.t1")}
              placeholder={t("editPassword.t1")}
              type="password"
              onChange={handleInput}
              error={error.oldPassword}
            />
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              id="newPassword"
              name="newPassword"
              label={t("editPassword.t2")}
              placeholder={t("editPassword.t2")}
              type="password"
              onChange={handleInput}
              error={error.newPassword}
            />
          </FormColumn>
        </FormRow>
        <button
          type="submit"
          className="background-primary-red-700 color-neutral-white mt-1 w-max rounded-full px-5 py-3 text-sm font-semibold"
        >
          {t("editPassword.t3")}
        </button>
      </FormContainer>
    </form>
  );
}
