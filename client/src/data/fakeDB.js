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

const beats = [
  {
    id: 1,
    name: "BZR Session 55",
    BPM: 120,
    price: 29.99,
    license: "",
    author: usuarios[0],
    genres: genres[0],
    image: foto1,
  },
  {
    id: 2,
    name: "Crazy thing",
    BPM: 100,
    price: 19.99,
    license: "",
    author: usuarios[1],
    genres: genres[1],
    image: foto2,
  },
  {
    id: 3,
    name: "Explosion",
    BPM: 210,
    price: 29.99,
    license: "",
    author: usuarios[2],
    genres: genres[2],
    image: foto3,
  },
  {
    id: 4,
    name: "Motivation",
    BPM: 150,
    price: 39.99,
    license: "",
    author: usuarios[3],
    genres: genres[3],
    image: foto4,
  },
  {
    id: 5,
    name: "Get Beatsy",
    BPM: 140,
    price: 15.99,
    license: "",
    author: usuarios[4],
    genres: genres[4],
    image: foto5,
  },
  {
    id: 6,
    name: "BZR Session 56",
    BPM: 189,
    price: 29.99,
    license: "",
    author: usuarios[0],
    genres: genres[5],
    image: foto6,
  },
  {
    id: 7,
    name: "Having fun",
    BPM: 120,
    price: 30.0,
    license: "",
    author: usuarios[1],
    genres: genres[6],
    image: foto7,
  },
];

const usuarios = [
  {
    id: 1,
    name: "Bizarrap",
    mail: "bizarrap@Test.com",
    profilemsg: `Beats pa' tipos como tu`,
    type: "seller",
    beats: [beats[0], beats[5]],
    profileimg: foto1
  },
  {
    id: 2,
    name: "David Guetta",
    mail: "davidguetta@Test.com",
    profilemsg: `Beats for the boys`,
    type: "seller",
    beats: [beats[1], beats[6]],
    profileimg: foto2
  },
  {
    id: 3,
    name: "Pharrel Williams",
    mail: "pharrellwilliams@Test.com",
    profilemsg: `Your up all night to get lucky with my beats`,
    type: "seller",
    beats: [beats[2]],
    profileimg: foto3
  },
  {
    id: 4,
    name: "Y2K",
    mail: "y2k@Test.com",
    profilemsg: `Wa wa wa, cry for the beats`,
    type: "seller",
    beats: [beats[3]],
    profileimg: foto4
  },
  {
    id: 5,
    name: "Skrillex",
    mail: "skrillex@Test.com",
    profilemsg: `Beats... skshhshhshhhh piuuu piuu`,
    type: "seller",
    beats: [beats[4]],
    profileimg: foto5
  },
];

export {genres, beats, usuarios}
