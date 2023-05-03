import { BeatRightSheet, Input, Select } from "@/components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClientBeat } from "@/redux/slices/client/beats";
import { ValidationCreateBeat } from "../client/validationCreateBeat";
import { fetchGenres } from "@/redux/slices/filters";
import { useTranslation } from "react-i18next";

export const manageEditBeat = () => {
  EditBeat.handleOpenDropdown();
};

export default function EditBeat() {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const activeEditingBeat = useSelector(
    (state) => state.client.beats.activeEditingBeat
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setErrors] = useState({});

  const genres = useSelector((state) => state.filters.genres);
  const { _id } = useSelector(
    (state) => state.client.authSession.session.current
  );

  const [form, setForm] = useState({
    name: "",
    priceAmount: "",
    genre: selected,
    userCreator: _id,
    bpm: "",
    image: {},
    audioMP3: {},
    _id: _id,
  });

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  EditBeat.handleOpenDropdown = handleOpenDropdown;

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }

    const { name } = e.target;
    if (!fieldsToValidate.includes(name)) {
      setFieldsToValidate([...fieldsToValidate, name]);
    }
  };

  const handleSelectChange = (e) => {
    setSelected(e);
    setForm((prevForm) => ({ ...prevForm, genre: e }));
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    setErrors(ValidationCreateBeat(form, fieldsToValidate));
  }, [form, fieldsToValidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = ValidationCreateBeat(form, "*", "edit");
    if (Object.keys(formErrors).length === 0) {
 
      await dispatch(editClientBeat(form));
      setIsDropdownOpen(false);
    } else {
  
      setErrors(formErrors);
    }
    e.target.reset();
  };

  useEffect(() => {
    if (!activeEditingBeat) return;

    setSelected(activeEditingBeat.genre?._id ?? "");

    setForm({
      name: activeEditingBeat.name,
      priceAmount: activeEditingBeat.priceAmount,
      genre: activeEditingBeat.genre?._id ?? "",
      userCreator: _id,
      _id: _id,
      BPM: activeEditingBeat.BPM,
    });
  }, [activeEditingBeat]);

  return (
    <>
      {isDropdownOpen && (
          <BeatRightSheet width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] " setIsDropdownOpen={setIsDropdownOpen}>
         <div className="flex h-full flex-col items-center justify-center gap-7 px-4 xs:px-8 sm:px-14 sm:py-10 overflow-y-hidden  ">
            <div className="flex w-full flex-col gap-5 overflow-y-hidden">
              <div className="flex flex-col items-center justify-center gap-0">
                <h4 className="text-titulo3-regular text-center">
                    {t("editBeat.t1")}{" "}
                  <span className="text-titulo3-semibold text-red-700">
                    beat
                  </span>{" "}
                </h4>
                <p className="text-base-light text-center">
                  {t("editBeat.t2")}
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex max-h-full w-full flex-col gap-5 overflow-y-scroll"
              >
                <div className="flex flex-col gap-4">
                  <Input
                    name={"name"}
                    label={t("postBeat.form1")}
                    type={"text"}
                    onChange={handleInputChange}
                    error={error.name}
                    className="w-full"
                    placeholder={t("postBeat.form2")}
                    labelClass="w-full"
                    defaultValue={activeEditingBeat.name}
                  />
                  <Input
                    name={"priceAmount"}
                    prefix={"$"}
                    label={t("postBeat.form3")}
                    type={"number"}
                    onChange={handleInputChange}
                    error={error.priceAmount}
                    placeholder={t("postBeat.form4")}
                    className="w-full"
                    labelClass="w-full"
                    defaultValue={activeEditingBeat.priceAmount}
                  />

                  <Select
                    label={t("postBeat.form5")}
                    valores={genres}
                    setSeleccionados={handleSelectChange}
                    value={selected}
                    seleccionados={selected}
                    error={error.genre}
                    className="flex w-full flex-col gap-2"
                    labelClass="w-full text-sm-regular text-sm-medium"
                  />
                  <Input
                    name={"bpm"}
                    label={"BPMs"}
                    placeholder={"BPMs"}
                    type={"number"}
                    onChange={handleInputChange}
                    error={error.bpm}
                    className="w-full"
                    labelClass="w-full"
                    defaultValue={activeEditingBeat.BPM}
                  />

                  <Input
                    name={"image"}
                    label={t("postBeat.form9")}
                    placeholder={"Beat Image"}
                    type={"file"}
                    onChange={handleInputChange}
                    error={error.image}
                    className="w-full"
                    labelClass="w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
                >
                    {t("postBeat.form15")}
                </button>
              </form>
            </div>
          </div>
        </BeatRightSheet>
      )}
    </>
  );
}
