import { manageBecomeSeller } from "../components/masters/becomeSeller";
import { useTranslation } from "react-i18next";

export const navPublic = [
  {
    name: "navPublic.t1",
    url: "/",
    visible: true,
  },
  {
    name: "navPublic.t2",
    url: "/about",
    visible: true,
  },
  {
    name: "navPublic.t3",
    url: "/beats",
    visible: true,
  },
  {
    name: "navPublic.t4",
    url: "/beats/cart",
    visible: false,
    colorMode: "light",
  },
];

export const navHelp = [
  {
    name: "navHelp.t1",
    url: "/help",
    colorMode: "light",
    visibility: true,
  },
  {
    name: "navHelp.t2",
    url: "/help/privacy",
    colorMode: "light",
    visibility: true,
  },
  {
    name: "navHelp.t3",
    url: "/help/terms",
    colorMode: "light",
    visibility: true,
  },
];

export const navClient = [
  {
    name: "Perfil",
    url: "/client",
    colorMode: "light",
  },
  {
    name: "Inbox",
    url: "/client/inbox",
    colorMode: "light",
  },
  {
    name: "Vende tus beats",
    url: "",
    onClick: () => manageBecomeSeller(),
  },
  {
    name: "Configuracion",
    url: "/client/settings",
    colorMode: "light",
  },
  {
    name: "Facturacion",
    url: "/client/billing",
    colorMode: "light",
  },
  {
    name: "Logout",
    url: "/auth/logout",
    colorMode: "light",
  },
];

export const faqs = [
  {
    title: "faqs.t1",
    content: "faqs.c1",
  },
  {
    title: "faqs.t2",
    content: "faqs.c2",
  },
  {
    title: "faqs.t3",
    content: "faqs.c3",
  },
  {
    title: "faqs.t4",
    content: "faqs.c4",
  },
];

export const tecnologias = [
  {
    id: 1,
    title: "NextJS",
    image: "/icon/tecnologias/next-js.svg",

    description: "tecnologias.t1",
  },
  {
    id: 4,
    title: "Redux Toolkit",
    image: "/icon/tecnologias/redux.svg",
    description: "tecnologias.t2",
  },
  {
    id: 5,
    title: "Postman",
    image: "/icon/tecnologias/postman.svg",
    description: "tecnologias.t3",
  },
  {
    id: 6,
    title: "Sass",
    image: "/icon/tecnologias/sass.svg",
    description: "tecnologias.t4",
  },
  {
    id: 7,
    title: "Figma",
    image: "/icon/tecnologias/figma.svg",
    description: "tecnologias.t5",
  },
  {
    id: 8,
    title: "TailwindCSS",
    image: "/icon/tecnologias/tailwindCSS.svg",

    description: "tecnologias.t6",
  },
  {
    id: 10,
    title: "Express.js",
    image: "/icon/tecnologias/express.svg",
    description: "tecnologias.t7",
  },
  {
    id: 11,
    title: "JWT (JSON Web Token)",
    image: "/icon/tecnologias/jwt.svg",
    description: "tecnologias.t8",
  },
  {
    id: 12,
    title: "MongoDB",
    image: "/icon/tecnologias/mongo.svg",
    description: "tecnologias.t9",
  },
  {
    id: 13,
    title: "Mongoose",
    image: "/icon/tecnologias/mongoose.png",
    description: "tecnologias.t10",
  },
  {
    id: 14,
    title: "Mercado Pago",
    image: "/icon/tecnologias/mercadopago.png",

    description: "tecnologias.t11",
  },
  {
    id: 15,
    title: "Auth0",
    image: "/icon/tecnologias/auth0.svg",

    description: "tecnologias.t12",
  },
  {
    id: 16,
    title: "Firebase",
    image: "/icon/tecnologias/firebase.svg",

    description: "tecnologias.t13",
  },
  {
    id: 17,
    title: "Render",
    image: "/icon/tecnologias/render.svg",

    description: "tecnologias.t14",
  },
  {
    id: 18,
    title: "Vercel",
    image: "/icon/tecnologias/vercel.svg",

    description: "tecnologias.t15",
  },
  {
    id: 19,
    title: "Trello",
    image: "/icon/tecnologias/trello.svg",

    description: "tecnologias.t16",
  },

  {
    id: 20,
    title: "Git + GitHub",
    image: "/icon/tecnologias/github.svg",

    description:
      "Git es un sistema de control de versiones distribuido de código abierto que permite a los desarrolladores colaborar en proyectos de software. GitHub es una plataforma de alojamiento de código fuente y control de versiones que utiliza Git.",
  },
];

export const nosotros = [
  {
    name: "Lucas Regner",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Carla Frías",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Micaela Savournin",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Fabian Pacheco",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Valentin Dealbera",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Tadeo Massó",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Leonardo Pischetz",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },

  {
    name: "Thomas Barenghi",
    image: "/images/nosotros/placeholder.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
  },
];
