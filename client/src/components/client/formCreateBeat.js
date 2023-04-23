import { Input, Button } from "@/components";
import { postClientBeat } from "@/redux/slices/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ValidationCreateBeat from "./validationCreateBeat";

export default function FormCreateBeat() {
  // Estados de error y de adquisición de la información.

  const [error, setError] = useState({});
  const [createData, setCreateData] = useState({
    name: "",
    priceAmount: "",
    genre: "",
    userCreator: "",
    bpm: "",
    image: {},
    audioMP3: {},
  });

  // HandleInput que setea los estados de error y de Datos adquiridos - Los tipo "number" los parsea a number,
  // porque llegan como string.
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    if (event.target.type === "file") {
      //       setFile(e.target.files[0]);
      // setFileName(e.target.files[0].name);
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



  // Transformamos la data a JSON

  const createDataJson = JSON.stringify(createData);



  // Función de submit del botón del formulario, no deja enviar la info si existe un error.
  // Por el momento le falta la función de Posteo, así que al darle click con la info correcta no hace nada.

  const handleSubmit = async (event) => {
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

// name (debe recibir un nuevo nombre)
// priceAmount (un numero)
// genre (el id del genero asignado)
// userCreator (el id del usuario creador)
// bpm (un numero de velocidad del beat)

// archivos
// audioMP3 (un archivo de audio de baja calidad)
// image (opcional)(un archivo de imagen de portada para el beat, preferiblemente jpg o png)
// audioWAV (no disponible momentaneamente) (archivo de audio de alta calidad)

// type={props.type}
//         name={props.name}
//         value={props.value}
//         onChange={props.onChange}
//         placeholder={props.placeholder}
