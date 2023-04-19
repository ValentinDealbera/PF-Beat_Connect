import {
  SellerDashboardLayout,
  IslandDashboard,
  FormContainer,
  FormColumn,
  FormRow,
  Input,
  Select,
  SwitchForm,
  TextArea,
} from "@/components";

import {
  handleSelectChange,
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchGenres } from "@/redux/slices/filters";

export default function SellerDashboardOverview() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "review";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});

  const [form, setForm] = useState({
    createdBy: "",
    beat: "",
    comment: "",
    title: "",
    rating: "",
    softDelete: false,
  });

  const handleInput = (e) => {
    handleInputChange(
      e,
      fieldsToValidate,
      setFieldsToValidate,
      form,
      setForm,
      validateMode
    );
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  const onSubmit = (e) => {
    console.log("onSubmit", e, validateMode);
    handleSubmit({
      form: form,
      //  dispatch: dispatch,
      //actionToDispatch: "user/create",
      setErrors: setErrors,
      validateMode: validateMode,
      formRef: formRef.current,
    });
  };

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: true,
          });
        },
      },
      {
        text: "No",
        active: !form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: false,
          });
        },
      },
    ],
  };

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Crear review"
          topBarButtonLabel="Guardar cambios"
          onClick={onSubmit}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <form ref={formRef}>
              <FormContainer>
                <FormRow>
                  <FormColumn className="w-full">
                    <Input
                      id="createdBy"
                      type="text"
                      name="createdBy"
                      placeholder="Id del autor"
                      label="Id del autor"
                      error={error.createdBy}
                      onChange={handleInput}
                    />
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Titulo"
                      label="Titulo del review"
                      onChange={handleInput}
                      error={error.title}
                    />
                    <Input
                      id="rating"
                      type="number"
                      name="rating"
                      step="0.1"
                      placeholder="Rating"
                      label="Rating del review"
                      onChange={handleInput}
                      error={error.rating}
                    />
                    <SwitchForm
                      label="SoftDelete"
                      name="softDelete"
                      nameInput="softDelete"
                      defaultValue={false}
                      onChange={handleInput}
                      arrayButtons={arraySoftDelete.arrayButtons}
                    />
                  </FormColumn>
                  <FormColumn className="w-full">
                    <Input
                      id="beat"
                      name="beat"
                      type="text"
                      placeholder="Id del beat"
                      label="Id del beat"
                      error={error.beat}
                      onChange={handleInput}
                    />
                    <TextArea
                      id="comment"
                      name="comment"
                      placeholder="Comentario"
                      label="Comentario"
                      error={error.comment}
                      onChange={handleInput}
                    />
                  </FormColumn>
                </FormRow>
              </FormContainer>
            </form>
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
