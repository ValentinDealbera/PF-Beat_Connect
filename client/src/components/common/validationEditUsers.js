export default function ValidationEditUsers(changes, userData){
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    let error ={};
    console.log("soy validacion", userData)

    const regexName = /^.{1,50}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const regexImage = /.jpg$|.png$/i;
    const regexUsername = /^.{1,50}$/;

    
    

    //validar nombre de usuario
    if ( changes.username && !regexUsername.test(userData.username)) {
        error.username = "Name must have between 1 and 50 characters";
      }

    //Validar  mail 
    if( changes.email && !regexEmail.test(userData.email)) error.email = "You email must have a @"

    //Validar tamaño de imagen
    
     if(changes.image && !regexImage.test(userData.image)) error.image = "You must upload a jpg or png file";

    //Validar nombre personal 
    if( changes.firstName && !userData.firstName) error.firstName ="You must have a firstName"

    //Validar apellido personal
    if( changes.lastName && !regexName.test(userData.lastName)) error.lastName ="You must have a lastName"

    return error;

   
    
}