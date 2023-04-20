import { manageBecomeSeller } from "../components/masters/becomeSeller";

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
    colorMode: "light",
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
    description: "Next.js es un framework de React para la construcción de aplicaciones web de alto rendimiento y de alto rendimiento. Next.js te ayuda a crear aplicaciones web de una sola página con React fácilmente.",
  },
  {
    id: 4,
    title: "Redux Toolkit",
    image: "/icon/tecnologias/redux.svg",
    description:
      "Redux es una librería de gestión de estado para aplicaciones JavaScript de una sola página (SPA). Se utiliza principalmente con React, pero también se puede utilizar con otras bibliotecas o marcos de trabajo de JavaScript. Redux se basa en la arquitectura Flux y se centra en la idea de que el estado de la aplicación debe ser centralizado y predecible.",
  },
  {
    id: 5,
    title: "Postman",
    image: "/icon/tecnologias/postman.svg",
    description:
      "Postman es una herramienta de colaboración para diseñar, probar y documentar las API. Con Postman puedes enviar solicitudes HTTP a un servidor web y recibir respuestas. Puedes organizar tus solicitudes en colecciones y agregar tests automatizados a tus solicitudes para asegurarte de que tus API funcionan correctamente.",
  },
  {
    id: 6,
    title: "Sass",
    image: "/icon/tecnologias/sass.svg",
    description:
      "Sass es un preprocesador de CSS que permite escribir código CSS de manera más eficiente y estructurada. Con Sass, puedes utilizar variables, anidamiento de selectores, mixins, funciones y operadores matemáticos, lo que facilita la escritura y el mantenimiento de hojas de estilo. Además, Sass permite la creación de archivos parciales que se pueden importar en otros archivos para una mayor modularidad y reutilización de código.",
  },
  {
    id: 7,
    title: "Figma",
    image: "/icon/tecnologias/figma.svg",
    description:
      "Figma es una herramienta de diseño de interfaz de usuario (UI) basada en la nube que permite a los diseñadores y equipos de diseño colaborar en tiempo real. Figma cuenta con una interfaz intuitiva y fácil de usar que permite crear diseños, prototipos y animaciones interactivas. Figma también ofrece una amplia variedad de recursos, como iconos, componentes, plantillas y complementos, que facilitan la creación de diseños de alta calidad de manera más rápida y eficiente.",
  },
  {
    id: 8,
    title: "TailwindCSS",
    image: "/icon/tecnologias/tailwindCSS.svg",
    description: "Tailwind CSS es un framework de CSS de bajo nivel que te ayuda a crear diseños de interfaz de usuario (UI) de manera rápida y sencilla. Con Tailwind CSS, puedes crear diseños de interfaz de usuario (UI) personalizados sin tener que escribir CSS.",
  },
  {
    id: 10,
    title: "Express.js",
    image: "/icon/tecnologias/express.svg",
    description:
      "Express.js es un framework de servidor web para Node.js que permite crear aplicaciones web y API REST de manera rápida y sencilla. Express.js se basa en el concepto de middleware, que es una función que se ejecuta entre la solicitud y la respuesta del servidor. Express.js proporciona una serie de middleware predefinidos que facilitan la creación de aplicaciones web y API REST.",
  },
  {
    id: 11,
    title: "JWT (JSON Web Token)",
    image: "/icon/tecnologias/jwt.svg",
    description:
      "JSON Web Token (JWT) es un estándar abierto que define un formato compacto y autónomo para transmitir información de forma segura entre dos partes como un objeto JSON. Los tokens JWT se pueden firmar usando un secreto (con el algoritmo HMAC) o una clave pública / privada usando RSA o ECDSA.",
  },
  {
    id: 12,
    title: "MongoDB",
    image: "/icon/tecnologias/mongo.svg",
    description:
      "MongoDB es un sistema de base de datos NoSQL orientado a documentos que utiliza documentos JSON con esquemas. MongoDB es un sistema de base de datos NoSQL orientado a documentos que utiliza documentos JSON con esquemas. MongoDB es un sistema de base de datos NoSQL orientado a documentos que utiliza documentos JSON con esquemas.",
  },
  {
    id: 13,
    title: "Mongoose",
    image: "/icon/tecnologias/mongoose.png",
    description:
      "Mongoose es una biblioteca de modelado de objetos de MongoDB diseñada para trabajar en un entorno asíncrono. Mongoose soporta tanto promesas como devoluciones de llamada. Mongoose simplifica la creación de modelos de esquema, validación, creación, consulta, actualización y eliminación de registros.",
  },
  {
    id: 14,
    title: "Mercado Pago",
    image: "/icon/tecnologias/mercadopago.png",
    description: "Mercado Pago es una plataforma de pagos online que permite a los usuarios realizar pagos a través de tarjetas de crédito, débito, efectivo y transferencias bancarias. Mercado Pago es una plataforma de pagos online que permite a los usuarios realizar pagos a través de tarjetas de crédito, débito, efectivo y transferencias bancarias.",
  },
  {
    id: 15,
    title: "Auth0",
    image: "/icon/tecnologias/auth0.svg",
    description: "Auth0 es una plataforma de autenticación y autorización que permite a los desarrolladores agregar autenticación y autorización a sus aplicaciones web, móviles y de escritorio. Auth0 es una plataforma de autenticación y autorización que permite a los desarrolladores agregar autenticación y autorización a sus aplicaciones web, móviles y de escritorio.",
  },
  {
    id: 16,
    title: "Firebase",
    image: "/icon/tecnologias/firebase.svg",
    description: "Firebase es una plataforma de desarrollo de aplicaciones móviles y web que ofrece servicios de base de datos, almacenamiento, autenticación, análisis, mensajería y más. Firebase es una plataforma de desarrollo de aplicaciones móviles y web que ofrece servicios de base de datos, almacenamiento, autenticación, análisis, mensajería y más.",
  },
  {
    id: 17,
    title: "Render",
    image: "/icon/tecnologias/render.svg",
    description: "Render es una plataforma de alojamiento de aplicaciones web que permite a los desarrolladores desplegar aplicaciones web y API REST en la nube. Render es una plataforma de alojamiento de aplicaciones web que permite a los desarrolladores desplegar aplicaciones web y API REST en la nube.",
  },
  {
    id: 18,
    title: "Vercel",
    image: "/icon/tecnologias/vercel.svg",
    description: "Vercel es una plataforma de alojamiento de aplicaciones web que permite a los desarrolladores desplegar aplicaciones web y API REST en la nube. Vercel es una plataforma de alojamiento de aplicaciones web que permite a los desarrolladores desplegar aplicaciones web y API REST en la nube.",
  },
  {
    id: 19,
    title: "Trello",
    image: "/icon/tecnologias/trello.svg",
    description: "Trello es una herramienta de gestión de proyectos que permite a los equipos de trabajo organizar sus proyectos en tableros. Trello es una herramienta de gestión de proyectos que permite a los equipos de trabajo organizar sus proyectos en tableros.",
    },
  {
    id: 20,
    title: "Git + GitHub",
    image: "/icon/tecnologias/github.svg",
    description: "Git es un sistema de control de versiones distribuido de código abierto que permite a los desarrolladores colaborar en proyectos de software. GitHub es una plataforma de alojamiento de código fuente y control de versiones que utiliza Git.",
  }
];
