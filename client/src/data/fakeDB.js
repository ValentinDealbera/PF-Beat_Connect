import foto1 from "../../public/images/aleksandr-surnin-uV07XhI2m7o-unsplash.jpg";
import foto2 from "../../public/images/brian-lundquist-4uM6xmxNMd4-unsplash.jpg";
import foto3 from "../../public/images/dom-hill-0wMLZNbE8Ac-unsplash.jpg";
import foto4 from "../../public/images/matthew-moloney-tKB1GDJUq9c-unsplash.jpg";
import foto5 from "../../public/images/noah-windler-Qh4hWBKq1xA-unsplash.jpg";
import foto6 from "../../public/images/robert-stump-FAJbNf2J6cY-unsplash.jpg";
import foto7 from "../../public/images/zulmaury-saavedra - Keh6vLM7w0-unsplash.jpg";


const genres = [
  { name: "HIP-HOP", id: 1 },
  { name: "POP", id: 2 },
  { name: "R&B", id: 3 },
  { name: "ROCK", id: 4 },
  { name: "ELECTRONIC", id: 5 },
  { name: "REGGAE", id: 6 },
  { name: "COUNTRY", id: 7 },
];

const usuarios = [
  {
    id: 1,
    name: "Bizarrap",
    mail: "bizarrap@Test.com",
    profilemsg: `Beats pa' tipos como tu`,
    type: "seller",
    profileimg: foto1,
  },
  {
    id: 2,
    name: "David Guetta",
    mail: "davidguetta@Test.com",
    profilemsg: `Beats for the boys`,
    type: "seller",
    profileimg: foto2,
  },
  {
    id: 3,
    name: "Pharrel Williams",
    mail: "pharrellwilliams@Test.com",
    profilemsg: `Your up all night to get lucky with my beats`,
    type: "seller",
    profileimg: foto3,
  },
  {
    id: 4,
    name: "Y2K",
    mail: "y2k@Test.com",
    profilemsg: `Wa wa wa, cry for the beats`,
    type: "seller",
    profileimg: foto4,
  },
  {
    id: 5,
    name: "Skrillex",
    mail: "skrillex@Test.com",
    profilemsg: `Beats... skshhshhshhhh piuuu piuu`,
    type: "seller",
    profileimg: foto5,
  },
];

export const currentClient = {
  id: 1,
  name: "Jorge",
  status: "Jorge status",
  profilePicture: "/img/category1.png",
  email: "jorge@test.com",
};

const beats = [
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    price: 29.99,
    license: "",
    author: 2,
    genres: ["COUNTRY"],
    image: foto1,
    types: ["VOCAL", "BEAT", "SONG"],
    // state: "active"
  },
  {
    id: 2,
    name: "Crazy thing",
    BPM: 100,
    price: 19.99,
    license: "",
    author: usuarios[1],
    genres: ["HIP-HOP"],
    types: ["VOCAL", "BEAT", "SONG"],
    image: foto2,
  },
  {
    id: 3,
    name: "Explosion",
    BPM: 210,
    price: 29.99,
    license: "",
    types: ["BEAT", "SONG"],
    author: usuarios[2],
    genres: ["HIP-HOP"],

    image: foto3,
  },
  {
    id: 4,
    name: "Motivation",
    BPM: 150,
    price: 39.99,
    license: "",
    types: ["BEAT", "SONG"],
    author: usuarios[3],
    genres: ["ROCK", "POP"],

    image: foto4,
  },
  {
    id: 5,
    name: "Get Beatsy",
    BPM: 140,
    price: 15.99,
    license: "",
    types: ["BEAT", "SONG"],
    author: usuarios[4],
    genres: ["HIP-HOP"],

    image: foto5,
  },
  {
    id: 6,
    name: "BZR Session 56",
    BPM: 189,
    price: 29.99,
    license: "",
    types: ["BEAT", "SONG"],
    author: usuarios[0],
    genres: ["HIP-HOP"],

    image: foto6,
  },
  {
    id: 7,
    name: "Having fun",
    BPM: 120,
    price: 30.0,
    license: "",

    types: ["VOCAL"],
    author: usuarios[1],
    genres: ["POP"],

    image: foto7,
  },
];

const types = [
  { value: "VOCAL", label: "VOCAL" },
  { value: "BEAT", label: "BEAT" },
  { value: "SONG", label: "SONG" },
];

