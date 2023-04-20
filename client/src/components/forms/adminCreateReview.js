import {
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
  TextArea,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminEditReview, adminPostReview } from "@/redux/slices/admin";
import { useRouter } from "next/router";

const AdminCreateReviewForm = forwardRef((props, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "review";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues =
    useSelector((state) => state.admin.currentEditReview) || {};
  const mode = props.mode;

console.log("defaultValues", defaultValues);

  console.log("router", router);

  console.log("defaultValues", defaultValues);

try {

  const [form, setForm] = useState({
    createdBy: `${mode === "edit" ? defaultValues.createdBy._id : ""}`,
    rating: `${mode === "edit" ? defaultValues.rating : ""}`,
    beat: `${mode === "edit" ? defaultValues.beat._id : ""}`,
    comment: `${mode === "edit" ? defaultValues.comment : ""}`,
    title: `${mode === "edit" ? defaultValues.title : ""}`,
  });

  // {
  //   "rating": "4",
  //   "title": "Buena calidad",
  //   "comment": "sin comentarios”
  //  "createdBy": "64384ed5243ab0df93352345", (id del usuario)
  //    "beat": "643aade5e70947fce262888e", (id del beat)
  //  }

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

  const onSubmit = async (e) => {
    console.log("onSubmit", e, validateMode);
    const actionToDispatch =
      mode === "edit" ? adminEditReview : adminPostReview;
    try {
      await handleSubmit({
        form: form,
        actionToDispatch: actionToDispatch,
        dispatch: dispatch,
        setErrors: setErrors,
        validateMode: validateMode,
        formRef: formRef.current,
      });
      router.push("/admin/reviews");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      // formRef.current.submit();
      onSubmit();
    },
  }));

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

}

catch (error) {
  console.error(error);
}


try {
  return (
    <form ref={formRef} onSubmit={onSubmit}>
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
              //defaultValue={mode === "edit" ? defaultValues.firstName : ""}
              defaultValue={mode === "edit" ? defaultValues.createdBy._id : ""}
            />
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Titulo"
              label="Titulo del review"
              onChange={handleInput}
              error={error.title}
              defaultValue={mode === "edit" ? defaultValues.title : ""}
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
              defaultValue={mode === "edit" ? defaultValues.rating : ""}
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
              defaultValue={mode === "edit" ? defaultValues.beat._id : ""}
            />
            <TextArea
              id="comment"
              name="comment"
              placeholder="Comentario"
              label="Comentario"
              error={error.comment}
              onChange={handleInput}
              defaultValue={mode === "edit" ? defaultValues.comment : ""}
            />
          </FormColumn>
        </FormRow>
      </FormContainer>
    </form>
  );
} catch (error) {
  console.error(error);

}
});

export default AdminCreateReviewForm;
