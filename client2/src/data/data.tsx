export const navPublicMobile = [
  {
    name: "navPublic.t1",
    url: "/",
    visible: true,
    //accion vacia
    action: () => {},
  },
  {
    name: "navPublic.t2",
    url: "/about",
    visible: true,
    action: () => {},
  },
  {
    name: "navPublic.t3",
    url: "/beats",
    visible: true,
  },
];

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
  },
];

export const navHelp = [
  {
    name: "navHelp.t1",
    url: "/help",
    visible: true,
  },
  {
    name: "navHelp.t2",
    url: "/help/privacy",
    visible: true,
  },
  {
    name: "navHelp.t3",
    url: "/help/terms",
    visible: true,
  },
];

export const navClient = [
  {
    name: "Perfil",
    url: "/client",
    visible: true,
  },
  {
    name: "Inbox",
    url: "/client/inbox",
    visible: true,
  },
  {
    name: "Vende tus beats",
    url: "",
    // onClick: () => manageBecomeSeller(),
    visible: true,
  },
  {
    name: "Configuracion",
    url: "/client/settings",
    visible: true,
  },
  {
    name: "Facturacion",
    url: "/client/billing",
    visible: true,
  },
  {
    name: "Logout",
    url: "/auth/logout",
    visible: true,
  },
];

export const faqs = [
  {
    title: "faqs.t1",
    content1: "faqs.c1",
  },
  {
    title: "faqs.t2",
    content1: "faqs.c2",
  },
  {
    title: "faqs.t3",
    content1: "faqs.c3",
  },
  {
    title: "faqs.t4",
    content1: "faqs.c4",
  },
];

export const faqsAdmin = [
  {
    title: "faqsAdmin.t1",
    content1: "faqsAdmin.c1",
    content2: "faqsAdmin.d1",
    content3: "faqsAdmin.e1",
  },
  {
    title: "faqsAdmin.t2",
    content1: "faqsAdmin.c2",
    content2: "faqsAdmin.d2",
    content3: "faqsAdmin.e2",
  },
  {
    title: "faqsAdmin.t3",
    content1: "faqsAdmin.c3",
  },
  {
    title: "faqsAdmin.t4",
    content1: "faqsAdmin.c4",
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
    image: "/icon/tecnologias/tailwindcss.svg",

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

    description: "tecnologias.t17",
  },
];

export const nosotros = [
  {
    name: "Valentin Dealbera",
    image: "/images/nosotros/valen3.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "https://www.linkedin.com/in/valentin-dealbera-b30561262/",
      github: "https://github.com/ValentinDealbera",
      gmail: "mailto:valentindealbera01@gmail.com",
    },
  },

  {
    name: "Micaela Savournin",
    image: "/images/nosotros/mica2.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "http://linkedin.com/in/micaela-savournin",
      github: "https://github.com/Micasavournin ",
      gmail: "mailto:micaasavoo@gmail.com",
    },
  },
  {
    name: "Tadeo Massó",
    image: "/images/nosotros/tadeo.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "https://www.linkedin.com/in/tadeo-mass%C3%B3-612045269/",
      github: "https://github.com/TadeoMasso",
      gmail: "mailto:massotadeo@gmail.com",
    },
  },
  {
    name: "Carla Frías",
    image: "/images/nosotros/carla2.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "https://www.linkedin.com/in/friascarla/",
      github: "https://github.com/CarlaFrias",
      gmail: "mailto:carlajimenafrias@gmail.com",
    },
  },
  {
    name: "Thomas Barenghi",
    image: "/images/nosotros/thomas.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "https://www.linkedin.com/in/thomasbarenghi/",
      github: "https://github.com/thomasbarenghi",
      gmail: "mailto:thomasbarenghi@gmail.com",
    },
  },
  {
    name: "Leonardo Pischetz",
    image: "/images/nosotros/leo2.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin:
        "https://www.linkedin.com/in/leonardo-iv%C3%A1n-pischetz-865054216",
      github: "https://github.com/leopischetz",
      gmail: "mailto:leonardo.pischetz@gmail.com",
    },
  },
  {
    name: "Lucas Regner",
    image: "/images/nosotros/lucas2.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin: "https://www.linkedin.com/in/lucas-regner/",
      github: "https://github.com/LucasRegner1",
      gmail: "mailto:lucasregner.dev@gmail.com",
    },
  },
  {
    name: "Fabian Pacheco",
    image: "/images/nosotros/fabi.png", //crear carpeta e importar imagenes propias
    //description: "",
    redes: {
      //importar fotos de las redes como svg
      linkedin: "/icon/tecnologias/linkedin.svg",
      github: "/icon/tecnologias/github2.svg",
      gmail: "/icon/tecnologias/gmail.svg",
    },
    enlaces: {
      linkedin:
        "https://www.linkedin.com/in/fabian-gerardo-pacheco-ramirez-6a4898237",
      github: "https://github.com/fabgpr",
      gmail: "mailto:fabiangpachecor@gmail.com",
    },
  },
];
