import { manageBecomeSeller } from "../components/masters/becomeSeller";
import { useTranslation } from 'react-i18next';

export const navPublic = [
  {
    name: "Inicio",
    url: "/",
    visible: true,
  },
  {
    name: "Nosotros",
    url: "/about",
    visible: true,
  },
  {
    name: "Beats",
    url: "/beats",
    visible: true,
  },
  {
    name: "Carrito",
    url: "/beats/cart",
    visible: false,
  },
];

export const navHelp = [
  {
    name: "Inicio",
    url: "/help",
    colorMode: "light",
    visibility: true,
  },
  {
    name: "Política de privacidad",
    url: "/help/privacy",
    colorMode: "light",
    visibility: true,
  },
  {
    name: "Términos y condiciones",
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
    onClick: () => manageBecomeSeller()
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
    title: "¿Cómo puedo encontrar el beat adecuado para mi proyecto musical?",
    content:
      "En nuestra plataforma, puedes explorar los catálogos de los productores de música registrados y escuchar muestras de audio de cada beat. Si no encuentras lo que buscas.",
  },
  {
    title: "¿Cómo puedo realizar el pago de manera segura?",
    content:
      "Ofrecemos un proceso de pago seguro y eficiente a través de Mercado Pago. Una vez que hayas elegido el beat que deseas comprar, podrás realizar el pago de manera segura con diferentes métodos de pago.",
  },
  {
    title: "¿Cómo recibiré el archivo del beat después de realizar el pago?",
    content:
      "Una vez que hayas realizado el pago, recibirás el archivo del beat en tu correo electrónico. Asegúrate de proporcionar una dirección de correo electrónico válida durante el proceso de pago.",
  },
  {
    title: "¿Cómo puedo registrarme como proveedor en la plataforma?",
    content:
      "Para registrarte como proveedor, debes completar el formulario de registro. Una vez registrado, podrás crear y publicar tu catálogo de instrumentales.",
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
    description: "tecnologias.t17",
  }
];
