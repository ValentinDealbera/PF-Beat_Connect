import i18next from "i18next";

export function ValidationCreateBeat(form, fieldsToValidate, mode) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const MAX_WAV_SIZE = 150 * 1024 * 1042; // 150 MB
  let error = {};
  const modeOf = mode;

  const regexName = /^.{1,50}$/;
  const regexImage = /\.jpg$|\.png$/i;
  const regexAudioMP3 = /\.mp3$|\.wav$|\.ogg$/i;
  const regexAudioWAV = /\.wav$|\.ogg$/i;

  if (fieldsToValidate === "*") {
    //pasamos de object a array
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case "name":
        if (!regexName.test(form.name)) {
          if (i18next?.language == "en") {
            error.name =
              "The name of your beat must have between one and 50 characters.";
          } else {
            error.name =
              "El nombre de tu beat debe tener entre uno y 50 caracteres.";
          }
        }
        break;

      case "priceAmount":
        if (form.priceAmount < 1) {
          if (i18next?.language == "en") {
            error.priceAmount =
              "The price of your beat must be greater than 1.";
          } else {
            error.priceAmount = "El precio de tu beat debe ser mayor a 1.";
          }
        }
        break;

      // Validar tamaño de imagen
      case "image":
        if (mode === "edit") break;

        if (form.image.size > MAX_FILE_SIZE) {
          if (i18next?.language == "en") {
            error.image =
              "The size of the image is too large. Maximum allowed size is 10 MB.";
          } else {
            error.image =
              "El tamaño de la imagen es demasiado grande. El tamaño máximo permitido es de 10 MB.";
          }
        }
        if (form.image && !regexImage.test(form.image.name)) {
          if (i18next?.language == "en") {
            error.image = "You must upload a jpg or png file";
          } else {
            error.image = "Debes subir un archivo jpg o png";
          }
        }
        break;

      case "audioMP3":
        if (mode === "edit") break;

        if (form.audioMP3.size > MAX_FILE_SIZE) {
          if (i18next?.language == "en") {
            error.audioMP3 =
              "The size of the audio is too large. Maximum allowed size is 10 MB.";
          } else {
            error.audioMP3 =
              "El tamaño del audio es demasiado grande. El tamaño máximo permitido es de 10 MB.";
          }
        }
        if (!form.audioMP3) {
          if (i18next?.language == "en") {
            error.audioMP3 = "You must upload a Beat";
          } else {
            error.audioMP3 = "Debes subir un Beat";
          }
        }
        if (!regexAudioMP3.test(form.audioMP3.name)) {
          if (i18next?.language == "en") {
            error.audioMP3 = "You must upload a mp3 or wav file";
          } else {
            error.audioMP3 = "Debes subir un archivo mp3 o wav";
          }
        }
        break;

      case "audioWAV":
        if (mode === "edit") break;

        if (form.audioWAV.size > MAX_WAV_SIZE) {
          if (i18next?.language == "en") {
            error.audioWAV =
              "The size of the audio is too large. Maximum allowed size is 150 MB.";
          } else {
            error.audioWAV =
              "El tamaño del audio es demasiado grande. El tamaño máximo permitido es de 150 MB.";
          }
        }
        if (!form.audioWAV) {
          if (i18next?.language == "en") {
            error.audioWAV = "You must upload a Beat";
          } else {
            error.audioWAV = "Debes subir un Beat";
          }
        }
        if (!regexAudioWAV.test(form.audioWAV.name)) {
          if (i18next?.language == "en") {
            error.audioWAV = "You must upload a wav or ogg file";
          } else {
            error.audioWAV = "Debes subir un archivo wav o ogg";
          }
        }
        break;

      case "bpm":
        if (form.bpm > 350 || form.bpm < 20) {
          if (i18next?.language == "en") {
            error.bpm = "Your beat must have between 20 and 350 bpm.";
          } else {
            error.bpm = "Tu beat debe tener entre 20 y 350 bpm.";
          }
        }
        break;

      case "genre":
        if (!form.genre || form.genre === "") {
          if (i18next?.language == "en") {
            error.genre = "You must select a genre";
          } else {
            error.genre = "Debes seleccionar un género";
          }
        }
        break;

      default:
        break;
    }
  });

  return error;
}