const sortArr = [
  { value: "default", label: "Default"},
  { value: "Price-AS", label: "Price ↑" },
  { value: "Price-DES", label: "Price ↓" },
  { value: "BPM-AS", label: "BPM ↑" },
  { value: "BPM-DES", label: "BPM ↓" },
  { value: "A-Z", label: "A-Z" },
  { value: "Z-A", label: "Z-A" },
];

const usuariosDos = [
  {
    id: 1,
    username: "Bizarrap",
    email: "bizarrap@Test.com",
    isSeller: true,
    profilemsg: `Beats pa' tipos como tu`,
    type: "seller",
    image: foto7
  },
  {
    id: 2,
    username: "David Guetta",
    email: "davidguetta@Test.com",
    isSeller: true,
    profilemsg: `Beats for the boys`,
    type: "seller",
    image: foto7
  },
  {
    id: 3,
    username: "Pharrel Williams",
    email: "pharrellwilliams@Test.com",
    isSeller: false,
    profilemsg: `Your up all night to get lucky with my beats`,
    type: "seller",
    image: foto7
  },
  {
    id: 4,
    username: "Y2K",
    email: "y2k@Test.com",
    isSeller: true,
    profilemsg: `Wa wa wa, cry for the beats`,
    type: "seller",
    image: foto7
  },
  {
    id: 5,
    username: "Skrillex",
    email: "skrillex@Test.com",
    isSeller: false,
    profilemsg: `Beats... skshhshhshhhh piuuu piuu`,
    type: "seller",
    image: foto7
  },
];

const beatsDos = [
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
  {
    id: 2,
    name: "BZR Session 55",
    BPM: 20,
    priceAmount: 9.99,
    userCreator: 3,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: true    
  },
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    priceAmount: 29.99,
    userCreator: 4,  
    genre: "COUNTRY",
    image: foto7,
    audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
    softDelete: false    
  },
];

const reviews = [
  {
    id:1,
    rating: 4,
    tittle: "BeatConnect",
    comment: "El mejor PF que puede haber",
    dateCreated: "18/4/2023",
    createdBy:{
      id: 1,
      username: "Bizarrap",
      email: "bizarrap@Test.com",
      isSeller: true,
      profilemsg: `Beats pa' tipos como tu`,
      type: "seller",
      image: foto7
    },
    beat:{
      id: 1,
      name: "BZR Session 55",
      BPM: 120,
      priceAmount: 29.99,
      userCreator: 4,  
      genre: "COUNTRY",
      image: foto7,
      audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
      softDelete: false    
    }
  },
  {
    id:1,
    rating: 4,
    tittle: "BeatConnect",
    comment: "El mejor PF que puede haber",
    dateCreated: "18/4/2023",
    createdBy:{
      id: 1,
      username: "Bizarrap",
      email: "bizarrap@Test.com",
      isSeller: true,
      profilemsg: `Beats pa' tipos como tu`,
      type: "seller",
      image: foto7
    },
    beat:{
      id: 1,
      name: "BZR Session 55",
      BPM: 120,
      priceAmount: 29.99,
      userCreator: 4,  
      genre: "COUNTRY",
      image: foto7,
      audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
      softDelete: false    
    }
  },
  {
    id:1,
    rating: 4,
    tittle: "BeatConnect",
    comment: "El mejor PF que puede haber",
    dateCreated: "18/4/2023",
    createdBy:{
      id: 1,
      username: "Bizarrap",
      email: "bizarrap@Test.com",
      isSeller: true,
      profilemsg: `Beats pa' tipos como tu`,
      type: "seller",
      image: foto7
    },
    beat:{
      id: 1,
      name: "BZR Session 55",
      BPM: 120,
      priceAmount: 29.99,
      userCreator: 4,  
      genre: "COUNTRY",
      image: foto7,
      audioMP3: "https://firebasestorage.googleapis.com/v0/b/beatconnect-62691.appspot.com/o/beats%2FFashion%20%2FaudioMP3%2Ffashion-upbeat-electronica-117535.mp3%20-%202023-4-15%2021%3A7%3A50?alt=media&token=fcd12de7-5933-4bf0-ab4e-14677ee3ff25",
      softDelete: false    
    }
  }
]

export { genres, beats, usuarios, usuariosDos, types, sortArr, beatsDos, reviews };
