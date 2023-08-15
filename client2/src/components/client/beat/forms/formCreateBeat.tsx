import { Input } from "@/components";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { ValidationCreateBeat } from "../../../validation/validationCreateBeat";
import { postClientBeat } from "@/redux/slices/client/beats";

export default function FormCreateBeat() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState({}) as any;
  const [createData, setCreateData] = useState({
    name: "",
    priceAmount: "",
    genre: "",
    userCreator: "",
    bpm: "",
    image: {},
    audioMP3: {},
  });

  const handleInputChange = (event: any) => {
    if (event.target.type === "file") {
      setCreateData({
        ...createData,
        [event.target.name]: event.target.files[0],
      });
    }
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
      ValidationCreateBeat({
        ...createData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (Object.values(error).some((error) => error)) {
      alert("Debe llenar todos los campos correctamente");
    } else {
      await dispatch(postClientBeat(formData));
    }
  };

  return (
    <div>
      <h1>Create your Beat</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name={"name"}
          label={"Name"}
          placeholder={"Beat Name:"}
          type={"text"}
          onChange={handleInputChange}
          error={error.name}
        />
        <Input
          name={"priceAmount"}
          label={"Price Amount"}
          placeholder={"$"}
          type={"number"}
          onChange={handleInputChange}
          error={error.priceAmount}
        />
        <Input
          name={"genre"}
          label={"Genre"}
          placeholder={"Genre"}
          type={"text"}
          onChange={handleInputChange}
          error={error.genre}
        />
        <Input
          name={"userCreator"}
          label={"User Creator"}
          placeholder={"User Creator"}
          type={"text"}
          onChange={handleInputChange}
          error={error.userCreator}
        />
        <Input
          name={"bpm"}
          label={"BPM"}
          placeholder={"Bits per Minute"}
          type={"number"}
          onChange={handleInputChange}
          error={error.bpm}
        />
        <Input
          name={"image"}
          label={"Beat Image"}
          placeholder={"Beat Image"}
          type={"file"}
          onChange={handleInputChange}
          error={error.image}
        />
        <Input
          name={"audioMP3"}
          label={"Audio MP3"}
          placeholder={"Upload your Beat"}
          type={"file"}
          onChange={handleInputChange}
          error={error.audioMP3}
        />
        <button
          type="submit"
          className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}
