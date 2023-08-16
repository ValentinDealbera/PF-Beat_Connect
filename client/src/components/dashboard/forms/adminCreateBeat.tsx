import {
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { adminGetUsers } from "@/redux/slices/admin/users";
import { useRouter } from "next/navigation";
import { adminPostBeat, adminEditBeat } from "@/redux/slices/admin/beats";
import { useTranslation } from "react-i18next";

type Props = {
  mode: string;
};

const AdminCreateBeatForm = forwardRef((props: Props, ref) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation("global");
  const router = useRouter();

  const formRef = useRef(null);
  const validateMode = "beat";
  const [fieldsToValidate, setFieldsToValidate] = useState([]) as any;
  const [error, setErrors] = useState({}) as any;
  const defaultValues =
    useAppSelector((state) => state?.admin?.beats?.currentEdtingBeat) || {};
  const mode = props?.mode;
  const genres = useAppSelector((state) => state.filters.genres);
  const [softD, setSoftD] = useState(defaultValues.softDelete);

  const [form, setForm] = useState({
    name: `${mode === "edit" ? defaultValues?.name : ""}`,
    priceAmount: `${mode === "edit" ? defaultValues?.priceAmount : ""}`,
    genre: `${mode === "edit" ? defaultValues?.genre?._id : ""}`,
    image: `${mode === "edit" ? defaultValues?.image : ""}`,
    audioMP3: `${mode === "edit" ? defaultValues?.audioMP3 : ""}`,
    audioWAV: `${mode === "edit" ? defaultValues?.audioWAV : ""}`,
    userCreator: `${mode === "edit" ? defaultValues?.userCreator?._id : ""}`,
    bpm: `${mode === "edit" ? defaultValues?.BPM : ""}`,
    id: `${mode === "edit" ? defaultValues?._id : ""}`,
    softDelete: `${mode === "edit" ? defaultValues?.softDelete : ""}`,
    relevance: `${mode === "edit" ? defaultValues?.relevance : ""}`,
  });

  const defaultUsers = useAppSelector((state) => state.admin.users.users);
  const options = defaultUsers.map((user) => ({
    label: user.username,
    value: user._id,
  }));

  const handleInput = (e: any) => {
    handleInputChange(e, fieldsToValidate, setFieldsToValidate, form, setForm);
  };

  const onSubmit = async () => {
    const actionToDispatch = mode === "edit" ? adminEditBeat : adminPostBeat;
    try {
      await handleSubmit({
        form: form,
        actionToDispatch: actionToDispatch,
        dispatch: dispatch,
        setErrors: setErrors,
        validateMode: validateMode,
        formRef: formRef?.current,
        mode: mode,
      });
      router.push("/admin/beats");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchGenres());
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
        active: softD,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: "true",
          });
        },
      },
      {
        text: "No",
        active: !softD,
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
              label={t("adminBeatsCreate.f1")}
              placeholder={t("adminBeatsCreate.f1")}
              defaultValue={mode === "edit" ? defaultValues.name : ""}
              type="text"
              onChange={handleInput}
              error={error.name}
            />
            <Input
              name="priceAmount"
              id="priceAmount"
              label={t("adminBeatsCreate.f2")}
              placeholder={t("adminBeatsCreate.f2")}
              defaultValue={
                mode === "edit" ? defaultValues?.priceAmount?.toString() : ""
              }
              type="number"
              onChange={handleInput}
              error={error.priceAmount}
            />
            <Input
              name="image"
              label={t("adminBeatsCreate.f3")}
              placeholder={t("adminBeatsCreate.f3")}
              type="file"
              onChange={handleInput}
              error={error.image}
            />

            {mode === "edit" && (
              <Input
                name="userCreator"
                label={t("adminBeatsCreate.f4")}
                placeholder={t("adminBeatsCreate.f4")}
                value={
                  mode === "edit" ? defaultValues?.userCreator?.username : ""
                }
                defaultValue={
                  mode === "edit" ? defaultValues?.userCreator?._id : ""
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
                  //    name={t("adminBeatsCreate.f4")}
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
                      //C={true}
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
              defaultValue={
                mode === "edit" ? defaultValues?.BPM?.toString() : ""
              }
              type="number"
              onChange={handleInput}
              error={error.bpm}
            />
            <label className="text-sm-medium flex min-w-0 flex-col gap-1">
              {t("adminBeatsCreate.f5")}
              <select
                name="genre"
                id="genre"
                defaultValue=""
                className="text-sm-regular border-radius-estilo2 color-neutral-black-950 placeholder:text-sm-light
                  placeholder:color-neutral-gray-400 border border-slate-200 bg-white px-4 py-2 dark:border-none dark:bg-customDark-700 dark:text-white"
                onChange={handleInput}
                //  error={error?.genre}
              >
                <option value="" disabled selected>
                  {t("adminBeatsCreate.f6")}
                </option>
                {genres.map((genre) => (
                  <option
                    value={genre.value}
                    selected={
                      mode === "edit" &&
                      genre.value === defaultValues?.genre?._id
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
                  defaultValue={mode !== "create" ? "" : defaultValues.audioMP3}
                  type="file"
                  onChange={handleInput}
                  error={error.audioMP3}
                />
                <Input
                  name="audioWAV"
                  label="Audio WAV"
                  placeholder="Audio WAV:"
                  defaultValue={mode === "create" ? "" : defaultValues.audioWAV}
                  type="file"
                  onChange={handleInput}
                  error={error.audioWAV}
                />
              </>
            )}
            {mode === "edit" && (
              <SwitchForm
                label={t("adminBeatsCreate.f7")}
                nameInput="softDelete"
                // defaultValue={mode === "edit" ? form.softDelete : ""}
                arrayButtons={arraySoftDelete.arrayButtons}
              />
            )}
          </FormColumn>
        </FormRow>
      </FormContainer>
    </form>
  );
});

export default AdminCreateBeatForm;
