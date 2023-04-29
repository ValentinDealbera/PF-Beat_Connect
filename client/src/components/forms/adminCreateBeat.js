import {
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
  SetUser,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { fetchGenres } from "@/redux/slices/filters";
import { Autocomplete, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsers } from "@/redux/slices/admin/users";
import { useRouter } from "next/router";
import { adminPostBeat, adminEditBeat } from "@/redux/slices/admin/beats";

const AdminCreateBeatForm = forwardRef((props, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "beat";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues =
    useSelector((state) => state.admin.beats.currentEdtingBeat) || {};
  const mode = props.mode;
  const genres = useSelector((state) => state.filters.genres);
  const [softD, setSoftD] = useState(defaultValues.softDelete);

  // console.log("defaultValues", defaultValues);

  const [form, setForm] = useState({
    name: `${mode === "edit" ? defaultValues.name : ""}`,
    priceAmount: `${mode === "edit" ? defaultValues.priceAmount : ""}`,
    genre: `${mode === "edit" ? defaultValues.genre._id : ""}`,
    image: `${mode === "edit" ? defaultValues.image : ""}`,
    audioMP3: `${mode === "edit" ? defaultValues.audioMP3 : ""}`,
    audioWAV: `${mode === "edit" ? defaultValues.audioWAV : ""}`,
    userCreator: `${mode === "edit" ? defaultValues.userCreator._id : ""}`,
    bpm: `${mode === "edit" ? defaultValues.BPM : ""}`,
    id: `${mode === "edit" ? defaultValues._id : ""}`,
    // softDelete: `${mode === "edit" ? defaultValues.softDelete : ""}`,
    relevance: `${mode === "edit" ? defaultValues.relevance : ""}`,
  });

  const defaultUsers = useSelector((state) => state.admin.users.users);
  const options = defaultUsers.map((user) => ({
    label: user.username,
    value: user._id,
  }));

  console.log("Data para el form", form);
  // console.log("USERCREATOR", defaultValues.userCreator)

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
        mode: mode,
      });
      router.push("/admin/beats");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchGenres());
    console.log("genres", genres);
  }, []);

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode, mode));
  }, [form, fieldsToValidate]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      // formRef.current.submit();
      onSubmit();
    },
  }));

  useEffect(() => {
    dispatch(adminGetUsers());
  }, []);

  useEffect(() => {
    if (softD) {
      setSoftD(false);
    } else {
      setSoftD(true);
    }
  }, [form.softDelete]);

  const arraySoftDelete = {
    name: "softDelete",
    label: "Pausar",
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: !softD,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: "true",
          });
        },
      },
      {
        text: "No",
        active: softD,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: "false",
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
              label="Nombre"
              placeholder="Nombre"
              defaultValue={mode === "edit" ? defaultValues.name : ""}
              type="text"
              onChange={handleInput}
              error={error.name}
            />
            <Input
              name="priceAmount"
              id="priceAmount"
              label="Precio"
              placeholder="Precio"
              defaultValue={mode === "edit" ? defaultValues.priceAmount : ""}
              type="number"
              onChange={handleInput}
              error={error.priceAmount}
            />
            <Input
              name="image"
              label="Imagen"
              placeholder="Imagen"
              type="file"
              onChange={handleInput}
              error={error.image}
            />

            {mode === "edit" && (
              <Input
                name="userCreator"
                label="Usuario creador"
                placeholder="Usuario creador"
                value={
                  mode === "edit" ? defaultValues.userCreator.username : null
                }
                defaultValue={
                  mode === "edit" ? defaultValues.userCreator._id : ""
                }
                type="text"
                onChange={handleInput}
                error={error.userCreator}
              />
            )}
            {mode === "create" && (
              <label
                htmlFor="userCreator"
                className="text-sm-medium flex min-w-0 flex-col gap-1"
              >
                Usuario creador
                <Autocomplete
                  id="userCreator"
                  name="Usuario creador"
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                    handleInput({
                      target: {
                        name: "userCreator",
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                     // variant="filled"
                     size="small"
          
                      C
                      className="border-radius-estilo2 bg-white px-4 py-2 text-sm placeholder:text-sm dark:bg-customDark-700 dark:text-black"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </label>
            )}
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              name="bpm"
              label="BPM"
              placeholder="BPM"
              defaultValue={mode === "edit" ? defaultValues.BPM : ""}
              type="number"
              onChange={handleInput}
              error={error.bpm}
            />
            <label className="text-sm-medium flex min-w-0 flex-col gap-1">
              Elige un Género
              <select
                name="genre"
                id="genre"
                type="text"
                defaultValue=""
                className="text-sm-regular border-radius-estilo2 color-neutral-black-950 placeholder:text-sm-light
                  placeholder:color-neutral-gray-400 border border-slate-200 bg-white px-4 py-2 dark:border-none dark:bg-customDark-700 dark:text-white"
                onChange={handleInput}
                error={error.genre}
              >
                <option value="" disabled selected>
                  Seleccionar género
                </option>
                {genres.map((genre) => (
                  <option
                    value={genre.value}
                    selected={
                      mode === "edit" && genre.value === defaultValues.genre._id
                    }
                  >
                    {genre.label}
                  </option>
                ))}
              </select>
            </label>
            {mode == "create" && (
              <>
              <Input
                name="audioMP3"
                label="Audio MP3"
                placeholder="Audio MP3:"
                defaultValue={mode === "edit" ? defaultValues.audioMP3 : ""}
                type="file"
                onChange={handleInput}
                error={error.audioMP3}
              />
              <Input
                name="audioWAV"
                label="Audio WAV"
                placeholder="Audio WAV:"
                defaultValue={mode === "edit" ? defaultValues.audioWAV : ""}
                type="file"
                onChange={handleInput}
                error={error.audioWAV}
              />
              </>
            )}
            {mode === "edit" && (
              <SwitchForm
                label="Pausar"
                name="softDelete"
                nameInput="softDelete"
                // defaultValue={mode === "edit" ? form.softDelete : ""}
                onChange={handleInput}
                arrayButtons={arraySoftDelete.arrayButtons}
                error={error.softDelete}
              />
            )}
          </FormColumn>
        </FormRow>
      </FormContainer>
    </form>
  );
});

export default AdminCreateBeatForm;
