import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  FormContainer,
  FormColumn,
  FormRow,
  Input,
  Select,
  SwitchForm,
} from "@/components";

import { ValidationCreateBeat } from "@/components/client/validationCreateBeat";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "@/redux/slices/filters";

export default function SellerDashboardOverview() {
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setErrors] = useState({});

  const genres = useSelector((state) => state.filters.genres);

  const [form, setForm] = useState({
    name: "",
    priceAmount: "",
    genre: selected,
    userCreator: "",
    bpm: "",
    image: {},
    audioMP3: {},
    _id: "",
  });

  const handleInputChange = (e) => {
    console.log("change");

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
    console.log("handleSelectChange", e);
    setSelected(e);
    setForm((prevForm) => ({ ...prevForm, genre: e }));
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    console.log("useEffect12", form )
    setErrors(ValidationCreateBeat(form, fieldsToValidate));
  }, [form, fieldsToValidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = ValidationCreateBeat(form, "*");
    if (Object.keys(formErrors).length === 0) {
      await dispatch(postClientBeat(form));
    } else {
      setErrors(formErrors);
    }
    e.target.reset();
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
          topBarMessage="Crear beat"
          topBarButtonLabel="Guardar cambios"
          onClick={() => {
            console.log("Click");
          }}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <form onSubmit={handleSubmit}>
              <FormContainer>
                <FormRow>
                  <FormColumn className="w-full bg-red-500">
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Nombre del beat"
                      label="Nombre"
                      error={error.name}
                      onChange={handleInputChange}
                    />
                    <Select
                      label={"Elige un genero"}
                      valores={genres}
                      setSeleccionados={handleSelectChange}
                      value={selected}
                      name="genre"
                      seleccionados={selected}
                      error={error.genre}
                      className="flex w-full flex-col gap-2"
                      labelClass="w-full text-sm-regular text-sm-medium"
                    />
                    <Input
                      id="audioMP3"
                      type="file"
                      name="audioMP3"
                      placeholder="Sube tu beat"
                      label="Beat"
                      onChange={handleInputChange}
                      error={error.audioMP3}
                    />
                    <SwitchForm
                      label="SoftDelete"
                      name="softDelete"
                      nameInput="softDelete"
                      defaultValue={false}
                      onChange={handleInputChange}
                      arrayButtons={arraySoftDelete.arrayButtons}
                    />
                  </FormColumn>
                  <FormColumn className="w-full bg-blue-400">
                    <Input
                      id="priceAmount"
                      name="priceAmount"
                      type="number"
                      placeholder="Precio del beat"
                      label="Precio"
                      error={error.priceAmount}
                      onChange={handleInputChange}
                    />
                    <Input
                      id="bpm"
                      type="number"
                      name="bpm"
                      placeholder="BPMs"
                      label="BPMs"
                      error={error.bpm}
                      onChange={handleInputChange}
                    />
                    <Input
                      id="image"
                      name="image"
                      error={error.image}
                      type="file"
                      placeholder="Sube una portada"
                      label="Portada"
                      onChange={handleInputChange}
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
