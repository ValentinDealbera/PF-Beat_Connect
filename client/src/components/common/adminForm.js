import {
  Button,
  FormColumn,
  SwitchForm,
  Input,
  SoftDeleteSwitch,
  ValidationEditUsers,
} from "@/components";
import { useState } from "react";
import { useEffect } from "react";
export default function AdminForm(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(error).some((error) => error)) {
      alert("Debe llenar todos los campos correctamente");
    } else {
      // await postBeat(createDataJson);
    }
  };

  const [error, setError] = useState({});
  const [createData, setCreateData] = useState({
    username: "",
    email: "",
    image: "",
    firstName: "",
    lastName: "",
    isSeller: "",
  });
  const [changes, setChanges] = useState({
    username: false,
    email: false,
    image: false,
    firstName: false,
    lastName: false,
    isSeller: false,
  });

  const [prevBeatData, setPrevBeatData] = useState(createData);

  useEffect(() => {
    const newChanges = {};
    let hasChanged = false;

    for (const key in createData) {
      if (createData[key] !== prevBeatData[key]) {
        newChanges[key] = true;
        hasChanged = true;
      } else {
        newChanges[key] = changes[key];
      }
    }

    if (hasChanged) {
      setChanges(newChanges);
      setPrevBeatData(createData);
    }
  }, [createData]);

  const handleInputChange = (event) => {
    if (event.target.type === "number") {
      setCreateData({
        ...createData,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setCreateData({
        ...createData,
        [event.target.name]: event.target.value,
      });
    }
    setError(
      ValidationEditUsers(changes, {
        ...createData,
        [event.target.name]: event.target.value,
      })
    );
  };

  console.log("Soy el form", createData);
  console.log("Soy el error", error);
  const createDataJson = JSON.stringify(createData);
  console.log(createDataJson);
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
              label={"Mail"}
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
              label={"Name"}
              placeholder={"Name:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.firstName}
            />
            <Input
              name={"lastName"}
              label={"lastName"}
              placeholder={"lastName:"}
              defaultValue={props.defaultValue}
              type={"text"}
              onChange={handleInputChange}
              error={error.lastName}
            />

            <SwitchForm
              name={props.name}
              label={props.label}
              state={props.state}
            />
            <SoftDeleteSwitch />
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
