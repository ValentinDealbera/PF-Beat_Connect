export const validateImage = (src) => {
  try {
    const response = fetch(src);
    if (response.ok) {
      return src;
    } else {
      throw new Error("Invalid image response");
    }
  } catch (error) {
    return "/images/placeholder.png";
  }
};

// let imageSrc;
// const loadImage = async (src) => {
//   try {
//     const response = await fetch(src);
//     if (response.ok) {
//       return src;
//     } else {
//       throw new Error("Invalid image response");
//     }
//   } catch (error) {
//     throw new Error("Error loading image");
//   }
// };

// // Dentro de tu componente o función asincrónica
// const loadProfilePhoto = async () => {
//   try {
//     imageSrc = await loadImage(profilePhoto);
//   } catch (error) {
//     imageSrc = null;
//   }
// };

// // Llama a la función para cargar la foto del perfil
// loadProfilePhoto();
