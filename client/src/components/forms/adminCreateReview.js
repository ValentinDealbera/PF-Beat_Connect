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
import { adminEditReview, adminPostReview, adminGetFormBeats, adminGetUsersForms } from "@/redux/slices/admin";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

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
  const defaultUsers = useSelector((state) => state.admin.usersForms);
  const defaultBeats = useSelector((state) => state.admin.beatsForms);  

console.log("defaultValues", defaultValues);
console.log("DEFAULT BEATS", defaultBeats);

  const [form, setForm] = useState({
    createdBy: `${mode === "edit" ? defaultValues.createdBy._id : ""}`,
    rating: `${mode === "edit" ? defaultValues.rating : ""}`,
    beat: `${mode === "edit" ? defaultValues.beat._id : ""}`,
    comment: `${mode === "edit" ? defaultValues.comment : ""}`,
    title: `${mode === "edit" ? defaultValues.title : ""}`,
    id: `${mode === "edit" ? defaultValues._id : ""}`,
    softDelete: `${mode === "edit" ? defaultValues.softDelete : ""}`,
  });
  
  const options = defaultUsers.map(user => ({
          label: user.username,
          value: user._id
        }));
        
  const optionsBeats = defaultBeats.map(beat => ({
          label: beat.name,
          value: beat._id
        }));

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

  useEffect(() => {
    dispatch(adminGetUsersForms());        
  }, []); 

  useEffect(() => {
    dispatch(adminGetFormBeats());        
  }, []); 

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    arrayButtons: [
       {
         text: "Yes",
         //segun is seller, dinamicamente se pone el active
         active: !form.softDelete,
         handleAction: () => {
           setForm({
             ...form,
             softDelete: true,
           });
         },
       },
       {
         text: "No",
         active: form.softDelete,
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
    <form ref={formRef} onSubmit={onSubmit}>
      <FormContainer>
        <FormRow>
          <FormColumn className="w-full">
            {/* <Input
              id="createdBy"
              type="text"
              name="createdBy"
              placeholder="Id del autor"
              label="Id del autor"
              error={error.createdBy}
              onChange={handleInput}
              //defaultValue={mode === "edit" ? defaultValues.firstName : ""}
              defaultValue={mode === "edit" ? defaultValues.createdBy._id : ""}
            /> */}
            { mode === "create" &&
            <label
            htmlFor="createdBy"
            className= "text-sm-medium flex min-w-0 flex-col gap-1"
          > Creada por:
            <Autocomplete
                id="createdBy"
                name="createdBy"
                options={options}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  handleInput({
                    target: {
                      name: "createdBy",
                      value: newValue ? newValue.value : "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar opción" variant="outlined" />
                )}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
              </label>}
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
            {/* <SwitchForm
                  label="SoftDelete"
                  name="softDelete"
                  nameInput="softDelete"
                  defaultValue={mode === "edit" ? defaultValues.softDelete : ""}
                  onChange={handleInput}
                  arrayButtons={arraySoftDelete.arrayButtons}
                  error={error.softDelete}
                /> */}
          </FormColumn>
          <FormColumn className="w-full">
            {/* <Input
              id="beat"
              name="beat"
              type="text"
              placeholder="Id del beat"
              label="Id del beat"
              error={error.beat}
              onChange={handleInput}
              defaultValue={mode === "edit" ? defaultValues.beat._id : ""}
            /> */}
            { mode==="create" &&
            <label
            htmlFor="beat"
            className= "text-sm-medium flex min-w-0 flex-col gap-1"
          > Beat
           <Autocomplete
                id="beat"
                name="beat"
                options={optionsBeats}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  handleInput({
                    target: {
                      name: "beat",
                      value: newValue ? newValue.value : "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar opción" variant="outlined" />
                )}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
              </label>}
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
  )
});



export default AdminCreateReviewForm;
