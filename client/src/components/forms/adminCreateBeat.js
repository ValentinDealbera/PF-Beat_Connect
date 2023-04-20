import {
    FormColumn,
    FormContainer,
    FormRow,
    Input,
    SwitchForm,
    Select
  } from "@/components";

import {
    handleInputChange,
    handleSubmit,
    validateForm,
  } from "@/data/formLogic";

import { fetchGenres } from "@/redux/slices/filters";

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPostBeat, adminEditBeat } from "@/redux/slices/admin";
import { useRouter } from "next/router";

const AdminCreateBeatForm = forwardRef((props, ref) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const validateMode = "beat";
    const [fieldsToValidate, setFieldsToValidate] = useState([]);
    const [error, setErrors] = useState({});
    const defaultValues = useSelector((state) => state.admin.currentEditBeat);
    const mode = props.mode;
    const genres = useSelector((state) => state.filters.genres);
    
  
    console.log("defaultValues", defaultValues);

    const [form, setForm] = useState({
        name: `${mode === "edit" ? defaultValues.name : ""}`,
        priceAmount: `${mode === "edit" ? defaultValues.priceAmount : ""}`,
        genre: `${mode === "edit" ? defaultValues.genre._id : ""}`,
        image: "",
        audioMP3: "",
        userCreator: `${mode === "edit" ? defaultValues.userCreator._id : ""}`,
        bpm: `${mode === "edit" ? defaultValues.BPM : ""}`,
        id: `${mode === "edit" ? defaultValues._id : ""}`,
        softDelete: `${mode === "edit" ? defaultValues.softDelete : ""}`, 
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

      const onSubmit = async (e) => {
        console.log("onSubmit", e, validateMode);
        const actionToDispatch = mode === "edit" ? adminEditBeat : adminPostBeat;
        try {
          await handleSubmit({
            form: form,
            actionToDispatch: actionToDispatch,
            dispatch: dispatch,
            setErrors: setErrors,
            validateMode: validateMode,
            formRef: formRef.current,
          });
          router.push("/admin/beats");
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(()=>{
        dispatch(fetchGenres());
        console.log("generes", genres)
      },[]);

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

      return (
        <form ref={formRef} onSubmit={onSubmit}>
          <FormContainer>
            <FormRow>
              <FormColumn className="w-full">
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Beat Name:"
                  defaultValue={mode === "edit" ? defaultValues.name : ""}
                  type="text"
                  onChange={handleInput}
                  error={error.name}
                />
                <Input
                  name="priceAmount"
                  id="priceAmount"
                  label="Price Amount"
                  placeholder="Price Amount:"
                  defaultValue={mode === "edit" ? defaultValues.priceAmount : ""}
                  type="number"
                  onChange={handleInput}
                  error={error.priceAmount}
                />
                {/* <Select
                  label={"Chose a gender"}
                  valores={genres}
                  setSeleccionados={handleInput}
                  // value={selected}
                  name="genre"
                  // seleccionados={selected}
                  error={error.genre}
                  className="flex w-full flex-col gap-2"
                  labelClass="w-full text-sm-regular text-sm-medium"
                />  */}
                <Input
                  name="userCreator"
                  label="User Creator"
                  placeholder="User Creator:"
                  defaultValue={mode === "edit" ? defaultValues.userCreator._id : ""}
                  type="text"
                  onChange={handleInput}
                  error={error.userCreator}
                /> 
              </FormColumn>
              <FormColumn className="w-full">
                <Input
                  name="bpm"
                  label="BPM"
                  placeholder="BPM:"
                  defaultValue={mode === "edit" ? defaultValues.BPM : ""}
                  type="number"
                  onChange={handleInput}
                  error={error.bpm}
                />
                { mode === "create" && <Input
                  name="image"
                  label="Image"
                  placeholder="Image:"
                  defaultValue={mode === "edit" ? defaultValues.image : ""}
                  type="file"
                  onChange={handleInput}
                  error={error.image}
                />}
                { mode == "create" && <Input
                  name="audioMP3"
                  label="Audio MP3"
                  placeholder="Audio MP3:"
                  defaultValue={mode === "edit" ? defaultValues.audioMP3 : ""}
                  type="file"
                  onChange={handleInput}
                  error={error.audioMP3}
                /> }
                {mode === "edit" && <SwitchForm
                  label="SoftDelete"
                  name="softDelete"
                  nameInput="softDelete"
                  defaultValue={mode === "edit" ? defaultValues.softDelete : ""}
                  onChange={handleInput}
                  arrayButtons={arraySoftDelete.arrayButtons}
                  error={error.softDelete}
                />}
                <Input
                  name="genre"
                  label="Genre"
                  placeholder="Genres"
                  defaultValue={mode === "edit" ? defaultValues.genre.name : ""}
                  type="text"
                  onChange={handleInput}
                  error={error.genre}
                /> 
              </FormColumn>
            </FormRow>
          </FormContainer>
        </form>
      );
    });
    
    export default AdminCreateBeatForm;
  