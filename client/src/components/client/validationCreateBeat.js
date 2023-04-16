

export default function ValidationCreateBeat(beatData){

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    let error ={};
    console.log("soy validacion", beatData)

    const regexName = /^.{1,50}$/;
    const regexImage = /\.jpg$|\.png$/i;
    const regexAudioMP3 = /\.mp3$|\.wav$/i;

    if(!regexName.test(beatData.name)) error.name = "The name of your beat must have between one and 50 characters.";
    if(beatData.priceAmount < 1) error.priceAmount = "The price of your beat must be greater than 1.";

    // Validar tamaño de imagen
    if(beatData.image.size > MAX_FILE_SIZE) error.image = "The size of the image is too large. Maximum allowed size is 10 MB.";
    if(!regexImage.test(beatData.image)) error.image = "You must upload a jpg or png file";
        
    // Validar tamaño de audio
    if(beatData.audioMP3.size > MAX_FILE_SIZE) error.audioMP3 = "The size of the audio is too large. Maximum allowed size is 10 MB.";
    if(!beatData.audioMP3) error.audioMP3 = "You must upload a Beat";  
    if(!regexAudioMP3.test(beatData.audioMP3)) error.audioMP3 = "You must upload a mp3 or wav file";  

    if(beatData.bpm > 350 || beatData.bpm < 20) error.bpm = "Your beat must have between 20 and 350 bpm.";

    return error;
}