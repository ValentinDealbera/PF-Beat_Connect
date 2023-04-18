import { Button, SwitchForm, Input, ValidationEditUsers } from "@/components";
import { useState } from "react";
import { useEffect } from "react";
export default function AdminForm(props) {
  const [error, setErrors] = useState({});

  const [changes, setChanges] = useState({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    image: "",
    firstName: "",
    lastName: "",
    isSeller: false,
    softDelete: false,
  });
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [prevBeatData, setPrevBeatData] = useState(form);

  useEffect(() => {
    console.log("useEffect");
    setErrors(ValidationEditUsers(form, fieldsToValidate));
  }, [form, fieldsToValidate]);

  const handleInputChange = (e) => {
    console.log("change", e.target.name);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = ValidationCreateBeat(form, "*");
    if (Object.keys(formErrors).length === 0) {
      //await dispatch(postClientBeat(form));
      console.log("form ok", form);
    } else {
      setErrors(formErrors);
    }
    e.target.reset();
  };

  useEffect(() => {
    const newChanges = {};
    let hasChanged = false;

    for (const key in form) {
      if (form[key] !== prevBeatData[key]) {
        newChanges[key] = true;
        hasChanged = true;
      } else {
        newChanges[key] = changes[key];
      }
    }

    if (hasChanged) {
      setChanges(newChanges);
      setPrevBeatData(form);
    }
  }, [form]);

  const arrayIsSeller = {
    name: "isSeller",
    label: "Is Seller",
    defaultValue: props.defaultValue,
    onChange: handleInputChange,
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: form.isSeller,
        handleAction: () => {
          setForm({
            ...form,
            isSeller: true,
          });
        },
      },
      {
        text: "No",
        active: !form.isSeller,
        handleAction: () => {
          setForm({
            ...form,
            isSeller: false,
          });
        },
      },
    ],
  };

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    defaultValue: props.defaultValue,
    onChange: handleInputChange,
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row px-4 py-4">
          <div className="px-1">
            <Input
              name={"username"}
              label={"UserName"}
              placeholder={"UserName:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.username}
            />
            <Input
              name={"email"}
              label={"Email"}
              placeholder={"UserMail:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.email}
            />
            <Input
              name={"image"}
              label={"Image"}
              placeholder={"UserImage:"}
              defaultValue={props.defaultValue}
              type={"file"}
              onChange={handleInputChange}
              error={error.image}
              accept={"image/.jpeg, image/.png"}
            />
          </div>
          <div className="flex flex-col px-1">
            <Input
              name={"firstName"}
              label={"Firstname"}
              placeholder={"Name:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.firstName}
            />
            <Input
              name={"lastName"}
              label={"LastName"}
              placeholder={"lastName:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.lastName}
            />

            <SwitchForm
              nameInput={"isSeller"}
              label={"Is Seller"}
              arrayButtons={arrayIsSeller.arrayButtons}
            />
            <SwitchForm
              nameInput={"softDelete"}
              label={"Soft Delete"}
              arrayButtons={arraySoftDelete.arrayButtons}
            />
          </div>
        </div>
        <Button
          type="submit"
          id="submit-btn"
          className=" background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Moded
        </Button>
      </form>
    </div>
  );
}
